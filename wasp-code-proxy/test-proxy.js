/**
 * Test script for Wasp Code Proxy
 *
 * This tests your deployed Cloudflare Worker
 */

const https = require("https");

// Your deployed worker URL
const PROXY_URL = "https://wasp-code-proxy.waspproxy.workers.dev";

console.log("🧪 Testing Wasp Code Proxy...\n");

function testProxy(model, description) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      model: model,
      messages: [
        { role: "user", content: 'Say "Hello from Wasp Code!" if you work' },
      ],
      max_tokens: 20,
      temperature: 0.1,
    });

    const url = new URL(PROXY_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "X-User-ID": "test-user-123",
      },
    };

    console.log(`Testing ${description}...`);

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200 && response.choices) {
            console.log(`✅ ${description} - WORKING`);
            console.log(
              `   Response: ${response.choices[0].message.content}\n`,
            );
            resolve({ success: true, model, description });
          } else {
            console.log(`❌ ${description} - FAILED`);
            console.log(
              `   Error: ${response.error?.message || "Unknown error"}\n`,
            );
            resolve({
              success: false,
              model,
              description,
              error: response.error,
            });
          }
        } catch (e) {
          console.log(`❌ ${description} - ERROR`);
          console.log(`   ${e.message}\n`);
          resolve({ success: false, model, description, error: e.message });
        }
      });
    });

    req.on("error", (e) => {
      console.log(`❌ ${description} - CONNECTION ERROR`);
      console.log(`   ${e.message}\n`);
      resolve({ success: false, model, description, error: e.message });
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log("Testing 5 different models through proxy...\n");
  console.log("=".repeat(60) + "\n");

  const tests = [
    {
      model: "provider-1/mistral-large-3-675b-instruct-2512",
      desc: "Mistral Large 3 (675B)",
    },
    {
      model: "provider-1/qwen3-coder-480b-a35b-instruct",
      desc: "Qwen3 Coder (480B)",
    },
    { model: "provider-1/llama-3.1-405b-instruct", desc: "Llama 3.1 (405B)" },
    { model: "provider-1/gemini-3-pro", desc: "Gemini 3 Pro" },
    { model: "MiniMax-M2.5", desc: "MiniMax M2.5" },
  ];

  const results = [];
  for (const test of tests) {
    const result = await testProxy(test.model, test.desc);
    results.push(result);
    // Wait 1 second between tests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("=".repeat(60));
  console.log("\n📊 TEST SUMMARY:\n");

  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(`✅ Successful: ${successful}/${tests.length}`);
  console.log(`❌ Failed: ${failed}/${tests.length}\n`);

  if (successful === tests.length) {
    console.log("🎉 All tests passed! Your proxy is working perfectly!\n");
  } else if (successful > 0) {
    console.log("⚠️  Some tests failed. Check the errors above.\n");
  } else {
    console.log("❌ All tests failed. Check your proxy configuration.\n");
    console.log("Common issues:");
    console.log("1. Wrong PROXY_URL in this test file");
    console.log("2. FRENIX_API_KEY not set in Cloudflare Worker");
    console.log("3. Worker not deployed yet\n");
  }
}

// Check if PROXY_URL is set
if (PROXY_URL.includes("YOUR_USERNAME")) {
  console.log("❌ ERROR: Please update PROXY_URL in test-proxy.js\n");
  console.log("After deploying your worker, replace:");
  console.log("  https://wasp-code-proxy.YOUR_USERNAME.workers.dev");
  console.log("With your actual worker URL\n");
  process.exit(1);
}

runTests().catch(console.error);
