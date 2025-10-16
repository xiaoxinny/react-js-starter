import { defineConfig, globalIgnores } from 'eslint/config';

import tsEslintParser from '@typescript-eslint/parser';

import js from '@eslint/js';
import globals from 'globals';

import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import queryPlugin from '@tanstack/eslint-plugin-query';

export default defineConfig([
  globalIgnores([
    'node_modules/', // default also ignores this, but explicit is fine
    'dist/',
    'build/',
    'coverage/',
    '*.log', // any log files
    'logs/',
    '.eslintcache',
    '*.pid',
    '*.pid.lock',
    'vite/', // if this is a build output
    '*.tsbuildinfo', // ts build cache
    '.env', // environment files
    '.env.*', // also .env.local, etc
    '.DS_Store'
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsEslintParser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      unicorn: unicorn,
      n: nPlugin,
      prettier: prettierPlugin,
      'typescript-eslint': tseslint,
      'tanstack-query': queryPlugin
    },

    rules: {
      // Unicorn rules
      'unicorn/better-regex': 'warn',
      'unicorn/explicit-length-check': 'warn',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-for-loop': 'warn',
      'unicorn/no-nested-ternary': 'warn',
      'unicorn/prefer-module': 'off', // turned off because of ESM / CJS interop

      // React rules
      'react/react-in-jsx-scope': 'off', // React 17+ doesn’t require React in scope
      'react/jsx-uses-react': 'off', // same

      // React Hooks strict rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier integration
      'prettier/prettier': 'error',

      // Node / n-plugin
      // n/no-unsupported-features/node: depending on your Node version settings
      // You might want to set a setting for Node version via package.json engines or via settings.node.version
      // Example:
      // 'n/no-unsupported-features/node': ['error', { version: '>=18' }],

      // Misc / other
      'no-process-env': 'off',

      // Tanstack Query
      '@tanstack/eslint-plugin-query/exhaustive-deps': 'warn',
      '@tanstack/eslint-plugin-query/missing-key': 'error',
      '@tanstack/eslint-plugin-query/no-unnecessary-query-keys': 'error',

      // Add any other custom rules here
    },

    settings: {
      react: {
        version: 'detect'
      }
      // For eslint-plugin-n, set node version if needed
      // e.g. settings: { node: { version: '>=18' } }
    }
  }
]);
