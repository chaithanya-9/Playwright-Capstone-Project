const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        // mini cart locators
        this.miniCartButton = page.locator('#cart > button');
        this.miniCartRemoveButton = page.getByTitle('Remove');
        this.miniCartViewCartLink = page.getByRole('link', { name: 'View Cart' });
        // mini cart grid locators
        this.updateQuantityButton = page.locator('.input-group-btn .btn-primary');
        this.removeProductButton = page.locator('.input-group-btn .btn-danger');
        this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('link', { name: 'Checkout', exact: true });
        this.quantityInput = page.locator('div.input-group.btn-block input[type="text"]');
        this.couponAccordion = page.getByRole('link', { name: 'Use Coupon Code' });
        this.giftCertificateAccordion = page.getByRole('link', { name: 'Use Gift Certificate' });
        this.estimateShippingAccordion = page.getByText('Estimate Shipping & Taxes');
        this.couponInput = page.getByPlaceholder('Enter your coupon here');
        this.giftCertificateInput = page.getByPlaceholder('Enter your gift certificate code here');
        this.applyCouponButton = page.getByRole('button', { name: 'Apply Coupon' });
        this.applyGiftButton = page.getByRole('button', { name: 'Apply Gift Certificate' });
        // warning message locators        
        this.emptyCartMessage = page.locator('#content').getByText('Your shopping cart is empty!');
        this.successMessage = page.locator('.alert-success');
        this.warningMessage = page.locator('.alert-danger');
        // calculation locators
        this.totalsSubTotal = page.locator('table.table-bordered').last().locator('tr').filter({ hasText: 'Sub-Total:' }).locator('td').last();
        this.totalsEcoTax = page.locator('table.table-bordered').last().locator('tr').filter({ hasText: 'Eco Tax' }).locator('td').last();
        this.totalsVAT = page.locator('table.table-bordered').last().locator('tr').filter({ hasText: 'VAT' }).locator('td').last();
        this.totalsFinal = page.locator('table.table-bordered').last().locator('tr').filter({ hasText: 'Total:' }).locator('td').last();
        // estimate shipping locators
        this.shippingCountryDropdown = page.locator('#input-country');
        this.shippingZoneDropdown = page.locator('#input-zone');
        this.getQuotesButton = page.getByRole('button', { name: 'Get Quotes' });
    }
    // action methods
    // opens the mini cart dropdown from top right header
    async openMiniCart() {
        await this.miniCartButton.click();
    }
    // opens minicart and navigates to the view cart page directly
    async navigateToMainCart() {
        await this.openMiniCart();
        await this.miniCartViewCartLink.click();
    }
    // clears the current quantity and types a new one and clicks the refresh/update button
    async updateFirstItemQuantity(newQuantity) {
        await this.quantityInput.first().fill(newQuantity);
        await this.updateQuantityButton.first().click();
    }
    // opens the coupon accordion and fills the code and clicks apply
    async applyCoupon(couponCode) {
        await this.couponAccordion.click();
        await this.couponInput.fill(couponCode);
        await this.applyCouponButton.click();
    }
    // opens the gift certificate accordion and fills the code and clicks apply
    async applyGiftCertificate(giftCode) {
        await this.giftCertificateAccordion.click();
        await this.giftCertificateInput.fill(giftCode);
        await this.applyGiftButton.click();
    }
}
module.exports = { CartPage };