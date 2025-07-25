// @ts-check

import tseslint from 'typescript-eslint';
import playwrightPlugin from 'eslint-plugin-playwright';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    ...tseslint.configs.recommended, // Use TypeScript ESLint recommended rules
    {
        // Apply this configuration to TypeScript files
        files: ['**/*.ts'],
        // Define TS project config to enable "linting with type information"
        languageOptions: {
            parserOptions: {
                // Reuse the existing tsconfig.json
                project: true,
                tsconfigRootDir: '.',
            },
        },
        // Add the Playwright plugin
        plugins: {
            playwright: playwrightPlugin,
            '@stylistic': stylistic,
        },
        // Enable linting rules beneficial for Playwright projects
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            'newline-before-return': 'warn',
            // Add Playwright-specific rules
            'playwright/no-useless-not': 'warn',
            // Add TypeScript style rules
            '@stylistic/lines-between-class-members': [
                'error',
                {
                    enforce: [{ blankLine: 'always', prev: 'method', next: 'method' }],
                },
            ],
        },
    },
    {
        // Ignore specific files and directories globally
        ignores: ['eslint.config.mjs', 'reports/', 'node_modules/', 'playwright-report/'],
    },
);
