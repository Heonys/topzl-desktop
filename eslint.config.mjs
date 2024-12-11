import eslint from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import tailwindPlugin from "eslint-plugin-tailwindcss";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "*.config.js"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwindPlugin.configs["flat/recommended"],
  jsxA11y.flatConfigs.recommended,
  prettierPlugin,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactPlugin.configs["recommended"].rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "react-refresh/only-export-components": "warn",
      "prettier/prettier": "warn",
    },
  },
);
