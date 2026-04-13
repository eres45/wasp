import { fetchwithRequestOptions } from "@continuedev/fetch";
import { Headers, Response } from "node-fetch";
import { afterEach, describe, expect, test, vi } from "vitest";

import MiniMax from "./MiniMax.js";

vi.mock("@continuedev/fetch");

describe("MiniMax API key rotation", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("rotates to the next configured key after a 429", async () => {
    vi.mocked(fetchwithRequestOptions)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: "rate limit exceeded" }), {
          status: 429,
          statusText: "Too Many Requests",
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
        }),
      );

    const minimax = new MiniMax({
      model: "MiniMax-M2.7",
      apiBase: "https://api.minimax.io/v1/",
      apiKeys: ["key-1", "key-2"],
    });

    await minimax.fetch(new URL("https://api.minimax.io/v1/chat/completions"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "MiniMax-M2.7" }),
    });

    expect(fetchwithRequestOptions).toHaveBeenCalledTimes(2);

    const firstHeaders = new Headers(
      vi.mocked(fetchwithRequestOptions).mock.calls[0][1]?.headers,
    );
    const secondHeaders = new Headers(
      vi.mocked(fetchwithRequestOptions).mock.calls[1][1]?.headers,
    );

    expect(firstHeaders.get("Authorization")).toBe("Bearer key-1");
    expect(secondHeaders.get("Authorization")).toBe("Bearer key-2");
  });

  test("does not rotate on a normal 400 response", async () => {
    vi.mocked(fetchwithRequestOptions).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "bad request" }), {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/json" },
      }),
    );

    const minimax = new MiniMax({
      model: "MiniMax-M2.7",
      apiBase: "https://api.minimax.io/v1/",
      apiKeys: ["key-1", "key-2"],
    });

    await expect(
      minimax.fetch(new URL("https://api.minimax.io/v1/chat/completions"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "MiniMax-M2.7" }),
      }),
    ).rejects.toThrow(/HTTP 400 Bad Request/);

    expect(fetchwithRequestOptions).toHaveBeenCalledTimes(1);
  });
});
