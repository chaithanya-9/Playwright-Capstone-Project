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
        // await expect(checkoutPage.deliveryAddressContinueBtn).toBeVisible();
        await checkoutPage.deliveryAddressContinueBtn.click();
        await page.waitForTimeout(500);
        // await expect(checkoutPage.shippingMethodContinueButton).toBeVisible();
        await checkoutPage.shippingMethodContinueButton.click();
        await page.waitForTimeout(500);
        // await expect(checkoutPage.termsCheckbox).toBeVisible();
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
})