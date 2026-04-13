// List all available models from Frenix API
const https = require("https");

const API_KEY = "sk-frenix-160cc0c813c7678d814e9feb4a443cbb";
const API_BASE = "api.frenix.sh";

async function listModels() {
  return new Promise((resolve) => {
    const options = {
      hostname: API_BASE,
      port: 443,
      path: "/v1/models",
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
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
            success: res.statusCode === 200,
            status: res.statusCode,
            data: response,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            success: false,
            status: res.statusCode,
            data: null,
            error: `Parse error: ${error.message}, Raw: ${responseData.substring(0, 500)}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      resolve({
        success: false,
        status: "ERROR",
        data: null,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        status: "TIMEOUT",
        data: null,
        error: "Request timeout",
      });
    });

    req.end();
  });
}

async function analyzeModels() {
  console.log("🔍 Fetching Frenix API Models List");
  console.log("=".repeat(70));
  console.log(`🔑 API Key: ${API_KEY.substring(0, 25)}...`);
  console.log(`🌐 API Endpoint: https://${API_BASE}/v1/models`);
  console.log("=".repeat(70));
  console.log("\nFetching models...\n");

  const result = await listModels();

  if (!result.success) {
    console.log("❌ Failed to fetch models");
    console.log(`Status: ${result.status}`);
    console.log(`Error: ${result.error}`);
    return;
  }

  const models = result.data.data || result.data.models || [];

  if (models.length === 0) {
    console.log("⚠️  No models found in response");
    console.log("Response:", JSON.stringify(result.data, null, 2));
    return;
  }

  console.log(`✅ Found ${models.length} models\n`);
  console.log("=".repeat(70));
  console.log("📊 MODELS BY PROVIDER");
  console.log("=".repeat(70));

  // Categorize models by provider
  const byProvider = {
    OpenAI: [],
    "Anthropic (Claude)": [],
    "Google (Gemini)": [],
    "Meta (Llama)": [],
    Mistral: [],
    DeepSeek: [],
    Qwen: [],
    Other: [],
  };

  models.forEach((model) => {
    const modelId = model.id || model.name || model;
    const modelStr =
      typeof modelId === "string" ? modelId : JSON.stringify(modelId);

    if (modelStr.includes("gpt") || modelStr.includes("o1")) {
      byProvider["OpenAI"].push(modelStr);
    } else if (modelStr.includes("claude")) {
      byProvider["Anthropic (Claude)"].push(modelStr);
    } else if (modelStr.includes("gemini")) {
      byProvider["Google (Gemini)"].push(modelStr);
    } else if (modelStr.includes("llama")) {
      byProvider["Meta (Llama)"].push(modelStr);
    } else if (modelStr.includes("mistral")) {
      byProvider["Mistral"].push(modelStr);
    } else if (modelStr.includes("deepseek")) {
      byProvider["DeepSeek"].push(modelStr);
    } else if (modelStr.includes("qwen")) {
      byProvider["Qwen"].push(modelStr);
    } else {
      byProvider["Other"].push(modelStr);
    }
  });

  // Display by provider
  Object.entries(byProvider).forEach(([provider, providerModels]) => {
    if (providerModels.length > 0) {
      console.log(`\n🤖 ${provider} (${providerModels.length} models):`);
      providerModels.sort().forEach((model) => {
        console.log(`   • ${model}`);
      });
    }
  });

  // Tier analysis (if available)
  console.log("\n" + "=".repeat(70));
  console.log("📊 TIER ANALYSIS");
  console.log("=".repeat(70));

  const tiers = {
    "Premium/Flagship": [],
    Standard: [],
    "Fast/Mini": [],
    Unknown: [],
  };

  models.forEach((model) => {
    const modelId = model.id || model.name || model;
    const modelStr =
      typeof modelId === "string" ? modelId : JSON.stringify(modelId);
    const lower = modelStr.toLowerCase();

    if (
      lower.includes("opus") ||
      lower.includes("gpt-4o") ||
      lower.includes("o1") ||
      lower.includes("pro") ||
      lower.includes("large") ||
      lower.includes("70b") ||
      lower.includes("405b")
    ) {
      tiers["Premium/Flagship"].push(modelStr);
    } else if (
      lower.includes("mini") ||
      lower.includes("flash") ||
      lower.includes("8b") ||
      lower.includes("haiku") ||
      lower.includes("3.5")
    ) {
      tiers["Fast/Mini"].push(modelStr);
    } else if (
      lower.includes("sonnet") ||
      lower.includes("turbo") ||
      lower.includes("1.5")
    ) {
      tiers["Standard"].push(modelStr);
    } else {
      tiers["Unknown"].push(modelStr);
    }
  });

  Object.entries(tiers).forEach(([tier, tierModels]) => {
    if (tierModels.length > 0) {
      console.log(`\n💎 ${tier} (${tierModels.length} models):`);
      tierModels.sort().forEach((model) => {
        console.log(`   • ${model}`);
      });
    }
  });

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("📊 SUMMARY");
  console.log("=".repeat(70));
  console.log(`\n✅ Total Models Available: ${models.length}`);

  Object.entries(byProvider).forEach(([provider, providerModels]) => {
    if (providerModels.length > 0) {
      console.log(`   ${provider}: ${providerModels.length} models`);
    }
  });

  console.log("\n🎉 Frenix API provides access to multiple AI providers!");
  console.log("You can use any of these models in your Wasp Code extension.");

  return { models, byProvider, tiers };
}

// Run analysis
analyzeModels().catch(console.error);
