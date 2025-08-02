import { type Page } from '@playwright/test';

export type DashboardSection = 'Forms' | 'Elements' | 'Widgets' | 'Alerts, Frame & Windows' | 'Interactions';
export type SubSection = 'Practice Form' | 'Browser Windows' | 'Text Box' | 'Buttons' | string;

export interface NavigationOptions {
    section: DashboardSection;
    subSection?: SubSection;
}

export class DashboardPage {
    constructor(private page: Page) {}

    /**
     * Navigates to the root page
     */
    async goto() {
        await this.page.goto('/');
    }

    /**
     * Navigates to a specific section in the dashboard
     * @param section The main section to navigate to
     */
    async navigateToSection(section: string) {
        await this.page.getByRole('heading', { name: section }).click();
    }

    /**
     * Clicks on a specific subsection link
     * @param subSection The subsection to navigate to
     */
    async navigateToSubSection(subSection: string) {
        await this.page.getByText(subSection, { exact: true }).click();
    }
}
