const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        // search results page locators
        this.listViewButton = page.getByRole('button', { name: 'List' });
        this.gridViewButton = page.getByRole('button', { name: 'Grid' });
        this.sortByDropdown = page.getByLabel('Sort By:');
        this.productCards = page.locator('.product-thumb');
        // product details page locators
        this.productNameHeader = page.getByRole('heading', { level: 1 });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        // product review locators
        this.reviewTab = page.getByRole('link', { name: /Reviews/ });
        this.reviewerNameInput = page.getByLabel('Your Name');
        this.reviewTextInput = page.getByLabel('Your Review');
        this.ratingRadioButtons = page.getByRole('radio');
        this.submitReviewButton = page.getByRole('button', { name: 'Continue' });
        this.reviewSuccessMessage = page.locator('.alert-success');
        this.reviewWarningMessage = page.locator('.alert-danger');
        // Locator for empty search results
        this.emptySearchMessage = page.getByText('There is no product that matches the search criteria.');
        // search locator on search results page
        this.descriptionCheckbox = page.getByLabel('Search in product descriptions');
        this.advanceSearchButton = page.locator('#button-search');
    }
    // select an option from the Sort By dropdown using visible text
    async sortProductBy(visibleText) {
        await this.sortByDropdown.selectOption({ label: visibleText });
    }
    // fill and submit product review form
    async submitReview(name, reviewText, ratingValue) {
        await this.reviewTab.click();
        await this.reviewerNameInput.fill(name);
        await this.reviewTextInput.fill(reviewText);
        // filter radio groupdown to the specific rating value(1-5) and check it
        await this.ratingRadioButtons.locator(`[value="${ratingValue}"]`).check();
        await this.submitReviewButton.click();
    }
}
module.exports = { ProductPage };