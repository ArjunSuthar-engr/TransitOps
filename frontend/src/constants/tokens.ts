/**
 * TransitOps Centralized Design Tokens
 * Specifies colors, typography, spacing, radius, and shadows for the premium enterprise platform.
 */
export const TOKENS = {
  colors: {
    primary: '#0C0D0D',         // High-contrast slate-black text & interactive items
    background: '#ECF4EE',      // Soft mint background wash
    surface: '#FAFAFA',         // Off-white inner canvas background
    card: '#FFFFFF',            // Pure white container surfaces
    border: '#E5E7EB',          // Soft light gray borders
    success: '#A5D48C',         // Sage-mint status accent color
    warning: '#F7B558',         // Marigold warning accent color
    neutralDark: '#363236',     // Muted slate-neutral secondary text
  },
  
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
  
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    xxl: '1.5rem',   // 24px
  },
  
  shadows: {
    sm: '0 1px 2px rgba(12, 13, 13, 0.02)',
    md: '0 4px 6px -1px rgba(12, 13, 13, 0.03), 0 2px 4px -1px rgba(12, 13, 13, 0.02)',
    lg: '0 10px 15px -3px rgba(12, 13, 13, 0.04), 0 4px 6px -2px rgba(12, 13, 13, 0.02)',
  }
} as const;
