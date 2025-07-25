import { type Page } from '@playwright/test';

export class FormPage {
    constructor(private page: Page) {}

    // Navigation methods
    async goto() {
        await this.page.goto('/');
        await this.page.getByRole('heading', { name: 'Forms' }).click();
        await this.page.getByText('Practice Form').click();
    }

    // Form field locators
    async fillFirstName(value: string) {
        await this.page.getByPlaceholder('First Name').fill(value);
    }

    async fillLastName(value: string) {
        await this.page.getByPlaceholder('Last Name').fill(value);
    }

    async fillEmail(value: string) {
        await this.page.getByPlaceholder('name@example.com').fill(value);
    }

    async selectGender() {
        await this.page.locator('#gender-radio-1').click({ force: true });
    }

    async fillMobile(value: string) {
        await this.page.getByPlaceholder('Mobile Number').fill(value);
    }

    async fillAddress(value: string) {
        await this.page.getByPlaceholder('Current Address').fill(value);
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async getSubmissionDialog() {
        return this.page.getByRole('dialog');
    }
}
