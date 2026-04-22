export const theme = {
  colors: {
    // Warm sophisticated palette
    primary: '#1A1A1A',        // Deep charcoal
    accent: '#8B7355',          // Warm bronze/cognac
    accentLight: '#A89585',      // Lighter bronze
    highlight: '#F5F0EB',        // Warm cream (editing bg)
    background: '#FDFBF8',      // Warm off-white
    surface: '#FFFFFF',          // Pure white cards
    textPrimary: '#1A1A1A',      // Deep charcoal
    textSecondary: '#7A7570',    // Warm gray
    textMuted: '#B0A89E',       // Muted warm
    border: '#E8E3DC',          // Warm light border
    borderDark: '#D4CEC6',       // Slightly darker border
    danger: '#C4A5A5',          // Muted rose (delete)
    overlay: 'rgba(26, 26, 26, 0.5)', // Deep overlay
  },
  spacing: {
    base: 4,
    pagePadding: 48,
    cardGap: 28,
    cardPadding: 32,
  },
  borderRadius: {
    card: 16,
    modal: 20,
    button: 10,
    input: 12,
  },
  transitions: {
    cardHover: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    buttonHover: '200ms ease',
    modal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    fade: '600ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    card: '0 2px 8px rgba(26, 26, 26, 0.04), 0 8px 24px rgba(26, 26, 26, 0.06)',
    cardHover: '0 8px 32px rgba(26, 26, 26, 0.08), 0 16px 48px rgba(26, 26, 26, 0.08)',
    modal: '0 16px 48px rgba(26, 26, 26, 0.12), 0 8px 24px rgba(26, 26, 26, 0.08)',
    float: '0 4px 20px rgba(139, 115, 85, 0.25)',
  },
} as const

export type Theme = typeof theme
