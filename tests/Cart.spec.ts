import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
  });


  test('Test Case 1: ตรวจสอบว่าสินค้าที่เพิ่มไปมีอยู่ในตะกร้าไหม', async ({ page }) => {
    const cartPage = new CartPage(page);
    const itemsToCheck = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bike Light'
    ];
    for (const itemName of itemsToCheck) {
        const item = cartPage.getItem(itemName);
        await expect(item).toBeVisible();
        console.log(`✅ เจอสินค้า: ${itemName}`);
    }
  });

  test('Test Case 2: ลบสินค้าออกจากตะกร้า', async ({ page }) => {
    const itemName = 'Sauce Labs Backpack';
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await cartPage.removeItem(itemName);
    await cartPage.checkItemHidden(itemName);
    console.log(`🗑️ ลบสินค้าออกจากตะกร้าแล้ว: ${itemName}`);
    await inventoryPage.verifyCartBadge('1');
  });

  test('Test Case 3: เปลี่ยนใจกลับไปซื้อของต่อ', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.clickContinueShopping();
    await expect(page).toHaveURL(/.*inventory.html/);
    console.log('✅ เด้งมาหน้า inventory แล้ว');
  });

  test('Test Case 4: ไปหน้า Check out', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    console.log('✅ เด้งมาหน้า checkout แล้ว');
  });

  test('Test Case 5: กดดูรายละเอียดของในตะกร้า', async ({ page }) => {
    const cartPage = new CartPage(page);
    const itemName = 'Sauce Labs Backpack';
    await cartPage.clickItemToViewDetails(itemName);
    await expect(page).toHaveURL(/.*inventory-item.html/);
    await expect(page.locator('[data-test="remove"]')).toBeVisible();
    console.log('✅ เข้ามาดูรายละเอียดสินค้าสำเร็จ');
  });

  test('Test Case 6: กดลบสินค้าตอนดูรายละเอียดของในตะกร้า', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const itemName = 'Sauce Labs Backpack';
    await cartPage.clickItemToViewDetails(itemName);
    await expect(page).toHaveURL(/.*inventory-item.html/);
    await expect(page.locator('[data-test="remove"]')).toBeVisible();
    console.log('✅ เข้ามาดูรายละเอียดสินค้าสำเร็จ');
    await page.getByRole('button', { name: 'Remove' }).click();
    console.log('🗑️ กดลบสินค้าในหน้า Details แล้ว');
    await inventoryPage.verifyCartBadge('1');
  });

  test('Test Case 7: ลบสินค้าออกทุกชิ้น', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeItem('Sauce Labs Backpack',);
    await cartPage.removeItem('Sauce Labs Bike Light',);
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
    console.log('✅ ตะกร้าว่างเปล่า');
  });

});
