const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');

// .describe() groups all the tests
test.describe('Authentication Service Tests', () => {

    // test 01 
    test('Test-01: Successful login with valid credentials', async ({ page }) => {

        // initialize page object
        const loginPage = new LoginPage(page);

        // navigate to website (navigate() method inherited from BasePage)
        await loginPage.navigate();

        // navigate to login page 
        await loginPage.navigateToLogin();

        // login with valid credentials
        // manually registered with demotest@gmail.com 
        await loginPage.login('demotest@gmail.com', 'demotest');

        // check if page redirected to my account page
        await expect(page).toHaveURL(/.*route=account\/account/);
    });
});