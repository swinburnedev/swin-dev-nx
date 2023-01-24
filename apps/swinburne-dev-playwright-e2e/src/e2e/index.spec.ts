import { test, expect } from '@playwright/test';

test.describe('index page', () => {
    test('has title', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/Home | Swinburne Dev/);
    });

    test('has h1', async ({ page }) => {
        await page.goto('/');

        const greeting = page.locator('h1');
        await expect(greeting).toContainText("Hi, I'm Andy 👋");
    });
});
