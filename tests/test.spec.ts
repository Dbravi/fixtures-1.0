import { test } from '../src/fixtures/mergeFixtures';
import testData from '../src/data/testData.json';
const { submitSuccess } = testData.validations.practiceForm;

test.use({
    dashboardOptions: {
        section: 'Forms',
        subSection: 'Practice Form',
    },
});

test('should submit the form', async ({ page, fillPracticeForm }) => {
    console.log('testfile: selectOptions fixture auto run ended');
    await fillPracticeForm()
    console.log('testfile: fillPracticeForm fixture ended');
    console.log('testfile: expecting started')
    await test.expect(page.getByRole('dialog')).toContainText(submitSuccess);
    console.log('testfile: finished expecting')
});
