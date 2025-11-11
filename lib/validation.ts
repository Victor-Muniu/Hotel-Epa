export function normalizePhone(input: string): string {
  const raw = String(input || '').trim();
  const hadPlus = raw.startsWith('+');
  const digits = raw.replace(/\D+/g, '');
  if (!digits) return '';
  return hadPlus ? `+${digits}` : digits;
}

export function isValidPhone(input: string): boolean {
  const normalized = normalizePhone(input);
  // Require 7-15 digits (common international length range)
  const digits = normalized.startsWith('+') ? normalized.slice(1) : normalized;
  if (!/^[0-9]+$/.test(digits)) return false;
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidEmail(input: string): boolean {
  const email = String(input || '').trim();
  // Basic RFC 5322 compliant enough for most cases
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
