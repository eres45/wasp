// Test MiniMax API Keys from updated config file
const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Read the config file
const configPath = path.join(os.homedir(), ".continue", "config.json");

let config;
try {
  const configData = fs.readFileSync(configPath, "utf8");
  config = JSON.parse(configData);
} catch (error) {
  console.error("❌ Failed to read config file:", error.message);
  process.exit(1);
}

async function testModel(modelConfig) {
  return new Promise((resolve) => {
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
            model: modelConfig.title,
            modelName: modelConfig.model,
            apiKey: modelConfig.apiKey.substring(0, 20) + "...",
            status: res.statusCode,
            success: res.statusCode === 200,
            response: response,
            error: res.statusCode !== 200 ? responseData : null,
          });
        } catch (error) {
          resolve({
            model: modelConfig.title,
            modelName: modelConfig.model,
            apiKey: modelConfig.apiKey.substring(0, 20) + "...",
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
        model: modelConfig.title,
        modelName: modelConfig.model,
        apiKey: modelConfig.apiKey.substring(0, 20) + "...",
        status: "ERROR",
        success: false,
        response: null,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        model: modelConfig.title,
        modelName: modelConfig.model,
        apiKey: modelConfig.apiKey.substring(0, 20) + "...",
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
