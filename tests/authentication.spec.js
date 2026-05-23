const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const { RegisterPage } = require('../pages/RegisterPage.js');

// group all the tests of authentication service
test.describe('Authentication Service Tests', () => {

    // test 01 
    test('Test-01: Verify successfull login with valid credentials', async ({ page }) => {
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

    // test 02
    test('Test-02: Verify login fails with invalid credentials', async ({ page }) => {
        // initialize page object
        const loginPage = new LoginPage(page);
        // navigate to website and open login page
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        // generate unique email everytime test runs so OpenCart doest exceeds login attempts for same email
        const uniqueMailId = `fakeEmail${Date.now()}@gmail.com`;
        // login with invalid credentials
        await loginPage.login(uniqueMailId, 'fakeLogin');
        // verify error message
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toContain('Warning: No match for E-Mail Address and/or Password.')
    });

    // test 03
    test('Test-03: Verify login fails with invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        // navigate to website and open login page
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        // login with invalid email format (missing .com in email) but valid credentials
        await loginPage.login('demotest@gmail', 'demotest');
        // verify error message 
        // used .toContainText() instead of .toContain() because .toContainText() automatically waits for the text to render first and its  more efficient
        // and we can direclty pass the locator no need to fetch the error message using getErrorMessage() method
        await expect(loginPage.errorMessage).toContainText(/ Warning: No match for E-Mail Address and\/or Password.| Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour./);
    });

    // test 04
    test('Test-04: Verify login fails when submitting empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);
        // navigate to website and open login page
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        // passing empty strings as parameters
        await loginPage.login('', '');
        // verify error message
        await expect(loginPage.errorMessage).toContainText(/ Warning: No match for E-Mail Address and\/or Password.| Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour./);
    });

    // test 05
    test('Test-05: Verify successful login can be triggered by pressing the Keyboard Enter key', async ({ page }) => {
        const loginPage = new LoginPage(page);
        // navigate to website and open login page
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        // fill credentials without using login() method as it directly clicks login button
        await loginPage.emailInput.fill('demotest@gmail.com');
        await loginPage.passwordInput.fill('demotest');
        // press enter while in password input
        await loginPage.passwordInput.press('Enter');
        // check if page redirected to my account page
        await expect(page).toHaveURL(/.*route=account\/account/);
    });

    // test 06
    test('Test-06: Verify successful registration with ONLY mandatory fields filled', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        // navigate to website and open registration page
        await registerPage.navigate();
        await registerPage.navigateToRegister();
        // use Date.now() to concat in mailId using template literals so mailId will become unique and test never fails due to duplicate mailId's
        const uniqueMailId = `newUser${Date.now()}@gmail.com`;
        // generate unique telephone number using Math.random() to generate random number and padStart() will make sure it to be exactly 8 chars
        const uniqueTelephone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
        // generate unique password 
        const uniquePassword = `newUser${Date.now()}`;
        await registerPage.fillRegistrationForm('new', 'user', uniqueMailId, uniqueTelephone, uniquePassword);
        await registerPage.checkPrivacyPolicy();
        await registerPage.clickContinue();
        // verify successful registration by checking the URL for the success routing
        await expect(page).toHaveURL(/.*route=account\/success/);
    });
});