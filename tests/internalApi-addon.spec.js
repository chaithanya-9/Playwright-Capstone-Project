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

    // test 03
    test('Test-03: Verify POST login with valid credentials returns a successful session response', async () => {
        const apiContext = await request.newContext();
        // send login form data as a POST request directly to the login route
        const response = await apiContext.post(`${BASE_URL}/index.php?route=account/login`, {
            form: {
                email: 'demotest@gmail.com',
                password: 'demotest',
            }
        });
        // a successful login returns 200 and redirects to the account page
        expect(response.status()).toBe(200);
        // verify the response body confirms we reached the account dashboard
        const body = await response.text();
        expect(body).toContain('My Account');
        await apiContext.dispose();
    });

    // test 04
    test('Test-04: Verify POST login with invalid credentials returns an error response', async () => {
        const apiContext = await request.newContext();
        // send login form data with wrong credentials
        const response = await apiContext.post(`${BASE_URL}/index.php?route=account/login`, {
            form: {
                email: `invalid${Date.now()}@test.com`,
                password: 'wrongpassword',
            }
        });
        // the server still returns 200 but the body contains the warning message
        // OpenCart does not return 401, it renders the error inline on the login page
        expect(response.status()).toBe(200);
        // verify the response body contains the login failure warning
        const body = await response.text();
        expect(body).toContain('Warning: No match for E-Mail Address and/or Password.');
        await apiContext.dispose();
    });

    // test 05
    test('Test-05: Verify GET request to the search endpoint returns HTTP 200 and contains results', async () => {
        const apiContext = await request.newContext();
        // send a search request with a known product keyword
        const response = await apiContext.get(`${BASE_URL}/index.php?route=product/search&search=MacBook`);
        // verify the search endpoint responds successfully
        expect(response.status()).toBe(200);
        // verify the response body contains the expected product in the results
        const body = await response.text();
        expect(body).toContain('MacBook');
        await apiContext.dispose();
    });
});