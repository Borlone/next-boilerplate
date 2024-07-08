import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    extends: 'eslint:recommended',
    rules: {
      "react/react-in-jsx-scope": "off",

      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    }
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];