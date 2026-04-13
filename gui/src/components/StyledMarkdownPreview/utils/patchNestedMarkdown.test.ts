import { patchNestedMarkdown } from "./patchNestedMarkdown";

describe("patchNestedMarkdown", () => {
  it("should return unchanged content when no markdown codeblocks are present", () => {
    const source = 'Regular text\n```javascript\nconsole.log("hello");\n```';
    expect(patchNestedMarkdown(source)).toBe(source);
  });

  it("should handle nested blocks without a type", () => {
    const source =
      "```markdown README.md\n# Project Structure\n\n```\n.\nâ”œâ”€â”€ AdvancedPage.tsx\nâ”œâ”€â”€ Calculator.java\nâ”œâ”€â”€ Dockerfile\nâ”œâ”€â”€ calculator_test/\nâ”‚   â”œâ”€â”€ Calculator.java\nâ”‚   â””â”€â”€ Main.java\nâ”œâ”€â”€ data.json\nâ”œâ”€â”€ example.ipynb\nâ”œâ”€â”€ logs/\nâ”œâ”€â”€ nested-folder/\nâ”‚   â”œâ”€â”€ helloNested.py\nâ”‚   â”œâ”€â”€ package.json\nâ”‚   â””â”€â”€ rules.md\nâ”œâ”€â”€ program.cs\nâ”œâ”€â”€ query.sql\nâ”œâ”€â”€ react-calculator/\nâ”œâ”€â”€ readme.md\nâ”œâ”€â”€ requirements.txt\nâ”œâ”€â”€ test.css\nâ”œâ”€â”€ test.html\nâ”œâ”€â”€ test.js\nâ”œâ”€â”€ test.kt\nâ”œâ”€â”€ test.php\nâ”œâ”€â”€ test.py\nâ”œâ”€â”€ test.rb\nâ”œâ”€â”€ test.rs\nâ”œâ”€â”€ test.sh\nâ””â”€â”€ test.ts\n```\n```";
    const expected =
      "~~~markdown README.md\n# Project Structure\n\n```\n.\nâ”œâ”€â”€ AdvancedPage.tsx\nâ”œâ”€â”€ Calculator.java\nâ”œâ”€â”€ Dockerfile\nâ”œâ”€â”€ calculator_test/\nâ”‚   â”œâ”€â”€ Calculator.java\nâ”‚   â””â”€â”€ Main.java\nâ”œâ”€â”€ data.json\nâ”œâ”€â”€ example.ipynb\nâ”œâ”€â”€ logs/\nâ”œâ”€â”€ nested-folder/\nâ”‚   â”œâ”€â”€ helloNested.py\nâ”‚   â”œâ”€â”€ package.json\nâ”‚   â””â”€â”€ rules.md\nâ”œâ”€â”€ program.cs\nâ”œâ”€â”€ query.sql\nâ”œâ”€â”€ react-calculator/\nâ”œâ”€â”€ readme.md\nâ”œâ”€â”€ requirements.txt\nâ”œâ”€â”€ test.css\nâ”œâ”€â”€ test.html\nâ”œâ”€â”€ test.js\nâ”œâ”€â”€ test.kt\nâ”œâ”€â”€ test.php\nâ”œâ”€â”€ test.py\nâ”œâ”€â”€ test.rb\nâ”œâ”€â”€ test.rs\nâ”œâ”€â”€ test.sh\nâ””â”€â”€ test.ts\n```\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should replace backticks with tildes for markdown codeblocks", () => {
    const source = "```markdown\n# Header\nSome text\n```";
    const expected = "~~~markdown\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle nested codeblocks within markdown blocks", () => {
    const source =
      '```markdown\n# Example\n```js\nconsole.log("nested");\n```\n```';
    const expected =
      '~~~markdown\n# Example\n```js\nconsole.log("nested");\n```\n~~~';
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle .md file extension", () => {
    const source = "```test.md\nContent\n```";
    const expected = "~~~test.md\nContent\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle multiple levels of nesting", () => {
    const source =
      '```markdown\n# Doc\n```js\nlet x = "```nested```";\n```\n```';
    const expected =
      '~~~markdown\n# Doc\n```js\nlet x = "```nested```";\n```\n~~~';
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle blocks that start with md", () => {
    const source = "```md\n# Header\nSome text\n```";
    const expected = "~~~md\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle blocks with language specifier followed by md", () => {
    const source = "```lang md\n# Header\nSome text\n```";
    const expected = "~~~lang md\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle blocks with language specifier followed by markdown", () => {
    const source = "```lang markdown\n# Header\nSome text\n```";
    const expected = "~~~lang markdown\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should not replace backticks for non-markdown file extensions", () => {
    const source = "```test.js\nContent\n```";
    expect(patchNestedMarkdown(source)).toBe(source);
  });

  it("should check the file extension branch when extension is not md/markdown/gfm", () => {
    // This tests the extension check branch with an unrecognized extension
    const source = "```test.txt\nContent with md keyword\n```";
    expect(patchNestedMarkdown(source)).toBe(source);
  });

  it("should handle empty file name in code block header", () => {
    // This covers the branch where file is empty or undefined
    const source = "``` \nSome content\n```";
    expect(patchNestedMarkdown(source)).toBe(source);
  });

  it("should handle file names with no extension", () => {
    // This covers the branch where ext might be undefined
    const source = "```filename\nContent\n```";
    expect(patchNestedMarkdown(source)).toBe(source);
  });

  it("should correctly identify .markdown extension", () => {
    // This specifically tests the ext === "markdown" condition in the extension check
    const source = "```example.markdown\n# Some markdown content\n```";
    const expected = "~~~example.markdown\n# Some markdown content\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  // GitHub-specific tests
  it("should handle gfm language identifier", () => {
    const source = "```gfm\n# Header\nSome text\n```";
    const expected = "~~~gfm\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle github-markdown language identifier", () => {
    const source = "```github-markdown\n# Header\nSome text\n```";
    const expected = "~~~github-markdown\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle language specifier followed by gfm", () => {
    const source = "```lang gfm\n# Header\nSome text\n```";
    const expected = "~~~lang gfm\n# Header\nSome text\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });

  it("should handle .gfm file extension", () => {
    const source = "```example.gfm\n# Some GitHub markdown content\n```";
    const expected = "~~~example.gfm\n# Some GitHub markdown content\n~~~";
    expect(patchNestedMarkdown(source)).toBe(expected);
  });
});
