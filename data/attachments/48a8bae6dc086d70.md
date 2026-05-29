# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: authentication.spec.js >> Authentication Service Tests >> Test-16: Verify session invalidation on browser back button
- Location: tests/authentication.spec.js:248:10

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*route=account\/login/
Received string:  "https://naveenautomationlabs.com/opencart/index.php?route=account/account"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "https://naveenautomationlabs.com/opencart/index.php?route=account/account"

```

```yaml
- navigation:
  - button "$ Currency ":
    - strong: $
    - text: Currency 
  - list:
    - listitem:
      - link "":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
      - text: "123456789"
    - listitem:
      - link " My Account":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
    - listitem:
      - link " Wish List (0)":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
    - listitem:
      - link " Shopping Cart":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart
    - listitem:
      - link " Checkout":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout
- banner:
  - link "naveenopencart":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
    - img "naveenopencart"
  - textbox "Search"
  - button ""
  - button " 0 item(s) - $0.00"
- navigation:
  - list:
    - listitem:
      - link "Desktops":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20
    - listitem:
      - link "Laptops & Notebooks":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=18
    - listitem:
      - link "Components":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=25
    - listitem:
      - link "Tablets":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=57
    - listitem:
      - link "Software":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=17
    - listitem:
      - link "Phones & PDAs":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=24
    - listitem:
      - link "Cameras":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=33
    - listitem:
      - link "MP3 Players":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=34
- list:
  - listitem:
    - link "":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
  - listitem:
    - link "Account":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
- heading "My Account" [level=2]
- list:
  - listitem:
    - link "Edit your account information":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/edit
  - listitem:
    - link "Change your password":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/password
  - listitem:
    - link "Modify your address book entries":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
  - listitem:
    - link "Modify your wish list":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
- heading "My Orders" [level=2]
- list:
  - listitem:
    - link "View your order history":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
  - listitem:
    - link "Downloads":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
  - listitem:
    - link "Your Reward Points":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
  - listitem:
    - link "View your return requests":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
  - listitem:
    - link "Your Transactions":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
  - listitem:
    - link "Recurring payments":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
- heading "My Affiliate Account" [level=2]
- list:
  - listitem:
    - link "Register for an affiliate account":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/affiliate/add
- heading "Newsletter" [level=2]
- list:
  - listitem:
    - link "Subscribe / unsubscribe to newsletter":
      - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
- complementary:
  - link "My Account":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
  - link "Edit Account":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/edit
  - link "Password":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/password
  - link "Address Book":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
  - link "Wish List":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
  - link "Order History":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
  - link "Downloads":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
  - link "Recurring payments":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
  - link "Reward Points":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
  - link "Returns":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
  - link "Transactions":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
  - link "Newsletter":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
  - link "Logout":
    - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/logout
- contentinfo:
  - heading "Information" [level=5]
  - list:
    - listitem:
      - link "About Us":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4
    - listitem:
      - link "Delivery Information":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6
    - listitem:
      - link "Privacy Policy":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3
    - listitem:
      - link "Terms & Conditions":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5
  - heading "Customer Service" [level=5]
  - list:
    - listitem:
      - link "Contact Us":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
    - listitem:
      - link "Returns":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return/add
    - listitem:
      - link "Site Map":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap
  - heading "Extras" [level=5]
  - list:
    - listitem:
      - link "Brands":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/manufacturer
    - listitem:
      - link "Gift Certificates":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/voucher
    - listitem:
      - link "Affiliate":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=affiliate/login
    - listitem:
      - link "Specials":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/special
  - heading "My Account" [level=5]
  - list:
    - listitem:
      - link "My Account":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
    - listitem:
      - link "Order History":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
    - listitem:
      - link "Wish List":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
    - listitem:
      - link "Newsletter":
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
  - separator
  - paragraph:
    - text: Powered By
    - link "OpenCart":
      - /url: http://www.opencart.com
    - text: naveenopencart © 2026
```

# Test source

```ts
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
  241 |         await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/account');
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
> 260 |         await expect(page).toHaveURL(/.*route=account\/login/);
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  261 |     });
  262 | });
```