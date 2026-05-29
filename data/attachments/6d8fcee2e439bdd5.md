# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkoutPayment.spec.js >> Checkout and Payment Service >> test suits which does not need to login >> Test-13: Attempt to bypass checkout steps directly via URL
- Location: tests/checkoutPayment.spec.js:426:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=checkout/confirm", waiting until "load"

```

# Test source

```ts
  328 |         // test 15
  329 |         test('Test-15: Validate total price at checkout matches the final confirmation page', async ({ page }) => {
  330 |             const checkoutPage = new CheckoutPage(page);
  331 |             await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'true');
  332 |             await checkoutPage.billingAddressContinueBtn.click();
  333 |             await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
  334 |             await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'true');
  335 |             await checkoutPage.deliveryAddressContinueBtn.click();
  336 |             await expect(page.locator('#collapse-shipping-address')).toHaveAttribute('aria-expanded', 'false');
  337 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
  338 |             await checkoutPage.shippingMethodContinueButton.click();
  339 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
  340 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
  341 |             await checkoutPage.termsCheckbox.check();
  342 |             await expect(checkoutPage.termsCheckbox).toBeChecked();
  343 |             await checkoutPage.paymentMethodContinueButton.click();
  344 |             // wait for payment method to collapse and confirm order to appear
  345 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
  346 |             await expect(checkoutPage.confirmOrderButton).toBeVisible();
  347 |             // verify the base product price captured earlier exists in the summary table
  348 |             const summaryText = await checkoutPage.confirmOrderTable.innerText();
  349 |             expect(summaryText).toContain(productPriceText);
  350 |             // verify the final total is populated with a dollar amount
  351 |             await expect(checkoutPage.finalTotalText).toBeVisible();
  352 |             const finalPrice = await checkoutPage.finalTotalText.innerText();
  353 |             expect(finalPrice).toContain('$');
  354 |             // place order to conclude cleanly
  355 |             await checkoutPage.confirmOrderButton.click();
  356 |             await expect(checkoutPage.successHeading).toBeVisible();
  357 |         });
  358 |     })
  359 | 
  360 |     test.describe('test suits which does not need to login', () => {
  361 |         // test 01
  362 |         test('Test-01: Proceed to checkout as a Guest user', async ({ page }) => {
  363 |             const checkoutPage = new CheckoutPage(page);
  364 |             await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
  365 |             await page.locator('#button-cart').click();
  366 |             await expect(page.locator('.alert-success')).toBeVisible();
  367 |             // navigate directly to the Checkout page
  368 |             await checkoutPage.navigateToCheckout();
  369 |             await checkoutPage.guestCheckoutRadioButton.check();
  370 |             // wait for jQuery to register the radio button change before clicking continue
  371 |             await expect(checkoutPage.accountContinueButton).toBeEnabled();
  372 |             await checkoutPage.accountContinueButton.click();
  373 |             await page.waitForTimeout(500);
  374 |             // fill out the guest form
  375 |             const uniqueEmail = `guestuser_${Date.now()}@test.com`;
  376 |             await checkoutPage.fillGuestDetails('John', 'Wick', uniqueEmail, '1234567890', '123 Main St', 'New York', '10001', 'United States', 'New York');
  377 |             await checkoutPage.guestContinueButton.click();
  378 |             // wait for billing accordion to fully collapse before proceeding
  379 |             await expect(page.locator('#collapse-payment-address')).toHaveAttribute('aria-expanded', 'false');
  380 |             // wait for shipping method accordion to open
  381 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'true');
  382 |             await checkoutPage.shippingMethodContinueButton.click();
  383 |             // wait for shipping method accordion to collapse
  384 |             await expect(page.locator('#collapse-shipping-method')).toHaveAttribute('aria-expanded', 'false');
  385 |             // wait for payment method accordion to open
  386 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'true');
  387 |             await checkoutPage.termsCheckbox.check();
  388 |             // wait for jQuery to register the checkbox before proceeding
  389 |             await expect(checkoutPage.termsCheckbox).toBeChecked();
  390 |             await checkoutPage.paymentMethodContinueButton.click();
  391 |             // wait for payment method accordion to collapse
  392 |             await expect(page.locator('#collapse-payment-method')).toHaveAttribute('aria-expanded', 'false');
  393 |             await expect(checkoutPage.confirmOrderButton).toBeVisible();
  394 |             await checkoutPage.confirmOrderButton.click();
  395 |             // verify success page
  396 |             await expect(checkoutPage.successHeading).toBeVisible();
  397 |             await expect(checkoutPage.successHeading).toHaveText('Your order has been placed!');
  398 |         });
  399 | 
  400 |         // test 03
  401 |         test('Test-03: Verify mandatory fields in the Billing Details step', async ({ page }) => {
  402 |             const checkoutPage = new CheckoutPage(page);
  403 |             await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=47');
  404 |             await page.locator('#button-cart').click();
  405 |             await expect(page.locator('.alert-success')).toBeVisible();
  406 |             await checkoutPage.navigateToCheckout();
  407 |             await checkoutPage.guestCheckoutRadioButton.check();
  408 |             // wait for jQuery to register the radio button before clicking continue
  409 |             await expect(checkoutPage.accountContinueButton).toBeEnabled();
  410 |             await checkoutPage.accountContinueButton.click();
  411 |             await page.waitForTimeout(500);
  412 |             // attempt to submit a blank form
  413 |             await checkoutPage.guestContinueButton.click();
  414 |             // verify mandatory field warnings appear
  415 |             await expect(checkoutPage.inputFieldWarning.first()).toBeVisible();
  416 |             // assert specific field warnings to ensure the right fields failed
  417 |             await expect(page.locator('text=First Name must be between 1 and 32 characters!')).toBeVisible();
  418 |             await expect(page.locator('text=Last Name must be between 1 and 32 characters!')).toBeVisible();
  419 |             await expect(page.locator('text=E-Mail address does not appear to be valid!')).toBeVisible();
  420 |             await expect(page.locator('text=Telephone must be between 3 and 32 characters!')).toBeVisible();
  421 |             await expect(page.locator('text=Address 1 must be between 3 and 128 characters!')).toBeVisible();
  422 |             await expect(page.locator('text=City must be between 2 and 128 characters!')).toBeVisible();
  423 |         });
  424 | 
  425 |         // test 13
  426 |         test('Test-13: Attempt to bypass checkout steps directly via URL', async ({ page }) => {
  427 |             // attempt to navigate directly to the final checkout confirmation step
> 428 |             await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/confirm');
      |                        ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  429 |             // wait for the redirect to complete
  430 |             await page.waitForLoadState('networkidle');
  431 |             // verify that we are not on the confirmation page
  432 |             const currentURL = page.url();
  433 |             expect(currentURL).not.toContain('route=checkout/confirm');
  434 |             // verify we are redirected back to the cart or home
  435 |             const isRedirectedToCartOrHome = currentURL.includes('route=checkout/cart') || currentURL.includes('route=common/home');
  436 |             expect(isRedirectedToCartOrHome).toBeTruthy();
  437 |         });
  438 |     })
  439 | 
  440 | });
```