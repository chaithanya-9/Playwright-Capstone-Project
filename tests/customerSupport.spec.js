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
});