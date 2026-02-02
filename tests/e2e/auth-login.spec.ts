import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  test('should show email and password fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
  });
});
