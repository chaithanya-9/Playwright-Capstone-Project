const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {

    constructor(page) {
        super(page); // passes page to BasePage constructor

        // login page locators
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });

        // locators fro validation and negative testing
        this.errorMessage = page.locator('.alert-danger');
        this.forgotPasswordButton = page.locator('#content').getByRole('link', { name: 'Forgotten Password' });
        this.newCustomerContinueButton = page.locator('a:has-text("Continue")');
    }

    // fill credentials and login
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // error message
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    //navigate to forgot password page
    async clickForgotPassword() {
        await this.forgotPasswordButton.click();
    }
}

module.exports = { LoginPage };