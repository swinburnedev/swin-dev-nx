import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('index page', () => {
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Home | Swinburne Dev/);
    });

    test('has h1', async ({ page }) => {
        const greeting = page.locator('h1');
        await expect(greeting).toContainText("Hi, I'm Andy 👋");
    });
});
