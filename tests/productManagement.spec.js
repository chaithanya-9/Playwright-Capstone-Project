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
        await expect(productPage.categoryHeader).toHaveText('Desktops');
        // verify page loaded products
        expect(await productPage.productCards.count()).toBeGreaterThan(0);
    });

    // test 06
    test('Test-06: Verify navigating to sub category from leftside menu', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.navigateToDesktopCategory();
        // click the MAc sub category from side menu
        await productPage.sidebarMacLink.click();
        // verify the URL still points to a category routing path
        await expect(page).toHaveURL(/.*route=product\/category/);
        // verify generic category header updated to Mac
        await expect(productPage.categoryHeader).toHaveText('Mac');
        // verify that the Mac sub category loaded its products
        expect(await productPage.productCards.count()).toBeGreaterThan(0);
    });

    // test 07
    test('Test-07: Verify switching between List View and Grid View on the search results page', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.searchForProduct('Mac');
        // verify products rendered on the screen to interact 
        expect(await productPage.productCards.count()).toBeGreaterThan(0);
        // switch to List View
        await productPage.listViewButton.click();
        // verify the UI successfully tranformed and the first product is still visible
        await expect(productPage.productCards.first()).toBeVisible();
        // switch back to Grid View
        await productPage.gridViewButton.click();
        // verify the UI successfully tranformed and the first product is still visible
        await expect(productPage.productCards.first()).toBeVisible();
    });

    // test 08
    test.only('Test-08: Verify sorting products by Price (Low > High) correctly orders the results', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.searchForProduct('Mac');
        // select the sort option 
        await productPage.sortProductBy('Price (Low > High)');
        // wait for the URL to update with the sort parameters 
        // if we don't wait for this, playwright will grab the prices before the page finishes reloading
        await expect(page).toHaveURL(/.*sort=p.price&order=ASC/);
        // use getProductPrices() method to get the clean array of numbers
        const prices = await productPage.getProductPrices();
        // verify we have at least 2 products to compare
        expect(prices.length).toBeGreaterThan(1);
        // loop through the array and prove that each price is less than or equal to the next one
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

    // test 09
    test('Test-09: Verify sorting products by rating highest and check correctly orders the results', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.searchForProduct('Mac');
        // select the "Rating (Highest)" sort option
        await productPage.sortProductBy('Rating (Highest)');
        // wait for the URL to update so we know the page reloaded
        await expect(page).toHaveURL(/.*sort=rating&order=DESC/);
        // use getProductRatings method to count the stars on the newly sorted page
        const ratings = await productPage.getProductRatings();
        // verify we have items on the screen
        expect(ratings.length).toBeGreaterThan(0);
        // loop through the array and check that each rating is GREATER THAN or EQUAL to the next one
        for (let i = 0; i < ratings.length - 1; i++) {
            expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
        }
    });

    // test 10
    test('Test-10: Verify the Show dropdown correctly limits the maximum number of products displayed', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate();
        // search for a blank string to pull up all products in the store
        await productPage.searchForProduct(' ');
        // select '25' from the Show dropdown (OpenCart defaults to 15)
        await productPage.selectShowLimit('25');
        // wait for the URL to reflect the new limit query parameter
        await expect(page).toHaveURL(/.*limit=25/);
        // handle the race condition, Wait for the old products to clear and new ones to render
        await page.waitForLoadState('networkidle');
        // count the rendered products
        const count = await productPage.productCards.count();
        // verify we have products, but not more than the 25 we requested
        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThanOrEqual(25);
    });
})