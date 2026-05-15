import { describe, it, expect } from 'vitest';
import { validateContactForm, sanitizeContactForm } from '../src/lib/validation';

describe('validateContactForm', () => {
  describe('required fields', () => {
    it('should fail when name is missing', () => {
      const result = validateContactForm({
        name: '',
        email: 'test@example.com',
        message: 'Hello',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Name');
    });

    it('should fail when email is missing', () => {
      const result = validateContactForm({
        name: 'John',
        email: '',
        message: 'Hello',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Email');
    });

    it('should fail when message is missing', () => {
      const result = validateContactForm({
        name: 'John',
        email: 'test@example.com',
        message: '',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Message');
    });

    it('should fail when fields are only whitespace', () => {
      const result = validateContactForm({
        name: '   ',
        email: 'test@example.com',
        message: 'Hello',
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('email validation', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.org',
        'user+tag@example.co.uk',
        'name@subdomain.domain.com',
      ];

      for (const email of validEmails) {
        const result = validateContactForm({
          name: 'John',
          email,
          message: 'Hello',
        });
        expect(result.valid).toBe(true);
      }
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'notanemail',
        'missing@domain',
        '@nodomain.com',
        'spaces in@email.com',
        'no@spaces .com',
      ];

      for (const email of invalidEmails) {
        const result = validateContactForm({
          name: 'John',
          email,
          message: 'Hello',
        });
        expect(result.valid).toBe(false);
        expect(result.error).toContain('email');
      }
    });
  });

  describe('length limits', () => {
    it('should reject names over 200 characters', () => {
      const result = validateContactForm({
        name: 'a'.repeat(201),
        email: 'test@example.com',
        message: 'Hello',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Name');
    });

    it('should reject emails over 320 characters', () => {
      const result = validateContactForm({
        name: 'John',
        email: 'a'.repeat(310) + '@example.com', // 322 chars total
        message: 'Hello',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Email');
    });

    it('should reject messages over 10000 characters', () => {
      const result = validateContactForm({
        name: 'John',
        email: 'test@example.com',
        message: 'a'.repeat(10001),
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Message');
    });

    it('should accept content at the limit', () => {
      const result = validateContactForm({
        name: 'a'.repeat(200),
        email: 'test@example.com',
        message: 'a'.repeat(10000),
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('valid submissions', () => {
    it('should pass with valid data', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need help with my website.',
      });
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});

describe('sanitizeContactForm', () => {
  it('should trim whitespace from all fields', () => {
    const result = sanitizeContactForm({
      name: '  John Doe  ',
      email: '  John@Example.COM  ',
      message: '  Hello world  ',
    });

    expect(result.name).toBe('John Doe');
    expect(result.email).toBe('john@example.com');
    expect(result.message).toBe('Hello world');
  });

  it('should lowercase email addresses', () => {
    const result = sanitizeContactForm({
      name: 'John',
      email: 'JOHN@EXAMPLE.COM',
      message: 'Hello',
    });

    expect(result.email).toBe('john@example.com');
  });

  it('should preserve internal whitespace in name and message', () => {
    const result = sanitizeContactForm({
      name: 'John  Doe',
      email: 'john@example.com',
      message: 'Hello\n\nWorld',
    });

    expect(result.name).toBe('John  Doe');
    expect(result.message).toBe('Hello\n\nWorld');
  });
});
