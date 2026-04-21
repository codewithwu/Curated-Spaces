import styled from 'styled-components'
import { theme } from '../styles/theme'

const Button = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme.colors.accent};
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.card};
  transition: all ${theme.transitions.buttonHover};
  z-index: 100;

  &:hover {
    background-color: #6B8A82;
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.card};
  }
`

interface FloatingButtonProps {
  onClick: () => void
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Button onClick={onClick} aria-label="新增区域">
      +
    </Button>
  )
}
