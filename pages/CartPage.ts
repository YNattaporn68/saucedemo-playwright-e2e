import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemName: Locator;
  readonly checkoutBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly cartItemContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemName = page.locator('.inventory_item_name');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.cartItemContainer = page.locator('.cart_item');
  }


  getItem(productName: string) {
    return this.cartItemName.filter({ hasText: productName });
  }

  async removeItem(productName: string) {
    const specificItemRow = this.cartItemContainer.filter({ hasText: productName });
    await specificItemRow.getByRole('button', { name: 'Remove' }).click();
  }

  async checkItemHidden(productName: string) {
    const item = this.cartItemName.filter({ hasText: productName });
    await expect(item).toBeHidden();
  }

  async clickItemToViewDetails(productName: string) {
    await this.cartItemName.filter({ hasText: productName }).click();
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }


}