import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig([
  {
    ignores: ['eslint.config.mjs'],
  },

  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  {
    // This check will cause linter halt.
    // Maybe related to https://github.com/typescript-eslint/typescript-eslint/pull/11605
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    // NestJS has a lot of empty classes as Module.
    rules: {
      '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
    },
  },
  {
    // https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
    rules: {
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
  {
    rules: {
      curly: ['error', 'all'],
    },
  },

  eslintConfigPrettier,
]);

export default eslintConfig;
