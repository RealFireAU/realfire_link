import { expect, test } from '@playwright/test';

test('health is okay', async ({ request }) => {
	const response = await request.get('/api/v1/health');
	expect(response.status()).toBe(200);
	expect(await response.json()).toEqual({ status: 'ok' });
});

