const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        // checkout locators
        this.guestCheckoutRadioButton = page.getByRole('radio', { name: 'Guest Checkout' });
        this.registerCheckoutRadioButton = page.getByRole('radio', { name: 'Register Account' });
        this.accountContinueButton = page.locator('#collapse-checkout-option').getByRole('button', { name: 'Continue' });
        // billing/guest locators
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.telephoneInput = page.getByPlaceholder('Telephone');
        this.address1Input = page.getByPlaceholder('Address 1');
        this.cityInput = page.getByPlaceholder('City');
        this.postCodeInput = page.getByPlaceholder('Post Code');
        this.countryDropdown = page.getByLabel('Country');
        this.regionDropdown = page.getByLabel('Region / State');
        // guest accordions
        this.guestContinueButton = page.locator('#collapse-guest').getByRole('button', { name: 'Continue' });
        // delivery locators
        this.shippingMethodContinueButton = page.locator('#collapse-shipping-method').getByRole('button', { name: 'Continue' });
        // payment locatos
        this.termsCheckbox = page.getByRole('checkbox');
        this.paymentMethodContinueButton = page.locator('#collapse-payment-method').getByRole('button', { name: 'Continue' });
        this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });
        this.successHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
    }
    // action methods
    // navigate directly to Checkout Page
    async navigateToCheckout() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout');
    }
    // fill all the details
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
}
module.exports = { CheckoutPage };