import security from "eslint-plugin-security";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "plugin:security/recommended"), {
    plugins: {
        security,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "security/detect-eval-with-expression": "error",
        "security/detect-noeval": "error",
    },
}];