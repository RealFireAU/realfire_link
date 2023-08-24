import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('object test', () => {
	it('object is equal', () => {
		expect({ a: 1 }).toEqual({ a: 1 });
	});
});