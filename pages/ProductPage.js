const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        // search results page locators
        this.listViewButton = page.locator('#list-view');
        this.gridViewButton = page.locator('#grid-view');
        this.sortByDropdown = page.getByLabel('Sort By:');
        this.showLimitDropdown = page.getByLabel('Show:');
        this.productCards = page.locator('.product-thumb');
        // product details page locators
        this.productNameHeader = page.getByRole('heading', { level: 1 });
        this.categoryHeader = page.getByRole('heading', { level: 2 });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.brandLabel = page.getByText('Brand:');
        this.productCodeLabel = page.getByText('Product Code:');
        this.priceTag = page.locator('h2').filter({ hasText: '$' });
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
        // left side bar locators
        this.sidebarMacLink = page.getByRole('link', { name: /- Mac/ });
        // image lightbox locators
        this.mainProductImage = page.locator('ul.thumbnails li:first-child a');
        this.lightboxModal = page.locator('.mfp-wrap');
        this.lightboxCloseButton = page.locator('.mfp-close');
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
        await this.page.locator(`input[name="rating"][value="${ratingValue}"]`).check({ force: true });
        await this.submitReviewButton.click();
    }
    // extract all prices from the current product grid and returns them as an array of numbers
    async getProductPrices() {
        // grab the raw text of every price tag on the page
        const priceTexts = await this.productCards.locator('.price').allInnerTexts();
        // loop through the messy text and convert it to clean numbers
        return priceTexts.map(text => {
            // split the text to ignore the "Ex Tax:" portion on the second line
            const mainPrice = text.split('\n')[0];
            // strip out the $ and commas, then convert the string into a decimal number
            const cleanNumber = parseFloat(mainPrice.replace(/[^0-9.]/g, ''));
            return cleanNumber;
        });
    }
    // extract the ratings (0-5) for every product on the screen
    async getProductRatings() {
        const ratings = [];
        const count = await this.productCards.count();
        // loop through each product card
        for (let i = 0; i < count; i++) {
            const card = await this.productCards.nth(i);
            // check if product even has rating
            const hasRating = await card.locator('.rating').isVisible();
            if (hasRating) {
                // in OpenCart, the class '.fa-stack-2x.fa-star' usually represents a solid, filled-in star
                const filledStars = await card.locator('.rating .fa-star').count();
                ratings.push(filledStars);
            } else {
                // if there is no rating section, the product has 0 stars
                ratings.push(0);
            }
        }
        return ratings;
    }
    // Selects an option from the 'Show' limit dropdown
    async selectShowLimit(limitText) {
        await this.showLimitDropdown.selectOption({ label: limitText });
    }
    // opens the product details page of the first product in the grid
    async openFirstProduct() {
        await this.productCards.first().getByRole('img').click();
    }
}
module.exports = { ProductPage };