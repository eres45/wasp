/**
 * Script to update extension config with proxy URL
 *
 * This will update all 20 models in the default config to use your proxy
 * instead of requiring users to provide API keys.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("🔧 Wasp Code - Update Extension Config\n");
  console.log(
    "This will update your extension to use the Cloudflare Worker proxy.\n",
  );

  // Get proxy URL from user
  const proxyUrl = await question("Enter your Cloudflare Worker URL: ");

  if (!proxyUrl || !proxyUrl.includes("workers.dev")) {
    console.log("\n❌ Invalid URL. Should look like:");
    console.log("   https://wasp-code-proxy.YOUR_USERNAME.workers.dev\n");
    rl.close();
    return;
  }

  console.log("\n✅ Proxy URL:", proxyUrl);
  console.log("\nUpdating extension config...\n");

  // Path to default config
  const configPath = path.join(__dirname, "..", "core", "config", "default.ts");

  if (!fs.existsSync(configPath)) {
    console.log("❌ Config file not found at:", configPath);
    console.log("   Make sure you run this from the wasp-code-proxy folder\n");
    rl.close();
    return;
  }

  // Read current config
  let config = fs.readFileSync(configPath, "utf8");

  // Replace all instances of Frenix API base URL with proxy URL
  const oldApiBase = "https://api.frenix.sh/v1";
  const newApiBase = proxyUrl;

  // Count replacements
  const count = (config.match(new RegExp(oldApiBase, "g")) || []).length;

  if (count === 0) {
    console.log("⚠️  No Frenix API URLs found in config.");
    console.log("   Config may already be updated or using different URLs.\n");
    rl.close();
    return;
  }

  // Replace API base URLs
  config = config.replace(new RegExp(oldApiBase, "g"), newApiBase);

  // Remove apiKey lines (they're not needed with proxy)
  config = config.replace(/\s*apiKey: "YOUR_FRENIX_API_KEY_HERE",?\n/g, "");
  config = config.replace(/\s*apiKey: ".*?",?\n/g, "");

  // Write updated config
  fs.writeFileSync(configPath, config, "utf8");

  console.log(`✅ Updated ${count} model configurations`);
  console.log("✅ Removed apiKey fields (not needed with proxy)");
  console.log("✅ Config file updated successfully!\n");

  console.log("📝 Changes made:");
  console.log(`   - API Base: ${oldApiBase}`);
  console.log(`   → Changed to: ${newApiBase}`);
  console.log("   - Removed all apiKey fields\n");

  console.log("🎯 Next steps:");
  console.log("   1. Review the changes in: core/config/default.ts");
  console.log(
    "   2. Rebuild extension: cd ../extensions/vscode && npm run package",
  );
  console.log(
    "   3. Test extension: code --install-extension wasp-code-*.vsix",
  );
  console.log("   4. Publish: vsce publish\n");

  console.log("🎉 Done! Your extension now uses the proxy!\n");

  rl.close();
}

main().catch(console.error);
