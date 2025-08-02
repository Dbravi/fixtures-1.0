import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    timeout: 30000,

    expect: {
        timeout: 20000,
    },
    use: {
        actionTimeout: 0,
        trace: 'off',
        baseURL: 'https://demoqa.com/',
    },
    reporter: [
        [
            'junit',
            {
                outputFile: 'results/test-results.xml',
                embedAnnotationsAsProperties: true,
            },
        ],
        ['html', { outputFolder: 'playwright-report' }],
    ],

    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
