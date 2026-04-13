/**
 * Live API test for Anthropic prompt caching.
 *
 * Validates that the systemAndTools caching strategy produces real cache hits
 * when making sequential requests with the same prefix to the Anthropic API.
 *
 * Guarded by ANTHROPIC_API_KEY env var â€” skipped if not set.
 * Uses claude-haiku-4-5-20251001 to minimize cost.
 *
 * IMPORTANT: Haiku 4.5 requires a minimum of 4096 tokens for caching.
 * The system message + tools in this test are sized to exceed that threshold.
 *
 * Run: ANTHROPIC_API_KEY=sk-ant-... npx vitest packages/openai-adapters/src/test/anthropic-caching.live.test.ts
 */
import { describe, expect, test } from "vitest";

import { constructLlmApi } from "../index.js";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-haiku-4-5-20251001";

// Realistic tool definitions mimicking CLI's builtin tools
const REALISTIC_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "read_file",
      description:
        "Read the contents of a file at the given path. Use this when you need to examine existing files in the project. The output includes line numbers prefixed to each line (e.g., '1 | const x = 1'). When reading large files, you may want to specify a line range using the start_line and end_line parameters.",
      parameters: {
        type: "object" as const,
        required: ["path"],
        properties: {
          path: {
            type: "string",
            description:
              "The path of the file to read, relative to the workspace root",
          },
          start_line: {
            type: "number",
            description:
              "The starting line number to read from (1-indexed, inclusive)",
          },
          end_line: {
            type: "number",
            description:
              "The ending line number to read to (1-indexed, inclusive)",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "write_file",
      description:
        "Write content to a file at the given path. If the file exists, it will be overwritten. If it doesn't exist, a new file will be created. Always provide the complete intended content of the file. Avoid writing partial content that requires manual additions.",
      parameters: {
        type: "object" as const,
        required: ["path", "content"],
        properties: {
          path: {
            type: "string",
            description:
              "The path of the file to write to, relative to the workspace root",
          },
          content: {
            type: "string",
            description: "The full content to write to the file",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "list_files",
      description:
        "List files and directories at the given path. If the path is a directory, lists all files and subdirectories within it. If no path is provided, lists files in the current working directory. Results include file type indicators.",
      parameters: {
        type: "object" as const,
        required: [],
        properties: {
          path: {
            type: "string",
            description:
              "The path to list files from, relative to the workspace root",
          },
          recursive: {
            type: "boolean",
            description: "Whether to list files recursively in subdirectories",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "run_terminal_command",
      description:
        "Run a terminal command in the workspace directory. Use this for executing build commands, running tests, installing packages, or any other command-line operations. The command runs in a shell environment with access to standard tools.",
      parameters: {
        type: "object" as const,
        required: ["command"],
        properties: {
          command: {
            type: "string",
            description: "The terminal command to execute",
          },
          workingDir: {
            type: "string",
            description: "The working directory for the command",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "fetch_url",
      description:
        "Fetch the content of a URL. Use this to retrieve documentation, API responses, or any web content that might be needed for the task at hand.",
      parameters: {
        type: "object" as const,
        required: ["url"],
        properties: {
          url: {
            type: "string",
            description: "The URL to fetch content from",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "write_checklist",
      description:
        "Write or update a checklist for tracking progress on complex tasks. Checklists help organize multi-step work and provide visibility into what has been completed.",
      parameters: {
        type: "object" as const,
        required: ["items"],
        properties: {
          items: {
            type: "array",
            description: "Array of checklist items with status",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                checked: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "check_background_job",
      description:
        "Check the status of a background job that was previously started. Returns the current output and status of the job.",
      parameters: {
        type: "object" as const,
        required: ["jobId"],
        properties: {
          jobId: {
            type: "string",
            description: "The ID of the background job to check",
          },
        },
      },
    },
  },
];

// System message sized to exceed Haiku 4.5's 4096-token caching minimum.
// The system message + tools together must be > 4096 tokens.
// This realistic message mimics the CLI's baseSystemMessage with extensive
// directory listings and detailed instructions.
const REALISTIC_SYSTEM_MESSAGE = `You are an AI coding assistant integrated into a developer's IDE. You help with software engineering tasks including writing code, debugging, explaining code, and more.

# Environment

- Operating System: macOS 14.0
- Shell: zsh
- IDE: VS Code 1.95.0
- Working Directory: /Users/developer/projects/my-app
- Git Branch: main
- Node.js: v20.11.0
- npm: 10.2.4
- TypeScript: 5.3.3
- Python: 3.12.0
- Docker: 24.0.6
- PostgreSQL: 16.1
- Redis: 7.2.3

# Directory Listing

The following is the full directory structure of the workspace:

\`\`\`
my-app/
â”œâ”€â”€ .github/
â”‚   â”œâ”€â”€ workflows/
â”‚   â”‚   â”œâ”€â”€ ci.yml
â”‚   â”‚   â”œâ”€â”€ deploy.yml
â”‚   â”‚   â”œâ”€â”€ release.yml
â”‚   â”‚   â”œâ”€â”€ codeql-analysis.yml
â”‚   â”‚   â””â”€â”€ dependency-review.yml
â”‚   â”œâ”€â”€ CODEOWNERS
â”‚   â”œâ”€â”€ pull_request_template.md
â”‚   â”œâ”€â”€ ISSUE_TEMPLATE/
â”‚   â”‚   â”œâ”€â”€ bug_report.md
â”‚   â”‚   â”œâ”€â”€ feature_request.md
â”‚   â”‚   â””â”€â”€ config.yml
â”‚   â””â”€â”€ dependabot.yml
â”œâ”€â”€ .vscode/
â”‚   â”œâ”€â”€ settings.json
â”‚   â”œâ”€â”€ extensions.json
â”‚   â”œâ”€â”€ launch.json
â”‚   â””â”€â”€ tasks.json
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”œâ”€â”€ authentication.md
â”‚   â”‚   â”œâ”€â”€ endpoints.md
â”‚   â”‚   â”œâ”€â”€ rate-limiting.md
â”‚   â”‚   â”œâ”€â”€ websockets.md
â”‚   â”‚   â”œâ”€â”€ pagination.md
â”‚   â”‚   â””â”€â”€ error-codes.md
â”‚   â”œâ”€â”€ architecture/
â”‚   â”‚   â”œâ”€â”€ overview.md
â”‚   â”‚   â”œâ”€â”€ database-schema.md
â”‚   â”‚   â”œâ”€â”€ deployment.md
â”‚   â”‚   â”œâ”€â”€ caching-strategy.md
â”‚   â”‚   â”œâ”€â”€ event-sourcing.md
â”‚   â”‚   â””â”€â”€ microservices.md
â”‚   â”œâ”€â”€ guides/
â”‚   â”‚   â”œâ”€â”€ getting-started.md
â”‚   â”‚   â”œâ”€â”€ contributing.md
â”‚   â”‚   â”œâ”€â”€ code-review.md
â”‚   â”‚   â”œâ”€â”€ testing.md
â”‚   â”‚   â””â”€â”€ debugging.md
â”‚   â””â”€â”€ adr/
â”‚       â”œâ”€â”€ 001-use-typescript.md
â”‚       â”œâ”€â”€ 002-monorepo-structure.md
â”‚       â”œâ”€â”€ 003-database-choice.md
â”‚       â”œâ”€â”€ 004-auth-strategy.md
â”‚       â””â”€â”€ 005-api-versioning.md
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ core/
â”‚   â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ jwt.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ oauth.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ middleware.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ rbac.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ session.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ types.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ database/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ connection.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ migrations/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ 001_create_users.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ 002_create_projects.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ 003_create_teams.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ 004_create_notifications.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ 005_create_audit_log.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ models/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ User.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Project.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Team.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ TeamMember.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Notification.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ AuditLog.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ seeds/
â”‚   â”‚   â”‚   â”‚       â”œâ”€â”€ development.ts
â”‚   â”‚   â”‚   â”‚       â””â”€â”€ test.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ user.service.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ project.service.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ team.service.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ notification.service.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ analytics.service.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ email.service.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ cache.service.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ search.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ events/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ emitter.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ handlers/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ user.handler.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ project.handler.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ notification.handler.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ types.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ queue/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ workers/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ email.worker.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ analytics.worker.ts
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ cleanup.worker.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ types.ts
â”‚   â”‚   â”‚   â””â”€â”€ utils/
â”‚   â”‚   â”‚       â”œâ”€â”€ logger.ts
â”‚   â”‚   â”‚       â”œâ”€â”€ errors.ts
â”‚   â”‚   â”‚       â”œâ”€â”€ validation.ts
â”‚   â”‚   â”‚       â”œâ”€â”€ crypto.ts
â”‚   â”‚   â”‚       â”œâ”€â”€ date.ts
â”‚   â”‚   â”‚       â””â”€â”€ retry.ts
â”‚   â”‚   â”œâ”€â”€ tests/
â”‚   â”‚   â”‚   â”œâ”€â”€ auth.test.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ services.test.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ events.test.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ queue.test.ts
â”‚   â”‚   â”‚   â””â”€â”€ utils.test.ts
â”‚   â”‚   â”œâ”€â”€ package.json
â”‚   â”‚   â””â”€â”€ tsconfig.json
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ users.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ projects.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ teams.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ webhooks.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ health.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ search.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ admin.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ middleware/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ auth.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ rateLimit.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ cors.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ requestId.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ logging.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ validation.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ websocket/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ handlers.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ types.ts
â”‚   â”‚   â”‚   â””â”€â”€ index.ts
â”‚   â”‚   â”œâ”€â”€ tests/
â”‚   â”‚   â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ users.test.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ projects.test.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ teams.test.ts
â”‚   â”‚   â”‚   â””â”€â”€ middleware/
â”‚   â”‚   â”‚       â”œâ”€â”€ auth.test.ts
â”‚   â”‚   â”‚       â””â”€â”€ rateLimit.test.ts
â”‚   â”‚   â”œâ”€â”€ package.json
â”‚   â”‚   â””â”€â”€ tsconfig.json
â”‚   â”œâ”€â”€ web/
â”‚   â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ common/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Button.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Input.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Modal.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Table.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Toast.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ Loading.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ layout/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Header.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Footer.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Sidebar.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ Layout.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ dashboard/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Dashboard.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ ProjectCard.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ ActivityFeed.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ Stats.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ settings/
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ Settings.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ ProfileForm.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ SecuritySettings.tsx
â”‚   â”‚   â”‚   â”‚   â”‚   â””â”€â”€ NotificationPrefs.tsx
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ team/
â”‚   â”‚   â”‚   â”‚       â”œâ”€â”€ TeamList.tsx
â”‚   â”‚   â”‚   â”‚       â”œâ”€â”€ TeamDetail.tsx
â”‚   â”‚   â”‚   â”‚       â”œâ”€â”€ MemberList.tsx
â”‚   â”‚   â”‚   â”‚       â””â”€â”€ InviteForm.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ useAuth.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ useApi.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ useTheme.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ useWebSocket.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ useDebounce.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ usePagination.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ login.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ register.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ dashboard.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ settings.tsx
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ project/[id].tsx
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ team/[id].tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ store/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ index.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ authSlice.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ projectSlice.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ uiSlice.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ styles/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ globals.css
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ theme.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ animations.css
â”‚   â”‚   â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ api.ts
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ auth.ts
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ utils.ts
â”‚   â”‚   â”‚   â””â”€â”€ App.tsx
â”‚   â”‚   â”œâ”€â”€ public/
â”‚   â”‚   â”‚   â”œâ”€â”€ favicon.ico
â”‚   â”‚   â”‚   â””â”€â”€ manifest.json
â”‚   â”‚   â”œâ”€â”€ tests/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â””â”€â”€ pages/
â”‚   â”‚   â”œâ”€â”€ package.json
â”‚   â”‚   â””â”€â”€ tsconfig.json
â”‚   â””â”€â”€ shared/
â”‚       â”œâ”€â”€ src/
â”‚       â”‚   â”œâ”€â”€ types/
â”‚       â”‚   â”‚   â”œâ”€â”€ user.ts
â”‚       â”‚   â”‚   â”œâ”€â”€ project.ts
â”‚       â”‚   â”‚   â”œâ”€â”€ team.ts
â”‚       â”‚   â”‚   â”œâ”€â”€ api.ts
â”‚       â”‚   â”‚   â””â”€â”€ index.ts
â”‚       â”‚   â”œâ”€â”€ constants/
â”‚       â”‚   â”‚   â”œâ”€â”€ permissions.ts
â”‚       â”‚   â”‚   â”œâ”€â”€ errors.ts
â”‚       â”‚   â”‚   â””â”€â”€ config.ts
â”‚       â”‚   â””â”€â”€ validators/
â”‚       â”‚       â”œâ”€â”€ user.ts
â”‚       â”‚       â”œâ”€â”€ project.ts
â”‚       â”‚       â””â”€â”€ team.ts
â”‚       â”œâ”€â”€ package.json
â”‚       â””â”€â”€ tsconfig.json
â”œâ”€â”€ infrastructure/
â”‚   â”œâ”€â”€ terraform/
â”‚   â”‚   â”œâ”€â”€ main.tf
â”‚   â”‚   â”œâ”€â”€ variables.tf
â”‚   â”‚   â”œâ”€â”€ outputs.tf
â”‚   â”‚   â””â”€â”€ modules/
â”‚   â”‚       â”œâ”€â”€ vpc/
â”‚   â”‚       â”œâ”€â”€ ecs/
â”‚   â”‚       â”œâ”€â”€ rds/
â”‚   â”‚       â””â”€â”€ redis/
â”‚   â”œâ”€â”€ docker/
â”‚   â”‚   â”œâ”€â”€ Dockerfile.api
â”‚   â”‚   â”œâ”€â”€ Dockerfile.web
â”‚   â”‚   â””â”€â”€ docker-compose.prod.yml
â”‚   â””â”€â”€ k8s/
â”‚       â”œâ”€â”€ deployment.yaml
â”‚       â”œâ”€â”€ service.yaml
â”‚       â”œâ”€â”€ ingress.yaml
â”‚       â””â”€â”€ configmap.yaml
â”œâ”€â”€ scripts/
â”‚   â”œâ”€â”€ deploy.sh
â”‚   â”œâ”€â”€ setup.sh
â”‚   â”œâ”€â”€ seed-db.ts
â”‚   â”œâ”€â”€ migrate.ts
â”‚   â”œâ”€â”€ generate-api-docs.ts
â”‚   â””â”€â”€ health-check.sh
â”œâ”€â”€ .env.example
â”œâ”€â”€ .eslintrc.js
â”œâ”€â”€ .gitignore
â”œâ”€â”€ .prettierrc
â”œâ”€â”€ docker-compose.yml
â”œâ”€â”€ docker-compose.test.yml
â”œâ”€â”€ Dockerfile
â”œâ”€â”€ Makefile
â”œâ”€â”€ package.json
â”œâ”€â”€ pnpm-workspace.yaml
â”œâ”€â”€ README.md
â”œâ”€â”€ CHANGELOG.md
â”œâ”€â”€ LICENSE
â””â”€â”€ tsconfig.base.json
\`\`\`

# Instructions

You are a helpful AI coding assistant. Follow these guidelines:

1. Always provide complete, working code solutions
2. Follow the project's existing coding style and conventions
3. Write clean, maintainable code with appropriate error handling
4. Use TypeScript types and interfaces where applicable
5. Consider edge cases and potential issues
6. Explain your reasoning when making architectural decisions
7. Prefer editing existing files over creating new ones
8. Run tests after making changes to ensure nothing is broken
9. Use the available tools to explore the codebase before making changes
10. Keep changes focused and minimal - don't over-engineer solutions

When using tools, prefer:
- read_file to understand existing code before modifying
- list_files to explore project structure
- run_terminal_command for builds, tests, and git operations
- write_file only when you need to create or fully rewrite a file

# Code Style

- Use 2-space indentation for TypeScript and JavaScript files
- Use single quotes for string literals
- Always use strict TypeScript with no implicit any
- Prefer const over let, never use var
- Use async/await instead of raw promises
- Use named exports instead of default exports
- Use descriptive variable and function names following camelCase
- Use PascalCase for types, interfaces, classes, and React components
- Add JSDoc comments for public API functions
- Use early returns to reduce nesting
- Prefer functional programming patterns where appropriate
- Use template literals instead of string concatenation
- Always handle errors explicitly - never swallow exceptions
- Use optional chaining and nullish coalescing operators
- Destructure objects and arrays when it improves readability

# Testing Guidelines

- Write unit tests for all business logic in services
- Write integration tests for API routes
- Use describe/it blocks with descriptive test names
- Follow the AAA pattern: Arrange, Act, Assert
- Mock external dependencies (database, APIs, file system)
- Aim for 80% code coverage minimum on new code
- Test error cases and edge cases, not just happy paths
- Use factories for test data generation
- Keep test files colocated with source files
- Run the full test suite before committing changes

Always think step by step and explain your approach before making changes.`;

/**
 * Helper to compute total input tokens from Anthropic's split usage fields.
 * When caching is active, `prompt_tokens` only counts uncached tokens.
 * Total = cache_read + cache_write + prompt_tokens (uncached).
 */
function totalInputTokens(usage: any): number {
  const details = usage.prompt_tokens_details;
  const cacheRead = details?.cache_read_tokens ?? 0;
  const cacheWrite = details?.cache_write_tokens ?? 0;
  return cacheRead + cacheWrite + usage.prompt_tokens;
}

describe.skipIf(!API_KEY)("Anthropic Prompt Caching - Live API", () => {
  const api = constructLlmApi({
    provider: "anthropic",
    apiKey: API_KEY!,
    // Default cachingStrategy is "systemAndTools"
  })!;

  const signal = new AbortController().signal;

  // Shared conversation state across sequential tests
  let turn1AssistantContent = "";
  let turn2AssistantContent = "";

  test("Turn 1: first request creates cache", { timeout: 30_000 }, async () => {
    const response = await api.chatCompletionNonStream(
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content: REALISTIC_SYSTEM_MESSAGE,
          },
          {
            role: "user",
            content:
              "What is the project structure of this workspace? Give a brief summary.",
          },
        ],
        tools: REALISTIC_TOOLS,
        max_tokens: 256,
      },
      signal,
    );

    expect(response.choices.length).toBeGreaterThan(0);
    turn1AssistantContent =
      response.choices[0].message.content ?? "I can see the project structure.";

    const usage = response.usage!;
    const details = usage.prompt_tokens_details as any;
    const total = totalInputTokens(usage);

    // First request should write to cache
    expect(details?.cache_write_tokens).toBeGreaterThan(0);
    // First request should have no cache reads
    expect(details?.cache_read_tokens ?? 0).toBe(0);

    console.log("Turn 1 usage:", {
      prompt_tokens: usage.prompt_tokens,
      cache_write_tokens: details?.cache_write_tokens,
      cache_read_tokens: details?.cache_read_tokens,
      total_input_tokens: total,
    });
  });

  test(
    "Turn 2: second request hits cache on shared prefix",
    { timeout: 30_000 },
    async () => {
      const response = await api.chatCompletionNonStream(
        {
          model: MODEL,
          messages: [
            {
              role: "system",
              content: REALISTIC_SYSTEM_MESSAGE,
            },
            {
              role: "user",
              content:
                "What is the project structure of this workspace? Give a brief summary.",
            },
            {
              role: "assistant",
              content: turn1AssistantContent,
            },
            {
              role: "user",
              content:
                "Now explain the authentication system in the core package.",
            },
          ],
          tools: REALISTIC_TOOLS,
          max_tokens: 256,
        },
        signal,
      );

      expect(response.choices.length).toBeGreaterThan(0);
      turn2AssistantContent =
        response.choices[0].message.content ?? "The auth system uses JWT.";

      const usage = response.usage!;
      const details = usage.prompt_tokens_details as any;
      const cacheReadTokens = details?.cache_read_tokens ?? 0;
      const total = totalInputTokens(usage);

      // Second request should read from cache
      expect(cacheReadTokens).toBeGreaterThan(0);

      console.log("Turn 2 usage:", {
        prompt_tokens: usage.prompt_tokens,
        cache_write_tokens: details?.cache_write_tokens,
        cache_read_tokens: cacheReadTokens,
        total_input_tokens: total,
        cache_hit_rate: total > 0 ? (cacheReadTokens / total).toFixed(3) : 0,
      });
    },
  );

  test(
    "Turn 3: cache hit rate stays high with growing conversation",
    { timeout: 30_000 },
    async () => {
      const response = await api.chatCompletionNonStream(
        {
          model: MODEL,
          messages: [
            {
              role: "system",
              content: REALISTIC_SYSTEM_MESSAGE,
            },
            {
              role: "user",
              content:
                "What is the project structure of this workspace? Give a brief summary.",
            },
            {
              role: "assistant",
              content: turn1AssistantContent,
            },
            {
              role: "user",
              content:
                "Now explain the authentication system in the core package.",
            },
            {
              role: "assistant",
              content: turn2AssistantContent,
            },
            {
              role: "user",
              content:
                "How would you add a new API route for managing team memberships? Walk me through the steps.",
            },
          ],
          tools: REALISTIC_TOOLS,
          max_tokens: 256,
        },
        signal,
      );

      expect(response.choices.length).toBeGreaterThan(0);

      const usage = response.usage!;
      const details = usage.prompt_tokens_details as any;
      const cacheReadTokens = details?.cache_read_tokens ?? 0;
      const total = totalInputTokens(usage);
      const hitRate = total > 0 ? cacheReadTokens / total : 0;

      // At least 30% of total input tokens should come from cache
      expect(hitRate).toBeGreaterThan(0.3);

      console.log("Turn 3 usage:", {
        prompt_tokens: usage.prompt_tokens,
        cache_write_tokens: details?.cache_write_tokens,
        cache_read_tokens: cacheReadTokens,
        total_input_tokens: total,
        cache_hit_rate: hitRate.toFixed(3),
      });
    },
  );
});
