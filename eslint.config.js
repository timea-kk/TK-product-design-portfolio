/**
 * eslint.config.js – ESLint 9 flat config.
 * Applies Vue recommended rules for .vue files and TypeScript rules for .ts files.
 * Prettier is handled separately (npm run format) so we disable any style rules that
 * would conflict with it via eslint-config-prettier.
 */

import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Ignore generated/installed directories
  { ignores: ['node_modules', 'dist'] },

  // Vue SFC rules
  ...pluginVue.configs['flat/recommended'],

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Tell ESLint to use the TS parser inside <script lang="ts"> blocks
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Project-specific rule overrides
  {
    rules: {
      // Single-word component names are fine for a portfolio (e.g. <Logo>, <Header>)
      'vue/multi-word-component-names': 'off',
      // Allow any when genuinely needed (store type casts)
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Disable all ESLint rules that conflict with Prettier formatting
  prettierConfig,
]
