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

    // test 05
    test('Test-05: Verify removing a product via the Mini-Cart dropdown successfully deletes the item', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        await firstFeaturedProductAddBtn.click();
        await cartPage.openMiniCart();
        // verify the product is visible in the MiniCart before we delete it
        const miniCartContainer = page.locator('#cart');
        const productLink = miniCartContainer.getByRole('link', { name: 'MacBook' }).first();
        await expect(productLink).toBeVisible();
        // click the Remove button inside the minicart
        await cartPage.miniCartRemoveButton.click();
        // verify the MiniCart total updates to indicate its empty
        await expect(cartPage.miniCartButton).toContainText('0 item(s)');
    });

    // test 06
    test('Test-06: Verify navigating to the main View Cart page renders all added products in the grid', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        await firstFeaturedProductAddBtn.click();
        // Wait for the success message to ensure the API call finished
        await expect(cartPage.successMessage).toBeVisible();
        // navigate to the maincart page using POM helper method
        await cartPage.navigateToMainCart();
        // verify the URL routed correctly
        await expect(page).toHaveURL(/.*route=checkout\/cart/);
        // verify the product table container is visible
        const cartTable = page.locator('.table-responsive').first();
        await expect(cartTable).toBeVisible();
        // verify the specific product that added exists in the table grid
        const productInCart = cartTable.getByRole('link', { name: 'MacBook' }).first();
        await expect(productInCart).toBeVisible();
    });

    // test 07
    test('Test-07: Verify updating the quantity of a product recalculates the total', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        await firstFeaturedProductAddBtn.click();
        await expect(cartPage.successMessage).toBeVisible();
        await cartPage.navigateToMainCart();
        // locate the specific total column for the item
        const itemTotal = page.locator('.table-responsive tbody .text-right').last();
        // capture the initial price as a string
        const initialPriceText = await itemTotal.innerText();
        // update the quantity to 2 using POM helper method
        await cartPage.updateFirstItemQuantity('2');
        // verify the system throws the specific modified success message
        await expect(cartPage.successMessage).toBeVisible();
        await expect(cartPage.successMessage).toContainText('Success: You have modified your shopping cart');
        // verify the math recalculated
        await expect(itemTotal).not.toHaveText(initialPriceText);
    });

    // test 08
    test('Test-08: Verify removing a product using the red Remove button in the cart grid', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        const firstFeaturedProductAddBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
        await firstFeaturedProductAddBtn.click();
        await expect(cartPage.successMessage).toBeVisible();
        await cartPage.navigateToMainCart();
        // click the Remove button in the cart table
        await cartPage.removeProductButton.click();
        // verify the system routes to the Empty Cart state
        await expect(cartPage.emptyCartMessage).toBeVisible();
        // ensure the header MiniCart also updated globally
        await expect(cartPage.miniCartButton).toContainText('0 item(s)');
    });

    // test 09
    test('Test-09: Verify adding a complex product without mandatory options triggers validation errors', async ({ page }) => {
        const cartPage = new CartPage(page);
        // direct navigation to the Apple Cinema 30 product page
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=42');
        // locate and click the primary "Add to Cart" button on the product detail page
        const productPageAddToCartBtn = page.locator('#button-cart');
        await productPageAddToCartBtn.click();
        // verify OpenCart's specific validation error texts appear
        await expect(page.getByText('Radio required!')).toBeVisible();
        await expect(page.getByText('Checkbox required!')).toBeVisible();
        await expect(page.getByText('Select required!')).toBeVisible();
        // verify success message never renders
        await expect(cartPage.successMessage).toBeHidden();
    });
});