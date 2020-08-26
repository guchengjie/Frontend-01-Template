module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  plugins: ['react'],
  extends: [
    'airbnb-base',
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      pragma: "create",  // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      flowVersion: "0.53" // Flow version
    },
  },
  rules: {
  },
};
