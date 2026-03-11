/**
 * Validators for form data and property information
 */

export const validators = {
  /**
   * Validate email format
   */
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (10 digits for India)
   */
  phone: (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  },

  /**
   * Validate name (minimum 2 characters, letters and spaces)
   */
  name: (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  },

  /**
   * Validate date (not in the past)
   */
  date: (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  },

  /**
   * Validate price (positive number)
   */
  price: (price: number): boolean => {
    return price > 0 && isFinite(price);
  },

  /**
   * Validate property specs (beds, baths, etc.)
   */
  specs: (beds: number, baths: number, sqft: number): boolean => {
    return beds > 0 && baths > 0 && sqft > 0;
  },
};

/**
 * Custom error messages
 */
export const errorMessages = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  INVALID_NAME: 'Name must be at least 2 characters (letters only)',
  INVALID_DATE: 'Please select a future date',
  INVALID_PRICE: 'Please enter a valid price',
  REQUIRED_FIELD: 'This field is required',
  BOOKING_ERROR: 'Failed to create booking. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};
