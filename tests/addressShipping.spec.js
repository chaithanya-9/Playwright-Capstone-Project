const { test, expect } = require('@playwright/test');
const { AddressPage } = require('../pages/AddressShippingPage');

test.describe('Address and Shipping Service', () => {
    // run tests serially because they share state
    test.describe.configure({ mode: 'serial' });

    // inject the authenticated storage state before each test to ensure we're logged in
    test.use({ storageState: '.auth/user.json' });

    // test 01
    test('Test-01: Verify navigating to the Address Book page loads successfully', async ({ page }) => {
        const addressPage = new AddressPage(page);
        // navigate directly to the Address Book page
        await addressPage.navigate();
        // verify the URL confirms we are on the correct route
        await expect(page).toHaveURL(/.*route=account\/address/);
        // verify the main heading is visible
        await expect(page.getByRole('heading', { name: 'Address Book Entries' })).toBeVisible();
        // verify the New Address button is present on the screen
        await expect(addressPage.newAddressButton).toBeVisible();
    });

    // test 02
    test('Test-02: Verify clicking "New Address" button routes to the Add Address form', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        // navigate directly to the Address Book page
        await addressShippingPage.navigate();
        // click the New Address button
        await addressShippingPage.newAddressButton.click();
        // verify the URL updates correctly for the add action
        await expect(page).toHaveURL(/.*route=account\/address\/add/);
        // verify the page heading confirms the Add Address form
        await expect(page.getByRole('heading', { name: 'Add Address' })).toBeVisible();
    });

    // test 03
    test('Test-03: Verify user can successfully add a new valid address', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        // navigate directly to the Address Book page
        await addressShippingPage.navigate();
        // click the New Address button
        await addressShippingPage.newAddressButton.click();
        // create a data object for the new address
        const addressDetails = {
            firstName: 'John',
            // unique last name to prevent duplicates 
            lastName: `Wick_${Date.now()}`,
            company: 'Continental Hotel',
            address1: '123 Assassin Blvd',
            address2: 'Suite 47',
            city: 'New York',
            postCode: '10001',
            country: 'United States',
            zone: 'New York'
        };
        // pass the object into our dynamic helper method
        await addressShippingPage.fillAddressForm(addressDetails);
        // ensure it is NOT set as the default address
        await addressShippingPage.defaultNoRadio.check();
        // submit the form
        await addressShippingPage.continueButton.click();
        // verify the success message appears and contains the correct text
        await expect(addressShippingPage.successAlert).toBeVisible();
        await expect(addressShippingPage.successAlert).toContainText('Your address has been successfully added');
    });
});