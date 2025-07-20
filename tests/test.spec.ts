import { test } from '../src/fixtures/mergeFixtures';
import testData from '../src/data/testData.json';
const { submitSuccess } = testData.validations.practiceForm;

// Test uses global fixture to navigate to the Forms section and fill the Practice Form using named fixture
// Auto run test fixture `dashboardOptions` can be customized by passing options to `test.use
// Console logs are added to track the flow of the test and fixture execution

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
