/**
 * Utility functions for formatting data
 */

/**
 * Format currency to INR format
 * @param amount - Amount in paise or rupees
 * @param showPaise - Whether to show paise decimals
 * @returns Formatted string
 */
export const formatCurrency = (
  amount: number,
  showPaise: boolean = false
): string => {
  if (!showPaise) {
    amount = Math.round(amount / 100);
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showPaise ? 2 : 0,
    maximumFractionDigits: showPaise ? 2 : 0,
  });

  return formatter.format(amount);
};

/**
 * Abbreviate large numbers
 * @param num - Number to abbreviate
 * @returns Abbreviated string
 */
export const abbreviateNumber = (num: number): string => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + ' Cr';
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + ' L';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' K';
  }
  return num.toString();
};

/**
 * Format date to readable format
 * @param date - Date string or Date object
 * @param format - Format type: 'short', 'long', 'time'
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'time' = 'short'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? { day: 'numeric', month: 'short', year: 'numeric' }
      : format === 'long'
        ? { day: 'numeric', month: 'long', year: 'numeric' }
        : { hour: '2-digit', minute: '2-digit' };

  return new Intl.DateTimeFormat('en-IN', options).format(dateObj);
};

/**
 * Format area/sqft
 * @param sqft - Square feet
 * @returns Formatted string
 */
export const formatArea = (sqft: number): string => {
  return new Intl.NumberFormat('en-IN').format(sqft) + ' Sqft';
};

/**
 * Calculate price per sqft
 * @param price - Total price
 * @param sqft - Square feet
 * @returns Price per sqft
 */
export const calculatePricePerSqft = (price: number, sqft: number): number => {
  return Math.round(price / sqft);
};

/**
 * Humanize time difference from now
 * @param date - Date string or Date object
 * @returns Human readable time difference
 */
export const getTimeAgo = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return formatDate(dateObj, 'short');
};

/**
 * Truncate text to specific length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Slugify text for URLs
 * @param text - Text to slugify
 * @returns Slugified text
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Format phone number
 * @param phone - Phone number
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
};
