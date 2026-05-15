import { describe, it, expect } from 'vitest';
import { getNotificationEmail } from '../src/emails/notification';
import { getConfirmationEmail } from '../src/emails/confirmation';

describe('Email Templates', () => {
  describe('getNotificationEmail', () => {
    it('should generate valid HTML with provided data', () => {
      const html = getNotificationEmail({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I need help with my website.',
      });

      expect(html).toContain('John Doe');
      expect(html).toContain('john@example.com');
      expect(html).toContain('Hello, I need help with my website.');
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('New Contact Form Submission');
    });

    it('should escape HTML in user input to prevent XSS', () => {
      const html = getNotificationEmail({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: '<img onerror="alert(1)" src="x">',
      });

      // Verify dangerous tags are escaped
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<img onerror');
      // Verify escaped versions are present
      expect(html).toContain('&lt;script&gt;');
      expect(html).toContain('&lt;img');
      expect(html).toContain('onerror=&quot;');
    });

    it('should convert newlines to <br> tags in message', () => {
      const html = getNotificationEmail({
        name: 'Test',
        email: 'test@example.com',
        message: 'Line 1\nLine 2\nLine 3',
      });

      expect(html).toContain('Line 1<br>Line 2<br>Line 3');
    });

    it('should include reply-to hint in footer', () => {
      const html = getNotificationEmail({
        name: 'Jane',
        email: 'jane@example.com',
        message: 'Test',
      });

      expect(html).toContain('Reply directly to this email to respond to Jane');
    });
  });

  describe('getConfirmationEmail', () => {
    it('should generate valid HTML with recipient name', () => {
      const html = getConfirmationEmail({ name: 'Jane Smith' });

      expect(html).toContain('Jane Smith');
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('Thanks for reaching out');
    });

    it('should escape HTML in name to prevent XSS', () => {
      const html = getConfirmationEmail({
        name: '<script>alert("xss")</script>',
      });

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('should include link to rjp.digital', () => {
      const html = getConfirmationEmail({ name: 'Test' });

      expect(html).toContain('href="https://rjp.digital"');
      expect(html).toContain('rjp.digital');
    });

    it('should mention response time expectation', () => {
      const html = getConfirmationEmail({ name: 'Test' });

      expect(html).toContain('1-2 business days');
    });
  });
});
