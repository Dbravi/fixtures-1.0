import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    timeout: 30000,
    expect: {
        timeout: 5000,
    },
    use: {
        headless: true,
        actionTimeout: 0,
        trace: 'on-first-retry',
        baseURL: 'https://demoqa.com/',
    },
    reporter: [
        [
            'junit',
            {
                outputFile: 'results/test-results.xml',
                embedAnnotationsAsProperties: true,

                // Not used by Testmo
                // embedAttachmentsAsProperty: undefined
            },
        ],
    ],
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
