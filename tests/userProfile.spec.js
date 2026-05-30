const { test, expect } = require('@playwright/test');
const { UserProfilePage } = require('../pages/UserProfilePage');

test.describe('User Profile Service', () => {
    // inject the authenticated storage state before each test to ensure we're logged in
    test.use({ storageState: '.auth/user.json' });

    // test 01
    test('Test-01: Verify the user can successfully edit their Account Information', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate directly to My Account dashboard
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
        // click 'Edit your account information' from the dashboard
        await userProfilePage.editAccountLink.click();
        // generate a dynamic First Name to prove the database actually updated
        const dynamicFirstName = `new${Date.now()}`;
        // update the account info using our POM method
        await userProfilePage.updateAccountInfo(dynamicFirstName, 'Tester', '9876543210');
        // verify the system accepts the change and throws the green success message
        await expect(userProfilePage.successMessage).toContainText('Success: Your account has been successfully updated.');
    });
})