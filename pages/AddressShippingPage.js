const { BasePage } = require('./BasePage');

class AddressPage extends BasePage {
    constructor(page) {
        super(page);
        // address Book list page locators
        this.newAddressButton = page.getByRole('link', { name: 'New Address' });
        this.backButtonList = page.getByRole('link', { name: 'Back' });
        // dynamic locators for Edit/Delete buttons 
        this.editButtons = page.getByRole('link', { name: 'Edit' });
        this.deleteButtons = page.getByRole('link', { name: 'Delete' });
        // Add/Edit address form locators
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.companyInput = page.locator('#input-company');
        this.address1Input = page.locator('#input-address-1');
        this.address2Input = page.locator('#input-address-2');
        this.cityInput = page.locator('#input-city');
        this.postCodeInput = page.locator('#input-postcode');
        this.countryDropdown = page.locator('#input-country');
        this.zoneDropdown = page.locator('#input-zone');
        // default address radio buttons
        this.defaultYesRadio = page.locator('input[name="default"][value="1"]');
        this.defaultNoRadio = page.locator('input[name="default"][value="0"]');
        // form action buttons
        this.continueButton = page.locator('input[value="Continue"]');
        this.backButtonForm = page.locator('.pull-left > .btn-default');
        // Warnings message loacators
        this.successAlert = page.locator('.alert-success');
        this.warningAlert = page.locator('.alert-warning, .alert-danger');
        this.fieldWarningMessage = page.locator('.text-danger');
    }
    // navigates directly to the Address Book
    async navigate() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/address');
    }
    // reusable method to fill out the address form quickly
    async fillAddressForm(details) {
        if (details.firstName) await this.firstNameInput.fill(details.firstName);
        if (details.lastName) await this.lastNameInput.fill(details.lastName);
        if (details.company) await this.companyInput.fill(details.company);
        if (details.address1) await this.address1Input.fill(details.address1);
        if (details.address2) await this.address2Input.fill(details.address2);
        if (details.city) await this.cityInput.fill(details.city);
        if (details.postCode) await this.postCodeInput.fill(details.postCode);
        // dropdowns need to wait for network state sometimes
        if (details.country) {
            await this.countryDropdown.selectOption({ label: details.country });
            await this.page.waitForLoadState('networkidle');
        }
        if (details.zone) {
            await this.zoneDropdown.selectOption({ label: details.zone });
        }
    }
}

module.exports = { AddressPage };