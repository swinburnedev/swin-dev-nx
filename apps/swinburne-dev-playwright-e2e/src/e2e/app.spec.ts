import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('nav', () => {
    test('logo is visible', async ({ page }) => {
        const logo = page.getByAltText('Swinburne Development Ltd');
        await expect(logo).toBeVisible();
    });

    test('has projets link', async ({ page }) => {
        const link = page.locator('nav a', { hasText: 'Projects' });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', '/projects');
    });
});

test.describe('footer', () => {
    test('has current year copyright', async ({ page }) => {
        const currentYear: string = new Date().getFullYear().toString();
        await expect(page.getByRole('contentinfo')).toHaveText(
            `© ${currentYear} Swinburne.dev`
        );
    });
});
