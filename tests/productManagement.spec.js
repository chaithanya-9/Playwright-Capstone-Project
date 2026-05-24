const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Product Management Service Tests', () => {

    // test 01
    test('Test-01: Verify searching for a valid existing product returns the correct results grid', async ({ page }) => {
        // initialize page object
        const productPage = new ProductPage(page);
        // navigate to website
        await productPage.navigate();
        // search for a product that exists in database
        await productPage.searchForProduct('MacBook');
        // check if page redirected to search results page
        await expect(page).toHaveURL(/.*route=product\/search/);
        const resultCount = await productPage.productCards.count();
        await expect(resultCount).toBeGreaterThan(0);
        // verify first product card is visible
        await expect(productPage.productCards.first()).toBeVisible();
        // check only for first product card because we already checked resultCount is greater than 0 and checked for first card to be visible so we save time not checking for rest of the cards 
    });

    // test 02
    test('Test-02: Verify searching for a non existing product displays the empty results message', async ({ page }) => {
        const productPage = new ProductPage(page);
        // navigate to website
        await productPage.navigate();
        // search for a product that is not exist in database
        await productPage.searchForProduct('random product');
        // verify URL still routes to search page
        await expect(page).toHaveURL(/.*route=product\/search/);
        // verify warning message
        await expect(productPage.emptySearchMessage).toBeVisible();
        // check for no product cards rendered
        await expect(await productPage.productCards.count()).toEqual(0);
    });
})