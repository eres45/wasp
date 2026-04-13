// Test Frenix API to discover available models
const https = require("https");

const API_KEY = "sk-frenix-160cc0c813c7678d814e9feb4a443cbb";
const API_BASE = "api.frenix.sh";

// Common model names to test
const modelsToTest = [
  // OpenAI models
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4-turbo",
  "gpt-4",
  "gpt-3.5-turbo",
  // Claude models
  "claude-3-5-sonnet-20241022",
  "claude-3-5-sonnet-latest",
  "claude-3-opus",
  "claude-3-sonnet",
  "claude-3-haiku",
  // Gemini models
  "gemini-2.0-flash-exp",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  // Other models
  "llama-3.1-70b",
  "llama-3.1-8b",
  "mistral-large",
  "deepseek-chat",
];

async function testModel(modelName) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      model: modelName,
      messages: [
        {
          role: "user",
          content: "Hi",
        },
      ],
      max_tokens: 10,
    });

    const options = {
      hostname: API_BASE,
      port: 443,
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "Content-Length": data.length,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(responseData);
          resolve({
            model: modelName,
            success: res.statusCode === 200,
            status: res.statusCode,
            actualModel: response.model || modelName,
            response: response,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            model: modelName,
            success: false,
            status: res.statusCode,
            actualModel: "parse_error",
            response: null,
            error: `Parse error: ${responseData.substring(0, 200)}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      resolve({
        model: modelName,
        success: false,
        status: "ERROR",
        actualModel: "connection_error",
        response: null,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        model: modelName,
        success: false,
        status: "TIMEOUT",
        actualModel: "timeout",
        response: null,
        error: "Timeout",
      });
    });

    req.write(data);
    req.end();
  });
}

async function discoverModels() {
  console.log("🔍 Discovering Frenix API Models");
  console.log("=".repeat(70));
  console.log(`🔑 API Key: ${API_KEY.substring(0, 25)}...`);
  console.log(`🌐 API Base: https://${API_BASE}/v1`);
  console.log("=".repeat(70));

  const results = [];
  const workingModels = [];

  for (const model of modelsToTest) {
    process.stdout.write(`Testing ${model}... `);
    const result = await testModel(model);
    results.push(result);

    if (result.success) {
      console.log(`✅`);
      workingModels.push(result);
    } else {
      console.log(`❌ (${result.status})`);
    }

    // Small delay
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  // Organize by provider
  console.log("\n" + "=".repeat(70));
  console.log("📊 AVAILABLE MODELS BY PROVIDER");
  console.log("=".repeat(70));

  const byProvider = {
    OpenAI: workingModels.filter((m) => m.model.startsWith("gpt")),
    "Anthropic (Claude)": workingModels.filter((m) =>
      m.model.startsWith("claude"),
    ),
    "Google (Gemini)": workingModels.filter((m) =>
      m.model.startsWith("gemini"),
    ),
    "Meta (Llama)": workingModels.filter((m) => m.model.startsWith("llama")),
    Mistral: workingModels.filter((m) => m.model.startsWith("mistral")),
    DeepSeek: workingModels.filter((m) => m.model.startsWith("deepseek")),
    Other: workingModels.filter(
      (m) =>
        !m.model.startsWith("gpt") &&
        !m.model.startsWith("claude") &&
        !m.model.startsWith("gemini") &&
        !m.model.startsWith("llama") &&
        !m.model.startsWith("mistral") &&
        !m.model.startsWith("deepseek"),
    ),
  };

  Object.entries(byProvider).forEach(([provider, models]) => {
    if (models.length > 0) {
      console.log(`\n🤖 ${provider} (${models.length} models):`);
      models.forEach((m) => {
        console.log(`   ✅ ${m.model}`);
      });
    }
  });

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("📊 SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total models tested: ${modelsToTest.length}`);
  console.log(`Working models: ${workingModels.length}`);
  console.log(`Failed models: ${modelsToTest.length - workingModels.length}`);

  if (workingModels.length > 0) {
    console.log("\n🎉 Frenix API is working!");
    console.log(
      `You have access to ${workingModels.length} models across multiple providers.`,
    );
  } else {
    console.log("\n❌ No models are working. Check API key or service status.");
  }

  return { results, workingModels, byProvider };
}

// Run discovery
discoverModels().catch(console.error);
