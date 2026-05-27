const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/CheckoutPage');

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
})