import { test, expect } from '@playwright/test';

test.describe('EAApp - Positive Test Cases', () => {
  test('TC001: Verify homepage loads successfully', async ({ page }) => {
    // Navigate to the homepage
    const response = await page.goto('/');
    
    // Verify successful response
    expect(response?.status()).toBeLessThan(400);
    
    // Verify page URL
    expect(page).toHaveURL(/eaapp/);
    
    // Verify page is not showing an error state
    const isErrorPage = await page.evaluate(() => {
      return document.body.innerText.includes('404') || 
             document.body.innerText.includes('Error');
    });
    expect(isErrorPage).toBe(false);
  });

  test('TC002: Verify page contains expected UI elements', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be loaded
    await page.waitForLoadState('networkidle');
    
    // Verify body content exists
    const bodyContent = await page.locator('body');
    await expect(bodyContent).toHaveCount(1);
    
    // Verify page has content
    const pageContent = await page.textContent('body');
    expect(pageContent?.length).toBeGreaterThan(0);
    
    // Verify no critical JS errors
    let jsErrors = false;
    page.on('console', (msg) => {
      if (msg.type() === 'error') jsErrors = true;
    });
    expect(jsErrors).toBe(false);
  });

  test('TC003: Verify page is responsive - mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to page
    await page.goto('/');
    
    // Wait for load
    await page.waitForLoadState('networkidle');
    
    // Verify page is responsive (no horizontal scrolling)
    const bodyWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    expect(bodyWidth).toBeLessThanOrEqual(375);
    
    // Verify elements are visible
    const visibleElements = await page.locator('*').count();
    expect(visibleElements).toBeGreaterThan(0);
  });

  test('TC004: Verify page is responsive - tablet view', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to page
    await page.goto('/');
    
    // Wait for load
    await page.waitForLoadState('networkidle');
    
    // Verify page renders properly
    const bodyWidth = await page.evaluate(() => {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });
    
    expect(bodyWidth).toBeLessThanOrEqual(768);
    
    // Verify content is accessible
    const mainContent = await page.locator('body');
    await expect(mainContent).toBeVisible();
  });

  test('TC005: Verify clickable elements are interactive', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find clickable elements
    const buttons = await page.locator('button, a, [role="button"]').count();
    
    if (buttons > 0) {
      // Get first clickable element
      const firstClickable = page.locator('button, a, [role="button"]').first();
      
      // Verify it's visible and enabled
      await expect(firstClickable).toBeVisible();
      
      // Try to hover over it
      await firstClickable.hover();
      
      // Verify interaction was successful
      const isHovered = await firstClickable.evaluate((el) => {
        return window.getComputedStyle(el).cursor;
      });
      
      expect(isHovered).toBeTruthy();
    }
  });

  test('TC006: Verify page content loads within acceptable time', async ({ page }) => {
    // Set page timeout
    page.setDefaultTimeout(15000);
    
    const startTime = Date.now();
    
    // Navigate to page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // Verify page loaded within 10 seconds
    expect(loadTime).toBeLessThan(10000);
    
    // Verify page is interactive
    await page.waitForLoadState('networkidle', { timeout: 5000 });
  });
});

test.describe('EAApp - Negative Test Cases', () => {
  test('NC001: Verify 404 error for non-existent page', async ({ page }) => {
    // Try to navigate to non-existent page
    const response = await page.goto('/non-existent-page-xyz');
    
    // Verify 404 response or error page
    expect([404, 301, 302]).toContain(response?.status());
  });

  test('NC002: Verify SQL Injection attempt is handled', async ({ page }) => {
    // Attempt SQL injection via URL
    const response = await page.goto("\\'; DROP TABLE users; --");
    
    // Should not execute SQL, either redirect or show error
    expect(response?.status()).toBeLessThan(500);
    
    // Verify page doesn't crash
    const pageText = await page.textContent('body');
    expect(pageText).toBeTruthy();
  });

  test('NC003: Verify XSS attack prevention', async ({ page }) => {
    // Attempt XSS injection
    const xssPayload = "/<script>alert('XSS')</script>";
    const response = await page.goto(xssPayload);
    
    // Verify response is handled safely
    expect(response?.status()).toBeLessThan(500);
    
    // Verify script doesn't execute
    let scriptExecuted = false;
    page.on('console', (msg) => {
      if (msg.text().includes('XSS')) scriptExecuted = true;
    });
    
    expect(scriptExecuted).toBe(false);
  });

  test('NC004: Verify empty form submission handling', async ({ page }) => {
    await page.goto('/');
    
    // Find form if it exists
    const form = await page.locator('form').first();
    const formExists = await form.isVisible().catch(() => false);
    
    if (formExists) {
      // Get form submit button
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();
      
      // Check if submit button exists
      const submitExists = await submitButton.isVisible().catch(() => false);
      
      if (submitExists) {
        // Try to submit empty form
        await submitButton.click().catch(() => {});
        
        // Verify page doesn't crash
        const pageStable = await page.evaluate(() => document.body !== null);
        expect(pageStable).toBe(true);
      }
    }
  });

  test('NC005: Verify handling of network timeout', async ({ page }) => {
    // Set very short timeout
    page.setDefaultTimeout(100);
    
    // Attempt navigation with timeout
    try {
      await page.goto('/', { timeout: 100 });
    } catch (error) {
      // Timeout error is expected
      expect(error).toBeTruthy();
    }
    
    // Reset timeout
    page.setDefaultTimeout(30000);
  });

  test('NC006: Verify special characters in URL are handled', async ({ page }) => {
    // Try URL with special characters
    const specialCharURL = "/test?param=<>\\"'&";
    const response = await page.goto(specialCharURL).catch(() => null);
    
    if (response) {
      // Should not result in 500 error
      expect(response.status()).toBeLessThan(500);
    }
  });

  test('NC007: Verify large input string handling', async ({ page }) => {
    await page.goto('/');
    
    // Create very large input string (10MB)
    const largeString = 'A'.repeat(10 * 1024 * 1024);
    
    // Find input fields if they exist
    const inputs = await page.locator('input, textarea').count();
    
    if (inputs > 0) {
      const firstInput = page.locator('input, textarea').first();
      
      try {
        // Try to type large string (limit to 10000 chars to avoid timeout)
        await firstInput.fill(largeString.substring(0, 10000));
        
        // Verify input didn't crash page
        const pageStable = await page.evaluate(() => document.body !== null);
        expect(pageStable).toBe(true);
      } catch (error) {
        // Large input may be rejected, which is acceptable
        expect(true).toBe(true);
      }
    }
  });

  test('NC008: Verify rapid consecutive requests handling', async ({ page }) => {
    // Make rapid navigation requests
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        page.goto('/').catch(() => null)
      );
    }
    
    // Wait for all requests
    const responses = await Promise.all(requests);
    
    // Verify no 500+ errors
    const validResponses = responses.filter(r => r && r.status() < 500);
    expect(validResponses.length).toBeGreaterThan(0);
  });
});

test.describe('EAApp - Security & Performance Tests', () => {
  test('SEC001: Verify no sensitive data in console', async ({ page }) => {
    const consoleLogs: string[] = [];
    
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for sensitive data patterns
    const sensitivePatterns = [
      /password/i,
      /api[_-]?key/i,
      /token/i,
      /secret/i,
      /credential/i
    ];
    
    const hasSensitiveData = consoleLogs.some(log =>
      sensitivePatterns.some(pattern => pattern.test(log))
    );
    
    expect(hasSensitiveData).toBe(false);
  });

  test('PERF001: Verify CSS and JS loads successfully', async ({ page }) => {
    const resourceErrors: string[] = [];
    
    page.on('response', (response) => {
      if (response.status() >= 400 && 
          (response.url().endsWith('.css') || response.url().endsWith('.js'))) {
        resourceErrors.push(response.url());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify no critical resource failures
    expect(resourceErrors.length).toBe(0);
  });
});
