export const theme = {
  colors: {
    // Warm minimal palette
    primary: '#2C2C2C',      // Warm near-black
    accent: '#7C9A92',        // Muted sage green
    highlight: '#E8E4DF',      // Warm cream (editing bg)
    background: '#FAFAF8',    // Warm off-white
    surface: '#FFFFFF',       // Pure white cards
    textPrimary: '#2C2C2C',   // Warm near-black
    textSecondary: '#8B8B8B', // Warm gray
    border: '#EBEBEB',        // Subtle warm border
    danger: '#C4A5A5',        // Muted rose (delete)
  },
  spacing: {
    base: 4,
    pagePadding: 48,         // More generous
    cardGap: 24,
    cardPadding: 28,
  },
  borderRadius: {
    card: 12,
    modal: 16,
  },
  transitions: {
    cardHover: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    buttonHover: '200ms ease',
    modal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.06), 0 8px 32px rgba(0, 0, 0, 0.04)',
    modal: '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
  },
} as const

export type Theme = typeof theme
