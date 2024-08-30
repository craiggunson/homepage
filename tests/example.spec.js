import { test, expect } from '@playwright/test';

test.describe('Basic Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('http://dev.craiggunson.com');
  });

  test('should load the page with the correct title', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Craig Gunson/);
  });

  test('should contain Cloud Tradie text', async ({ page }) => {
    await page.goto('http://dev.craiggunson.com');
  
    const textLocator = await page.locator('text=Cloud Tradie');
    await expect(textLocator).toBeVisible();
  });

  test('should contain Engineer text', async ({ page }) => {
    await page.goto('http://dev.craiggunson.com');
  
    const textLocator = await page.locator('text=Engineer');
    await expect(textLocator).toBeVisible();
  });

  test('should contain Innovator text', async ({ page }) => {
    await page.goto('http://dev.craiggunson.com');
  
    const textLocator = await page.locator('text=Innovator');
    await expect(textLocator).toBeVisible();
  });

});
