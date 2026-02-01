import { type Locator, type Page, expect } from '@playwright/test';


export class CheckoutPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cancelBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueBtn: Locator;
  readonly errorMessage: Locator; 
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishBtn: Locator;      
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;
  readonly thankYouMessage: Locator;
  readonly backHomeBtn: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
    // --- ส่วนของหน้า Information (Step 1) ---
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    // --- 2. Locators: หน้า Overview (Step 2) ---
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-value"]');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    // --- 3. Locators: หน้า Complete (Step 3) ---
    this.thankYouMessage = page.locator('[data-test="complete-header"]');
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');
  }


  async enterInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }
  
  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async clickFinish() {
    await this.finishBtn.click();
  }

  async clickBackHome() {
    await this.backHomeBtn.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText(); 
  }

  async getItemNames(): Promise<string[]> {
    return await this.inventoryItemName.allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrice.allInnerTexts();

    return priceTexts.map(text => {
      const cleanNumber = text.replace(/[^0-9.]/g, ''); // ตัด $ ออก
      return parseFloat(cleanNumber); // แปลงเป็นเลข
    });
  }

  async getPaymentInfoText(): Promise<string> {
    return await this.paymentInfoLabel.innerText(); 
  }

  async getShippingInfoText(): Promise<string> {
    return await this.shippingInfoLabel.innerText(); 
  }

  async getPriceAsNumber(locator: Locator): Promise<number> {
    const text = await locator.innerText(); 
    const cleanNumber = text.replace(/[^0-9.]/g, ''); 
    return parseFloat(cleanNumber); 
  }







}