export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Loose UK/international phone check: digits, spaces, +, brackets and dashes. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, '');
  return /^[+\d\s()-]+$/.test(value.trim()) && digits.length >= 10 && digits.length <= 15;
}
