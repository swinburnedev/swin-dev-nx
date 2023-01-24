import { test, expect } from '@playwright/test';

test('swinburne-dev', async ({ page }) => {
    await page.goto('/');

    const greeting = page.locator('h1');
    await expect(greeting).toContainText("Hi, I'm Andy 👋");
});
