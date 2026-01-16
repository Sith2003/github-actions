import { test, expect } from '@playwright/test';

test.describe('Swag Labs Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should login successfully with standard_user', async ({ page }) => {
    // Fill in login credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Click login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login by checking we're on the inventory page
    await expect(page).toHaveURL(/.*inventory.html/);

    // Verify the products page is displayed
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should display error for locked out user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('should display error for invalid credentials', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });
});
