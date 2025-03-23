/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true, // Ensure this points to your tsconfig.json if needed
  },
  plugins: [
    "tailwindcss", // Add Tailwind CSS plugin
    "autoprefixer", // Add Autoprefixer plugin if you have an ESLint plugin for it
  ],
  rules: {
    // Add any specific rules you want to enforce
  },
  settings: {
    tailwindcss: {
      // Tailwind CSS specific settings if needed
    },
  },
};