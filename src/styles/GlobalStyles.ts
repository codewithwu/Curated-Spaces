import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans SC';
    src: url('/fonts/NotoSansSC-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans SC', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
  }
`