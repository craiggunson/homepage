import { test, expect } from '@playwright/test';

test.describe('Homepage Content Tests', () => {
  let page;

  test.beforeEach(async ({ page: pageFixture }) => {
    // Navigate to the page before each test
    page = pageFixture;
    await page.goto('http://dev.craiggunson.com');
  });

  test('should have correct page title', async () => {
    await expect(page).toHaveTitle(/Craig Gunson/);
  });

  test.describe('should display professional titles', () => {
    const titles = ['Cloud Tradie', 'Engineer', 'Innovator'];
    
    for (const title of titles) {
      test(`displays "${title}" text`, async () => {
        const textLocator = page.getByText(title, { exact: true });
        await expect(textLocator).toBeVisible();
      });
    }
  });

  // Add more test groups as needed
  
  test.afterEach(async () => {
    // Clean up or verification steps after each test if needed
  });
});
