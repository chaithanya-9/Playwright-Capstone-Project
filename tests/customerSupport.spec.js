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
});