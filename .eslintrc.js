module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks',
  ],
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: ['.jsx', '.js'] },
    ],
    "import/prefer-default-export": "off",
    "react/prefer-stateless-function": "off",
    "react/state-in-constructor": "off",
    "react/no-unused-state": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-nested-ternary": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
