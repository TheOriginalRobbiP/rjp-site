interface ConfirmationEmailProps {
  name: string;
}

export function getConfirmationEmail({ name }: ConfirmationEmailProps): string {
  const escapedName = escapeHtml(name);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0; color: #1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f0;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">RJP Digital</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">Thanks for reaching out, ${escapedName}!</h2>
              
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #444444;">
                I've received your message and will get back to you as soon as possible, typically within 1-2 business days.
              </p>
              
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #444444;">
                In the meantime, feel free to reply to this email if you have any additional details to share.
              </p>
              
              <p style="margin: 24px 0 0 0; font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                Best,<br>
                <strong>Robin</strong><br>
                <span style="color: #666666;">RJP Digital</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e5e5; background-color: #fafaf8;">
              <p style="margin: 0; font-size: 13px; color: #666666; text-align: center;">
                <a href="https://rjp.digital" style="color: #c17f59; text-decoration: none;">rjp.digital</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
