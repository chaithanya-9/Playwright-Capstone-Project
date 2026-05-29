const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        // checkout locators
        this.guestCheckoutRadioButton = page.getByRole('radio', { name: 'Guest Checkout' });
        this.registerCheckoutRadioButton = page.getByRole('radio', { name: 'Register Account' });
        this.accountContinueButton = page.locator('#button-account');
        // billing/guest locators
        this.firstNameInput = page.locator('#input-payment-firstname');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephoneInput = page.getByPlaceholder('Telephone');
        this.address1Input = page.getByPlaceholder('Address 1');
        this.cityInput = page.getByPlaceholder('City');
        this.postCodeInput = page.getByPlaceholder('Post Code');
        this.countryDropdown = page.getByLabel('Country');
        this.regionDropdown = page.getByLabel('Region / State');
        // logged-in user specific locators
        this.billingAddressContinueBtn = page.locator('#button-payment-address');
        this.deliveryAddressContinueBtn = page.locator('#button-shipping-address');
        // guest accordions
        this.guestContinueButton = page.locator('#button-guest')
        // delivery locators
        this.shippingMethodContinueButton = page.locator('#button-shipping-method');
        this.newDeliveryAddressRadioButton = page.locator('input[name="shipping_address"][value="new"]');
        this.flatShippingRateRadio = page.locator('input[value="flat.flat"]');
        this.deliveryMethodCommentBox = page.locator('textarea[name="comment"]');
        // address form locators for new address
        this.newAddressFirstName = page.locator('#input-shipping-firstname');
        this.newAddressLastName = page.locator('#input-shipping-lastname');
        this.newAddress1 = page.locator('#input-shipping-address-1');
        this.newAddressCity = page.locator('#input-shipping-city');
        this.newAddressPostcode = page.locator('#input-shipping-postcode');
        this.newAddressCountry = page.locator('#input-shipping-country');
        this.newAddressZone = page.locator('#input-shipping-zone');
        // payment locatos
        this.termsCheckbox = page.getByRole('checkbox');
        this.paymentMethodContinueButton = page.locator('#button-payment-method');
        this.confirmOrderButton = page.locator('#button-confirm');
        this.successHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
        this.codRadioButton = page.locator('input[value="cod"]');
        // confirm order locators
        this.confirmProductName = page.locator('#collapse-checkout-confirm tbody tr td.text-left a');
        // success page locators
        this.successContinueButton = page.locator('a.btn.btn-primary:text("Continue")');
        this.orderSuccessMessage = page.locator('#content p:nth-child(2)');
        // validation locators
        this.inputFieldWarning = page.locator('.text-danger');
        this.warningBanner = page.locator('.alert-danger');
        // price verification locators
        this.confirmOrderTable = page.locator('#collapse-checkout-confirm');
        this.finalTotalText = page.locator('#collapse-checkout-confirm tfoot tr:last-child td:nth-child(2)');
        this.billingAddressAccordion = page.locator('#collapse-payment-address');
    }
    // action methods
    // navigate directly to Checkout Page
    async navigateToCheckout() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout');
    }
    // fill all the guest details
    async fillGuestDetails(firstName, lastName, email, telephone, address, city, postCode, countryValue, regionValue) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.address1Input.fill(address);
        await this.cityInput.fill(city);
        await this.postCodeInput.fill(postCode);
        // Select country and region 
        await this.countryDropdown.selectOption(countryValue);
        await this.regionDropdown.selectOption(regionValue);
    }
    // fill all the logged in user details
    async fillUserDetails(firstName, lastName, address, city, postCode, countryValue, regionValue) {
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.address1Input.fill(address);
        await this.cityInput.fill(city);
        await this.postCodeInput.fill(postCode);
        // Select country and region 
        await this.countryDropdown.selectOption(countryValue);
        await this.regionDropdown.selectOption(regionValue);
    }
}
module.exports = { CheckoutPage };