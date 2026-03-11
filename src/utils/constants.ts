/**
 * Application-wide constants
 */

export const APP_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  COGNITO_POOL_ID: process.env.REACT_APP_COGNITO_POOL_ID || '',
  COGNITO_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID || '',
  GOOGLE_MAPS_KEY: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
  CDN_URL: process.env.REACT_APP_CDN_URL || 'https://cdn.estatevision.com',
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
};

export const PROPERTY_TYPES = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Plot', label: 'Plot' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Penthouse', label: 'Penthouse' },
];

export const PROPERTY_STATUS = [
  { value: 'Ready to Move', label: 'Ready to Move' },
  { value: 'Under Construction', label: 'Under Construction' },
  { value: 'Resale', label: 'Resale' },
];

export const FURNISHED_TYPES = [
  { value: 'Fully', label: 'Fully Furnished' },
  { value: 'Semi', label: 'Semi Furnished' },
  { value: 'Unfurnished', label: 'Unfurnished' },
];

export const BOOKING_TYPES = [
  { value: 'site_visit', label: 'Site Visit' },
  { value: 'video_call', label: 'Video Call' },
  { value: 'phone_call', label: 'Phone Call' },
];

export const PRICE_RANGES = [
  { min: 0, max: 5000000, label: 'Below 50L' },
  { min: 5000000, max: 10000000, label: '50L - 1Cr' },
  { min: 10000000, max: 25000000, label: '1Cr - 2.5Cr' },
  { min: 25000000, max: 50000000, label: '2.5Cr - 5Cr' },
  { min: 50000000, max: Infinity, label: 'Above 5Cr' },
];

export const BED_OPTIONS = [1, 2, 3, 4, 5];

export const AMENITIES = [
  'Lift',
  'Parking',
  'Swimming Pool',
  'Gym',
  'Garden',
  'Security',
  'Balcony',
  'Terrace',
  'Power Backup',
  'Water Tank',
  'WiFi',
  'Intercom',
];

export const LANDMARK_ICONS: Record<string, string> = {
  airport: '✈️',
  railway: '🚂',
  hospital: '🏥',
  school: '🎓',
  mall: '🛍️',
  office: '🏢',
  metro: '🚇',
};

export const DEBOUNCE_DELAY = 300;
export const PAGINATION_LIMIT = 12;
export const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/400x300?text=Property+Image';
export const TOAST_DURATION = 3000;

/**
 * CSS Color Variables
 * Used throughout the application
 */
export const CSS_COLORS = {
  primary: '#FFD700',
  primaryDark: '#FFC700',
  background: '#F5F5F5',
  cardBg: '#FFFFFF',
  text: '#111111',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#27AE60',
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',
};

/**
 * Component size constants
 */
export const SIZES = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

/**
 * Breakpoints
 */
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
