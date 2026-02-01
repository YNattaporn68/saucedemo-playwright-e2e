import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage'; 
import { LoginPage } from '../pages/LoginPage';

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Test Case 1: ทดสอบการเรียงลำดับ', async ({ page }) => {
    const inventoryPage = new InventoryPage(page); 

    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.firstItemName).toHaveText('Sauce Labs Onesie');
    console.log('✅ lohi');
    await inventoryPage.sortBy('hilo');
    await expect(inventoryPage.firstItemName).toHaveText('Sauce Labs Fleece Jacket');
    console.log('✅ hilo');
    await inventoryPage.sortBy('za');
    await expect(inventoryPage.firstItemName).toHaveText('Test.allTheThings() T-Shirt (Red)');
    console.log('✅ za');
    await inventoryPage.sortBy('az');
    await expect(inventoryPage.firstItemName).toHaveText('Sauce Labs Backpack');
    console.log('✅ az');
  
  });

  test('Test Case 2: ทดสอบการหยิบของใส่ตะกร้า และเช็คเลขที่ตะกร้า', async ({ page }) => {
    const inventoryPage = new InventoryPage(page); 
    const itemsToBuy = [
      'Sauce Labs Backpack', 
      'Sauce Labs Bike Light', 
      'Sauce Labs Bolt T-Shirt'
    ]; 

    for (const item of itemsToBuy) {
      await inventoryPage.addItemToCart(item);
    }
    await inventoryPage.verifyCartBadge(itemsToBuy.length.toString());
    console.log('✅ เย้! ตรวจสอบเลขบนตะกร้าผ่านแล้ว!');
    await inventoryPage.goToCart();
  });

  test('Test Case 3: ทดสอบปุ่ม Remove', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);  
    await inventoryPage.addItemToCart('Sauce Labs Backpack'); 
    await inventoryPage.removeItemInCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toBeHidden();
    console.log('✅ ไม่มีเลขบนตะกร้าแล้ว!');
  });

  test('Test Case 4: ทดสอบการกดดูรายละเอียดสินค้า', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);  
    await inventoryPage.gotoProductDetails('Sauce Labs Backpack');
  });

  test('Test Case 5: ทดสอบการกด เพิ่ม/ลบ สินค้าตอนอยู่หน้าดูรายละเอียดสินค้า', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);  
    await inventoryPage.gotoProductDetails('Sauce Labs Backpack');
    await inventoryPage.clickAddToCartOnDetails();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await inventoryPage.clickRemoveOnDetails();
  });

  test('Test Case 6: ทดสอบการรีเซ็ทสถานะ และออกจากระบบ', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);  
    const loginPage = new LoginPage(page); 
    const itemsToBuy = [
      'Sauce Labs Backpack', 
      'Sauce Labs Bike Light', 
      'Sauce Labs Bolt T-Shirt'
    ];

    for (const item of itemsToBuy) {
      await inventoryPage.addItemToCart(item);
    }
    await inventoryPage.resetAppState();
    await expect(inventoryPage.cartBadge).toBeHidden();
    console.log('✅ ตะกร้าว่างแล้ว!');
    await inventoryPage.logout(); 
    await expect(loginPage.loginButton).toBeVisible();
    console.log('✅ ตอนนี้อยู่หน้า login แล้ว!');
  });

});
 