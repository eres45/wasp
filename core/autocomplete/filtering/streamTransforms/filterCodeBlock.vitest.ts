// eslint-disable-next-line max-lines-per-function
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import * as lineStream from "./lineStream";

describe("filterCodeBlock", () => {
  let mockFullStop: Mock;

  async function getLineGenerator(lines: any) {
    return (async function* () {
      for (const line of lines) {
        yield line;
      }
    })();
  }

  async function getFilteredLines(results: any) {
    const output = [];

    for await (const line of results) {
      output.push(line);
    }

    return output;
  }

  beforeEach(() => {
    mockFullStop = vi.fn();
  });

  it("should handle unfenced code", async () => {
    const linesGenerator = await getLineGenerator(["const x = 5;"]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;"]);
  });

  it("should handle unfenced code with a code block", async () => {
    const linesGenerator = await getLineGenerator([
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;", "```bash", "ls -al", "```"]);
  });

  it("should handle unfenced code with a complex code block", async () => {
    const linesGenerator = await getLineGenerator([
      "# Manual Testing Sandbox",
      "",
      "## Project Structure",
      "",
      "```",
      "manual-testing-sandbox/",
      "â”œâ”€â”€ readme.md                           # Project documentation",
      "â”œâ”€â”€ package.json                        # Node.js dependencies and scripts",
      "â”œâ”€â”€ tsconfig.json                       # TypeScript configuration",
      "â”œâ”€â”€ jest.config.js                      # Jest testing configuration",
      "â”œâ”€â”€ requirements.txt                    # Python dependencies",
      "â”œâ”€â”€ Dockerfile                          # Docker container configuration",
      "â”œâ”€â”€ data.json                           # Sample JSON data",
      "â”œâ”€â”€ example.ipynb                       # Jupyter notebook example",
      "â”‚",
      "â”œâ”€â”€ src/                                # Source code directory",
      "â”‚   â”œâ”€â”€ example.ts                      # TypeScript example",
      "â”‚   â”œâ”€â”€ JsonToMarkdownConverter.ts      # JSON to Markdown converter",
      "â”‚   â”œâ”€â”€ JsonToMarkdownConverter.test.ts # Tests for JSON converter",
      "â”‚   â”œâ”€â”€ MarkdownProcessor.ts            # Markdown processing utility",
      "â”‚   â””â”€â”€ MarkdownProcessor.test.ts       # Tests for Markdown processor",
      "â”‚",
      "â”œâ”€â”€ react-calculator/                   # React calculator application",
      "â”œâ”€â”€ calculator_test/                    # Java calculator implementation",
      "â”‚   â”œâ”€â”€ Calculator.java                 # Calculator class",
      "â”‚   â””â”€â”€ Main.java                       # Main application entry",
      "â”‚",
      "â”œâ”€â”€ nested-folder/                      # Nested project example",
      "â”‚   â”œâ”€â”€ helloNested.py                  # Python script",
      "â”‚   â”œâ”€â”€ package.json                    # Nested package configuration",
      "â”‚   â””â”€â”€ rules.md                        # Documentation",
      "â”‚",
      "â”œâ”€â”€ coverage/                           # Test coverage reports",
      "â”œâ”€â”€ logs/                               # Application logs",
      "â”‚",
      "â””â”€â”€ Test Files                          # Various language examples",
      "    â”œâ”€â”€ AdvancedPage.tsx                # React TypeScript component",
      "    â”œâ”€â”€ Calculator.java                 # Java calculator",
      "    â”œâ”€â”€ program.cs                      # C# program",
      "    â”œâ”€â”€ query.sql                       # SQL query example",
      "    â”œâ”€â”€ test.css                        # CSS styles",
      "    â”œâ”€â”€ test.html                       # HTML page",
      "    â”œâ”€â”€ test.js                         # JavaScript code",
      "    â”œâ”€â”€ test.kt                         # Kotlin example",
      "    â”œâ”€â”€ test.php                        # PHP script",
      "    â”œâ”€â”€ test.py                         # Python script",
      "    â”œâ”€â”€ test.rb                         # Ruby script",
      "    â”œâ”€â”€ test.rs                         # Rust code",
      "    â”œâ”€â”€ test.sh                         # Shell script",
      "    â””â”€â”€ test.ts                         # TypeScript code",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual([
      "# Manual Testing Sandbox",
      "",
      "## Project Structure",
      "",
      "```",
      "manual-testing-sandbox/",
      "â”œâ”€â”€ readme.md                           # Project documentation",
      "â”œâ”€â”€ package.json                        # Node.js dependencies and scripts",
      "â”œâ”€â”€ tsconfig.json                       # TypeScript configuration",
      "â”œâ”€â”€ jest.config.js                      # Jest testing configuration",
      "â”œâ”€â”€ requirements.txt                    # Python dependencies",
      "â”œâ”€â”€ Dockerfile                          # Docker container configuration",
      "â”œâ”€â”€ data.json                           # Sample JSON data",
      "â”œâ”€â”€ example.ipynb                       # Jupyter notebook example",
      "â”‚",
      "â”œâ”€â”€ src/                                # Source code directory",
      "â”‚   â”œâ”€â”€ example.ts                      # TypeScript example",
      "â”‚   â”œâ”€â”€ JsonToMarkdownConverter.ts      # JSON to Markdown converter",
      "â”‚   â”œâ”€â”€ JsonToMarkdownConverter.test.ts # Tests for JSON converter",
      "â”‚   â”œâ”€â”€ MarkdownProcessor.ts            # Markdown processing utility",
      "â”‚   â””â”€â”€ MarkdownProcessor.test.ts       # Tests for Markdown processor",
      "â”‚",
      "â”œâ”€â”€ react-calculator/                   # React calculator application",
      "â”œâ”€â”€ calculator_test/                    # Java calculator implementation",
      "â”‚   â”œâ”€â”€ Calculator.java                 # Calculator class",
      "â”‚   â””â”€â”€ Main.java                       # Main application entry",
      "â”‚",
      "â”œâ”€â”€ nested-folder/                      # Nested project example",
      "â”‚   â”œâ”€â”€ helloNested.py                  # Python script",
      "â”‚   â”œâ”€â”€ package.json                    # Nested package configuration",
      "â”‚   â””â”€â”€ rules.md                        # Documentation",
      "â”‚",
      "â”œâ”€â”€ coverage/                           # Test coverage reports",
      "â”œâ”€â”€ logs/                               # Application logs",
      "â”‚",
      "â””â”€â”€ Test Files                          # Various language examples",
      "    â”œâ”€â”€ AdvancedPage.tsx                # React TypeScript component",
      "    â”œâ”€â”€ Calculator.java                 # Java calculator",
      "    â”œâ”€â”€ program.cs                      # C# program",
      "    â”œâ”€â”€ query.sql                       # SQL query example",
      "    â”œâ”€â”€ test.css                        # CSS styles",
      "    â”œâ”€â”€ test.html                       # HTML page",
      "    â”œâ”€â”€ test.js                         # JavaScript code",
      "    â”œâ”€â”€ test.kt                         # Kotlin example",
      "    â”œâ”€â”€ test.php                        # PHP script",
      "    â”œâ”€â”€ test.py                         # Python script",
      "    â”œâ”€â”€ test.rb                         # Ruby script",
      "    â”œâ”€â”€ test.rs                         # Rust code",
      "    â”œâ”€â”€ test.sh                         # Shell script",
      "    â””â”€â”€ test.ts                         # TypeScript code",
      "```",
    ]);
  });

  it("should handle unfenced code with two code blocks", async () => {
    const linesGenerator = await getLineGenerator([
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "```bash",
      "ls -al",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual([
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "```bash",
      "ls -al",
      "```",
    ]);
  });

  it("should remove lines before the first valid line", async () => {
    const linesGenerator = await getLineGenerator(["```ts", "const x = 5;"]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;"]);
  });

  it("should remove outer blocks", async () => {
    const linesGenerator = await getLineGenerator([
      "```ts",
      "const x = 5;",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;"]);
  });

  it("should leave inner blocks intact", async () => {
    const linesGenerator = await getLineGenerator([
      "```md",
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;", "```bash", "ls -al", "```"]);
  });

  it("should ignore ticks inside of code blocks such as tests", async () => {
    const linesGenerator = await getLineGenerator([
      "```typescript",
      'it("should handle included inner ticks", async () => {',
      " const linesGenerator = await getLineGenerator([`",
      ' "```md"',
      ' "const x = 5;"',
      ' "```bash"',
      ' "echo ```test```"',
      ' "```"',
      ' "```"',
      "]);",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual([
      'it("should handle included inner ticks", async () => {',
      " const linesGenerator = await getLineGenerator([`",
      ' "```md"',
      ' "const x = 5;"',
      ' "```bash"',
      ' "echo ```test```"',
      ' "```"',
      ' "```"',
      "]);",
    ]);
  });

  it("should handle included inner ticks", async () => {
    const linesGenerator = await getLineGenerator([
      "```md",
      "const x = 5;",
      "```bash",
      "echo ```test```",
      "```",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual([
      "const x = 5;",
      "```bash",
      "echo ```test```",
      "```",
    ]);
  });

  it("should leave single inner blocks intact but not return trailing text", async () => {
    const linesGenerator = await getLineGenerator([
      "```md",
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "```",
      "trailing text",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;", "```bash", "ls -al", "```"]);
  });

  it("should leave double inner blocks intact but not return trailing text", async () => {
    const linesGenerator = await getLineGenerator([
      "```md",
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "const y = 10;",
      "```sh",
      "echo `hello world`",
      "```",
      "```",
      "trailing text",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual([
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "const y = 10;",
      "```sh",
      "echo `hello world`",
      "```",
    ]);
  });

  it("should leave inner blocks intact but not return trailing or leading text", async () => {
    const linesGenerator = await getLineGenerator([
      "[CODE]",
      "const x = 5;",
      "```bash",
      "ls -al",
      "```",
      "[/CODE]",
      "trailing text",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual(["const x = 5;", "```bash", "ls -al", "```"]);
  });

  // Markdown-aware tests
  it("should handle markdown files with nested code blocks and a filename is included", async () => {
    const linesGenerator = await getLineGenerator([
      "```markdown README.md",
      "# Project Structure",
      "",
      "```",
      "debug-test-folder/",
      "â”œâ”€â”€ AdvancedPage.tsx",
      "â”œâ”€â”€ Calculator.java",
      "â””â”€â”€ test.ts",
      "```",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator, "README.md");
    const filteredLines = await getFilteredLines(result);

    // Should include all content up to the final closing ```
    expect(filteredLines).toEqual([
      "# Project Structure",
      "",
      "```",
      "debug-test-folder/",
      "â”œâ”€â”€ AdvancedPage.tsx",
      "â”œâ”€â”€ Calculator.java",
      "â””â”€â”€ test.ts",
      "```",
    ]);
  });

  // Markdown-aware tests
  it("should handle markdown files with nested code blocks and a filename is excluded", async () => {
    const linesGenerator = await getLineGenerator([
      "```markdown README.md",
      "# Project Structure",
      "",
      "```",
      "debug-test-folder/",
      "â”œâ”€â”€ AdvancedPage.tsx",
      "â”œâ”€â”€ Calculator.java",
      "â””â”€â”€ test.ts",
      "```",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator);
    const filteredLines = await getFilteredLines(result);

    // Should include all content up to the final closing ```
    expect(filteredLines).toEqual([
      "# Project Structure",
      "",
      "```",
      "debug-test-folder/",
      "â”œâ”€â”€ AdvancedPage.tsx",
      "â”œâ”€â”€ Calculator.java",
      "â””â”€â”€ test.ts",
      "```",
    ]);
  });

  it("should handle non-markdown files normally with filepath parameter", async () => {
    const linesGenerator = await getLineGenerator([
      "```",
      "function test() {",
      "  return 'hello';",
      "}",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator, "test.js");
    const filteredLines = await getFilteredLines(result);

    expect(filteredLines).toEqual([
      "function test() {",
      "  return 'hello';",
      "}",
    ]);
  });

  it("should handle simple markdown code blocks", async () => {
    const linesGenerator = await getLineGenerator([
      "```",
      "Here's some code:",
      "```",
      "function example() {",
      "  console.log('test');",
      "}",
      "```",
    ]);

    const result = lineStream.filterCodeBlockLines(linesGenerator, "README.md");
    const filteredLines = await getFilteredLines(result);

    // Should remove the outer markdown wrapper, and return just the inner content.
    // The lack of an end tag should cause it to return all remaining lines.
    expect(filteredLines).toEqual([
      "Here's some code:",
      "```",
      "function example() {",
      "  console.log('test');",
      "}",
      "```",
    ]);
  });
});
