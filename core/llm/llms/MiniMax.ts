import { fetchwithRequestOptions } from "@continuedev/fetch";
import {
  Headers as FetchHeaders,
  RequestInit as FetchRequestInit,
} from "node-fetch";
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js";

import OpenAI from "./OpenAI.js";

class MiniMax extends OpenAI {
  static providerName = "minimax";
  static defaultOptions: Partial<LLMOptions> = {
    apiBase: "https://api.minimax.io/v1/",
    model: "MiniMax-M2.7",
    useLegacyCompletionsEndpoint: false,
  };

  protected useOpenAIAdapterFor = [];

  private readonly apiKeyPool: string[];
  private currentApiKeyIndex: number;

  constructor(options: LLMOptions) {
    super(options);

    const configuredApiKeys = Array.from(
      new Set(
        [options.apiKey, ...(options.apiKeys ?? [])].filter(
          (apiKey): apiKey is string =>
            typeof apiKey === "string" && apiKey.trim().length > 0,
        ),
      ),
    );

    this.apiKeyPool = configuredApiKeys;
    this.currentApiKeyIndex = Math.max(
      0,
      configuredApiKeys.findIndex((apiKey) => apiKey === this.apiKey),
    );

    if (!this.apiKey && configuredApiKeys.length > 0) {
      this.apiKey = configuredApiKeys[0];
      this.currentApiKeyIndex = 0;
    }
  }

  protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]) {
    const finalOptions = super._convertArgs(options, messages);

    // MiniMax requires temperature in (0.0, 1.0] because zero is rejected.
    if (
      finalOptions.temperature !== undefined &&
      finalOptions.temperature !== null
    ) {
      if (finalOptions.temperature <= 0) {
        finalOptions.temperature = 0.01;
      } else if (finalOptions.temperature > 1) {
        finalOptions.temperature = 1.0;
      }
    }

    // MiniMax does not support response_format.
    if ((finalOptions as any).response_format) {
      delete (finalOptions as any).response_format;
    }

    return finalOptions;
  }

  private canRotateApiKeys(): boolean {
    return this.apiKeyPool.length > 1;
  }

  private rotateToNextApiKey(): string | undefined {
    if (!this.canRotateApiKeys()) {
      return undefined;
    }

    this.currentApiKeyIndex =
      (this.currentApiKeyIndex + 1) % this.apiKeyPool.length;
    this.apiKey = this.apiKeyPool[this.currentApiKeyIndex];
    return this.apiKey;
  }

  private withApiKeyHeaders(
    init: FetchRequestInit | undefined,
    apiKey: string | undefined,
  ): FetchRequestInit {
    const headers = new FetchHeaders(init?.headers);

    if (apiKey) {
      headers.set("Authorization", `Bearer ${apiKey}`);
      headers.set("api-key", apiKey);
      headers.set("x-api-key", apiKey);
    } else {
      headers.delete("Authorization");
      headers.delete("api-key");
      headers.delete("x-api-key");
    }

    return {
      ...init,
      headers,
    };
  }

  private shouldRotateForFailure(status: number, bodyText: string): boolean {
    if (status === 429) {
      return true;
    }

    if (status === 401 || status === 403) {
      return /1004|authorization|api secret key|api key|unauthorized/i.test(
        bodyText,
      );
    }

    return /rate limit|too many requests|quota/i.test(bodyText);
  }

  override async fetch(
    url: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    const maxAttempts = Math.max(this.apiKeyPool.length, 1);
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await fetchwithRequestOptions(
        new URL(url as string | URL),
        this.withApiKeyHeaders(
          init as FetchRequestInit | undefined,
          this.apiKey,
        ),
        { ...this.requestOptions },
      );

      if (response.ok || response.status === 499) {
        return response as unknown as Response;
      }

      const bodyText = await response.text();
      const error = new Error(
        `HTTP ${response.status} ${response.statusText} from ${response.url}\n\n${bodyText}`,
      );
      lastError = error;

      const shouldRotate =
        this.canRotateApiKeys() &&
        attempt < maxAttempts - 1 &&
        this.shouldRotateForFailure(response.status, bodyText);

      if (!shouldRotate) {
        throw error;
      }

      const previousApiKey = this.apiKey;
      const nextApiKey = this.rotateToNextApiKey();
      if (!nextApiKey || nextApiKey === previousApiKey) {
        throw error;
      }
    }

    throw (
      lastError ??
      new Error("MiniMax request failed before a response arrived.")
    );
  }
}

export default MiniMax;
