# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkoutPayment.spec.js >> Checkout and Payment Service >> test suits which does not need to login >> Test-03: Verify mandatory fields in the Billing Details step
- Location: tests/checkoutPayment.spec.js:359:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47", waiting until "load"

```

# Test source

```ts
  261 |         // test 14
  262 |         test('Test-14: Complete checkout with different billing and shipping address', async ({ page }) => {
  263 |             const checkoutPage = new CheckoutPage(page);
  264 |             await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
  265 |             await checkoutPage.billingAddressContinueBtn.click();
  266 |             // wait for delivery section to open then select new address
  267 |             await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
  268 |             await checkoutPage.newDeliveryAddressRadioButton.check();
  269 |             // wait for the new address form to become visible before filling
  270 |             await expect(page.locator('#shipping-new')).toBeVisible();
  271 |             // fill new address form fields
  272 |             await checkoutPage.newAddressFirstName.fill('Jane');
  273 |             await checkoutPage.newAddressLastName.fill('Wick');
  274 |             await checkoutPage.newAddress1.fill('456 Oak St');
  275 |             await checkoutPage.newAddressCity.fill('Los Angeles');
  276 |             await checkoutPage.newAddressPostcode.fill('90001');
  277 |             await checkoutPage.newAddressCountry.selectOption({ label: 'United States' });
  278 |             await checkoutPage.newAddressZone.selectOption({ label: 'California' });
  279 |             await checkoutPage.deliveryAddressContinueBtn.click();
  280 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
  281 |             await checkoutPage.shippingMethodContinueButton.click();
  282 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
  283 |             await checkoutPage.termsCheckbox.check();
  284 |             await expect(checkoutPage.termsCheckbox).toBeChecked();
  285 |             await checkoutPage.paymentMethodContinueButton.click();
  286 |             await expect(checkoutPage.confirmOrderButton).toBeVisible();
  287 |             await checkoutPage.confirmOrderButton.click();
  288 |             // verify success page
  289 |             await expect(checkoutPage.successHeading).toBeVisible();
  290 |         });
  291 | 
  292 |         // test 15
  293 |         test('Test-15: Validate total price at checkout matches the final confirmation page', async ({ page }) => {
  294 |             const checkoutPage = new CheckoutPage(page);
  295 |             await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
  296 |             await checkoutPage.billingAddressContinueBtn.click();
  297 |             await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
  298 |             await checkoutPage.deliveryAddressContinueBtn.click();
  299 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
  300 |             await checkoutPage.shippingMethodContinueButton.click();
  301 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
  302 |             await checkoutPage.termsCheckbox.check();
  303 |             await expect(checkoutPage.termsCheckbox).toBeChecked();
  304 |             await checkoutPage.paymentMethodContinueButton.click();
  305 |             // wait for payment method to collapse and confirm order to appear
  306 |             await expect(checkoutPage.confirmOrderButton).toBeVisible();
  307 |             // verify the base product price captured earlier exists in the summary table
  308 |             const summaryText = await checkoutPage.confirmOrderTable.innerText();
  309 |             expect(summaryText).toContain(productPriceText);
  310 |             // verify the final total is populated with a dollar amount
  311 |             await expect(checkoutPage.finalTotalText).toBeVisible();
  312 |             const finalPrice = await checkoutPage.finalTotalText.innerText();
  313 |             expect(finalPrice).toContain('$');
  314 |             // place order to conclude cleanly
  315 |             await checkoutPage.confirmOrderButton.click();
  316 |             await expect(checkoutPage.successHeading).toBeVisible();
  317 |         });
  318 |     })
  319 | 
  320 |     test.describe('test suits which does not need to login', () => {
  321 |         // test 01
  322 |         test('Test-01: Proceed to checkout as a Guest user', async ({ page }) => {
  323 |             const checkoutPage = new CheckoutPage(page);
  324 |             await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
  325 |             await page.locator('#button-cart').click();
  326 |             await expect(page.locator('.alert-success')).toBeVisible();
  327 |             // navigate directly to the Checkout page
  328 |             await checkoutPage.navigateToCheckout();
  329 |             await page.waitForLoadState('networkidle');
  330 |             await checkoutPage.guestCheckoutRadioButton.check();
  331 |             await checkoutPage.accountContinueButton.waitFor({ state: 'visible' });
  332 |             // wait for jQuery to register the radio button change before clicking continue
  333 |             await expect(checkoutPage.accountContinueButton).toBeEnabled();
  334 |             await checkoutPage.accountContinueButton.click();
  335 |             // fill out the guest form
  336 |             const uniqueEmail = `guestuser_${Date.now()}@test.com`;
  337 |             await checkoutPage.fillGuestDetails('John', 'Wick', uniqueEmail, '1234567890', '123 Main St', 'New York', '10001', 'United States', 'New York');
  338 |             await checkoutPage.guestContinueButton.click();
  339 |             // wait for billing accordion to fully collapse before proceeding
  340 |             // wait for shipping method accordion to open
  341 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
  342 |             await checkoutPage.shippingMethodContinueButton.click();
  343 |             // wait for shipping method accordion to collapse
  344 |             // wait for payment method accordion to open
  345 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
  346 |             await checkoutPage.termsCheckbox.check();
  347 |             // wait for jQuery to register the checkbox before proceeding
  348 |             await expect(checkoutPage.termsCheckbox).toBeChecked();
  349 |             await checkoutPage.paymentMethodContinueButton.click();
  350 |             // wait for payment method accordion to collapse
  351 |             await expect(checkoutPage.confirmOrderButton).toBeVisible();
  352 |             await checkoutPage.confirmOrderButton.click();
  353 |             // verify success page
  354 |             await expect(checkoutPage.successHeading).toBeVisible();
  355 |             await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
  356 |         });
  357 | 
  358 |         // test 03
  359 |         test('Test-03: Verify mandatory fields in the Billing Details step', async ({ page }) => {
  360 |             const checkoutPage = new CheckoutPage(page);
> 361 |             await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
      |                        ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  362 |             await page.locator('#button-cart').click();
  363 |             await expect(page.locator('.alert-success')).toBeVisible();
  364 |             await checkoutPage.navigateToCheckout();
  365 |             await page.waitForLoadState('networkidle');
  366 |             await checkoutPage.guestCheckoutRadioButton.check();
  367 |             await checkoutPage.accountContinueButton.waitFor({ state: 'visible' });
  368 |             // wait for jQuery to register the radio button before clicking continue
  369 |             await expect(checkoutPage.accountContinueButton).toBeEnabled();
  370 |             await checkoutPage.accountContinueButton.click();
  371 |             // attempt to submit a blank form
  372 |             await checkoutPage.guestContinueButton.click();
  373 |             // verify mandatory field warnings appear
  374 |             await expect(checkoutPage.inputFieldWarning.first()).toBeVisible();
  375 |             // assert specific field warnings to ensure the right fields failed
  376 |             await expect(page.locator('text=First Name must be between 1 and 32 characters!')).toBeVisible();
  377 |             await expect(page.locator('text=Last Name must be between 1 and 32 characters!')).toBeVisible();
  378 |             await expect(page.locator('text=E-Mail address does not appear to be valid!')).toBeVisible();
  379 |             await expect(page.locator('text=Telephone must be between 3 and 32 characters!')).toBeVisible();
  380 |             await expect(page.locator('text=Address 1 must be between 3 and 128 characters!')).toBeVisible();
  381 |             await expect(page.locator('text=City must be between 2 and 128 characters!')).toBeVisible();
  382 |         });
  383 | 
  384 |         // test 13
  385 |         test('Test-13: Attempt to bypass checkout steps directly via URL', async ({ page }) => {
  386 |             // attempt to navigate directly to the final checkout confirmation step
  387 |             await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/confirm');
  388 |             // wait for the redirect to complete
  389 |             await page.waitForLoadState('networkidle');
  390 |             // verify that we are not on the confirmation page
  391 |             const currentURL = page.url();
  392 |             expect(currentURL).not.toContain('route=checkout/confirm');
  393 |             // verify we are redirected back to the cart or home
  394 |             const isRedirectedToCartOrHome = currentURL.includes('route=checkout/cart') || currentURL.includes('route=common/home');
  395 |             expect(isRedirectedToCartOrHome).toBeTruthy();
  396 |         });
  397 |     })
  398 | 
  399 | });
```