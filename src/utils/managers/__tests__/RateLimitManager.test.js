import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { RateLimitManager } from '../RateLimitManager.js';

describe('RateLimitManager', () => {
  let rateLimitManager;

  beforeEach(() => {
    rateLimitManager = new RateLimitManager();
    jest.useFakeTimers();
  });

  test('should allow requests within rate limit', async () => {
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(await rateLimitManager.checkRateLimit('test'));
    }
    expect(results.every(result => result === true)).toBe(true);
  });

  test('should handle rate limiting', async () => {
    // Simulate hitting the rate limit
    const now = Date.now();
    rateLimitManager.requests.set('cmd_test', Array(50).fill(now));

    // Try one more request
    const promise = rateLimitManager.checkRateLimit('test');
    
    // Fast-forward time
    jest.advanceTimersByTime(1000);
    
    // Resolve any pending promises
    await Promise.resolve();
    
    const result = await promise;
    expect(result).toBe(true);
  });

  test('should cleanup old entries', () => {
    rateLimitManager.requests.set('cmd_test', [Date.now() - 2000]);
    rateLimitManager.cleanup(Date.now());
    expect(rateLimitManager.requests.has('cmd_test')).toBe(false);
  });
});
