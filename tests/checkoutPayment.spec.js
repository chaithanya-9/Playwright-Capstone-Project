const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Checkout and Payment Service', () => {

    test.describe('test suits which need to login', () => {
        let productPriceText;
        let exTaxElementText;
        test.beforeEach(async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            // register with generated new user
            await checkoutPage.navigate();
            await checkoutPage.navigateToRegister();
            // fill out the registration form using direct locators to keep the constructor clean
            await page.locator('#input-firstname').fill('Auto');
            await page.locator('#input-lastname').fill(`User${Date.now()}`);
            await page.locator('#input-email').fill(`demotestpro_${Date.now() + Math.floor(Math.random() * 1000)}@test.com`);
            await page.locator('#input-telephone').fill('1234567890');
            await page.locator('#input-password').fill('Password123!');
            await page.locator('#input-confirm').fill('Password123!');
            // agree to Privacy Policy and Submit
            await page.locator('input[name="agree"]').check();
            await page.locator('input[value="Continue"]').click();
            // ensure registration was successful before proceeding
            await expect(page.locator('#content h1')).toHaveText('Your Account Has Been Created!');
            // clear all the cart items if any items present 
            await page.locator('#cart > button').click();
            const itemsInCart = await page.getByTitle('Remove').count();
            if (itemsInCart > 0) {
                for (let i = 0; i < itemsInCart; i++) {
                    await page.getByTitle('Remove').first().click();
                    await expect(page.getByTitle('Remove')).toHaveCount(itemsInCart - i - 1);
                }
            } else {
                // close the minicart if it was already empty
                await page.locator('#cart > button').click();
            }
            // add product to cart
            await page.getByRole('link', { name: 'Laptops & Notebooks', exact: true }).click();
            await page.getByRole('link', { name: 'Show All Laptops & Notebooks' }).click();
            await page.getByRole('link', { name: 'HP LP3065' }).first().click();
            exTaxElementText = await page.locator('li:has-text("Ex Tax:")').innerText();
            productPriceText = exTaxElementText.replace('Ex Tax:', '').trim();
            await page.locator('#button-cart').click();
            await expect(page.locator('.alert-success')).toBeVisible();
            // navigate directly to checkout page
            await checkoutPage.navigateToCheckout();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            // fill billing details 
            await checkoutPage.fillUserDetails('John', 'Wick', '123 Main St', 'New York', '10001', 'United States', 'New York');
        });

        // test 02
        test('Test-02: Proceed to checkout as a logged-in user', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            // wait for billing accordion to open before clicking continue
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            // wait for billing accordion to collapse before proceeding
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            // wait for delivery accordion to open
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            // wait for delivery accordion to collapse
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            // wait for shipping method accordion to open
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            // wait for shipping method accordion to collapse
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            // wait for payment method accordion to open
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            // wait for jQuery to register the checkbox before proceeding
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            // wait for payment method accordion to collapse
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            await checkoutPage.confirmOrderButton.click();
            // verify success page
            await expect(checkoutPage.successHeading).toBeVisible();
            await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
        });

        // test 04
        test('Test-04: Verify mandatory fields in the delivery details step', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            // wait for billing accordion to open and click continue
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            // wait for billing to collapse and delivery to open
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            // select new delivery address to reveal the blank form
            await checkoutPage.newDeliveryAddressRadioButton.check();
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
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            // wait for shipping method section to open
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            // select flat shipping rate and verify it is checked
            await checkoutPage.flatShippingRateRadio.check();
            await expect(checkoutPage.flatShippingRateRadio).toBeChecked();
            await checkoutPage.shippingMethodContinueButton.click();
            // verify payment method accordion opens after shipping method collapses
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
        });

        // test 06
        test('Test-06: Add comments to the order during the delivery method step', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            // wait for shipping section and fill comment before proceeding
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryMethodCommentBox.fill('Please leave the package at the front door');
            await checkoutPage.shippingMethodContinueButton.click();
            // verify payment method accordion opens after shipping method collapses
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
        });

        // test 07
        test('Test-07: Select Cash On Delivery as the payment method', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            // wait for payment method accordion to open
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            // select COD and verify it is checked before proceeding
            await checkoutPage.codRadioButton.check();
            await expect(checkoutPage.codRadioButton).toBeChecked();
            await checkoutPage.termsCheckbox.check();
            // wait for jQuery to register the checkbox before proceeding
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            // verify confirm order step opens after payment method collapses
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
        });

        // test 08
        test('Test-08: Validate the terms and conditions checkbox behavior', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            // wait for payment method accordion to open
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            // attempt to proceed WITHOUT checking terms
            await checkoutPage.paymentMethodContinueButton.click();
            // verify terms and conditions warning banner appears
            await expect(checkoutPage.warningBanner).toBeVisible();
            await expect(checkoutPage.warningBanner).toContainText('Warning: You must agree to the Terms & Conditions!');
        });

        // test 09
        test('Test-09: Verify order summary in the confirm order step matches cart items', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            // wait for payment method to collapse and confirm order to appear
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            // verify product name in the confirm order summary matches what was added
            await expect(checkoutPage.confirmProductName).toBeVisible();
            await expect(checkoutPage.confirmProductName).toHaveText('HP LP3065');
        });

        // test 10
        test('Test-10: Confirm the order and verify the success page', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            await checkoutPage.confirmOrderButton.click();
            // verify success page
            await expect(checkoutPage.successHeading).toBeVisible();
            await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
        });

        // test 11
        test('Test-11: Verify double-click on Place Order does not create duplicate orders', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            // perform the double-click on confirm order
            await checkoutPage.confirmOrderButton.dblclick();
            // verify only one success page appears with no duplication
            await expect(checkoutPage.successHeading).toBeVisible();
            await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
        });

        // test 12
        test('Test-12: Verify the Continue button on the success page redirects to Home', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            await checkoutPage.confirmOrderButton.click();
            // verify success page and click continue
            await expect(checkoutPage.successHeading).toBeVisible();
            await checkoutPage.successContinueButton.click();
            // verify redirect to home
            await expect(page).toHaveURL(/.*common\/home/);
        });

        // test 14
        test('Test-14: Complete checkout with different billing and shipping address', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            // wait for delivery section to open then select new address
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.newDeliveryAddressRadioButton.check();
            // wait for the new address form to become visible before filling
            await expect(page.locator('#shipping-new')).toBeVisible();
            // fill new address form fields
            await checkoutPage.newAddressFirstName.fill('Jane');
            await checkoutPage.newAddressLastName.fill('Wick');
            await checkoutPage.newAddress1.fill('456 Oak St');
            await checkoutPage.newAddressCity.fill('Los Angeles');
            await checkoutPage.newAddressPostcode.fill('90001');
            await checkoutPage.newAddressCountry.selectOption({ label: 'United States' });
            await checkoutPage.newAddressZone.selectOption({ label: 'California' });
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            await checkoutPage.confirmOrderButton.click();
            // verify success page
            await expect(checkoutPage.successHeading).toBeVisible();
        });

        // test 15
        test('Test-15: Validate total price at checkout matches the final confirmation page', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.billingAddressContinueBtn.click();
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.deliveryAddressContinueBtn.click();
            await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            // wait for payment method to collapse and confirm order to appear
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
            await expect(checkoutPage.confirmOrderButton).toBeVisible();
            // verify the base product price captured earlier exists in the summary table
            const summaryText = await checkoutPage.confirmOrderTable.innerText();
            expect(summaryText).toContain(productPriceText);
            // verify the final total is populated with a dollar amount
            await expect(checkoutPage.finalTotalText).toBeVisible();
            const finalPrice = await checkoutPage.finalTotalText.innerText();
            expect(finalPrice).toContain('$');
            // place order to conclude cleanly
            await checkoutPage.confirmOrderButton.click();
            await expect(checkoutPage.successHeading).toBeVisible();
        });
    })

    test.describe('test suits which does not need to login', () => {
        // test 01
        test('Test-01: Proceed to checkout as a Guest user', async ({ page }) => {
            const checkoutPage = new CheckoutPage(page);
            await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
            await page.locator('#button-cart').click();
            await expect(page.locator('.alert-success')).toBeVisible();
            // navigate directly to the Checkout page
            await checkoutPage.navigateToCheckout();
            await checkoutPage.guestCheckoutRadioButton.check();
            // wait for jQuery to register the radio button change before clicking continue
            await expect(checkoutPage.accountContinueButton).toBeEnabled();
            await checkoutPage.accountContinueButton.click();
            await page.waitForTimeout(500);
            // fill out the guest form
            const uniqueEmail = `guestuser_${Date.now()}@test.com`;
            await checkoutPage.fillGuestDetails('John', 'Wick', uniqueEmail, '1234567890', '123 Main St', 'New York', '10001', 'United States', 'New York');
            await checkoutPage.guestContinueButton.click();
            // wait for billing accordion to fully collapse before proceeding
            await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
            // wait for shipping method accordion to open
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.shippingMethodContinueButton.click();
            // wait for shipping method accordion to collapse
            await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
            // wait for payment method accordion to open
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
            await checkoutPage.termsCheckbox.check();
            // wait for jQuery to register the checkbox before proceeding
            await expect(checkoutPage.termsCheckbox).toBeChecked();
            await checkoutPage.paymentMethodContinueButton.click();
            // wait for payment method accordion to collapse
            await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
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
            // wait for jQuery to register the radio button before clicking continue
            await expect(checkoutPage.accountContinueButton).toBeEnabled();
            await checkoutPage.accountContinueButton.click();
            await page.waitForTimeout(500);
            // attempt to submit a blank form
            await checkoutPage.guestContinueButton.click();
            // verify mandatory field warnings appear
            await expect(checkoutPage.inputFieldWarning.first()).toBeVisible();
            // assert specific field warnings to ensure the right fields failed
            await expect(page.locator('text=First Name must be between 1 and 32 characters!')).toBeVisible();
            await expect(page.locator('text=Last Name must be between 1 and 32 characters!')).toBeVisible();
            await expect(page.locator('text=E-Mail address does not appear to be valid!')).toBeVisible();
            await expect(page.locator('text=Telephone must be between 3 and 32 characters!')).toBeVisible();
            await expect(page.locator('text=Address 1 must be between 3 and 128 characters!')).toBeVisible();
            await expect(page.locator('text=City must be between 2 and 128 characters!')).toBeVisible();
        });

        // test 13
        test('Test-13: Attempt to bypass checkout steps directly via URL', async ({ page }) => {
            // attempt to navigate directly to the final checkout confirmation step
            await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/confirm');
            // wait for the redirect to complete
            await page.waitForLoadState('networkidle');
            // verify that we are not on the confirmation page
            const currentURL = page.url();
            expect(currentURL).not.toContain('route=checkout/confirm');
            // verify we are redirected back to the cart or home
            const isRedirectedToCartOrHome = currentURL.includes('route=checkout/cart') || currentURL.includes('route=common/home');
            expect(isRedirectedToCartOrHome).toBeTruthy();
        });
    })

});