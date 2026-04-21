import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeaderWrapper = styled.header`
  padding: ${theme.spacing.pagePadding}px;
  border-bottom: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.surface};
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

export function Header() {
  return (
    <HeaderWrapper>
      <Title>我的作品集</Title>
    </HeaderWrapper>
  )
}