import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { getNotificationEmail } from '../../emails/notification';
import { getConfirmationEmail } from '../../emails/confirmation';
import { validateContactForm, sanitizeContactForm } from '../../lib/validation';
import { contactFormRateLimiter } from '../../lib/rate-limit';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Rate limiting
    const ip = clientAddress || 'unknown';
    if (contactFormRateLimiter.isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const rawData = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    // Honeypot check
    const botField = formData.get('bot-field')?.toString();
    if (botField) {
      // Silently succeed for bots to not reveal detection
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validation
    const validation = validateContactForm(rawData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: validation.error 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize data
    const { name, email, message } = sanitizeContactForm(rawData);

    // Initialize Resend
    // Use process.env for runtime environment variables in Docker
    const resendApiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service is not configured. Please try again later.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);

    // Send notification email to you
    const notificationResult = await resend.emails.send({
      from: 'RJP Digital <hello@rjp.digital>',
      to: 'hello@rjp.digital',
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: getNotificationEmail({ name, email, message }),
    });

    if (notificationResult.error) {
      console.error('Failed to send notification email:', notificationResult.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to send message. Please try again later.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send confirmation email to submitter
    const confirmationResult = await resend.emails.send({
      from: 'RJP Digital <hello@rjp.digital>',
      to: email,
      subject: "Thanks for reaching out - I'll be in touch soon",
      html: getConfirmationEmail({ name }),
    });

    if (confirmationResult.error) {
      // Log but don't fail - the main notification was sent
      console.error('Failed to send confirmation email:', confirmationResult.error);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
