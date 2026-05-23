const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        // form input locators
        // personal details 
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        // password details
        this.passwordInput = page.getByRole('textbox', { name: '* Password', exact: true });
        this.passwordConfirmInput = page.getByRole('textbox', { name: '* Password Confirm' });
        this.privacyPolicyCheckbox = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        // main warning like duplicate email or checkbox not checked 
        this.mainWarningMessage = page.locator('.alert-danger');
        // input field missing warning
        this.inputFieldWarning = page.locator('.text-danger');
        // input radio field for Newsletter
        this.newsletterRadioYes = page.getByRole('radio', { name: 'yes' });
    }
    // fills all mandatory and optional text fields in the registration form
    async fillRegistrationForm(firstName, lastName, email, telephone, password) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.passwordConfirmInput.fill(password);
    }
    // clicks the mandatory privacy policy checkbox before submission
    async checkPrivacyPolicy() {
        await this.privacyPolicyCheckbox.check();
    }
    async clickContinue() {
        await this.continueButton.click();
    }
}

module.exports = { RegisterPage };