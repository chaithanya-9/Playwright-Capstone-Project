const { BasePage } = require('./BasePage');

class ForgotPasswordPage extends BasePage {
    constructor(page) {
        super(page);
        // input and button locators
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        // validation message locators
        this.successMessage = page.locator('.alert-success');
        this.warningMessage = page.locator('.alert-danger');
    }
    // action method to submit the password reset form
    async requestPasswordReset(email) {
        await this.emailInput.fill(email);
        await this.continueButton.click();
    }
}
module.exports = { ForgotPasswordPage };