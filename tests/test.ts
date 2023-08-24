import { expect, test } from '@playwright/test';

test('health is okay', async ({ request }) => {
	const response = await request.get('/api/v1/health');
	expect(response.status()).toBe(200);
	expect(await response.json()).toEqual({ status: 'ok' });
});

test('link is created with deterministic slug', async ({ request }) => {
	const response = await request.post('/api/v1/link', {
		data: {
			url: 'https://example.com',
		},
	});
	expect(response.status()).toBe(200);
	expect(await response.json()).toEqual({
		url: 'https://example.com/',
		slug: 'f115d',
	});
})

test('link is created with custom slug', async ({ request }) => {
	const response = await request.post('/api/v1/link', {
		data: {
			url: 'https://example.com',
			slug: 'custom',
		},
	});
	expect(response.status()).toBe(200);
	expect(await response.json()).toEqual({
		url: 'https://example.com/',
		slug: 'custom',
	});
})

test('f115d redirects to example.com', async ({ page }) => {
	await page.goto('f115d');
	expect(page.url()).toBe('https://example.com/');
});