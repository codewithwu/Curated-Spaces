import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 4px 20px rgba(139, 115, 85, 0.25);
  }
  50% {
    box-shadow: 0 4px 28px rgba(139, 115, 85, 0.4);
  }
`

const Button = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentLight} 100%);
  color: white;
  border: none;
  font-size: 24px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.float};
  transition: all ${theme.transitions.buttonHover};
  z-index: 100;
  animation: ${pulse} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 32px rgba(139, 115, 85, 0.4);
    animation: none;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    transition: transform ${theme.transitions.buttonHover};
  }

  &:hover svg {
    transform: rotate(90deg);
  }
`

interface FloatingButtonProps {
  onClick: () => void
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Button onClick={onClick} aria-label="新增区域">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </Button>
  )
}