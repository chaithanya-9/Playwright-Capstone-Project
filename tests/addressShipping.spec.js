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

    // test 04
    test('Test-04: Verify submitting the Add Address form with all blank fields triggers mandatory field warnings', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        // navigate directly to the Address Book page
        await addressShippingPage.navigate();
        // click the New Address button to open the form
        await addressShippingPage.newAddressButton.click();
        // attempt to submit the form immediately without filling any fields
        await addressShippingPage.continueButton.click();
        // verify field level warnings appear for all mandatory fields
        await expect(addressShippingPage.fieldWarningMessage.first()).toBeVisible();
        await expect(page.locator('text=First Name must be between 1 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Last Name must be between 1 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Address must be between 3 and 128 characters!')).toBeVisible();
        await expect(page.locator('text=City must be between 2 and 128 characters!')).toBeVisible();
    });

    // test 05
    test('Test-05: Verify the Region/State dropdown dynamically populates when a Country is selected', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        // navigate directly to the Address Book page and open the new address form
        await addressShippingPage.navigate();
        await addressShippingPage.newAddressButton.click();
        // select a country to trigger the backend AJAX request
        await addressShippingPage.countryDropdown.selectOption({ label: 'United States' });
        // wait for the network call to finish fetching the states
        await page.waitForLoadState('networkidle');
        // verify that the Region/State dropdown successfully populated with US states
        // assert it contains a known state instead of being blank
        await expect(addressShippingPage.zoneDropdown).toContainText('New York');
        // visually select the state to prove its fully interactable
        await addressShippingPage.zoneDropdown.selectOption({ label: 'New York' });
    });

    // test 06
    test('Test-06: Verify user can successfully edit an existing address', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        await addressShippingPage.navigate();
        // click the edit button on the first address in the list
        await page.getByRole('link', { name: 'Edit' }).first().click();
        // verify we are on the edit address page
        await expect(page).toHaveURL(/.*route=account\/address\/edit/);
        // update the city field
        await addressShippingPage.cityInput.fill('Los Angeles');
        await addressShippingPage.continueButton.click();
        // verify the system accepts the update and shows success banner
        await expect(addressShippingPage.successAlert).toBeVisible();
        await expect(addressShippingPage.successAlert).toContainText('Your address has been successfully updated');
    });

    // test 07
    test('Test-07: Verify submitting Edit Address form with blank mandatory field triggers a warning', async ({ page }) => {
        const addressPage = new AddressPage(page);
        await addressPage.navigate();
        // click edit on the first address
        await page.getByRole('link', { name: 'Edit' }).first().click();
        // clear a mandatory field to trigger validation
        await addressPage.cityInput.fill('');
        await addressPage.continueButton.click();
        // verify field level warning appears
        await expect(addressPage.fieldWarningMessage.first()).toBeVisible();
        await expect(addressPage.fieldWarningMessage.first()).toContainText('City must be between 2 and 128 characters!');
    });

    // test 08
    test('Test-08: Verify the Back button on the Add Address form returns to the Address Book', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        // navigate to the Address Book and open the Add Address form
        await addressShippingPage.navigate();
        await addressShippingPage.newAddressButton.click();
        // explicitly verify we successfully routed to the Add Address form
        await expect(page).toHaveURL(/.*route=account\/address\/add/);
        // click the Back button located at the bottom left of the form
        await addressShippingPage.backButtonForm.click();
        // verify the URL returned to the base address list
        await expect(page).toHaveURL(/.*route=account\/address/);
        // verify the UI state by checking if the New Address button is visible again
        await expect(addressShippingPage.newAddressButton).toBeVisible();
    });

    // test 09
    test('Test-09: Verify the Back button on the Edit Address form returns to the Address Book', async ({ page }) => {
        const addressShippingPage = new AddressPage(page);
        // navigate to the Address Book
        await addressShippingPage.navigate();
        // click edit on the first address
        await page.getByRole('link', { name: 'Edit' }).first().click();
        await expect(page).toHaveURL(/.*route=account\/address\/edit.*/);
        // click back without making any changes
        await addressShippingPage.backButtonForm.click();
        // verify the system routed back to the address book
        await expect(page).toHaveURL(/.*route=account\/address.*/);
        await expect(page.getByRole('heading', { name: 'Address Book' })).toBeVisible();
    });

    // test 10
    test('Test-10: Verify the user can successfully change their Default address', async ({ page }) => {
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
        await addressShippingPage.fillAddressForm(addressDetails);
        // set this new address as default before saving
        await addressShippingPage.defaultYesRadio.check();
        await expect(addressShippingPage.defaultYesRadio).toBeChecked();
        await addressShippingPage.continueButton.click();
        // verify the system accepts the change
        await expect(addressShippingPage.successAlert).toBeVisible();
        await expect(addressShippingPage.successAlert).toContainText('Your address has been successfully added');
    });

    // test 11
    test('Test-11: Verify dropdown validation', async ({ page }) => {
        const addressPage = new AddressPage(page);
        // navigate directly to the Address Book page
        await addressPage.navigate();
        // click the New Address button
        await addressPage.newAddressButton.click();
        // fill out all the fields except the Region/State dropdown to trigger validation
        await addressPage.fillAddressForm({
            firstName: 'Validation',
            lastName: 'Test',
            address1: '123 Missing Zone St',
            city: 'Test City',
            postCode: '10001'
        });
        await addressPage.zoneDropdown.selectOption({ index: 0 });
        // attempt to submit the form without selecting a valid region/state
        await addressPage.continueButton.click();
        // verify the appropriate warning message appears for the Region/State field
        await expect(addressPage.fieldWarningMessage.last()).toBeVisible();
        await expect(addressPage.fieldWarningMessage.last()).toContainText('Please select a region / state!');
    });
});