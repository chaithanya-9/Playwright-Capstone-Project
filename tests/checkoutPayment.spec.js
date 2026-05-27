const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Checkout and Payment Service', () => {

    // test 1
    test('Test-01: Proceed to checkout as a Guest user', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to the Checkout page
        await checkoutPage.navigateToCheckout();
        await checkoutPage.guestCheckoutRadioButton.check();
        // use timeout to give OpenCart's older jQuery backend 500ms to register the radio button change before attempting to click continue
        await page.waitForTimeout(500);
        await checkoutPage.accountContinueButton.click();
        // fill out the guest form
        const uniqueEmail = `guestuser_${Date.now()}@test.com`;
        await checkoutPage.fillGuestDetails('John', 'Wick', uniqueEmail, '1234567890', '123 Main St', 'New York', '10001', 'United States', 'New York');
        await checkoutPage.guestContinueButton.click();
        await checkoutPage.shippingMethodContinueButton.click();
        await checkoutPage.termsCheckbox.check();
        await checkoutPage.paymentMethodContinueButton.click();
        await checkoutPage.confirmOrderButton.click();
        // verify success page
        await expect(checkoutPage.successHeading).toBeVisible();
        await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
    });

    // test 02
    test('Test-02: Proceed to checkout as a logged-in user', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        // clear the cart items
        await page.locator('#cart > button').click();
        const itemsInCart = await page.getByTitle('Remove').count();
        if (itemsInCart > 0) {
            for (let i = 0; i < itemsInCart; i++) {
                await page.getByTitle('Remove').click();
                await page.waitForTimeout(500);
            }
        } else {
            await page.locator('#cart > button').click();
        }
        // add this product to cart
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        // OpenCart asked only for the first time so comment this
        // await checkoutPage.fillUserDetails('John', 'Wick', '123 Main St', 'New York', '10001', 'United States', 'New York');
        // next time for registered mail we can direclty click continue button 
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.shippingMethodContinueButton.click();
        await page.waitForTimeout(500);
        await checkoutPage.termsCheckbox.check();
        // to let jQuery register the checkbox before clicking continue
        await page.waitForTimeout(500);
        await checkoutPage.paymentMethodContinueButton.click();
        await expect(checkoutPage.confirmOrderButton).toBeVisible();
        await checkoutPage.confirmOrderButton.click();
        // verify success page
        await expect(checkoutPage.successHeading).toBeVisible();
        await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
    });

    // test 03
    test('Test-03: Verify mandatory fields in the Billing Details step', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        await checkoutPage.navigateToCheckout();
        await checkoutPage.guestCheckoutRadioButton.check();
        await page.waitForTimeout(500);
        await checkoutPage.accountContinueButton.click();
        // attempt to submit a blank form
        await expect(checkoutPage.firstNameInput).toBeVisible();
        await checkoutPage.guestContinueButton.click();
        // verify mandatory field warnings appear
        await expect(checkoutPage.inputFieldWarning.first()).toBeVisible();
        // assert specific text warnings to ensure the right fields failed
        await expect(page.locator('text=First Name must be between 1 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Last Name must be between 1 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=E-Mail address does not appear to be valid!')).toBeVisible();
        await expect(page.locator('text=Telephone must be between 3 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Address 1 must be between 3 and 128 characters!')).toBeVisible();
        await expect(page.locator('text=City must be between 2 and 128 characters!')).toBeVisible();
    });

    // test 04
    test('Test-04: Verify mandatory fields in the delivery details step', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        // navigate to login and authenticate
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        // proceed with existing address
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.newDeliveryAddressRadioButton.check();
        await page.waitForTimeout(500);
        // attempt to submit the blank delivery form
        await checkoutPage.deliveryAddressContinueBtn.click();
        // verify mandatory field warnings appear for delivery form
        await expect(checkoutPage.inputFieldWarning.first()).toBeVisible();
        // assert specific text warnings
        await expect(page.locator('text=First Name must be between 1 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Last Name must be between 1 and 32 characters!')).toBeVisible();
        await expect(page.locator('text=Address 1 must be between 3 and 128 characters!')).toBeVisible();
        await expect(page.locator('text=City must be between 2 and 128 characters!')).toBeVisible();
    });

    // test 05
    test('Test-05: Select delivery method flat shipping rate and proceed', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        await checkoutPage.navigateToCheckout();
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        // delivery method, select flat shipping and proceed
        await expect(checkoutPage.shippingMethodContinueButton).toBeVisible();
        await checkoutPage.flatShippingRateRadio.check();
        await expect(checkoutPage.flatShippingRateRadio).toBeChecked();
        await page.waitForTimeout(500);
        await checkoutPage.shippingMethodContinueButton.click();
        // verify payment method accordion opens successfully
        await expect(checkoutPage.paymentMethodContinueButton).toBeVisible();
    });

    // test 06
    test('Test-06: Add comments to the order during the delivery method step', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        // navigate to login and authenticate
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        // clear the cart items
        await page.locator('#cart > button').click();
        const itemsInCart = await page.getByTitle('Remove').count();
        if (itemsInCart > 0) {
            for (let i = 0; i < itemsInCart; i++) {
                await page.getByTitle('Remove').click();
                await page.waitForTimeout(500);
            }
        } else {
            await page.locator('#cart > button').click();
        }
        // add this product to cart
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        // delivery method, add comment and proceed
        await expect(checkoutPage.shippingMethodContinueButton).toBeVisible();
        await checkoutPage.deliveryMethodCommentBox.fill('Please leave the package at the front door');
        await page.waitForTimeout(500);
        await checkoutPage.shippingMethodContinueButton.click();
        // verify payment method accordion opens successfully
        await expect(checkoutPage.paymentMethodContinueButton).toBeVisible();
    });

    // test 07
    test('Test-07: Select Cash On Delivery as the payment method', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        // navigate to login page and authenticate
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        // clear the cart items
        await page.locator('#cart > button').click();
        const itemsInCart = await page.getByTitle('Remove').count();
        if (itemsInCart > 0) {
            for (let i = 0; i < itemsInCart; i++) {
                await page.getByTitle('Remove').first().click();
                await page.waitForTimeout(500);
            }
        } else {
            await page.locator('#cart > button').click();
        }
        // add this product to cart
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        await expect(checkoutPage.shippingMethodContinueButton).toBeVisible();
        await checkoutPage.shippingMethodContinueButton.click();
        // payment method, select COD and agree to terms
        await expect(checkoutPage.codRadioButton).toBeVisible();
        await checkoutPage.codRadioButton.check();
        await expect(checkoutPage.codRadioButton).toBeChecked();
        await checkoutPage.termsCheckbox.check();
        await page.waitForTimeout(500);
        await checkoutPage.paymentMethodContinueButton.click();
        // verify confirm order step opens successfully
        await expect(checkoutPage.confirmOrderButton).toBeVisible();
    });

    // test 08
    test('Test-08: Validate the terms and conditions checkbox behavior', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        // navigate to login page and authenticate
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        // clear the cart items
        await page.locator('#cart > button').click();
        const itemsInCart = await page.getByTitle('Remove').count();
        if (itemsInCart > 0) {
            for (let i = 0; i < itemsInCart; i++) {
                await page.getByTitle('Remove').first().click();
                await page.waitForTimeout(500);
            }
        } else {
            await page.locator('#cart > button').click();
        }
        // add this product to cart
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        await expect(checkoutPage.shippingMethodContinueButton).toBeVisible();
        await checkoutPage.shippingMethodContinueButton.click();
        // payment method, attempt to proceed without checking terms
        await expect(checkoutPage.paymentMethodContinueButton).toBeVisible();
        await page.waitForTimeout(500);
        await checkoutPage.paymentMethodContinueButton.click();
        // verify terms and conditions warning banner appears
        await expect(checkoutPage.warningBanner).toBeVisible();
        await expect(checkoutPage.warningBanner).toContainText('Warning: You must agree to the Terms & Conditions!');
    });

    // test 09
    test('Test-09: Verify order summary in the confirm order step matches cart items', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        // navigate to login page and authenticate
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        // clear the cart items
        await page.locator('#cart > button').click();
        const itemsInCart = await page.getByTitle('Remove').count();
        if (itemsInCart > 0) {
            for (let i = 0; i < itemsInCart; i++) {
                await page.getByTitle('Remove').first().click();
                await page.waitForTimeout(500);
            }
        } else {
            await page.locator('#cart > button').click();
        }
        // add this product to cart
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.shippingMethodContinueButton.click();
        await page.waitForTimeout(500);
        await expect(checkoutPage.paymentMethodContinueButton).toBeVisible();
        await checkoutPage.termsCheckbox.check();
        await checkoutPage.paymentMethodContinueButton.click();
        // verify product name matches
        await expect(checkoutPage.confirmOrderButton).toBeVisible();
        await expect(checkoutPage.confirmProductName).toBeVisible();
        await expect(checkoutPage.confirmProductName).toHaveText('HP LP3065');
    });

    // test 10
    test('Test-10: Confirm the order and verify the success page', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        // navigate to login and authenticate
        await checkoutPage.navigate();
        await checkoutPage.navigateToLogin();
        await loginPage.login('demotest@gmail.com', 'demotest');
        // clear the cart items
        await page.locator('#cart > button').click();
        const itemsInCart = await page.getByTitle('Remove').count();
        if (itemsInCart > 0) {
            for (let i = 0; i < itemsInCart; i++) {
                await page.getByTitle('Remove').first().click();
                await page.waitForTimeout(500);
            }
        } else {
            await page.locator('#cart > button').click();
        }
        // add this product to cart
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
        await page.locator('#button-cart').click();
        await expect(page.locator('.alert-success')).toBeVisible();
        // navigate directly to checkout page
        await checkoutPage.navigateToCheckout();
        await page.waitForTimeout(500);
        await checkoutPage.billingAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await checkoutPage.deliveryAddressContinueBtn.click();
        await page.waitForTimeout(500);
        await expect(checkoutPage.shippingMethodContinueButton).toBeVisible();
        await checkoutPage.shippingMethodContinueButton.click();
        await page.waitForTimeout(500);
        await expect(checkoutPage.paymentMethodContinueButton).toBeVisible();
        await checkoutPage.termsCheckbox.check();
        await checkoutPage.paymentMethodContinueButton.click();
        await page.waitForTimeout(500);
        await expect(checkoutPage.confirmOrderButton).toBeVisible();
        await checkoutPage.confirmOrderButton.click();
        // verify success page
        await expect(checkoutPage.successHeading).toBeVisible();
        await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
    });

})