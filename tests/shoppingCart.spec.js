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

});