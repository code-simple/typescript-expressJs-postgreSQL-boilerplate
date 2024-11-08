// eslint.config.mjs
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import eslintPluginNode from "eslint-plugin-node";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    // Define the file patterns here
    files: ["**/*.ts", "**/*.js"],
    ignores: ["dist/**/*", "src/migrations/*"], // Ignore the dist directory

    // Set up parser and language options
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },

    // Set up TypeScript and Node plugins
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      node: eslintPluginNode,
    },

    // Define the rules
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "warn", // Warn on console logs; useful for debugging in a backend
      eqeqeq: "error", // Enforces strict equality (=== instead of ==)
      "no-var": "error", // Disallows var; prefer let/const
      "prefer-const": "error", // Enforces const if variables are never reassigned
      "no-empty": ["error", { allowEmptyCatch: true }], // Catches empty blocks but allows empty catch blocks
      curly: "error", // Requires curly braces for all control statements for readability
      "no-multi-spaces": "error", // Avoids multiple spaces
    },
  },
];
