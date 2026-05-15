export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record || now > record.resetTime) {
      this.records.set(key, { count: 1, resetTime: now + this.config.windowMs });
      return false;
    }

    if (record.count >= this.config.maxRequests) {
      return true;
    }

    record.count++;
    return false;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (now > record.resetTime) {
        this.records.delete(key);
      }
    }
  }

  reset(): void {
    this.records.clear();
  }

  getRecord(key: string): RateLimitRecord | undefined {
    return this.records.get(key);
  }
}

// Default rate limiter for contact form: 5 requests per hour
export const contactFormRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
});
