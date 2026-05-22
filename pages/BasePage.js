class BasePage {
    constructor(page) {
        this.page = page;
        // global locators
        this.searchBox = page.getByRole('textbox', { name: 'search' });
        this.searchButton = page.locator('#search').getByRole('button');
        // header locators
        this.myAccountDropdown = page.getByRole('link', { name: ' My Account' });
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.loginLink = page.locator('#top-links').getByRole('link', { name: 'Login' });
        this.shoppingCartLink = page.locator('a[title="Shopping Cart"]');
        this.checkoutLink = page.locator('a[title="Checkout"]');
    }
    // navigate to the base URL
    async navigate() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/');
    }
    // search for product
    async searchForProduct(keyword) {
        await this.searchBox.fill(keyword);
        await this.searchButton.click();
    }
    // open My Account dropdown from header
    async clickMyAccount() {
        await this.myAccountDropdown.click();
    }
    // navigate directly to login page
    async navigateToLogin() {
        await this.clickMyAccount();
        await this.loginLink.click();
    }
    // navigate directly to register page
    async navigateToRegister() {
        await this.clickMyAccount();
        await this.registerLink.click();
    }
}
module.exports = { BasePage };