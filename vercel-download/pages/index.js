import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Wasp Code - AI-Powered VS Code Extension</title>
        <meta
          name="description"
          content="Install Wasp Code with one command. 20 AI models, zero setup."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          max-width: 600px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          text-align: center;
        }

        .logo {
          font-size: 48px;
          margin-bottom: 20px;
        }

        h1 {
          color: #333;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #666;
          font-size: 16px;
          margin-bottom: 30px;
        }

        .features {
          text-align: left;
          background: #f5f5f5;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .feature {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          color: #555;
        }

        .feature:last-child {
          margin-bottom: 0;
        }

        .feature-icon {
          margin-right: 10px;
          font-size: 18px;
        }

        .install-section {
          background: #f0f0f0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .install-label {
          font-size: 12px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .install-command {
          background: #1e1e1e;
          color: #00ff00;
          padding: 15px;
          border-radius: 6px;
          font-family: "Courier New", monospace;
          font-size: 13px;
          word-break: break-all;
          margin-bottom: 10px;
          user-select: all;
        }

        .copy-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: background 0.3s;
        }

        .copy-btn:hover {
          background: #764ba2;
        }

        .download-btn {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          border: none;
          cursor: pointer;
          margin-bottom: 15px;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .manual-install {
          font-size: 13px;
          color: #999;
          margin-top: 15px;
        }

        .manual-install a {
          color: #667eea;
          text-decoration: none;
        }

        .manual-install a:hover {
          text-decoration: underline;
        }

        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #999;
        }

        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 15px;
          margin-bottom: 30px;
        }

        .stat {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
        }

        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #667eea;
        }

        .stat-label {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
        }
      `}</style>

      <div className="container">
        <div className="logo">🚀</div>
        <h1>Wasp Code</h1>
        <p className="subtitle">AI-powered VS Code extension with 20 models</p>

        <div className="stats">
          <div className="stat">
            <div className="stat-number">20</div>
            <div className="stat-label">AI Models</div>
          </div>
          <div className="stat">
            <div className="stat-number">0</div>
            <div className="stat-label">Setup Required</div>
          </div>
          <div className="stat">
            <div className="stat-number">30s</div>
            <div className="stat-label">Install Time</div>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">✅</span>
            <span>20 AI models from top providers</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Zero setup - no API keys needed</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💬</span>
            <span>Sidebar chat like GitHub Copilot</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <span>Rate limited (10 req/minute)</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🌍</span>
            <span>Cloudflare powered globally</span>
          </div>
        </div>

        <div className="install-section">
          <div className="install-label">One-Command Install</div>
          <div className="install-command">
            irm https://wasp-code.vercel.app/install.ps1 | iex
          </div>
          <button
            className="copy-btn"
            onClick={() => {
              navigator.clipboard.writeText(
                "irm https://wasp-code.vercel.app/install.ps1 | iex",
              );
              alert("Copied to clipboard!");
            }}
          >
            Copy Command
          </button>
        </div>

        <button
          className="download-btn"
          onClick={() => {
            window.location.href =
              "https://github.com/eres45/wasp/releases/download/v1.0.0/wasp-code-1.0.0.vsix";
          }}
        >
          Download Extension (.vsix)
        </button>

        <div className="manual-install">
          Or <a href="#manual">install manually</a> by downloading the .vsix
          file
        </div>

        <div className="footer">
          <p>Made with ❤️ for developers</p>
          <p>
            <a
              href="https://github.com/eres45/wasp"
              style={{ color: "#667eea" }}
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
