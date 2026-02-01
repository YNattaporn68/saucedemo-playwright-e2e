import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage'; 
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Inventory Page', () => {
    let checkoutPage: CheckoutPage;
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
    });

  test('Test Case 1: ตรวจสอบว่าช่อง First Name, Last Name, Zip/Postal Code สามารถกรอกข้อมูลได้ และกดปุ่ม Continue ได้', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue(); 
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });

  test('Test Case 2: ตรวจสอบแจ้งเตือนเมื่อไม่กรอกข้อมูล', async ({ page }) => {
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
    await checkoutPage.firstNameInput.fill('User');
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Last Name is required');
    await checkoutPage.lastNameInput.fill('Test');
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Postal Code is required');
  });

  test('Test Case 3: ทดสอบปุ่ม Cancel หน้า Checkout: Your Information และ ไอคอนตะกร้า', async ({ page }) => {
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL(/.*cart.html/); 
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.clickCartIcon();
    await expect(page).toHaveURL(/.*cart.html/);
  });
  
  test('Test Case 4: ตรวจสอบรายการสินค้าว่าตรงกับที่หยิบมาไหม', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();    
    const items = await checkoutPage.getItemNames();
    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });

  test('Test Case 5: ตรวจสอบข้อมูลการชำระและจัดส่ง', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();
    expect(await checkoutPage.getPaymentInfoText()).toContain('SauceCard #31337');
    expect(await checkoutPage.getShippingInfoText()).toBe('Free Pony Express Delivery!');
  });

  test('Test Case 6: ตรวจสอบการคำนวณราคารวม (Tax 8%)', async ({ page }) => {
    
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();

    const prices = await checkoutPage.getItemPrices();
    const sumItemTotal = prices.reduce((sum, price) => sum + price, 0);
    const displayedItemTotal = await checkoutPage.getPriceAsNumber(checkoutPage.itemTotalLabel);
    const displayedTax = await checkoutPage.getPriceAsNumber(checkoutPage.taxLabel);
    const displayedTotal = await checkoutPage.getPriceAsNumber(checkoutPage.totalLabel);
    const expectedTax = parseFloat((sumItemTotal * 0.08).toFixed(2)); // ปัดเศษ 2 ตำแหน่ง
    const expectedTotal = sumItemTotal + expectedTax;
    expect(displayedItemTotal).toBe(sumItemTotal); 
    expect(displayedTax).toBe(expectedTax);        
    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
  });

  test('Test Case 7: ทดสอบปุ่ม Cancel หน้า Checkout: Overview', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL(/.*inventory.html/); 
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Test Case 8: ทดสอบปุ่ม Finish', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await expect(page).toHaveURL(/.*checkout-complete.html/); 
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
  });

  test('Test Case 9: ทดสอบปุ่ม Back Home', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.clickBackHome();
    await expect(page).toHaveURL(/.*inventory.html/); 
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Test Case 10: ทดสอบปุ่มไอคอนรูปตะกร้าที่หน้า Checkout: Complete!', async ({ page }) => {
    await checkoutPage.enterInformation('Somchai', 'Jaidee', '10110');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.clickCartIcon();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });

});
