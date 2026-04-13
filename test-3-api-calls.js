// Test API with 3 real calls to verify it's working
const https = require("https");

const API_KEY =
  "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s";

const testCalls = [
  {
    name: "Call 1: MiniMax-M2.1",
    model: "MiniMax-M2.1",
    prompt: "Write a simple hello world function in JavaScript.",
  },
  {
    name: "Call 2: MiniMax-M2.5",
    model: "MiniMax-M2.5",
    prompt: "Explain what an API is in one sentence.",
  },
  {
    name: "Call 3: MiniMax-M2.7",
    model: "MiniMax-M2.7",
    prompt: "What is 2 + 2? Just give me the number.",
  },
];

async function makeAPICall(testCall) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      model: testCall.model,
      messages: [
        {
          role: "user",
          content: testCall.prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
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

    const startTime = Date.now();

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        try {
          const response = JSON.parse(responseData);
          resolve({
            name: testCall.name,
            model: testCall.model,
            prompt: testCall.prompt,
            success: res.statusCode === 200,
            status: res.statusCode,
            duration: duration,
            response: response,
            content:
              response.choices && response.choices[0]
                ? response.choices[0].message.content
                : null,
            usage: response.usage || null,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            name: testCall.name,
            model: testCall.model,
            prompt: testCall.prompt,
            success: false,
            status: res.statusCode,
            duration: duration,
            response: null,
            content: null,
            usage: null,
            error: `Parse error: ${error.message}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      resolve({
        name: testCall.name,
        model: testCall.model,
        prompt: testCall.prompt,
        success: false,
        status: "ERROR",
        duration: duration,
        response: null,
        content: null,
        usage: null,
        error: error.message,
      });
    });

    req.setTimeout(20000, () => {
      req.destroy();
      const endTime = Date.now();
      const duration = endTime - startTime;
      resolve({
        name: testCall.name,
        model: testCall.model,
        prompt: testCall.prompt,
        success: false,
        status: "TIMEOUT",
        duration: duration,
        response: null,
        content: null,
        usage: null,
        error: "Request timeout after 20 seconds",
      });
    });

    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log("🧪 Testing MiniMax API with 3 Real Calls");
  console.log("=".repeat(70));
  console.log(`🔑 API Key: ${API_KEY.substring(0, 30)}...`);
  console.log("=".repeat(70));

  const results = [];

  for (let i = 0; i < testCalls.length; i++) {
    const testCall = testCalls[i];
    console.log(`\n📞 ${testCall.name}`);
    console.log(`   Model: ${testCall.model}`);
    console.log(`   Prompt: "${testCall.prompt}"`);
    console.log(`   Making API call...`);

    const result = await makeAPICall(testCall);
    results.push(result);

    if (result.success) {
      console.log(`   ✅ SUCCESS (${result.duration}ms)`);
      console.log(
        `   Response: ${result.content ? result.content.substring(0, 150).replace(/\n/g, " ") : "No content"}${result.content && result.content.length > 150 ? "..." : ""}`,
      );
      if (result.usage) {
        console.log(
          `   Tokens: ${result.usage.total_tokens || "unknown"} (prompt: ${result.usage.prompt_tokens || "?"}, completion: ${result.usage.completion_tokens || "?"})`,
        );
      }
    } else {
      console.log(`   ❌ FAILED (${result.duration}ms)`);
      console.log(`   Status: ${result.status}`);
      if (result.error) {
        try {
          const errorObj = JSON.parse(result.error);
          if (errorObj.error && errorObj.error.message) {
            console.log(`   Error: ${errorObj.error.message}`);
          }
        } catch {
          console.log(`   Error: ${result.error.substring(0, 100)}`);
        }
      }
    }

    // Delay between calls
    if (i < testCalls.length - 1) {
      console.log(`   Waiting 2 seconds before next call...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Final Summary
  console.log("\n" + "=".repeat(70));
  console.log("📊 FINAL RESULTS");
  console.log("=".repeat(70));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\n✅ Successful Calls: ${successful.length}/${results.length}`);
  if (successful.length > 0) {
    successful.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.model} - ${result.duration}ms`);
    });
  }

  console.log(`\n❌ Failed Calls: ${failed.length}/${results.length}`);
  if (failed.length > 0) {
    failed.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.model} - ${result.status}`);
    });
  }

  // Calculate total tokens used
  const totalTokens = successful.reduce((sum, result) => {
    return sum + (result.usage ? result.usage.total_tokens || 0 : 0);
  }, 0);

  if (totalTokens > 0) {
    console.log(`\n📊 Total Tokens Used: ${totalTokens}`);
  }

  // Average response time
  if (successful.length > 0) {
    const avgTime =
      successful.reduce((sum, r) => sum + r.duration, 0) / successful.length;
    console.log(`⏱️  Average Response Time: ${Math.round(avgTime)}ms`);
  }

  // Final verdict
  console.log("\n" + "=".repeat(70));
  if (successful.length === results.length) {
    console.log("🎉 VERDICT: API IS FULLY WORKING!");
    console.log("✅ All 3 calls succeeded");
    console.log("✅ All 3 models are responding correctly");
    console.log("✅ API key is valid and active");
    console.log("✅ Ready for production use in Wasp Code extension");
  } else if (successful.length > 0) {
    console.log("⚠️  VERDICT: API IS PARTIALLY WORKING");
    console.log(`✅ ${successful.length} out of 3 calls succeeded`);
    console.log(`❌ ${failed.length} out of 3 calls failed`);
    console.log("⚠️  Some models may have issues");
  } else {
    console.log("❌ VERDICT: API IS NOT WORKING");
    console.log("❌ All calls failed");
    console.log("❌ Check API key and account status");
  }
  console.log("=".repeat(70));

  return results;
}

// Run the tests
runTests().catch(console.error);
