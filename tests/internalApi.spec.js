const { test, expect, request } = require('@playwright/test');
const BASE_URL = 'https://naveenautomationlabs.com/opencart';

test.describe('Internal API Service Tests', () => {

    // test 01
    test('Test-01: Verify GET request to the homepage returns HTTP 200', async () => {
        // create a new API request context
        const apiContext = await request.newContext();
        const response = await apiContext.get(`${BASE_URL}/index.php?route=common/home`);
        // verify the server responds with a successful status code
        expect(response.status()).toBe(200);
        await apiContext.dispose();
    });

    // test 02
    test('Test-02: Verify GET request to a product page returns HTTP 200', async () => {
        const apiContext = await request.newContext();
        // HP LP3065 is a known product in the OpenCart demo database
        const response = await apiContext.get(`${BASE_URL}/index.php?route=product/product&product_id=47`);
        // verify the product page responds successfully
        expect(response.status()).toBe(200);
        // verify the response body actually contains the product name
        const body = await response.text();
        expect(body).toContain('HP LP3065');
        await apiContext.dispose();
    });
});