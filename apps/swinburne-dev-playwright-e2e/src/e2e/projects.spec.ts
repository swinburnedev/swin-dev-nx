import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
});

test.describe('projects page', () => {
    test('has h1', async ({ page }) => {
        const greeting = page.locator('h1');
        await expect(greeting).toContainText("Projects");
    });

    test('has project cards', async ({ page }) => {
        const container = await page.getByTestId('project-cards').filter({ hasText: 'Instruct BigCommerce IntegrationPurplebricksRead more' });
        await expect(container).toBeVisible();
        const card = container.first();
        await expect(card.getByRole('heading')).toHaveText('Instruct BigCommerce Integration');
    });
});
