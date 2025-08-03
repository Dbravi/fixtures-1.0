import { test, chromium } from '@playwright/test';

test('Two independent users visit different pages', async () => {
    const browser = await chromium.launch({ headless: true });

    // User A
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    await pageA.goto('https://demoqa.com/text-box');
    await pageA.fill('#userName', 'Alice');
    await pageA.fill('#userEmail', 'alice@example.com');

    // User B
    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await pageB.goto('https://demoqa.com/text-box');
    await pageB.fill('#userName', 'Bob');
    await pageB.fill('#userEmail', 'bob@example.com');

    await pageA.waitForTimeout(3000);
    await pageB.waitForTimeout(3000);
});

// test('Mode B: Two independent users visit different pages', async ({ browser }) => {
//     // User A
//     const contextA = await browser.newContext();
//     const pageA = await contextA.newPage();
//     await pageA.goto('https://demoqa.com/text-box');
//     await pageA.fill('#userName', 'Alice');
//     await pageA.fill('#userEmail', 'alice@example.com');

//     // User B
//     const contextB = await browser.newContext();
//     const pageB = await contextB.newPage();
//     await pageB.goto('https://demoqa.com/text-box');
//     await pageB.fill('#userName', 'Bob');
//     await pageB.fill('#userEmail', 'bob@example.com');

//     await pageA.waitForTimeout(3000);
//     await pageB.waitForTimeout(3000);

//     await contextA.close();
//     await contextB.close();
// });

// test('Same user opens new tab to interact with different sections', async () => {
//     const browser = await chromium.launch({ headless: true });

//     const context = await browser.newContext();

//     // Tab 1 - Fill text box form
//     const page1 = await context.newPage();
//     await page1.goto('https://demoqa.com/text-box');
//     await page1.fill('#userName', 'Charlie');
//     await page1.fill('#userEmail', 'charlie@example.com');

//     // Tab 2 - Click on Check Box section
//     const page2 = await context.newPage();
//     await page2.goto('https://demoqa.com/checkbox');
//     await page2.click('.rct-title >> text=Home');

//     await page1.waitForTimeout(3000);
//     await page2.waitForTimeout(3000);

//     await browser.close();
// });

// test('User uses fixture page, Admin uses separate context', async ({ page, browser }) => {
//     // User (built-in page fixture)
//     await page.goto('https://demoqa.com/text-box');
//     await page.fill('#userName', 'User Bob');
//     await page.fill('#userEmail', 'user.bob@example.com');

//     // Admin (separate browser context and page)
//     const adminContext = await browser.newContext();
//     const adminPage = await adminContext.newPage();
//     await adminPage.goto('https://demoqa.com/text-box');
//     await adminPage.fill('#userName', 'Admin Alice');
//     await adminPage.fill('#userEmail', 'admin.alice@example.com');

//     await page.waitForTimeout(3000);
//     await adminPage.waitForTimeout(3000);

//     await adminContext.close();
// });
