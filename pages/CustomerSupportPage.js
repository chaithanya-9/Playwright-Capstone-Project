const { BasePage } = require('./BasePage');

class CustomerSupportPage extends BasePage {
    constructor(page) {
        super(page);
        // contact us form locators
        this.contactNameInput = page.locator('#input-name');
        this.contactEmailInput = page.locator('#input-email');
        this.contactEnquiryInput = page.locator('#input-enquiry');
        this.contactSubmitButton = page.getByRole('button', { name: 'Submit' });
        // returns form locators
        this.returnFirstNameInput = page.locator('#input-firstname');
        this.returnLastNameInput = page.locator('#input-lastname');
        this.returnEmailInput = page.locator('#input-email');
        this.returnTelephoneInput = page.locator('#input-telephone');
        this.returnOrderIdInput = page.locator('#input-order-id');
        this.returnProductNameInput = page.getByRole('textbox', { name: '* Product Name' });
        this.returnProductCodeInput = page.getByRole('textbox', { name: '* Product Code' });
        this.returnReasonRadio = page.locator('input[name="return_reason_id"]').first();
        this.returnSubmitButton = page.getByRole('button', { name: 'Submit' });
        // success and warning banners
        this.successAlert = page.locator('.alert-success');
        this.warningAlert = page.locator('.alert-danger');
        this.fieldWarning = page.locator('.text-danger');
    }
    // navigate directly to the Contact Us page
    async navigateToContactUs() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=information/contact');
    }
    // navigate directly to the Product Returns form
    async navigateToReturns() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/return/add');
    }
    // navigate directly to the Site Map page
    async navigateToSiteMap() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap');
    }
    // fills and submits the contact us form
    async fillContactForm(name, email, enquiry) {
        await this.contactNameInput.fill(name);
        await this.contactEmailInput.fill(email);
        await this.contactEnquiryInput.fill(enquiry);
        await this.contactSubmitButton.click();
    }
    // fills all mandatory fields on the returns form
    async fillReturnForm(firstName, lastName, email, telephone, orderId, productName, productCode) {
        await this.returnFirstNameInput.fill(firstName);
        await this.returnLastNameInput.fill(lastName);
        await this.returnEmailInput.fill(email);
        await this.returnTelephoneInput.fill(telephone);
        await this.returnOrderIdInput.fill(orderId);
        await this.returnProductNameInput.fill(productName);
        await this.returnProductCodeInput.fill(productCode);
    }
}

module.exports = { CustomerSupportPage };