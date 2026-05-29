# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: authentication.spec.js >> Authentication Service Tests >> Test-15: Verify unauthorized URL access redirects to login
- Location: tests/authentication.spec.js:239:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/account", waiting until "load"

```

# Test source

```ts
  141 |         const uniqueMailId = `newUser${Date.now()}@gmail.com`;
  142 |         const uniqueTelephone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
  143 |         // fill the fields
  144 |         await registerPage.fillRegistrationForm('new', 'user', uniqueMailId, uniqueTelephone, 'oldPassword');
  145 |         // override the confirm password field
  146 |         await registerPage.passwordConfirmInput.fill('differentPassword');
  147 |         await registerPage.checkPrivacyPolicy();
  148 |         await registerPage.clickContinue();
  149 |         // verify the system catches the password mismatch and throws field level warning
  150 |         await expect(registerPage.inputFieldWarning).toContainText('Password confirmation does not match password!');
  151 |     });
  152 | 
  153 |     // test 10
  154 |     test('Test-10: Verify registration fails if the privacy policy checkbox not checked', async ({ page }) => {
  155 |         const registerPage = new RegisterPage(page);
  156 |         // navigate to website and open registration page
  157 |         await registerPage.navigate();
  158 |         await registerPage.navigateToRegister();
  159 |         // generate unique data so test never fails
  160 |         const uniqueMailId = `newUser${Date.now()}@gmail.com`;
  161 |         const uniquePassword = `newUser${Date.now()}`;
  162 |         const uniqueTelephone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
  163 |         // fill the mandatory fields
  164 |         await registerPage.fillRegistrationForm('new', 'user', uniqueMailId, uniqueTelephone, uniquePassword);
  165 |         // attempt submit the form
  166 |         await registerPage.clickContinue();
  167 |         // verify the system blocks registration and throws the top level privacy policy warning
  168 |         await expect(registerPage.mainWarningMessage).toContainText(' Warning: You must agree to the Privacy Policy!');
  169 |     });
  170 | 
  171 |     // test 11
  172 |     test('Test-11: Verify all mandatory warning messages appear when submitting a blank registration form', async ({ page }) => {
  173 |         const registerPage = new RegisterPage(page);
  174 |         // navigate to website and open registration page
  175 |         await registerPage.navigate();
  176 |         await registerPage.navigateToRegister();
  177 |         await registerPage.clickContinue();
  178 |         // verify top level privacy policy warning appears
  179 |         await expect(registerPage.mainWarningMessage).toContainText(' Warning: You must agree to the Privacy Policy!');
  180 |         // verify exactly 5 error messages appear under input fields
  181 |         await expect(registerPage.inputFieldWarning).toHaveCount(5);
  182 |         // verify exact text of every single input field error 
  183 |         // used .toHaveText() instead of .toContainText() is because here we are checking exact match with the errors so toHaveText will check strictly for the given text
  184 |         await expect(registerPage.inputFieldWarning).toHaveText([
  185 |             'First Name must be between 1 and 32 characters!',
  186 |             'Last Name must be between 1 and 32 characters!',
  187 |             'E-Mail Address does not appear to be valid!',
  188 |             'Telephone must be between 3 and 32 characters!',
  189 |             'Password must be between 4 and 20 characters!'
  190 |         ])
  191 |     });
  192 | 
  193 |     // test 12
  194 |     test('Test-12: Verify the Forgot Password successfully sends a reset link with a registered email', async ({ page }) => {
  195 |         // initialize both page objects 
  196 |         const loginPage = new LoginPage(page);
  197 |         const forgotPasswordPage = new ForgotPasswordPage(page);
  198 |         // Navigate to the login screen first
  199 |         await loginPage.navigate();
  200 |         await loginPage.navigateToLogin();
  201 |         await loginPage.clickForgotPassword();
  202 |         // use a already registered email
  203 |         const validEmail = 'demotest@gmail.com';
  204 |         await forgotPasswordPage.requestPasswordReset(validEmail);
  205 |         // verify the system throws green success message
  206 |         await expect(forgotPasswordPage.successMessage).toContainText(' An email with a confirmation link has been sent your email address.');
  207 |     });
  208 | 
  209 |     // test 13
  210 |     test('Test-13: Verify the Forgot Password displays error message warning for unregistered email', async ({ page }) => {
  211 |         // initialize both page objects 
  212 |         const loginPage = new LoginPage(page);
  213 |         const forgotPasswordPage = new ForgotPasswordPage(page);
  214 |         // Navigate to the login screen first
  215 |         await loginPage.navigate();
  216 |         await loginPage.navigateToLogin();
  217 |         await loginPage.clickForgotPassword();
  218 |         // generate a unique, unregistered email
  219 |         const invalidEmail = `invalid${Date.now()}@gmail.com`;
  220 |         await forgotPasswordPage.requestPasswordReset(invalidEmail);
  221 |         // verify the system rejects the request and throws a warning message
  222 |         await expect(forgotPasswordPage.warningMessage).toContainText(' Warning: The E-Mail Address was not found in our records, please try again!');
  223 |     });
  224 | 
  225 |     // test 14
  226 |     test('Test-14: Verify successful logout from the top dropdown', async ({ page }) => {
  227 |         const loginPage = new LoginPage(page);
  228 |         await loginPage.navigate();
  229 |         await loginPage.navigateToLogin();
  230 |         // using valid account
  231 |         await loginPage.login('demotest@gmail.com', 'demotest');
  232 |         // we use loginPage itself to call clickLogout() because loginPage extends BasePage
  233 |         await loginPage.clickLogout();
  234 |         // verify the system successfully routed to the logout confirmation page
  235 |         await expect(page).toHaveURL(/.*route=account\/logout/);
  236 |     });
  237 | 
  238 |     // test 15
  239 |     test('Test-15: Verify unauthorized URL access redirects to login', async ({ page }) => {
  240 |         // we attempt to load the secured "My Account" dashboard directly without logging in
> 241 |         await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
      |                    ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  242 |         // verify the system catches the unauthorized access and forcefully redirects us to the login screen
  243 |         await expect(page).toHaveURL(/.*route=account\/login/);
  244 |     });
  245 | 
  246 |     // test 16
  247 |     // .fail because this test will fail as website has a bug
  248 |     test.fail('Test-16: Verify session invalidation on browser back button', async ({ page }) => {
  249 |         const loginPage = new LoginPage(page);
  250 |         // log in with a valid account
  251 |         await loginPage.navigate();
  252 |         await loginPage.navigateToLogin();
  253 |         await loginPage.login('demotest@gmail.com', 'demotest');
  254 |         await loginPage.clickLogout();
  255 |         // wait for the logout page to fully load so we know the session is destroyed
  256 |         await expect(page).toHaveURL(/.*route=account\/logout/);
  257 |         // .goBack() will work like user clicks back button on browser
  258 |         await page.goBack();
  259 |         // verify the system blocks access to the account dashboard
  260 |         await expect(page).toHaveURL(/.*route=account\/login/);
  261 |     });
  262 | });
```