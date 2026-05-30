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

    // test 03
    test('Test-03: Verify the Back button on the Edit Account page returns to the dashboard', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate directly to the Edit Account page using POM method
        await userProfilePage.navigateToEditAccount();
        // click the Back button
        await userProfilePage.backButton.click();
        // verify the system safely aborts the edit and routes back to the main dashboard
        await expect(page).toHaveURL(/.*route=account\/account/);
    });

    // test 04
    test('Test-04: Verify the user can successfully change their password', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate directly to the Change Password page using the POM method
        await userProfilePage.navigateToChangePassword();
        // generate a dynamic password to prove the database actually accepted the update
        const newPassword = `NewPass${Date.now()}`;
        // update the password using then POM method
        await userProfilePage.changePassword(newPassword);
        // verify the system accepts the change and throws the green success message
        await expect(userProfilePage.successMessage).toContainText('Success: Your password has been successfully updated.');
    });

    // test 05
    test('Test-05: Verify password mismatch in the confirm field throws a validation error', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate directly to the Change Password page using the POM method
        await userProfilePage.navigateToChangePassword();
        // intentionally fill mismatched passwords
        await userProfilePage.passwordInput.fill('SecurePass123');
        await userProfilePage.passwordConfirmInput.fill('WrongMatch456');
        // attempt to submit the invalid form
        await userProfilePage.continueButton.click();
        // verify the field level warning message catches the mismatch
        await expect(userProfilePage.fieldWarningMessage).toContainText('Password confirmation does not match password!');
    });
})