// Test MiniMax API Keys
const https = require("https");

const models = [
  {
    name: "MiniMax-M2.1",
    apiKey:
      "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s",
    model: "MiniMax-M2.1",
  },
  {
    name: "MiniMax-M2.5",
    apiKey:
      "sk-cp-LQZQu5UhSNim758bUdPOfN00m-VQ_nNpkrQ-HDMrXdyeD7y2YHqLwVVEatjXprMP4pgyWsbmr5AKMfjh3Lsp_-CeYBeUloTQ4KCDK30kifrd_4und1JuIMEa",
    model: "MiniMax-M2.5",
  },
  {
    name: "MiniMax-M2.7",
    apiKey:
      "sk-cp-2WFpfcnusIFZRHGW_4ucJpXcrPX9toLBrJPTX7ULeRXItFt6IDhEgHBzq64Nr95fTx2PfTAvd26-BzlwvGU_78fQhs0gW2DrvVgCeZ6GVeFBVSDKbDBsh",
    model: "MiniMax-M2.7",
  },
];

async function testModel(modelConfig) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: modelConfig.model,
      messages: [
        {
          role: "user",
          content:
            "Hello! Please respond with 'API test successful' to confirm you're working.",
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
        Authorization: `Bearer ${modelConfig.apiKey}`,
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
            model: modelConfig.name,
            status: res.statusCode,
            success: res.statusCode === 200,
            response: response,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            model: modelConfig.name,
            status: res.statusCode,
            success: false,
            response: null,
            error: `Parse error: ${error.message}, Raw response: ${responseData}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      resolve({
        model: modelConfig.name,
        status: "ERROR",
        success: false,
        response: null,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        model: modelConfig.name,
        status: "TIMEOUT",
        success: false,
        response: null,
        error: "Request timeout after 10 seconds",
      });
    });

    req.write(data);
    req.end();
  });
}

async function testAllModels() {
  console.log("🔍 Testing MiniMax API Keys...\n");

  const results = [];

  for (const model of models) {
    console.log(`Testing ${model.name}...`);
    const result = await testModel(model);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${result.model}: SUCCESS`);
      if (
        result.response &&
        result.response.choices &&
        result.response.choices[0]
      ) {
        console.log(
          `   Response: ${result.response.choices[0].message.content.trim()}`,
        );
      }
    } else {
      console.log(`❌ ${result.model}: FAILED`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Error: ${result.error}`);
    }
    console.log("");
  }

  // Summary
  console.log("📊 SUMMARY:");
  const successful = results.filter((r) => r.success).length;
  const total = results.length;
  console.log(`✅ Working: ${successful}/${total} models`);
  console.log(`❌ Failed: ${total - successful}/${total} models`);

  if (successful === total) {
    console.log("\n🎉 All MiniMax API keys are working correctly!");
  } else {
    console.log("\n⚠️  Some API keys have issues. Check the errors above.");
  }

  return results;
}

// Run the test
testAllModels().catch(console.error);
