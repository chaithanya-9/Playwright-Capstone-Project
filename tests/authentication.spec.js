const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const { RegisterPage } = require('../pages/RegisterPage.js');
const { ForgotPasswordPage } = require('../pages/ForgotPasswordPage.js');
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
        // verify error message using Web-First assertion with rate limit fallback
        await expect(loginPage.errorMessage).toContainText(/ Warning: No match for E-Mail Address and\/or Password.| Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour./);
    });

    // test 03
    test('Test-03: Verify login fails with invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        // navigate to website and open login page
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        // login with invalid email format (missing .com in email) but valid credentials
        await loginPage.login('demotest@gmail', 'demotest');
        // verify error message using Web-First assertion with rate limit fallback
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
        // verify error message, two conditions using OR operator in regexp one is original error message and another is rate limit error message
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

    // test 07
    test('Test-07: Verify successfull registration with mandatory and optional fields', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        // navigate to website and open registration page
        await registerPage.navigate();
        await registerPage.navigateToRegister();
        // generate unique data so test never fails
        const uniqueMailId = `newUser${Date.now()}@gmail.com`;
        const uniquePassword = `newUser${Date.now()}`;
        const uniqueTelephone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
        // fill the mandatory fields
        await registerPage.fillRegistrationForm('new', 'user', uniqueMailId, uniqueTelephone, uniquePassword);
        // select yes to newsletter 
        await registerPage.selectNewsletter();
        await registerPage.checkPrivacyPolicy();
        await registerPage.clickContinue();
        // verify successful registration by checking the URL for the success routing
        await expect(page).toHaveURL(/.*route=account\/success/);
    });

    // test 08
    test('Test-08: Verify registration fails if duplicate mailID is used', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        // navigate to website and open registration page
        await registerPage.navigate();
        await registerPage.navigateToRegister();
        // intentionally use an email that is already registered in the OpenCart database
        const existingEmail = 'demotest@gmail.com';
        // fill the mandatory fields
        await registerPage.fillRegistrationForm('Duplicate', 'User', existingEmail, '9800000000', 'password123');
        await registerPage.checkPrivacyPolicy();
        await registerPage.clickContinue();
        // verify the system rejects the registration and throws duplicate email warning
        await expect(registerPage.mainWarningMessage).toContainText(' Warning: E-Mail Address is already registered!');
    });

    // test 09
    test('Test-09: Verify registration fails if password and confirm password does not match', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        // navigate to website and open registration page
        await registerPage.navigate();
        await registerPage.navigateToRegister();
        // generate unique data so test never fails
        const uniqueMailId = `newUser${Date.now()}@gmail.com`;
        const uniqueTelephone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
        // fill the fields
        await registerPage.fillRegistrationForm('new', 'user', uniqueMailId, uniqueTelephone, 'oldPassword');
        // override the confirm password field
        await registerPage.passwordConfirmInput.fill('differentPassword');
        await registerPage.checkPrivacyPolicy();
        await registerPage.clickContinue();
        // verify the system catches the password mismatch and throws field level warning
        await expect(registerPage.inputFieldWarning).toContainText('Password confirmation does not match password!');
    });

    // test 10
    test('Test-10: Verify registration fails if the privacy policy checkbox not checked', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        // navigate to website and open registration page
        await registerPage.navigate();
        await registerPage.navigateToRegister();
        // generate unique data so test never fails
        const uniqueMailId = `newUser${Date.now()}@gmail.com`;
        const uniquePassword = `newUser${Date.now()}`;
        const uniqueTelephone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
        // fill the mandatory fields
        await registerPage.fillRegistrationForm('new', 'user', uniqueMailId, uniqueTelephone, uniquePassword);
        // attempt submit the form
        await registerPage.clickContinue();
        // verify the system blocks registration and throws the top level privacy policy warning
        await expect(registerPage.mainWarningMessage).toContainText(' Warning: You must agree to the Privacy Policy!');
    });

    // test 11
    test('Test-11: Verify all mandatory warning messages appear when submitting a blank registration form', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        // navigate to website and open registration page
        await registerPage.navigate();
        await registerPage.navigateToRegister();
        await registerPage.clickContinue();
        // verify top level privacy policy warning appears
        await expect(registerPage.mainWarningMessage).toContainText(' Warning: You must agree to the Privacy Policy!');
        // verify exactly 5 error messages appear under input fields
        await expect(registerPage.inputFieldWarning).toHaveCount(5);
        // verify exact text of every single input field error 
        // used .toHaveText() instead of .toContainText() is because here we are checking exact match with the errors so toHaveText will check strictly for the given text
        await expect(registerPage.inputFieldWarning).toHaveText([
            'First Name must be between 1 and 32 characters!',
            'Last Name must be between 1 and 32 characters!',
            'E-Mail Address does not appear to be valid!',
            'Telephone must be between 3 and 32 characters!',
            'Password must be between 4 and 20 characters!'
        ])
    });

    // test 12
    test('Test-12: Verify the Forgot Password successfully sends a reset link with a registered email', async ({ page }) => {
        // initialize both page objects 
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);
        // Navigate to the login screen first
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        await loginPage.clickForgotPassword();
        // use a already registered email
        const validEmail = 'demotest@gmail.com';
        await forgotPasswordPage.requestPasswordReset(validEmail);
        // verify the system throws green success message
        await expect(forgotPasswordPage.successMessage).toContainText(' An email with a confirmation link has been sent your email address.');
    });

    // test 13
    test('Test-13: Verify the Forgot Password displays error message warning for unregistered email', async ({ page }) => {
        // initialize both page objects 
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);
        // Navigate to the login screen first
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        await loginPage.clickForgotPassword();
        // generate a unique, unregistered email
        const invalidEmail = `invalid${Date.now()}@gmail.com`;
        await forgotPasswordPage.requestPasswordReset(invalidEmail);
        // verify the system rejects the request and throws a warning message
        await expect(forgotPasswordPage.warningMessage).toContainText(' Warning: The E-Mail Address was not found in our records, please try again!');
    });

    // test 14
    test('Test-14: Verify successful logout from the top dropdown', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.navigateToLogin();
        // using valid account
        await loginPage.login('demotest@gmail.com', 'demotest');
        // we use loginPage itself to call clickLogout() because loginPage extends BasePage
        await loginPage.clickLogout();
        // verify the system successfully routed to the logout confirmation page
        await expect(page).toHaveURL(/.*route=account\/logout/);
    });

    // test 15
    test('Test-15: Verify unauthorized URL access redirects to login', async ({ page }) => {
        // we attempt to load the secured "My Account" dashboard directly without logging in
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
        // verify the system catches the unauthorized access and forcefully redirects us to the login screen
        await expect(page).toHaveURL(/.*route=account\/login/);
    });

});