// Test specific API key against all models
const https = require("https");

const API_KEY =
  "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s";
const models = ["MiniMax-M2.1", "MiniMax-M2.5", "MiniMax-M2.7"];

async function testModel(modelName) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      model: modelName,
      messages: [
        {
          role: "user",
          content:
            "Hello! Please respond with your model name to confirm you're working.",
        },
      ],
      max_tokens: 50,
      temperature: 0.1,
    });

    const options = {
      hostname: "api.minimax.io",
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
            actualModel: response.model || "unknown",
            content:
              response.choices && response.choices[0]
                ? response.choices[0].message.content.trim()
                : "No response",
            usage: response.usage || null,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            model: modelName,
            success: false,
            status: res.statusCode,
            actualModel: "parse_error",
            content: "Parse error",
            usage: null,
            error: `Parse error: ${error.message}, Raw: ${responseData}`,
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
        content: "Connection error",
        usage: null,
        error: error.message,
      });
    });

    req.setTimeout(15000, () => {
      req.destroy();
      resolve({
        model: modelName,
        success: false,
        status: "TIMEOUT",
        actualModel: "timeout",
        content: "Request timeout",
        usage: null,
        error: "Request timeout after 15 seconds",
      });
    });

    req.write(data);
    req.end();
  });
}

async function testAllModels() {
  console.log("🔍 Testing Single API Key Against All Models");
  console.log("=".repeat(60));
  console.log(`🔑 API Key: ${API_KEY.substring(0, 30)}...`);
  console.log("=".repeat(60));

  const results = [];

  for (const model of models) {
    console.log(`\n🤖 Testing ${model}...`);
    const result = await testModel(model);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${model}: SUCCESS`);
      console.log(`   Actual model: ${result.actualModel}`);
      console.log(
        `   Response: ${result.content.substring(0, 100)}${result.content.length > 100 ? "..." : ""}`,
      );
      if (result.usage) {
        console.log(
          `   Tokens used: ${result.usage.total_tokens || "unknown"}`,
        );
      }
    } else {
      console.log(`❌ ${model}: FAILED`);
      console.log(`   Status: ${result.status}`);
      if (result.error) {
        try {
          const errorObj = JSON.parse(result.error);
          if (errorObj.error && errorObj.error.message) {
            console.log(`   Error: ${errorObj.error.message}`);
            if (errorObj.error.type) {
              console.log(`   Type: ${errorObj.error.type}`);
            }
          }
        } catch {
          console.log(
            `   Error: ${result.error.substring(0, 150)}${result.error.length > 150 ? "..." : ""}`,
          );
        }
      }
    }

    // Delay between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\n✅ Working Models: ${successful.length}/${results.length}`);
  if (successful.length > 0) {
    successful.forEach((result) => {
      console.log(`   - ${result.model} (actual: ${result.actualModel})`);
    });
  }

  console.log(`\n❌ Failed Models: ${failed.length}/${results.length}`);
  if (failed.length > 0) {
    failed.forEach((result) => {
      console.log(`   - ${result.model} (${result.status})`);
    });
  }

  if (successful.length === results.length) {
    console.log("\n🎉 EXCELLENT! This API key works with ALL models!");
    console.log("You can use this key for all 3 models in your configuration.");
  } else if (successful.length > 0) {
    console.log(
      `\n⚠️  This API key works with ${successful.length} out of ${results.length} models.`,
    );
    console.log(
      "Consider using only the working models in your configuration.",
    );
  } else {
    console.log("\n💥 This API key doesn't work with any models.");
    console.log(
      "You may need to check your MiniMax account or get a new API key.",
    );
  }

  return results;
}

// Run the test
testAllModels().catch(console.error);
