// Test all model names with the working M2.1 API key
const https = require("https");

// Use the working API key for all tests
const WORKING_API_KEY =
  "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s";

const modelsToTest = [
  "MiniMax-M2.1",
  "MiniMax-M2.5",
  "MiniMax-M2.7",
  // Also test some common variations
  "abab6.5s-chat",
  "abab6.5-chat",
  "abab5.5s-chat",
  "abab5.5-chat",
];

async function testModelName(modelName) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      model: modelName,
      messages: [
        {
          role: "user",
          content: "Hello! What model are you?",
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
        Authorization: `Bearer ${WORKING_API_KEY}`,
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
            status: res.statusCode,
            success: res.statusCode === 200,
            response: response,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            model: modelName,
            status: res.statusCode,
            success: false,
            response: null,
            error: `Parse error: ${error.message}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      resolve({
        model: modelName,
        status: "ERROR",
        success: false,
        response: null,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        model: modelName,
        status: "TIMEOUT",
        success: false,
        response: null,
        error: "Request timeout",
      });
    });

    req.write(data);
    req.end();
  });
}
async function testAllModelNames() {
  console.log("🔍 Testing model names with working API key...\n");
  console.log(`Using API Key: ${WORKING_API_KEY.substring(0, 20)}...\n`);

  const results = [];

  for (const modelName of modelsToTest) {
    console.log(`Testing model: ${modelName}...`);
    const result = await testModelName(modelName);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${result.model}: SUCCESS`);
      if (
        result.response &&
        result.response.choices &&
        result.response.choices[0]
      ) {
        const content = result.response.choices[0].message.content.trim();
        console.log(
          `   Response: ${content.substring(0, 100)}${content.length > 100 ? "..." : ""}`,
        );
      }
      if (result.response && result.response.model) {
        console.log(`   Actual model used: ${result.response.model}`);
      }
    } else {
      console.log(`❌ ${result.model}: FAILED`);
      console.log(`   Status: ${result.status}`);
      if (result.error) {
        try {
          const errorObj = JSON.parse(result.error);
          if (errorObj.error && errorObj.error.message) {
            console.log(`   Error: ${errorObj.error.message}`);
          } else {
            console.log(`   Error: ${result.error.substring(0, 200)}`);
          }
        } catch {
          console.log(`   Error: ${result.error.substring(0, 200)}`);
        }
      }
    }
    console.log("");

    // Small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Summary
  console.log("📊 SUMMARY:");
  const successful = results.filter((r) => r.success);
  console.log(`✅ Working models: ${successful.length}/${results.length}`);

  if (successful.length > 0) {
    console.log("\n🎉 Working model names:");
    successful.forEach((result) => {
      console.log(`   - ${result.model}`);
    });
  }

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) {
    console.log("\n❌ Failed model names:");
    failed.forEach((result) => {
      console.log(`   - ${result.model}`);
    });
  }

  return results;
}

// Run the test
testAllModelNames().catch(console.error);
