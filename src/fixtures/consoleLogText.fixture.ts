import { test as base } from '@playwright/test';

type MyFixtures = {
    consoleLogSomeText: any
};

export const test = base.extend<MyFixtures>({
    consoleLogSomeText: async ({ }: any, use: () => any) => {
        console.log('hello world')
        await use();
        console.log('hello world teardown')
        test.expect('test').toBeDefined()
    },

});


// Base test extending version

// import { test as base } from '../fixtures/baseTest.fixture'; // ✅ Import from your custom base

// type MyFixtures = {
//     consoleLogText: any
// };

// export const test = base.extend<MyFixtures>({
//     consoleLogText: async ({ }: any, use: () => any) => {
//         console.log('hello world')
//         await use();
//         console.log('hello world teardown')
//         test.expect('text').toBeDefined(); // Example assertion to ensure the fixture runs
//     },
// });
