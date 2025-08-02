import { Page } from '@playwright/test';

export class TextBoxPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://demoqa.com/text-box');
    }

    async fillName(name: string) {
        await this.page.fill('#userName', name);
    }

    async fillEmail(email: string) {
        await this.page.fill('#userEmail', email);
    }
}
