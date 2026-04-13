const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseAllowedModels = (value) =>
  (value ?? "MiniMax-M2.7,MiniMax-M2.5,MiniMax-M2.1")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const config = {
  port: parseInteger(process.env.PORT, 10000),
  databaseUrl: process.env.DATABASE_URL,
  minimaxApiKey: process.env.MINIMAX_API_KEY ?? "",
  minimaxApiBase: process.env.MINIMAX_API_BASE ?? "https://api.minimax.io/v1",
  starterCreditCents: parseInteger(
    process.env.WASPCODE_STARTER_CREDIT_CENTS,
    2000,
  ),
  promoCode: (process.env.WASPCODE_PROMO_CODE ?? "rumax100").trim(),
  promoCreditCents: parseInteger(
    process.env.WASPCODE_PROMO_CREDIT_CENTS,
    10000,
  ),
  requestCostCents: parseInteger(process.env.WASPCODE_REQUEST_COST_CENTS, 5),
  allowedModels: parseAllowedModels(process.env.WASPCODE_ALLOWED_MODELS),
};
