import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/client/api/**/*",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prefer-const": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/first": "error",
      "no-console": "warn",
    },
  },
  {
    files: [
      "tailwind.config.*",
      "postcss.config.*",
      "eslint.config.*",
      "src/client/**/*",
    ],
    rules: {
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",
    },
  },
];

export default eslintConfig;
