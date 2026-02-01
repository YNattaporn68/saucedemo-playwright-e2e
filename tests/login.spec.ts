import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';  

test.describe('Login Scenarios', () => { 
  test('Test Case 1: Login success', async ({ page }) => {
    const loginPage = new LoginPage(page); 
    await loginPage.goto(); 
    await loginPage.login('standard_user', 'secret_sauce'); 
    await expect(page).toHaveURL(/.*inventory.html/); 
  });
 
  test('Test Case 2: Login failed with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); 
    await loginPage.login('standard_user', 'wrong_password'); 
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });
 
  test('Test Case 3: Login failed with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); 
    await loginPage.login('locked_out_user', 'secret_sauce'); 
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
  });
 
  test('Test Case 4: Login failed with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); 
    await loginPage.login('', 'secret_sauce');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username is required');
  });
 
  test('Test Case 5: Login failed with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Password is required');
  });

  test('Test Case 6: Login successfully but slow (Performance Glitch)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); 
    await loginPage.login('performance_glitch_user', 'secret_sauce'); 
    await expect(page).toHaveURL(/.*inventory.html/);
  });

});