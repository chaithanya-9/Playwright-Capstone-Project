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

    // test 02
    test('Test-02: Verify clearing a mandatory field and submitting throws a validation error', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate directly to the Edit Account page using a POM method 
        await userProfilePage.navigateToEditAccount();
        // clear the mandatory telephone field by passing an empty string
        await userProfilePage.telephoneInput.fill('');
        // attempt to submit the form with missing data
        await userProfilePage.continueButton.click();
        // verify the field level warning message appears directly under the textbox
        // use fieldWarningMessage because this is field level validation and won't trigger the main warning message at the top of the page
        await expect(userProfilePage.fieldWarningMessage).toContainText('Telephone must be between 3 and 32 characters!');
    });
})