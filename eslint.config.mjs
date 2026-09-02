import tsparser from "@typescript-eslint/parser";
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "main.js",
      "esbuild.config.mjs",
      "jest.config.js",
      "dist/**",
      "coverage/**",
    ],
  },
  ...obsidianmd.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "obsidianmd/ui/sentence-case": [
        "warn",
        {
          brands: [
            "NoteFlare",
            "Obsidian",
            "Cloudflare",
            "GitHub",
            "Pages",
            "Workers",
            "Ko-fi",
            "GeekStash",
            "Git",
          ],
          acronyms: [
            "API",
            "CDN",
            "OS",
            "PDF",
            "PDFs",
            "URL",
            "URLs",
            "ID",
            "IDs",
            "SHA",
            "HTML",
            "CSS",
            "JSON",
            "YAML",
            "UI",
          ],
        },
      ],
      "obsidianmd/settings-tab/prefer-setting-definitions": "off",
    },
  },
  {
    files: ["tests/**/*.ts", "**/*.test.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/unbound-method": "off",
      "obsidianmd/ui/sentence-case": "off",
      "obsidianmd/hardcoded-config-path": "off",
    },
  },
];
