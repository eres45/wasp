const https = require("https");

const API_KEY = "sk-frenix-160cc0c813c7678d814e9feb4a443cbb";
const API_BASE = "https://api.frenix.sh/v1/chat/completions";

// All best 4 models from each provider (68 models total)
const MODELS_TO_TEST = [
  // 1. OpenAI (4 models)
  { provider: "OpenAI", model: "gpt-5.4", description: "Latest GPT-5" },
  {
    provider: "OpenAI",
    model: "provider-1/gpt-5.3-codex",
    description: "Best for coding",
  },
  {
    provider: "OpenAI",
    model: "provider-1/gpt-5.2-codex",
    description: "Code specialist",
  },
  {
    provider: "OpenAI",
    model: "provider-1/gpt-4o",
    description: "Fast & capable",
  },

  // 2. Anthropic/Claude (4 models)
  {
    provider: "Anthropic",
    model: "provider-1/claude-opus-4-6",
    description: "Most capable",
  },
  {
    provider: "Anthropic",
    model: "provider-1/claude-opus-4-5",
    description: "Previous Opus",
  },
  {
    provider: "Anthropic",
    model: "provider-1/claude-sonnet-4-6",
    description: "Balanced",
  },
  {
    provider: "Anthropic",
    model: "provider-4/claude-haiku-4-5",
    description: "Fastest",
  },

  // 3. Google/Gemini (4 models)
  {
    provider: "Google",
    model: "provider-1/gemini-3.1-pro",
    description: "Latest Pro",
  },
  {
    provider: "Google",
    model: "provider-1/gemini-3-pro",
    description: "Gemini 3 Pro",
  },
  {
    provider: "Google",
    model: "provider-1/gemini-2.5-pro",
    description: "Stable Pro",
  },
  {
    provider: "Google",
    model: "provider-1/gemini-3-flash",
    description: "Fast",
  },

  // 4. Meta/Llama (4 models)
  {
    provider: "Meta",
    model: "provider-1/llama-4-maverick-17b-128e-instruct",
    description: "Newest Llama 4",
  },
  {
    provider: "Meta",
    model: "provider-1/llama-3.1-405b-instruct",
    description: "Largest (405B)",
  },
  {
    provider: "Meta",
    model: "provider-1/llama-3.3-70b-instruct",
    description: "Latest 70B",
  },
  {
    provider: "Meta",
    model: "provider-1/llama-3.1-70b-instruct",
    description: "Stable 70B",
  },

  // 5. Mistral (4 models)
  {
    provider: "Mistral",
    model: "provider-1/mistral-large-3-675b-instruct-2512",
    description: "HUGE (675B!)",
  },
  {
    provider: "Mistral",
    model: "provider-1/mistral-large-2-instruct",
    description: "Large v2",
  },
  {
    provider: "Mistral",
    model: "provider-1/devstral-2-123b-instruct-2512",
    description: "For coding",
  },
  {
    provider: "Mistral",
    model: "provider-1/mistral-medium-3-instruct",
    description: "Balanced",
  },

  // 6. DeepSeek (4 models)
  { provider: "DeepSeek", model: "deepseek-v3.2", description: "Newest" },
  {
    provider: "DeepSeek",
    model: "deepseek-v3.1",
    description: "Latest stable",
  },
  {
    provider: "DeepSeek",
    model: "provider-1/deepseek-v3.1-terminus",
    description: "Specialized",
  },
  {
    provider: "DeepSeek",
    model: "provider-1/deepseek-r1-distill-qwen-32b",
    description: "Reasoning",
  },

  // 7. Qwen (4 models)
  {
    provider: "Qwen",
    model: "provider-1/qwen3-coder-480b-a35b-instruct",
    description: "MASSIVE coding (480B!)",
  },
  {
    provider: "Qwen",
    model: "provider-1/qwen3.5-397b-a17b",
    description: "Huge (397B)",
  },
  {
    provider: "Qwen",
    model: "provider-1/qwen3.5-122b-a10b",
    description: "Large (122B)",
  },
  {
    provider: "Qwen",
    model: "provider-1/qwen3-max-2026-01-23",
    description: "Latest Max",
  },

  // 8. MiniMax (3 models)
  { provider: "MiniMax", model: "MiniMax-M2.5", description: "Latest" },
  {
    provider: "MiniMax",
    model: "minimax-m2.5",
    description: "Alternative name",
  },
  { provider: "MiniMax", model: "minimax-m2.1", description: "Stable version" },

  // 9. GLM/ChatGLM (4 models)
  { provider: "GLM", model: "provider-1/glm-5", description: "Latest GLM" },
  { provider: "GLM", model: "glm-4.7", description: "GLM 4.7" },
  { provider: "GLM", model: "glm4.7", description: "Alternative name" },
  { provider: "GLM", model: "glm-4", description: "Base model" },

  // 10. Kimi (4 models)
  { provider: "Kimi", model: "kimi-k2.5", description: "Latest" },
  {
    provider: "Kimi",
    model: "provider-1/kimi-k2-thinking",
    description: "Reasoning mode",
  },
  {
    provider: "Kimi",
    model: "provider-1/kimi-k2-instruct",
    description: "Instruct version",
  },
  {
    provider: "Kimi",
    model: "provider-1/kimi-k2-instruct-0905",
    description: "Dated version",
  },

  // 11. Microsoft Phi (4 models)
  {
    provider: "Microsoft",
    model: "provider-1/phi-4-multimodal-instruct",
    description: "Latest multimodal",
  },
  {
    provider: "Microsoft",
    model: "provider-1/phi-4-mini-instruct",
    description: "Latest mini",
  },
  {
    provider: "Microsoft",
    model: "provider-1/phi-4-mini-flash-reasoning",
    description: "Fast reasoning",
  },
  {
    provider: "Microsoft",
    model: "provider-1/phi-3.5-moe-instruct",
    description: "Mixture of Experts",
  },

  // 12. Nvidia Nemotron (4 models)
  {
    provider: "Nvidia",
    model: "provider-1/llama-3.1-nemotron-ultra-253b-v1",
    description: "Ultra (253B!)",
  },
  {
    provider: "Nvidia",
    model: "provider-1/nemotron-4-340b-instruct",
    description: "Huge (340B)",
  },
  {
    provider: "Nvidia",
    model: "llama-3.3-nemotron-super-49b-v1.5",
    description: "Super",
  },
  {
    provider: "Nvidia",
    model: "provider-1/llama-3.1-nemotron-70b-instruct",
    description: "70B",
  },

  // 13. Granite (IBM) (4 models)
  {
    provider: "Granite",
    model: "provider-1/granite-3.3-8b-instruct",
    description: "Latest",
  },
  {
    provider: "Granite",
    model: "provider-1/granite-34b-code-instruct",
    description: "Code (34B)",
  },
  {
    provider: "Granite",
    model: "provider-1/granite-3.0-8b-instruct",
    description: "Stable",
  },
  {
    provider: "Granite",
    model: "provider-1/granite-guardian-3.0-8b",
    description: "Safety",
  },

  // 14. Gemma (Google) (4 models)
  {
    provider: "Gemma",
    model: "provider-1/gemma-3-27b-it",
    description: "Largest Gemma 3",
  },
  {
    provider: "Gemma",
    model: "provider-1/gemma-3-12b-it",
    description: "Gemma 3 12B",
  },
  {
    provider: "Gemma",
    model: "provider-1/gemma-2-27b-it",
    description: "Gemma 2 27B",
  },
  { provider: "Gemma", model: "provider-1/gemma-3-4b-it", description: "Fast" },

  // 15. Jamba (AI21) (2 models)
  {
    provider: "Jamba",
    model: "provider-1/jamba-1.5-large-instruct",
    description: "Large",
  },
  {
    provider: "Jamba",
    model: "provider-1/jamba-1.5-mini-instruct",
    description: "Mini",
  },

  // 16. Palmyra (Writer) (4 models)
  {
    provider: "Palmyra",
    model: "provider-1/palmyra-creative-122b",
    description: "Creative (122B)",
  },
  {
    provider: "Palmyra",
    model: "provider-1/palmyra-fin-70b-32k",
    description: "Finance",
  },
  {
    provider: "Palmyra",
    model: "provider-1/palmyra-med-70b-32k",
    description: "Medical",
  },
  {
    provider: "Palmyra",
    model: "provider-1/palmyra-med-70b",
    description: "Medical",
  },

  // 17. Frenix Custom (3 models)
  {
    provider: "Frenix",
    model: "frenix-axion-pro",
    description: "Frenix's own model",
  },
  { provider: "Frenix", model: "axion-pro", description: "Axion Pro" },
  { provider: "Frenix", model: "axion-1.5-pro", description: "Axion 1.5" },
];

console.log(
  `🧪 TESTING ${MODELS_TO_TEST.length} BEST MODELS FROM 17 PROVIDERS`,
);
console.log(`⏱️  Rate Limit: 10 RPM (6 second delay between requests)`);
console.log(
  `⏳ Estimated time: ${Math.ceil((MODELS_TO_TEST.length * 6) / 60)} minutes\n`,
);

function testModel(modelInfo) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      model: modelInfo.model,
      messages: [{ role: "user", content: 'Say "OK" if you work' }],
      max_tokens: 10,
      temperature: 0.1,
    });

    const options = {
      hostname: "api.frenix.sh",
      port: 443,
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          if (
            res.statusCode === 200 &&
            response.choices &&
            response.choices[0]
          ) {
            resolve({
              ...modelInfo,
              status: "WORKING ✅",
              response: response.choices[0].message.content,
              statusCode: res.statusCode,
            });
          } else {
            resolve({
              ...modelInfo,
              status: "FAILED ❌",
              error: response.error?.message || "Unknown error",
              statusCode: res.statusCode,
            });
          }
        } catch (e) {
          resolve({
            ...modelInfo,
            status: "ERROR ❌",
            error: e.message,
            statusCode: res.statusCode,
          });
        }
      });
    });

    req.on("error", (e) => {
      resolve({
        ...modelInfo,
        status: "ERROR ❌",
        error: e.message,
      });
    });

    req.write(postData);
    req.end();
  });
}

async function testAllModels() {
  const results = {
    working: [],
    failed: [],
    byProvider: {},
  };

  for (let i = 0; i < MODELS_TO_TEST.length; i++) {
    const modelInfo = MODELS_TO_TEST[i];
    const progress = `[${i + 1}/${MODELS_TO_TEST.length}]`;

    console.log(
      `${progress} Testing ${modelInfo.provider}: ${modelInfo.model}...`,
    );

    const result = await testModel(modelInfo);

    if (result.status.includes("WORKING")) {
      console.log(`  ${result.status} ${result.response || ""}`);
      results.working.push(result);
    } else {
      console.log(`  ${result.status} ${result.error || "Failed"}`);
      results.failed.push(result);
    }

    // Track by provider
    if (!results.byProvider[modelInfo.provider]) {
      results.byProvider[modelInfo.provider] = { working: [], failed: [] };
    }
    if (result.status.includes("WORKING")) {
      results.byProvider[modelInfo.provider].working.push(result);
    } else {
      results.byProvider[modelInfo.provider].failed.push(result);
    }

    // Wait 6 seconds between requests (10 RPM = 6 seconds per request)
    if (i < MODELS_TO_TEST.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 6000));
    }
  }

  return results;
}

testAllModels().then((results) => {
  console.log("\n" + "=".repeat(80));
  console.log("📊 TEST RESULTS SUMMARY");
  console.log("=".repeat(80));
  console.log(`✅ Working: ${results.working.length}/${MODELS_TO_TEST.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${MODELS_TO_TEST.length}`);
  console.log("");

  console.log("📈 RESULTS BY PROVIDER:");
  console.log("=".repeat(80));
  Object.keys(results.byProvider)
    .sort()
    .forEach((provider) => {
      const providerResults = results.byProvider[provider];
      const total =
        providerResults.working.length + providerResults.failed.length;
      console.log(
        `\n${provider}: ${providerResults.working.length}/${total} working`,
      );

      if (providerResults.working.length > 0) {
        console.log("  ✅ Working models:");
        providerResults.working.forEach((m) => {
          console.log(`     - ${m.model} (${m.description})`);
        });
      }

      if (providerResults.failed.length > 0) {
        console.log("  ❌ Failed models:");
        providerResults.failed.forEach((m) => {
          console.log(`     - ${m.model}: ${m.error}`);
        });
      }
    });

  console.log("\n" + "=".repeat(80));
  console.log("🏆 TOP WORKING MODELS (RECOMMENDED FOR WASP CODE):");
  console.log("=".repeat(80));
  results.working.slice(0, 10).forEach((m, i) => {
    console.log(`${i + 1}. ${m.provider} - ${m.model}`);
    console.log(`   ${m.description}`);
  });

  console.log("\n✅ Test complete!");
  console.log(
    `Results saved to memory. Working models: ${results.working.length}`,
  );
});
