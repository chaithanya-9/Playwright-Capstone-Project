const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function globalSetup() {
    // launch a browser and create a new context
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    // navigate directly to the registration page
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    // generate JIT data to bypass rate limiting
    const uniqueEmail = `jituser${Date.now()}@gmail.com`;
    const uniquePhone = `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
    const password = 'SecurePassword123';
    // fill the registration form
    await page.getByRole('textbox', { name: 'First Name' }).fill('Auto');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('User');
    await page.getByRole('textbox', { name: 'E-Mail' }).fill(uniqueEmail);
    await page.getByRole('textbox', { name: 'Telephone' }).fill(uniquePhone);
    await page.getByRole('textbox', { name: '* Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: '* Password Confirm' }).fill(password);
    // agree to privacy policy and submit
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continue' }).click();
    // wait for the success message to ensure registration is complete
    await page.waitForURL(/.*route=account\/success/);
    // create the .auth directory if it doesn't exist
    const authDirPath = path.join(__dirname, '../.auth');
    if (!fs.existsSync(authDirPath)) {
        fs.mkdirSync(authDirPath, { recursive: true });
    }
    // save the storage state to a file for later use
    await page.context().storageState({ path: '.auth/user.json' });
    // close the browser
    await browser.close();
}
module.exports = globalSetup;