// import { test as base } from '@playwright/test';
// import { faker } from '@faker-js/faker';
// import { FormPage } from '../pages/form.page';

// type MyFixtures = {
//     fillPracticeForm: void;
// };

// export const test = base.extend<MyFixtures>({
//     fillPracticeForm: async ({ page }, use) => {
//         console.log('2')

//         const formPage = new FormPage(page);
//         await formPage.fillFirstName(faker.person.firstName());
//         await formPage.fillLastName(faker.person.lastName());
//         await formPage.fillEmail(faker.internet.email());
//         await formPage.selectGender();
//         await formPage.fillMobile(faker.string.numeric(10));
//         await formPage.fillAddress(faker.location.streetAddress());
//         await formPage.submit();
//         console.log('end 2')

//         await use();
//         console.log('teardown 2')

//     },
// });

//Callable fixture
import { test as base } from '@playwright/test';
import { FormPage } from '../pages/form.page';
import { faker } from '@faker-js/faker';

type MyFixtures = {
    fillPracticeForm: () => Promise<void>; // now it's a callable function
};

export const test = base.extend<MyFixtures>({
    fillPracticeForm: async ({ page }, use) => {
        const run = async () => {
            console.log('2')
            const formPage = new FormPage(page);
            await formPage.fillFirstName(faker.person.firstName());
            await formPage.fillLastName(faker.person.lastName());
            await formPage.fillEmail(faker.internet.email());
            await formPage.selectGender();
            await formPage.fillMobile(faker.string.numeric(10));
            await formPage.fillAddress(faker.location.streetAddress());
            await formPage.submit();
            console.log('end 2');
            test.expect(1).toBe(1); // simple assertion to ensure the auto fixture runs
        };

        await use(run); // this makes it available inside the test
        console.log('tierdown 2')

    },
});

