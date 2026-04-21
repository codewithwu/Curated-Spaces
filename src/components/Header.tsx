import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeaderWrapper = styled.header`
  padding: ${theme.spacing.pagePadding}px;
  padding-bottom: 32px;
  background-color: ${theme.colors.background};
  position: relative;
`

const HeaderLine = styled.div`
  position: absolute;
  bottom: 0;
  left: ${theme.spacing.pagePadding}px;
  right: ${theme.spacing.pagePadding}px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    ${theme.colors.border} 20%,
    ${theme.colors.border} 80%,
    transparent
  );
`

const Title = styled.h1`
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.textSecondary};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

const Subtitle = styled.span`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-left: 16px;
  opacity: 0.6;
`

export function Header() {
  return (
    <HeaderWrapper>
      <Title>
        作品集
        <Subtitle>Portfolio</Subtitle>
      </Title>
      <HeaderLine />
    </HeaderWrapper>
  )
}
