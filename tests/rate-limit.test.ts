import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { RateLimiter } from '../src/lib/rate-limit';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({
      windowMs: 60 * 1000, // 1 minute for testing
      maxRequests: 3,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow requests under the limit', () => {
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
  });

  it('should block requests over the limit', () => {
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false); // 1
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false); // 2
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false); // 3
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(true);  // blocked
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(true);  // still blocked
  });

  it('should track different IPs separately', () => {
    // Fill up limit for IP 1
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(true); // blocked

    // IP 2 should still be allowed
    expect(rateLimiter.isRateLimited('192.168.1.2')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.2')).toBe(false);
  });

  it('should reset after the time window expires', () => {
    vi.useFakeTimers();

    // Use up the limit
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(true); // blocked

    // Advance time past the window
    vi.advanceTimersByTime(61 * 1000);

    // Should be allowed again
    expect(rateLimiter.isRateLimited('192.168.1.1')).toBe(false);
  });

  it('should clean up expired records', () => {
    vi.useFakeTimers();

    // Create some records
    rateLimiter.isRateLimited('192.168.1.1');
    rateLimiter.isRateLimited('192.168.1.2');

    expect(rateLimiter.getRecord('192.168.1.1')).toBeDefined();
    expect(rateLimiter.getRecord('192.168.1.2')).toBeDefined();

    // Advance time past the window
    vi.advanceTimersByTime(61 * 1000);

    // Cleanup
    rateLimiter.cleanup();

    // Records should be gone
    expect(rateLimiter.getRecord('192.168.1.1')).toBeUndefined();
    expect(rateLimiter.getRecord('192.168.1.2')).toBeUndefined();
  });

  it('should reset all records when reset() is called', () => {
    rateLimiter.isRateLimited('192.168.1.1');
    rateLimiter.isRateLimited('192.168.1.2');

    rateLimiter.reset();

    expect(rateLimiter.getRecord('192.168.1.1')).toBeUndefined();
    expect(rateLimiter.getRecord('192.168.1.2')).toBeUndefined();
  });

  it('should correctly count requests in the record', () => {
    rateLimiter.isRateLimited('192.168.1.1'); // count: 1
    rateLimiter.isRateLimited('192.168.1.1'); // count: 2

    const record = rateLimiter.getRecord('192.168.1.1');
    expect(record?.count).toBe(2);
  });
});
