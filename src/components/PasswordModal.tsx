import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 44, 44, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const Modal = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.modal}px;
  padding: 32px;
  width: 360px;
  max-width: 90vw;
  box-shadow: ${theme.shadows.modal};
  animation: scaleIn 250ms cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes scaleIn {
    from {
      transform: scale(0.96);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const Title = styled.h3`
  font-size: 17px;
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: 24px;
  letter-spacing: 0.01em;
  text-align: center;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${theme.colors.border};
  border-radius: 10px;
  font-size: 14px;
  background-color: ${theme.colors.background};
  transition: all ${theme.transitions.buttonHover};
  text-align: center;
  letter-spacing: 0.05em;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.surface};
  }
`

const ErrorText = styled.p`
  color: ${theme.colors.danger};
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`

const CancelButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${theme.colors.accent};
  color: white;
  font-size: 14px;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    background-color: #6B8A82;
  }

  &:disabled {
    background-color: ${theme.colors.border};
    cursor: not-allowed;
  }
`

interface PasswordModalProps {
  isOpen: boolean
  onSubmit: (password: string) => boolean
  onClose: () => void
}

export function PasswordModal({ isOpen, onSubmit, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setPassword('')
      setError(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!password.trim()) return
    const success = onSubmit(password.trim())
    if (!success) {
      setError(true)
      setPassword('')
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <Title>请输入管理密码</Title>
        <Input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          placeholder="输入密码"
        />
        {error && <ErrorText>密码错误，请重试</ErrorText>}
        <ButtonGroup>
          <CancelButton onClick={onClose}>取消</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={!password.trim()}>
            确认
          </SubmitButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}
