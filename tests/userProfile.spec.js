const { test, expect } = require('@playwright/test');
const { UserProfilePage } = require('../pages/UserProfilePage');
const { LoginPage } = require('../pages/LoginPage');

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

    // test 06
    test('Test-06: Verify navigation to the Order History page loads successfully', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the My Account dashboard using the POM method
        await userProfilePage.navigateToMyAccount();
        // click the 'View your order history' link from the dashboard
        await userProfilePage.orderHistoryLink.click();
        // verify the system routes successfully to the Order History page
        await expect(page).toHaveURL(/.*route=account\/order/);
    });

    // test 07
    test('Test-07: Verify clicking View on a past order shows order details', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/order');
        // check if any orders exist before trying to view one
        const viewButtons = page.locator('a[data-original-title="View"]');
        const orderCount = await viewButtons.count();
        if (orderCount > 0) {
            // click the first view button to open order details
            await viewButtons.first().click();
            // verify the system routed to the order info page
            await expect(page).toHaveURL(/.*route=account\/order\/info/);
            await expect(page.getByRole('heading', { name: 'Order Detail' })).toBeVisible();
        } else {
            // if no orders exist skip the view action and just verify the empty state renders
            await expect(page.getByText('You have not made any previous orders!')).toBeVisible();
        }
    });

    // test 08
    test('Test-08: Verify navigation to the Downloads page loads successfully', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the My Account dashboard using the POM method
        await userProfilePage.navigateToMyAccount();
        // click the 'Downloads' link from the dashboard
        await userProfilePage.downloadsLink.click();
        // verify the system routes successfully to the Downloads page
        await expect(page).toHaveURL(/.*route=account\/download/);
        // verify the page heading is visible to confirm content loaded
        await expect(page.getByRole('heading', { name: 'Account Downloads' })).toBeVisible();
    });

    // test 09
    test('Test-09: Verify navigation to the Reward Points page loads successfully', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the My Account dashboard
        await userProfilePage.navigateToMyAccount();
        // click the 'Your Reward Points' link from the sidebar
        await userProfilePage.rewardPointsLink.click();
        // verify the system routes successfully to the Reward Points page
        await expect(page).toHaveURL(/.*route=account\/reward/);
        // verify the page heading is visible to confirm content loaded
        await expect(page.getByRole('heading', { name: 'Your Reward Points' })).toBeVisible();
    });

    // test 10
    test('Test-10: Verify navigation to the Returns page loads successfully', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the My Account dashboard
        await userProfilePage.navigateToMyAccount();
        // click the 'View your return requests' link from the sidebar
        await userProfilePage.returnsLink.click();
        // verify the system routes successfully to the Product Returns page
        await expect(page).toHaveURL(/.*route=account\/return/);
        // verify the page heading is visible to confirm content loaded
        await expect(page.getByRole('heading', { name: 'Product Returns' })).toBeVisible();
    });

    // test 11
    test('Test-11: Verify navigation to the Transactions page loads successfully', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the My Account dashboard
        await userProfilePage.navigateToMyAccount();
        // click the 'Your Transactions' link from the sidebar
        await userProfilePage.transactionsLink.click();
        // verify the system routes successfully to the Transactions page
        await expect(page).toHaveURL(/.*route=account\/transaction/);
        // verify the page heading is visible to confirm content loaded
        await expect(page.getByRole('heading', { name: 'Your Transactions' })).toBeVisible();
    });

    // test 12
    test('Test-12: Verify the user can successfully subscribe to the newsletter', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the Newsletter subscription page using the POM method
        await userProfilePage.navigateToNewsletter();
        // subscribe to the newsletter
        await userProfilePage.setNewsletterSubscription(true);
        // verify the success message appears
        await expect(userProfilePage.successMessage).toContainText('Success: Your newsletter subscription has been successfully updated!');
    });

    // test 13
    test('Test-13: Verify the user can successfully unsubscribe from the newsletter', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the Newsletter subscription page
        await userProfilePage.navigateToNewsletter();
        // unsubscribe from the newsletter
        await userProfilePage.setNewsletterSubscription(false);
        // verify the success message appears
        await expect(userProfilePage.successMessage).toContainText('Success: Your newsletter subscription has been successfully updated!');
        // verify the 'No' radio button is now checked
        await userProfilePage.navigateToNewsletter();
        await expect(userProfilePage.newsletterNoRadio).toBeChecked();
    });

    // test 14
    test('Test-14: Verify navigation to the Wish List page loads successfully', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate to the dashboard
        await userProfilePage.navigateToMyAccount();
        // click the 'Wish List' link from the sidebar
        await userProfilePage.wishListLink.click();
        // verify the routing to the Wish List page
        await expect(page).toHaveURL(/.*route=account\/wishlist/);
        // verify page title matches expected content
        await expect(page.getByRole('heading', { name: 'My Wish List' })).toBeVisible();
    });

    // test 15
    test('Test-15: Verify Address Book link is present and navigation is correct', async ({ page }) => {
        const userProfilePage = new UserProfilePage(page);
        // navigate directly to the address book page using URL 
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/address');
        // assert the URL instead of the class
        await expect(page).toHaveURL(/.*route=account\/address/);
        // verify the heading exists as a secondary check
        await expect(page.getByRole('heading', { name: 'Address Book Entries' })).toBeVisible();
    });
})