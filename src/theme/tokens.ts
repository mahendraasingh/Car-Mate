/**
 * SAFAR Editorial Mobility Design System Tokens
 * Grounded in Indian urban transit realities and inspired by contemporary mixed-media references
 */

export const colors = {
  // Brand Core Colors
  warmIvory: '#F5F2EA',      // Primary page background & clean canvas
  deepForest: '#172B2A',     // Editorial typography, primary buttons, deep ink outlines
  freshLime: '#C9F36A',      // High-visibility transit accents, route glow, key badges
  pureWhite: '#FFFFFF',      // Card surfaces, pill containers, clean contrast
  mutedGrey: '#73776F',      // Body descriptions, secondary copy
  softBorder: '#E3E0D7',     // Delicate card borders, hairline dividers

  // Reference-Inspired Mixed-Media & Doodle Accents
  doodleYellow: '#FFDE59',   // Playful marker highlights, stars, sunshine notes
  doodleBlue: '#2D5BFF',     // Route connection curves, commuter energy
  doodleCoral: '#FF5E4D',    // Live indicators, destination pins
  doodleMint: '#6EE7B7',     // Eco pooling tags

  // Overlays & Atmospheric Alpha Shades
  deepForestHover: '#223D3C',
  deepForestActive: '#0F1E1D',
  freshLimeSoft: 'rgba(201, 243, 106, 0.25)',
  forestAlpha10: 'rgba(23, 43, 42, 0.08)',
  forestAlpha15: 'rgba(23, 43, 42, 0.15)',
  forestAlpha20: 'rgba(23, 43, 42, 0.20)',
  surfaceHighlight: '#FAF8F3',
} as const;

export const typography = {
  fontDisplay: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontBody: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontHandwritten: "'Outfit', cursive, sans-serif",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
  },
} as const;

export const radii = {
  xs: '6px',
  sm: '10px',
  md: '14px',
  lg: '20px',
  xl: '28px',
  full: '9999px',
} as const;

export const spacing = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

export const shadows = {
  subtle: '0 2px 8px rgba(23, 43, 42, 0.06)',
  card: '0 8px 24px -4px rgba(23, 43, 42, 0.08)',
  floating: '0 16px 36px -8px rgba(23, 43, 42, 0.16)',
  doodleSticker: '2px 3px 0px #172B2A',
} as const;

export const dimensions = {
  primaryButtonHeight: '52px',
  secondaryButtonHeight: '48px',
  headerHeight: '64px',
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  maxMobileWidth: '420px',
  maxDesktopContainer: '480px',
} as const;

export const animationDurations = {
  instant: '150ms',
  normal: '250ms',
  entrance: '450ms',
} as const;

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const;
