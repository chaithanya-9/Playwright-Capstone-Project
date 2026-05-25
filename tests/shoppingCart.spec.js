const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage.js');

test.describe('Shopping Cart Tests', () => {

    // test 01
    test('Test-01: Verify adding a standard product to the cart from homepage', async ({ page }) => {
        // initialize page object
        const cartPage = new CartPage(page);
        // navigate to the base URL 
        await cartPage.navigate();
        // locate the Add to Cart buttons for the Featured Products on the homepage
        // since there are multiple products, use .first() to grab top one (MacBook)
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        // click the button to add the item to the cart
        await firstFeaturedProductAddBtn.click();
        // verify the system throws success message
        await expect(cartPage.successMessage).toBeVisible();
        await expect(cartPage.successMessage).toContainText('Success: You have added');
        // open the minicart from top right header to prove the item registered
        await cartPage.openMiniCart();
        // verify the View Cart link is visible inside the minicart dropdown
        await expect(cartPage.miniCartViewCartLink).toBeVisible();
    });

    // test 02
    test('Test-02: Verify adding a standard product to the cart from the Product Details Page', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        await cartPage.searchForProduct('MacBook');
        // click the product image/title to enter the product details page
        const firstProductCard = page.locator('.product-thumb').first();
        await firstProductCard.getByRole('link').first().click();
        // click the "Add to Cart" button on the product details page
        await page.getByRole('button', { name: 'Add to Cart' }).click();
        // verify the success message renders
        await expect(cartPage.successMessage).toBeVisible();
        await expect(cartPage.successMessage).toContainText('Success: You have added');
        // open the minicart and verify the item is present
        await cartPage.openMiniCart();
        await expect(cartPage.miniCartViewCartLink).toBeVisible();
    });

    // test 03
    test('Test-03: Verify the success message appears immediately when a product is added', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        // locate the Add to Cart button for the first featured product
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        // click add to cart
        await firstFeaturedProductAddBtn.click();
        // verify the specific success message text
        await expect(cartPage.successMessage).toBeVisible();
        await expect(cartPage.successMessage).toContainText('Success: You have added');
        // verify the message can be dismissed by clicking the X button (if present)
        const closeBanner = cartPage.successMessage.locator('.close');
        await closeBanner.click();
        await expect(cartPage.successMessage).toBeHidden();
    });

    // test 04
    test('Test-04: Verify the Mini-Cart header dropdown accurately displays added items and live totals', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        await firstFeaturedProductAddBtn.click();
        // verify the success message renders
        await expect(cartPage.successMessage).toBeVisible();
        // open the mini-cart
        await cartPage.openMiniCart();
        // verify the MiniCart displays the product name
        const miniCartProduct = page.locator('#cart');
        const productLink = miniCartProduct.getByRole('link', { name: 'MacBook' }).first();
        await expect(productLink).toBeVisible();
        // verify the MiniCart displays a nonzero total price
        const miniCartTotal = page.locator('.table-bordered td.text-right').last();
        // .not asserts that the condition is not met 
        await expect(miniCartTotal).not.toContainText('$0.00');
    });
});