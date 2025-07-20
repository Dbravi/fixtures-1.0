import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

export type DashboardOptions = {
    section: string;
    subSection: string;
};

export type DashboardFixtures = {
    selectDashboardOptions: DashboardPage;
    dashboardOptions: DashboardOptions;
};

//auto run fixture(run before all tests, doesn't need to be called)

export const test = base.extend<DashboardFixtures>({
    dashboardOptions: [
        { section: 'defaultSection', subSection: 'defaultSubSection' },
        { option: true }
    ],

    selectDashboardOptions: [async ({ page, dashboardOptions }, use) => {
        console.log('1')

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goto();
        await dashboardPage.navigateToSection(dashboardOptions.section);
        await dashboardPage.navigateToSubSection(dashboardOptions.subSection);
        console.log('end 1')

        await use(dashboardPage);
        console.log('tierdown 1')

    }, { auto: true }
    ]
});
