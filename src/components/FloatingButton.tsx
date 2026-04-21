import styled from 'styled-components'
import { theme } from '../styles/theme'

const Button = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${theme.colors.accent};
  color: white;
  border: none;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background-color ${theme.transitions.buttonHover},
    transform ${theme.transitions.buttonHover};

  &:hover {
    background-color: #238277;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
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
