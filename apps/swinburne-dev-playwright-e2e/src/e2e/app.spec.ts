import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('nav', () => {
    test('logo is visible', async ({ page }) => {
        const logo = page.getByAltText('Swinburne Development Ltd');
        await expect(logo).toBeVisible();
    });

    test('has CV PDF link', async ({ page }) => {
        const link = page.locator('nav a', { hasText: 'CV' });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute(
            'href',
            '/pdf/CV_Swinburne_Andy_website.pdf'
        );
    });

    test('has projets link', async ({ page }) => {
        const link = page.locator('nav a', { hasText: 'Projects' });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', '/projects');
    });
});
