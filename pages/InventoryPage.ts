import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;
  readonly hamburgerBtn: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;
  readonly cartBadge: Locator;
  readonly firstItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.hamburgerBtn = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]')
    this.resetLink = page.locator('[data-test="reset-sidebar-link"]')
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.firstItemName = page.locator('[data-test="inventory-item-name"]').first();
  }


  async addItemToCart(productName: string) { 
    await this.page.locator('.inventory_item') 
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async verifyCartBadge(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async removeItemInCart(productName: string) { 
    await this.page.locator('.inventory_item') 
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async clickAddToCartOnDetails() {
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  async clickRemoveOnDetails() {
    await this.page.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(option: 'lohi' | 'hilo' | 'az' | 'za') {
    await this.sortDropdown.selectOption(option);
  }

  async gotoProductDetails(productName: string) {
    await this.page.locator('.inventory_item_name')
        .filter({ hasText: productName })
        .click();
  }

  async resetAppState() {
    await this.hamburgerBtn.click();
    await this.resetLink.click();
    await this.page.getByRole('button', { name: 'Close Menu' }).click();
  }

  async logout() {
    await this.hamburgerBtn.click();
    await this.logoutLink.click();
  }
}