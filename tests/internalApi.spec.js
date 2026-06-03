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
});