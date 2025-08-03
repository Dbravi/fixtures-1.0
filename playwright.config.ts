import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    timeout: 5000,

    expect: {
        timeout: 5000,
    },
    use: {
        actionTimeout: 0,
        trace: 'off',
        baseURL: 'https://demoqa.com/',
    },
    reporter: [['blob']],

    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        // {
        //     name: 'firefox',
        //     use: { browserName: 'firefox' },
        // },
        // {
        //     name: 'webkit',
        //     use: { browserName: 'webkit' },
        // },
    ],
});
