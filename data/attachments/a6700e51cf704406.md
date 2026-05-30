# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productManagement.spec.js >> Product Management Service Tests >> Test-01: Verify searching for a valid existing product returns the correct results grid
- Location: tests/productManagement.spec.js:7:5

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - button "$ Currency " [ref=e7] [cursor=pointer]:
        - strong [ref=e8]: $
        - text: Currency
        - generic [ref=e9]: 
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link "" [ref=e13] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - generic [ref=e14]: 
          - text: "123456789"
        - listitem [ref=e15]:
          - link " My Account" [ref=e16] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - generic [ref=e17]: 
            - text: My Account
        - listitem [ref=e19]:
          - link " Wish List (0)" [ref=e20] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - generic [ref=e21]: 
            - text: Wish List (0)
        - listitem [ref=e22]:
          - link " Shopping Cart" [ref=e23] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart
            - generic [ref=e24]: 
            - text: Shopping Cart
        - listitem [ref=e25]:
          - link " Checkout" [ref=e26] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout
            - generic [ref=e27]: 
            - text: Checkout
  - banner [ref=e28]:
    - generic [ref=e30]:
      - link "naveenopencart" [ref=e33] [cursor=pointer]:
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
        - img "naveenopencart" [ref=e34]
      - generic [ref=e36]:
        - textbox "Search" [ref=e37]: MacBook
        - button "" [ref=e39] [cursor=pointer]:
          - generic [ref=e40]: 
      - button " 0 item(s) - $0.00" [ref=e43] [cursor=pointer]:
        - generic [ref=e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=e46]:
    - generic: 
    - list [ref=e48]:
      - listitem [ref=e49]:
        - link "Desktops" [ref=e50] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20
      - listitem [ref=e51]:
        - link "Laptops & Notebooks" [ref=e52] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=18
      - listitem [ref=e53]:
        - link "Components" [ref=e54] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=25
      - listitem [ref=e55]:
        - link "Tablets" [ref=e56] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=57
      - listitem [ref=e57]:
        - link "Software" [ref=e58] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=17
      - listitem [ref=e59]:
        - link "Phones & PDAs" [ref=e60] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=24
      - listitem [ref=e61]:
        - link "Cameras" [ref=e62] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=33
      - listitem [ref=e63]:
        - link "MP3 Players" [ref=e64] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=34
  - generic [ref=e65]:
    - list [ref=e66]:
      - listitem [ref=e67]:
        - link "" [ref=e68] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
          - generic [ref=e69]: 
      - listitem [ref=e70]:
        - link "Search" [ref=e71] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=MacBook
    - generic [ref=e73]:
      - heading "Search - MacBook" [level=1] [ref=e74]
      - generic [ref=e75]: Search Criteria
      - generic [ref=e76]:
        - textbox "Search Criteria" [ref=e78]:
          - /placeholder: Keywords
          - text: MacBook
        - combobox [ref=e80]:
          - option "All Categories" [selected]
          - option "Desktops"
          - option "PC"
          - option "Mac"
          - option "Laptops & Notebooks"
          - option "Macs"
          - option "Windows"
          - option "Components"
          - option "Mice and Trackballs"
          - option "Monitors"
          - option "test 1"
          - option "test 2"
          - option "Printers"
          - option "Scanners"
          - option "Web Cameras"
          - option "Tablets"
          - option "Software"
          - option "Phones & PDAs"
          - option "Cameras"
          - option "MP3 Players"
          - option "test 11"
          - option "test 12"
          - option "test 15"
          - option "test 16"
          - option "test 17"
          - option "test 18"
          - option "test 19"
          - option "test 20"
          - option "test 25"
          - option "test 21"
          - option "test 22"
          - option "test 23"
          - option "test 24"
          - option "test 4"
          - option "test 5"
          - option "test 6"
          - option "test 7"
          - option "test 8"
          - option "test 9"
        - generic [ref=e82] [cursor=pointer]:
          - checkbox "Search in subcategories" [disabled] [ref=e83]
          - text: Search in subcategories
      - paragraph [ref=e84]:
        - generic [ref=e85] [cursor=pointer]:
          - checkbox "Search in product descriptions" [ref=e86]
          - text: Search in product descriptions
      - button "Search" [ref=e87] [cursor=pointer]
      - heading "Products meeting the search criteria" [level=2] [ref=e88]
      - generic [ref=e89]:
        - generic [ref=e91]:
          - button "" [ref=e92] [cursor=pointer]:
            - generic [ref=e93]: 
          - button "" [ref=e94] [cursor=pointer]:
            - generic [ref=e95]: 
        - link "Product Compare (0)" [ref=e98] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/compare
        - generic [ref=e100]:
          - generic [ref=e101]: "Sort By:"
          - combobox "Sort By:" [ref=e102]:
            - option "Default" [selected]
            - option "Name (A - Z)"
            - option "Name (Z - A)"
            - option "Price (Low > High)"
            - option "Price (High > Low)"
            - option "Rating (Highest)"
            - option "Rating (Lowest)"
            - option "Model (A - Z)"
            - option "Model (Z - A)"
        - generic [ref=e104]:
          - generic [ref=e105]: "Show:"
          - combobox "Show:" [ref=e106]:
            - option "20" [selected]
            - option "25"
            - option "50"
            - option "75"
            - option "100"
      - generic [ref=e107]:
        - generic [ref=e109]:
          - generic:
            - link "MacBook":
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=43&search=MacBook
              - img "MacBook"
          - generic [ref=e110]:
            - generic [ref=e111]:
              - heading "MacBook" [level=4] [ref=e112]:
                - link "MacBook" [ref=e113] [cursor=pointer]:
                  - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=43&search=MacBook
              - paragraph [ref=e114]: Intel Core 2 Duo processor Powered by an Intel Core 2 Duo processor at speeds up to 2.16GHz, the..
              - paragraph [ref=e115]:
                - text: $602.00
                - generic [ref=e116]: "Ex Tax: $500.00"
            - generic [ref=e117]:
              - button " Add to Cart" [ref=e118] [cursor=pointer]:
                - generic [ref=e119]: 
                - text: Add to Cart
              - button "" [ref=e120] [cursor=pointer]:
                - generic [ref=e121]: 
              - button "" [ref=e122] [cursor=pointer]:
                - generic [ref=e123]: 
        - generic [ref=e125]:
          - generic:
            - link "MacBook Air":
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=44&search=MacBook
              - img "MacBook Air"
          - generic [ref=e126]:
            - generic [ref=e127]:
              - heading "MacBook Air" [level=4] [ref=e128]:
                - link "MacBook Air" [ref=e129] [cursor=pointer]:
                  - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=44&search=MacBook
              - paragraph [ref=e130]: MacBook Air is ultrathin, ultraportable, and ultra unlike anything else. But you don’t lose in..
              - paragraph [ref=e131]:
                - text: $1,202.00
                - generic [ref=e132]: "Ex Tax: $1,000.00"
            - generic [ref=e133]:
              - button " Add to Cart" [ref=e134] [cursor=pointer]:
                - generic [ref=e135]: 
                - text: Add to Cart
              - button "" [ref=e136] [cursor=pointer]:
                - generic [ref=e137]: 
              - button "" [ref=e138] [cursor=pointer]:
                - generic [ref=e139]: 
        - generic [ref=e141]:
          - generic:
            - link "MacBook Pro":
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=45&search=MacBook
              - img "MacBook Pro"
          - generic [ref=e142]:
            - generic [ref=e143]:
              - heading "MacBook Pro" [level=4] [ref=e144]:
                - link "MacBook Pro" [ref=e145] [cursor=pointer]:
                  - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=45&search=MacBook
              - paragraph [ref=e146]: Latest Intel mobile architecture Powered by the most advanced mobile processors from Intel, ..
              - paragraph [ref=e147]:
                - text: $2,000.00
                - generic [ref=e148]: "Ex Tax: $2,000.00"
            - generic [ref=e149]:
              - button " Add to Cart" [ref=e150] [cursor=pointer]:
                - generic [ref=e151]: 
                - text: Add to Cart
              - button "" [ref=e152] [cursor=pointer]:
                - generic [ref=e153]: 
              - button "" [ref=e154] [cursor=pointer]:
                - generic [ref=e155]: 
      - generic [ref=e158]: Showing 1 to 3 of 3 (1 Pages)
  - contentinfo [ref=e159]:
    - generic [ref=e160]:
      - generic [ref=e161]:
        - generic [ref=e162]:
          - heading "Information" [level=5] [ref=e163]
          - list [ref=e164]:
            - listitem [ref=e165]:
              - link "About Us" [ref=e166] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4
            - listitem [ref=e167]:
              - link "Delivery Information" [ref=e168] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6
            - listitem [ref=e169]:
              - link "Privacy Policy" [ref=e170] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3
            - listitem [ref=e171]:
              - link "Terms & Conditions" [ref=e172] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5
        - generic [ref=e173]:
          - heading "Customer Service" [level=5] [ref=e174]
          - list [ref=e175]:
            - listitem [ref=e176]:
              - link "Contact Us" [ref=e177] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - listitem [ref=e178]:
              - link "Returns" [ref=e179] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return/add
            - listitem [ref=e180]:
              - link "Site Map" [ref=e181] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap
        - generic [ref=e182]:
          - heading "Extras" [level=5] [ref=e183]
          - list [ref=e184]:
            - listitem [ref=e185]:
              - link "Brands" [ref=e186] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/manufacturer
            - listitem [ref=e187]:
              - link "Gift Certificates" [ref=e188] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/voucher
            - listitem [ref=e189]:
              - link "Affiliate" [ref=e190] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=affiliate/login
            - listitem [ref=e191]:
              - link "Specials" [ref=e192] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/special
        - generic [ref=e193]:
          - heading "My Account" [level=5] [ref=e194]
          - list [ref=e195]:
            - listitem [ref=e196]:
              - link "My Account" [ref=e197] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - listitem [ref=e198]:
              - link "Order History" [ref=e199] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
            - listitem [ref=e200]:
              - link "Wish List" [ref=e201] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - listitem [ref=e202]:
              - link "Newsletter" [ref=e203] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
      - separator [ref=e204]
      - paragraph [ref=e205]:
        - text: Powered By
        - link "OpenCart" [ref=e206] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: naveenopencart © 2026
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { ProductPage } = require('../pages/ProductPage');
  3   | 
  4   | test.describe('Product Management Service Tests', () => {
  5   | 
  6   |     // test 01
  7   |     test('Test-01: Verify searching for a valid existing product returns the correct results grid', async ({ page }) => {
  8   |         // initialize page object
  9   |         const productPage = new ProductPage(page);
  10  |         // navigate to website
  11  |         await productPage.navigate();
  12  |         // search for a product that exists in database
  13  |         await productPage.searchForProduct('MacBook');
  14  |         // check if page redirected to search results page
  15  |         await expect(page).toHaveURL(/.*route=product\/search/);
  16  |         const resultCount = await productPage.productCards.count();
> 17  |         expect(resultCount).toBeGreaterThan(0);
      |                             ^ Error: expect(received).toBeGreaterThan(expected)
  18  |         // verify first product card is visible
  19  |         await expect(productPage.productCards.first()).toBeVisible();
  20  |         // check only for first product card because we already checked resultCount is greater than 0 and checked for first card to be visible so we save time not checking for rest of the cards 
  21  |     });
  22  | 
  23  |     // test 02
  24  |     test('Test-02: Verify searching for a non existing product displays the empty results message', async ({ page }) => {
  25  |         const productPage = new ProductPage(page);
  26  |         // navigate to website
  27  |         await productPage.navigate();
  28  |         // search for a product that is not exist in database
  29  |         await productPage.searchForProduct('random product');
  30  |         // verify URL still routes to search page
  31  |         await expect(page).toHaveURL(/.*route=product\/search/);
  32  |         // verify warning message
  33  |         await expect(productPage.emptySearchMessage).toBeVisible();
  34  |         // check for no product cards rendered
  35  |         await expect(await productPage.productCards).toHaveCount(0);
  36  |     });
  37  | 
  38  |     // test 03 
  39  |     test('Test-03: Verify submitting an empty search throws the correct warning message', async ({ page }) => {
  40  |         const productPage = new ProductPage(page);
  41  |         // navigate to website
  42  |         await productPage.navigate();
  43  |         // submit empty search
  44  |         await productPage.searchForProduct('');
  45  |         // verify URL still routes to search page
  46  |         await expect(page).toHaveURL(/.*route=product\/search/);
  47  |         // verify warning message
  48  |         await expect(productPage.emptySearchMessage).toBeVisible();
  49  |         // check for no product cards rendered
  50  |         await expect(productPage.productCards).toHaveCount(0);
  51  |     });
  52  | 
  53  |     // test 04
  54  |     test('Test-04: Verify search in product descriptions checkbox finds secondary keywords', async ({ page }) => {
  55  |         const productPage = new ProductPage(page);
  56  |         await productPage.navigate();
  57  |         await productPage.searchForProduct('processor');
  58  |         // verify normal search fails to retrieve
  59  |         await expect(productPage.emptySearchMessage).toBeVisible();
  60  |         await expect(productPage.productCards).toHaveCount(0);
  61  |         // check the search in product description checkbox
  62  |         await productPage.descriptionCheckbox.check();
  63  |         // click the secondary advance search under description chekbox
  64  |         await productPage.advanceSearchButton.click();
  65  |         // verify product cards rendered
  66  |         await expect(await productPage.productCards.count()).toBeGreaterThan(0);
  67  |         await expect(productPage.productCards.first()).toBeVisible();
  68  |     });
  69  | 
  70  |     // test 05
  71  |     test('Test-05: Verify navigating to a main category from top navigation bar', async ({ page }) => {
  72  |         const productPage = new ProductPage(page);
  73  |         await productPage.navigate();
  74  |         await productPage.navigateToDesktopCategory();
  75  |         // verify the system routes us to the category page
  76  |         await expect(page).toHaveURL(/.*route=product\/category/);
  77  |         // verify header on the page says "Desktops"
  78  |         await expect(productPage.categoryHeader).toHaveText('Desktops');
  79  |         // verify page loaded products
  80  |         expect(await productPage.productCards.count()).toBeGreaterThan(0);
  81  |     });
  82  | 
  83  |     // test 06
  84  |     test('Test-06: Verify navigating to sub category from leftside menu', async ({ page }) => {
  85  |         const productPage = new ProductPage(page);
  86  |         await productPage.navigate();
  87  |         await productPage.navigateToDesktopCategory();
  88  |         // click the MAc sub category from side menu
  89  |         await productPage.sidebarMacLink.click();
  90  |         // verify the URL still points to a category routing path
  91  |         await expect(page).toHaveURL(/.*route=product\/category/);
  92  |         // verify generic category header updated to Mac
  93  |         await expect(productPage.categoryHeader).toHaveText('Mac');
  94  |         // verify that the Mac sub category loaded its products
  95  |         expect(await productPage.productCards.count()).toBeGreaterThan(0);
  96  |     });
  97  | 
  98  |     // test 07
  99  |     test('Test-07: Verify switching between List View and Grid View on the search results page', async ({ page }) => {
  100 |         const productPage = new ProductPage(page);
  101 |         await productPage.navigate();
  102 |         await productPage.searchForProduct('Mac');
  103 |         // verify products rendered on the screen to interact 
  104 |         expect(await productPage.productCards.count()).toBeGreaterThan(0);
  105 |         // switch to List View
  106 |         await productPage.listViewButton.click();
  107 |         // verify the UI successfully tranformed and the first product is still visible
  108 |         await expect(productPage.productCards.first()).toBeVisible();
  109 |         // switch back to Grid View
  110 |         await productPage.gridViewButton.click();
  111 |         // verify the UI successfully tranformed and the first product is still visible
  112 |         await expect(productPage.productCards.first()).toBeVisible();
  113 |     });
  114 | 
  115 |     // test 08
  116 |     test('Test-08: Verify sorting products by Price (Low > High) correctly orders the results', async ({ page }) => {
  117 |         const productPage = new ProductPage(page);
```