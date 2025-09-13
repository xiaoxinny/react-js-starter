import { defineConfig, globalIgnores } from 'eslint/config'

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

import unicorn from 'eslint-plugin-unicorn'
import nPlugin from 'eslint-plugin-n'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  // Global ignores
  globalIgnores(['node_modules', 'dist', 'build', 'coverage']),

  // Core: React + TS/JS
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      unicorn,
    },
    rules: {
      // React 17+ doesn’t need React in scope
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Hooks strictness
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Unicorn conventions
      // 'unicorn/filename-case': ['error', { case: 'kebabCase' }],

      // Prettier integration
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Node-specific scripts
  {
    files: [
      'server/**/*.{js,ts}',
      'scripts/**/*.{js,ts}',
      'bin/**/*.{js,ts}',
      '**/*.{cjs,cts}',
    ],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: globals.node,
    },
    plugins: {
      n: nPlugin,
      unicorn,
    },
    rules: {
      ...nPlugin.configs.recommended.rules,
      'n/no-missing-require': 'error',
      'n/no-process-exit': 'warn',
      'n/no-unpublished-bin': 'error',
      'unicorn/prefer-module': 'off',
    },
  },
])
