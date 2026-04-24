import { test, expect } from '@playwright/test';

test.describe('Craig Gunson Homepage Tests', () => {
  let page;

  test.beforeEach(async ({ page: pageFixture }) => {
    // Navigate to the page before each test
    page = pageFixture;
    await page.goto('http://dev.craiggunson.com');
  });

  test('should have correct page title', async () => {
    await expect(page).toHaveTitle('Craig Gunson');
  });

  test('should display main heading', async () => {
    const heading = page.getByRole('heading', { name: 'Craig Gunson', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should display tagline', async () => {
    const tagline = page.getByText('Doing what I can, with what I have, where I am.');
    await expect(tagline).toBeVisible();
  });

  test.describe('Professional Roles Section', () => {
    const roles = [
      { 
        title: 'Cloud', 
        description: /Years of experience with Amazon Web Services and Google Cloud Platform/
      },
      { 
        title: 'DevOps', 
        description: /Bringing software engineers, infrastructure, security and testing together/
      },
      { 
        title: 'Innovator', 
        description: /Moving at pace with Continuous Integration, Continuous Delivery, and AI/
      }
    ];
    
    for (const role of roles) {
      test(`should display "${role.title}" section correctly`, async () => {
        const titleElement = page.getByRole('heading', { name: role.title });
        await expect(titleElement).toBeVisible();
        
        const descriptionElement = page.getByText(role.description);
        await expect(descriptionElement).toBeVisible();
      });
    }
  });






  test('should display footer text', async () => {
    const footerText = page.getByText('Aww Yeah!!!');
    await expect(footerText).toBeVisible();
  });



  test.describe('Layout and Responsive Tests', () => {
    const viewportSizes = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewportSizes) {
      test(`page should display correctly on ${viewport.name}`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        const mainHeading = page.getByRole('heading', { name: 'Craig Gunson' });
        await expect(mainHeading).toBeVisible();
        
        // Check that key elements are visible on all screen sizes
        await expect(page.getByRole('heading', { name: 'Cloud' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Socials' })).toBeVisible();
      });
    }
  });

  test.afterEach(async () => {
    // Clean up or verification steps after each test if needed
  });
});
