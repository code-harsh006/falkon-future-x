import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "convex/_generated/**",
    ],
  },
  {
    rules: {
      // Allow console for debugging (matching your coding style)
      "no-console": "off",
      
      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      
      // Next.js specific rules
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      
      // General rules matching your style
      "prefer-const": "warn",
      "no-var": "error",
      "prefer-arrow-callback": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      
      // Allow template literals and string concatenation
      "prefer-template": "off",
      
      // Allow multiple declarations on same line
      "one-var": "off",
      
      // Curly braces for control statements
      "curly": ["warn", "multi-line"],
      
      // Allow empty catch blocks for error handling
      "no-empty": ["error", { "allowEmptyCatch": true }],
      
      // Allow unused variables (useful for development)
      "no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
    },
  },
];

export default eslintConfig;
