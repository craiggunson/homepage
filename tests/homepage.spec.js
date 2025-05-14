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
    
    const tagline2 = page.getByText('What stands in the way becomes the way');
    await expect(tagline2).toBeVisible();
  });

  test.describe('Professional Roles Section', () => {
    const roles = [
      { 
        title: 'Cloud Tradie', 
        description: /Delivering value with cloud technology to enable customer success/
      },
      { 
        title: 'Engineer', 
        description: /Curious how things work, comfortable hands on/
      },
      { 
        title: 'Innovator', 
        description: /Infrastructure or code, frontend or backend/
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

  test.describe('Bio Section', () => {
    test('should display Bio heading and content', async () => {
      const bioHeading = page.getByRole('heading', { name: 'Bio' });
      await expect(bioHeading).toBeVisible();
      
      const bioContent = page.getByText(/Home is the Mornington Peninsula/);
      await expect(bioContent).toBeVisible();
    });
  });

  test.describe('Projects Section', () => {
    const projects = [
      { name: 'Serverless Kite Surfing', emoji: '🍍', url: 'https://kitesurf.craiggunson.com' },
      { name: 'Serverless High Tide', emoji: '💧', url: 'https://tidebubble.craiggunson.com' },
      { name: 'IoT Pi Weather', emoji: '🥧', url: 'https://github.com/craiggunson/weather-pi' },
      { name: 'AI Emotion detection', emoji: '🙈', url: 'https://github.com/craiggunson/mizaru' },
      { name: 'GraphQL Sweet-n-Sour', emoji: '😝', url: 'https://github.com/craiggunson/sweet-n-sour' },
      { name: 'Fruit Cart GA4', emoji: '📦', url: 'https://shopcart.craiggunson.com' }
    ];
    
    test('should display Projects heading', async () => {
      const projectsHeading = page.getByRole('heading', { name: 'Projects' });
      await expect(projectsHeading).toBeVisible();
    });
    
    for (const project of projects) {
      test(`should display project "${project.name}" with correct link`, async () => {
        const linkText = project.emoji ? `${project.emoji}${project.name}` : project.name;
        const projectLink = page.getByRole('link', { name: new RegExp(project.name) });
        
        await expect(projectLink).toBeVisible();
        await expect(projectLink).toHaveAttribute('href', project.url);
      });
    }
  });



  test('should display footer text', async () => {
    const footerText = page.getByText('Aww Yeah!!!');
    await expect(footerText).toBeVisible();
  });

  test.describe('Navigation and Link Functionality', () => {
    test('projects links should have proper navigation attributes', async () => {
      const projectLinks = await page.getByRole('link').filter({ hasText: /Serverless|IoT|AI|GraphQL|Fruit/ }).all();
      expect(projectLinks.length).toBeGreaterThan(0);
      
      for (const link of projectLinks) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href.startsWith('http')).toBeTruthy();
      }
    });
    
    test('social links should have proper navigation attributes', async () => {
      const socialLinks = await page.getByRole('link').filter({ hasAttribute: { name: 'href', value: /github|linkedin|imdb/ } }).all();
      expect(socialLinks.length).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility Tests', () => {
    test('main heading should have proper heading level', async () => {
      const mainHeading = page.getByRole('heading', { name: 'Craig Gunson' });
      const headingLevel = await mainHeading.evaluate(h => h.tagName);
      expect(headingLevel).toBe('H1');
    });
    
    test('all images should have alt text', async () => {
      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });
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
        await expect(page.getByRole('heading', { name: 'Cloud Tradie' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Socials' })).toBeVisible();
      });
    }
  });

  test.afterEach(async () => {
    // Clean up or verification steps after each test if needed
  });
});
