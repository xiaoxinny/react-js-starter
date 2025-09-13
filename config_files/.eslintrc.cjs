module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable linting for JSX
    },
    project: './tsconfig.json',
  },
  env: {
    browser: true, // Vite + React runs in the browser
    node: true,    // Vite dev server also uses Node
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'unicorn',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  rules: {
    // Unicorn rules
    'unicorn/better-regex': 'warn',
    'unicorn/explicit-length-check': 'warn',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-for-loop': 'warn',
    'unicorn/no-nested-ternary': 'warn',
    'unicorn/prefer-module': 'off', // keep off since Vite uses ESM + CJS interop sometimes

    // React rules (override defaults if desired)
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    'react/prop-types': 'off', // Not needed with TypeScript

    // Unicorn conventions
    // 'unicorn/filename-case': ['error', { case: 'kebabCase' }],

    // Prettier
    'prettier/prettier': 'error',

    // Node env
    'no-process-env': 'off',
  },
  ignorePatterns: [
    'node_modules/',      // default also ignores this, but explicit is fine
    'dist/',
    'build/',
    'coverage/',
    '*.log',              // any log files
    'logs/',
    '.eslintcache',
    '*.pid',
    '*.pid.lock',
    'vite/',              // if this is a build output
    '*.tsbuildinfo',      // ts build cache
    '.env',               // environment files
    '.env.*',             // also .env.local, etc
    '.DS_Store',
  ],
};
