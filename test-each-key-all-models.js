// Test each API key against all 3 models
const https = require("https");

const apiKeys = [
  {
    name: "Key 1 (M2.1 original)",
    key: "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s",
  },
  {
    name: "Key 2 (M2.5 original)",
    key: "sk-cp-LQZQu5UhSNim758bUdPOfN00m-VQ_nNpkrQ-HDMrXdyeD7y2YHqLwVVEatjXprMP4pgyWsbmr5AKMfjh3Lsp_-CeYBeUloTQ4KCDK30kifrd_4und1JuIMEa",
  },
  {
    name: "Key 3 (M2.7 original)",
    key: "sk-cp-2WFpfcnusIFZRHGW_4ucJpXcrPX9toLBrJPTX7ULeRXItFt6IDhEgHBzq64Nr95fTx2PfTAvd26-BzlwvGU_78fQhs0gW2DrvVgCeZ6GVeFBVSDKbDBsh",
  },
];

const models = ["MiniMax-M2.1", "MiniMax-M2.5", "MiniMax-M2.7"];

async function testKeyWithModel(apiKey, modelName) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      model: modelName,
      messages: [
        {
          role: "user",
          content: "Hello! What model are you?",
        },
      ],
      max_tokens: 30,
      temperature: 0.1,
    });

    const options = {
      hostname: "api.minimax.io",
      port: 443,
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
            success: res.statusCode === 200,
            status: res.statusCode,
            model: modelName,
            actualModel: response.model || "unknown",
            response: response,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            success: false,
            status: res.statusCode,
            model: modelName,
            actualModel: "parse_error",
            response: null,
            error: `Parse error: ${error.message}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      resolve({
        success: false,
        status: "ERROR",
        model: modelName,
        actualModel: "connection_error",
        response: null,
        error: error.message,
      });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        success: false,
        status: "TIMEOUT",
        model: modelName,
        actualModel: "timeout",
        response: null,
        error: "Request timeout",
      });
    });

    req.write(data);
    req.end();
  });
}

async function testAllCombinations() {
  console.log("🔍 Testing Each API Key Against All Models\n");
  console.log("=".repeat(60));

  const results = [];

  for (let i = 0; i < apiKeys.length; i++) {
    const keyInfo = apiKeys[i];
    console.log(`\n🔑 Testing ${keyInfo.name}`);
    console.log(`Key: ${keyInfo.key.substring(0, 25)}...`);
    console.log("-".repeat(50));

    const keyResults = [];

    for (const model of models) {
      console.log(`  Testing ${model}...`);
      const result = await testKeyWithModel(keyInfo.key, model);
      keyResults.push(result);

      if (result.success) {
        console.log(`  ✅ ${model}: SUCCESS (actual: ${result.actualModel})`);
      } else {
        console.log(`  ❌ ${model}: FAILED (${result.status})`);
        if (result.error) {
          try {
            const errorObj = JSON.parse(result.error);
            if (errorObj.error && errorObj.error.message) {
              console.log(`     Error: ${errorObj.error.message}`);
            }
          } catch {
            console.log(`     Error: ${result.error.substring(0, 100)}`);
          }
        }
      }

      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    results.push({
      keyName: keyInfo.name,
      key: keyInfo.key,
      results: keyResults,
    });

    const successful = keyResults.filter((r) => r.success).length;
    console.log(
      `\n  📊 ${keyInfo.name} Summary: ${successful}/${models.length} models working`,
    );
  }

  // Final Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 FINAL SUMMARY");
  console.log("=".repeat(60));

  results.forEach((keyResult, index) => {
    const successful = keyResult.results.filter((r) => r.success);
    console.log(`\n🔑 ${keyResult.keyName}:`);
    console.log(`   Working models: ${successful.length}/${models.length}`);

    if (successful.length > 0) {
      console.log(
        `   ✅ Works with: ${successful.map((r) => r.model).join(", ")}`,
      );
    }

    const failed = keyResult.results.filter((r) => !r.success);
    if (failed.length > 0) {
      console.log(`   ❌ Fails with: ${failed.map((r) => r.model).join(", ")}`);
    }
  });

  // Best key recommendation
  const bestKey = results.reduce((best, current) => {
    const currentSuccess = current.results.filter((r) => r.success).length;
    const bestSuccess = best.results.filter((r) => r.success).length;
    return currentSuccess > bestSuccess ? current : best;
  });

  console.log(`\n🏆 RECOMMENDATION: Use "${bestKey.keyName}"`);
  console.log(
    `   Works with ${bestKey.results.filter((r) => r.success).length}/${models.length} models`,
  );

  return results;
}

// Run the comprehensive test
testAllCombinations().catch(console.error);
