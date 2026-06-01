const { test, expect } = require('@playwright/test');
const { AddressPage } = require('../pages/AddressShippingPage');

test.describe('Address and Shipping Service', () => {
    // inject the authenticated storage state before each test to ensure we're logged in
    test.use({ storageState: '.auth/user.json' });

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
});