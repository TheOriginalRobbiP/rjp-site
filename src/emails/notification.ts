interface NotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export function getNotificationEmail({ name, email, message }: NotificationEmailProps): string {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0; color: #1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f0;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">From</p>
                    <p style="margin: 0; font-size: 16px; color: #1a1a1a;">${escapedName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">Email</p>
                    <p style="margin: 0; font-size: 16px;"><a href="mailto:${escapedEmail}" style="color: #c17f59; text-decoration: none;">${escapedEmail}</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">Message</p>
                    <div style="padding: 16px; background-color: #f5f5f0; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
                      ${escapedMessage}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e5e5; background-color: #fafaf8;">
              <p style="margin: 0; font-size: 13px; color: #666666;">
                Reply directly to this email to respond to ${escapedName}.
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
