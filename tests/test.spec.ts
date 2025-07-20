import { test } from '../src/fixtures/mergeFixtures.fixtures';
import testData from '../src/data/testData.json';
const { submitSuccess } = testData.validations.practiceForm;

test.use({
    dashboardOptions: {
        section: 'Forms',
        subSection: 'Practice Form',
    },
});

test('should submit the form', async ({ page, fillPracticeForm }) => {
    test.expect(1).toBe(1); // simple assertion to ensure the auto fixture runs
    console.log('1 es equal to 1');
    await fillPracticeForm()
    console.log('expecting')
    await test.expect(page.getByRole('dialog')).toContainText(submitSuccess);
    console.log('finished expecting')
});
