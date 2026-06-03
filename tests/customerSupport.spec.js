const { test, expect } = require('@playwright/test');
const { CustomerSupportPage } = require('../pages/CustomerSupportPage');

// TC-06 and TC-07 require login to access the returns form
// storageState is used selectively via test.use inside a nested describe
test.describe('Customer Support Service Tests', () => {

    // test 01
    test('Test-01: Verify navigating to the Contact Us page loads successfully', async ({ page }) => {
        const supportPage = new CustomerSupportPage(page);
        // navigate directly to the Contact Us page
        await supportPage.navigateToContactUs();
        // verify the URL and page heading
        await expect(page).toHaveURL(/.*route=information\/contact/);
        await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    });

    // test 02
    test('Test-02: Verify submitting the Contact Us form with valid data shows a success message', async ({ page }) => {
        const supportPage = new CustomerSupportPage(page);
        // navigate directly to the Contact Us page
        await supportPage.navigateToContactUs();
        // fill and submit the form with valid data
        await supportPage.fillContactForm(
            'QA Tester',
            'qatester@test.com',
            'This is a test enquiry submitted by an automated test to verify the contact form works correctly.'
        );
        // verify the system accepts the submission and shows the success message
        await expect(page.getByText('Your enquiry has been successfully sent to the store owner!')).toBeVisible();
    });

    // test 03
    test('Test-03: Verify submitting the Contact Us form with blank fields triggers mandatory field warnings', async ({ page }) => {
        const supportPage = new CustomerSupportPage(page);
        // navigate directly to the Contact Us page
        await supportPage.navigateToContactUs();
        // click submit without filling any fields
        await supportPage.contactSubmitButton.click();
        // verify field level warnings appear
        await expect(supportPage.fieldWarning.first()).toBeVisible();
        await expect(page.locator('text=Name must be between 3 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Enquiry must be between 10 and 3000 characters!')).toBeVisible();
    });

    // test 04
    test('Test-04: Verify submitting the Contact Us form with an invalid email format triggers a warning', async ({ page }) => {
        const supportPage = new CustomerSupportPage(page);
        // navigate directly to the Contact Us page
        await supportPage.navigateToContactUs();
        // submit with invalid email format
        await supportPage.fillContactForm(
            'QA Tester',
            'invalidemail@',
            'This is a test enquiry with an invalid email format to check validation.'
        );
        // verify the email validation warning appears
        await expect(supportPage.fieldWarning).toBeVisible();
        await expect(supportPage.fieldWarning).toContainText('E-Mail Address does not appear to be valid!');
    });

    // returns tests require login so use saved auth session
    test.describe('Returns Form Tests', () => {
        test.use({ storageState: '.auth/user.json' });

        // test 05
        test('Test-05: Verify successful submission of a Product Return request with all mandatory details', async ({ page }) => {
            const supportPage = new CustomerSupportPage(page);
            // navigate directly to the Product Returns form
            await supportPage.navigateToReturns();
            // fill all mandatory return form fields
            await supportPage.fillReturnForm(
                'John',
                'Doe',
                'johndoe@test.com',
                '1234567890',
                '1',
                'HP LP3065',
                'Product 1'
            );
            // select a reason for return
            await supportPage.returnReasonRadio.check();
            await supportPage.returnSubmitButton.click();
            // verify the system accepted the return request
            await expect(page.getByText('Thank you for submitting your')).toBeVisible();
            await expect(page.getByText('You will be notified via e-')).toBeVisible();
        });

        // test 06
        test('Test-06: Verify the return form throws a validation error when Order ID is left blank', async ({ page }) => {
            const supportPage = new CustomerSupportPage(page);
            // navigate directly to the Product Returns form
            await supportPage.navigateToReturns();
            // fill all fields except Order ID
            await supportPage.returnFirstNameInput.fill('John');
            await supportPage.returnLastNameInput.fill('Doe');
            await supportPage.returnEmailInput.fill('johndoe@test.com');
            await supportPage.returnTelephoneInput.fill('1234567890');
            // intentionally leave order ID blank
            await supportPage.returnProductNameInput.fill('HP LP3065');
            await supportPage.returnProductCodeInput.fill('Product 1');
            await supportPage.returnReasonRadio.check();
            await supportPage.returnSubmitButton.click();
            // verify the order ID field warning appears
            await expect(supportPage.fieldWarning).toBeVisible();
            await expect(supportPage.fieldWarning).toContainText('Order ID required!');
        });
    });
});