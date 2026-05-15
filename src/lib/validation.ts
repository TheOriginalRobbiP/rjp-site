export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const { name, email, message } = data;

  if (!name?.trim()) {
    return { valid: false, error: 'Name is required.' };
  }

  if (!email?.trim()) {
    return { valid: false, error: 'Email is required.' };
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (!message?.trim()) {
    return { valid: false, error: 'Message is required.' };
  }

  // Basic length checks
  if (name.trim().length > 200) {
    return { valid: false, error: 'Name is too long.' };
  }

  if (email.trim().length > 320) {
    return { valid: false, error: 'Email is too long.' };
  }

  if (message.trim().length > 10000) {
    return { valid: false, error: 'Message is too long.' };
  }

  return { valid: true };
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
  };
}
