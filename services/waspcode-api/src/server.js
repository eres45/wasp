import { Readable } from "node:stream";
import cors from "cors";
import express from "express";
import { z } from "zod";
import { config } from "./config.js";
import { createStore } from "./store.js";

const anonymousTokenSchema = z.object({
  clientName: z.string().optional(),
});

const redeemSchema = z.object({
  code: z.string().min(1),
});

const chatCompletionsSchema = z.object({
  model: z.string().min(1),
  messages: z.array(z.any()).min(1),
  stream: z.boolean().optional().default(false),
  max_tokens: z.number().int().positive().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  presence_penalty: z.number().optional(),
  frequency_penalty: z.number().optional(),
  tools: z.array(z.any()).optional(),
  tool_choice: z.any().optional(),
});

function getCreditStatus(user) {
  return {
    optedInToFreeTrial: true,
    hasCredits: user.creditBalance > 0,
    creditBalance: user.creditBalance,
    hasPurchasedCredits: user.promoRedemptions > 0,
  };
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice("Bearer ".length).trim();
}

const store = await createStore({
  databaseUrl: config.databaseUrl,
  starterCreditCents: config.starterCreditCents,
});

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "waspcode-api",
    storage: config.databaseUrl ? "postgres" : "memory",
  });
});

app.post("/api/auth/anonymous", async (req, res) => {
  const parsed = anonymousTokenSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body.",
    });
  }

  const user = await store.createAnonymousUser();
  return res.status(201).json({
    userId: user.id,
    token: user.token,
    creditStatus: getCreditStatus(user),
  });
});

app.use(async (req, res, next) => {
  if (req.path === "/health" || req.path === "/api/auth/anonymous") {
    return next();
  }

  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({
      error: "Missing bearer token.",
    });
  }

  const user = await store.getUserByToken(token);
  if (!user) {
    return res.status(401).json({
      error: "Invalid bearer token.",
    });
  }

  req.waspcodeToken = token;
  req.waspcodeUser = user;
  return next();
});

app.get("/api/credits/status", async (req, res) => {
  return res.json(getCreditStatus(req.waspcodeUser));
});

app.post("/api/credits/redeem", async (req, res) => {
  const parsed = redeemSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({
      error: "Promo code is required.",
    });
  }

  if (parsed.data.code.trim() !== config.promoCode) {
    return res.status(400).json({
      error: "Invalid promo code.",
      creditStatus: getCreditStatus(req.waspcodeUser),
    });
  }

  const user = await store.redeemPromo(
    req.waspcodeToken,
    config.promoCreditCents,
  );

  return res.json({
    ok: true,
    message: `Promo applied. ${config.promoCreditCents} cents added.`,
    creditStatus: getCreditStatus(user),
  });
});

app.get("/v1/models", (_req, res) => {
  return res.json({
    object: "list",
    data: config.allowedModels.map((model) => ({
      id: model,
      object: "model",
      owned_by: "waspcode",
    })),
  });
});

app.post("/v1/chat/completions", async (req, res) => {
  if (!config.minimaxApiKey) {
    return res.status(500).json({
      error: "MINIMAX_API_KEY is not configured on the server.",
    });
  }

  const parsed = chatCompletionsSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid chat completion payload.",
      issues: parsed.error.flatten(),
    });
  }

  if (!config.allowedModels.includes(parsed.data.model)) {
    return res.status(400).json({
      error: "Requested model is not allowed.",
      allowedModels: config.allowedModels,
    });
  }

  const chargedUser = await store.adjustCredits(
    req.waspcodeToken,
    -config.requestCostCents,
  );

  if (!chargedUser) {
    return res.status(402).json({
      error: "You have no credits remaining on your WaspCode account.",
      creditStatus: getCreditStatus(req.waspcodeUser),
    });
  }

  try {
    const upstream = await fetch(
      `${config.minimaxApiBase.replace(/\/$/, "")}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.minimaxApiKey}`,
        },
        body: JSON.stringify(parsed.data),
      },
    );

    if (!upstream.ok) {
      await store.adjustCredits(req.waspcodeToken, config.requestCostCents);
      const errorText = await upstream.text();
      return res.status(upstream.status).send(errorText);
    }

    res.setHeader(
      "x-waspcode-credit-balance",
      String(chargedUser.creditBalance),
    );

    if (parsed.data.stream && upstream.body) {
      res.status(upstream.status);
      const contentType =
        upstream.headers.get("content-type") ?? "text/event-stream";
      res.setHeader("content-type", contentType);
      Readable.fromWeb(upstream.body).pipe(res);
      return;
    }

    const payload = await upstream.text();
    return res.status(upstream.status).send(payload);
  } catch (error) {
    await store.adjustCredits(req.waspcodeToken, config.requestCostCents);
    return res.status(502).json({
      error: "Failed to reach MiniMax upstream.",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
});

app.listen(config.port, () => {
  console.log(
    `WaspCode API listening on port ${config.port} using ${config.databaseUrl ? "postgres" : "memory"} storage`,
  );
});
