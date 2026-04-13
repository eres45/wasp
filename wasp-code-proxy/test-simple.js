// Simple test without SSL issues
const http = require("http");
const https = require("https");

console.log(
  "Testing proxy at: https://wasp-code-proxy.waspproxy.workers.dev\n",
);

// Disable SSL verification for testing (Windows SSL issue workaround)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const postData = JSON.stringify({
  model: "provider-1/gemini-3-flash",
  messages: [{ role: "user", content: "Say OK" }],
  max_tokens: 10,
});

const options = {
  hostname: "wasp-code-proxy.waspproxy.workers.dev",
  port: 443,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
  rejectUnauthorized: false, // Bypass SSL verification
};

console.log("Sending request...\n");

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  console.log("");

  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log("Response:");
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));

      if (json.choices && json.choices[0]) {
        console.log("\n✅ SUCCESS! Proxy is working!");
        console.log("AI Response:", json.choices[0].message.content);
      } else if (json.error) {
        console.log("\n❌ API Error:", json.error.message);
      }
    } catch (e) {
      console.log(data);
    }
  });
});

req.on("error", (e) => {
  console.error("❌ Request failed:", e.message);
});

req.write(postData);
req.end();
