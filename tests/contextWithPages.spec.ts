import { expect, test } from '@playwright/test';
import { TextBoxPage } from '../src/pages/TextBoxPage';
import { CheckBoxPage } from '../src/pages/CheckBoxPage';

test('Same user opens new tab to interact with different sections', async ({ page, context }) => {
    // Tab 1 - page (already created by Playwright)
    const textBox = new TextBoxPage(page);
    await textBox.goto();
    await textBox.fillName('Charlie');
    await textBox.fillEmail('charlie@example.com');

    // Open a new tab (page2) in the same context
    const page2 = await context.newPage();
    const checkBox = new CheckBoxPage(page2);
    await checkBox.goto();
    await checkBox.clickHome();
});

test('user submits message, admin verifies it', async ({ browser }) => {
    // Step 1: User logs in and submits message
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();

    await userPage.goto('https://your-app.com/login');
    await userPage.fill('#username', 'user');
    await userPage.fill('#password', 'userpass');
    await userPage.click('button[type="submit"]');

    // Simulate the user submitting something
    await userPage.click('text=New Message');
    await userPage.fill('#message', 'Hello Admin!');
    await userPage.click('text=Send');

    // Optional: confirm it was submitted
    await expect(userPage.locator('text=Message sent')).toBeVisible();

    await userContext.close(); // Close user session if needed

    // Step 2: Admin logs in and checks the message
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    await adminPage.goto('https://your-app.com/login');
    await adminPage.fill('#username', 'admin');
    await adminPage.fill('#password', 'adminpass');
    await adminPage.click('button[type="submit"]');

    // Navigate to message review page
    await adminPage.click('text=User Messages');
    await expect(adminPage.locator('text=Hello Admin!')).toBeVisible();

    await adminContext.close();
});

test('user flow using fixture, admin checks it', async ({ page, browser }) => {
    // --- USER FLOW ---
    await page.goto('https://your-app.com/login');
    await page.fill('#username', 'user');
    await page.fill('#password', 'userpass');
    await page.click('button[type="submit"]');

    await page.click('text=New Message');
    await page.fill('#message', 'Hello Admin!');
    await page.click('text=Send');

    await expect(page.locator('text=Message sent')).toBeVisible();

    // --- ADMIN FLOW ---
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    await adminPage.goto('https://your-app.com/login');
    await adminPage.fill('#username', 'admin');
    await adminPage.fill('#password', 'adminpass');
    await adminPage.click('button[type="submit"]');

    await adminPage.click('text=User Messages');
    await expect(adminPage.locator('text=Hello Admin!')).toBeVisible();

    await adminContext.close();
});
