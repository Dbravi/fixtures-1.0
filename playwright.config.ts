import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    timeout: 30000,

    expect: {
        timeout: 20000,
    },
    use: {
        headless: true,
        actionTimeout: 0,
        trace: 'on',
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
