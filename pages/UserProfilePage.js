const { BasePage } = require('./BasePage');

class UserProfilePage extends BasePage {
    constructor(page) {
        super(page);
        // captures the entire right-side navigation menu for validation in tests
        this.rightColumnMenu = page.locator('.list-group');
        // my Account block links locators 
        this.editAccountLink = page.getByRole('link', { name: 'Edit your account information' });
        this.changePasswordLink = page.getByRole('link', { name: 'Change your password' });
        // my orders block links locators
        this.orderHistoryLink = page.getByRole('link', { name: 'View your order history' });
        this.downloadsLink = this.rightColumnMenu.getByRole('link', { name: 'Downloads', exact: true });
        this.rewardPointsLink = page.getByRole('link', { name: 'Your Reward Points' });
        this.returnsLink = page.getByRole('link', { name: 'View your return requests' });
        this.transactionsLink = page.getByRole('link', { name: 'Your Transactions' });
        // newsletter block links locators
        this.newsletterLink = page.getByRole('link', { name: 'Subscribe / unsubscribe to newsletter' });
        // edit account and password form locators
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.getByRole('textbox', { name: '* Password', exact: true });
        this.passwordConfirmInput = page.getByRole('textbox', { name: '* Password Confirm' });
        // newsletter radio buttons 
        this.newsletterYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.newsletterNoRadio = page.getByRole('radio', { name: 'No' });
        // generic buttons and validation messages
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.backButton = page.getByRole('link', { name: 'Back' });
        this.successMessage = page.locator('.alert-success');
        // for blank field warnings under textboxes
        this.fieldWarningMessage = page.locator('.text-danger');
        this.dashboardContinueButton = page.locator('#content').getByRole('link', { name: 'Continue' });
        this.wishListLink = this.rightColumnMenu.getByRole('link', { name: 'Wish List' });
    }

    // updates user profile information
    async updateAccountInfo(firstName, lastName, telephone) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.telephoneInput.fill(telephone);
        await this.continueButton.click();
    }
    // updates the user's password
    async changePassword(newPassword) {
        await this.passwordInput.fill(newPassword);
        await this.passwordConfirmInput.fill(newPassword);
        await this.continueButton.click();
    }
    // toggles the newsletter subscription based on a boolean input
    async setNewsletterSubscription(subscribe) {
        if (subscribe) {
            await this.newsletterYesRadio.check();
        } else {
            await this.newsletterNoRadio.check();
        }
        await this.continueButton.click();
    }
    // navigate directly to my account dashboard
    async navigateToMyAccount() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
    }
    // navigate directly to edit account page
    async navigateToEditAccount() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/edit');
    }
    // navigate directly to change password page
    async navigateToChangePassword() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/password');
    }
    // navigate directly to newsletter page
    async navigateToNewsletter() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter');
    }
}
module.exports = { UserProfilePage };