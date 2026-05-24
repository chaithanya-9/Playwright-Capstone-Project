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

    // test 03 
    test('Test-03: Verify submitting an empty search throws the correct warning message', async ({ page }) => {
        const productPage = new ProductPage(page);
        // navigate to website
        await productPage.navigate();
        // submit empty search
        await productPage.searchForProduct('');
        // verify URL still routes to search page
        await expect(page).toHaveURL(/.*route=product\/search/);
        // verify warning message
        await expect(productPage.emptySearchMessage).toBeVisible();
        // check for no product cards rendered
        await expect(productPage.productCards).toHaveCount(0);
    });

    // test 04
    test('Test-04: Verify search in product descriptions checkbox finds secondary keywords', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.searchForProduct('processor');
        // verify normal search fails to retrieve
        await expect(productPage.emptySearchMessage).toBeVisible();
        await expect(productPage.productCards).toHaveCount(0);
        // check the search in product description checkbox
        await productPage.descriptionCheckbox.check();
        // click the secondary advance search under description chekbox
        await productPage.advanceSearchButton.click();
        // verify product cards rendered
        await expect(await productPage.productCards.count()).toBeGreaterThan(0);
        await expect(productPage.productCards.first()).toBeVisible();
    });

    // test 05
    test('Test-05: Verify navigating to a main category from top navigation bar', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.navigateToDesktopCategory();
        // verify the system routes us to the category page
        await expect(page).toHaveURL(/.*route=product\/category/);
        // verify header on the page says "Desktops"
        await expect(await productPage.productNameHeader).toHaveText('Desktops');
        // verify page loaded products
        await expect(await productPage.productCards.count()).toBeGreaterThan(0);
    });
})