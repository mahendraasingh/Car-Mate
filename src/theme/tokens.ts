/**
 * SAFAR Mobility Design System Tokens
 * Strict adherence to brand color palette and typography rules
 */

export const colors = {
  // Brand Core Colors
  warmIvory: '#F5F2EA',    // Primary background
  deepForest: '#172B2A',   // Headings, icons, and primary actions
  freshLime: '#C9F36A',    // Highlights, selective accents, indicator dots
  pureWhite: '#FFFFFF',    // Cards, pill backgrounds, and clean surfaces
  mutedGrey: '#73776F',    // Body text, secondary details, captions
  softBorder: '#E3E0D7',   // Dividers, card borders, subtle separators

  // Functional Overlays & Derived Shades
  deepForestHover: '#203938',
  deepForestActive: '#122221',
  freshLimeSoft: 'rgba(201, 243, 106, 0.22)',
  limeGaze: 'rgba(201, 243, 106, 0.45)',
  forestAlpha10: 'rgba(23, 43, 42, 0.08)',
  forestAlpha15: 'rgba(23, 43, 42, 0.15)',
  surfaceHighlight: '#FAF8F3',
} as const;

export const typography = {
  fontDisplay: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontBody: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
  },
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;
