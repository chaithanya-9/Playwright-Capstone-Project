const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        // checkout locators
        this.guestCheckoutRadioButton = page.getByRole('radio', { name: 'Guest Checkout' });
        this.registerCheckoutRadioButton = page.getByRole('radio', { name: 'Register Account' });
        this.accountContinueButton = page.locator('#button-account');
        // billing/guest locators
        this.firstNameInput = page.getByPlaceholder('First Name');
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
        this.guestContinueButton = page.locator('#button-guest');
        // delivery locators
        this.shippingMethodContinueButton = page.locator('#button-shipping-method');
        this.newDeliveryAddressRadioButton = page.locator('input[name="shipping_address"][value="new"]');
        this.flatShippingRateRadio = page.locator('input[value="flat.flat"]');
        // payment locatos
        this.termsCheckbox = page.getByRole('checkbox');
        this.paymentMethodContinueButton = page.locator('#button-payment-method');
        this.confirmOrderButton = page.locator('#button-confirm');
        this.successHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
        // validation locators
        this.inputFieldWarning = page.locator('.text-danger');
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