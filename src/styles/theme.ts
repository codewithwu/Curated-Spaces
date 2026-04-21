export const theme = {
  colors: {
    primary: '#264653',
    accent: '#2A9D8F',
    highlight: '#E9C46A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  spacing: {
    base: 4,
    pagePadding: 24,
    cardGap: 16,
    cardPadding: 20,
  },
  borderRadius: {
    card: 8,
    modal: 12,
  },
  transitions: {
    cardHover: '200ms ease-out',
    buttonHover: '150ms ease',
    modal: '200ms ease-out',
  },
} as const

export type Theme = typeof theme