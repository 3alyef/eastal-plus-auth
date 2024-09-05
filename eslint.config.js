import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    globals: globals.node, // Adiciona o ambiente Node.js
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: null, // Usa o parser padrão para JavaScript
      sourceType: "script",
    },
    globals: globals.browser, // Adiciona o ambiente do browser para arquivos JS
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  {
    ignores: ["./dist/*", "./node_modules/*"],
  },
];
