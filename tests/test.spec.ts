import { test } from '../src/fixtures/mergeFixtures';
import testData from '../src/data/testData.json' with { type: 'json' };
const { submitSuccess } = testData.validations.practiceForm;
import { getLatestEmailAll, deleteLastEmailsWithSubject } from '../src/helpers/imap-simple';

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
    await fillPracticeForm();
    console.log('testfile: fillPracticeForm fixture ended');
    console.log('testfile: expecting started');
    await test.expect(page.getByRole('dialog')).toContainText(submitSuccess);
    console.log('testfile: finished expecting');
});

test.skip('latest email has expected subject and from', async () => {
    const email = await getLatestEmailAll();
    if (!email) {
        console.log('No new emails found.');

        return;
    }

    console.log('Latest email subject:', email.subject);
    console.log('Latest email from:', email.from);

    // await deleteLastEmails(1); // Deletes the last 3 emails
    await deleteLastEmailsWithSubject(1);
    // expect(email).not.toBeNull();
    // expect(email!.subject).toContain('Confirmation');
    // expect(email!.from).toContain('noreply@yourapp.com');

    // // Optional: check email body contains text
    // if (email?.text) {
    //     expect(email.text).toContain('Thank you');
    // }
});
