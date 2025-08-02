import { Page } from '@playwright/test';

export class CheckBoxPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://demoqa.com/checkbox');
    }

    async clickHome() {
        await this.page.click('.rct-title >> text=Home');
    }
}
