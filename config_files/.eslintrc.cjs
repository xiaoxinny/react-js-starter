const js = require('@eslint/js');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  extends: [
    js.configs.recommended, // <-- ESLint JS linting
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-refresh/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/query/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-refresh',
    'unicorn',
    'n',
    'prettier'
  ],
  rules: {
    // Unicorn rules
    'unicorn/better-regex': 'warn',
    'unicorn/explicit-length-check': 'warn',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-for-loop': 'warn',
    'unicorn/no-nested-ternary': 'warn',
    'unicorn/prefer-module': 'off',

    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // React Hooks strictness
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Prettier integration
    'prettier/prettier': 'error',

    // Node env
    'no-process-env': 'off',

    // Tanstack Query (use rules provided by the installed plugin)
    '@tanstack/query/exhaustive-deps': 'warn',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
    // For eslint-plugin-n, you could set:
    // node: { version: '>=18' }
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.log',
    'logs/',
    '.eslintcache',
    '*.pid',
    '*.pid.lock',
    'vite/',
    '*.tsbuildinfo',
    '.env',
    '.env.*',
    '.DS_Store'
  ]
};
