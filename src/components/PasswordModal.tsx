import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  from {
    transform: scale(0.96) translateY(8px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.overlay};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 200ms ease-out;
`

const Modal = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.modal}px;
  padding: 40px;
  width: 380px;
  max-width: 90vw;
  box-shadow: ${theme.shadows.modal};
  animation: ${scaleIn} 300ms cubic-bezier(0.4, 0, 0.2, 1);
`

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: 28px;
  text-align: center;
  letter-spacing: 0.02em;
`

const LockIcon = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentLight} 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.input}px;
  font-size: 15px;
  background-color: ${theme.colors.background};
  transition: all ${theme.transitions.buttonHover};
  text-align: center;
  letter-spacing: 0.08em;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.surface};
    box-shadow: 0 0 0 4px rgba(139, 115, 85, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
    letter-spacing: 0.04em;
  }
`

const ErrorText = styled.p`
  color: ${theme.colors.danger};
  font-size: 13px;
  margin-top: 12px;
  text-align: center;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.button}px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    border-color: ${theme.colors.borderDark};
    background-color: ${theme.colors.highlight};
    color: ${theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: ${theme.borderRadius.button}px;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentLight} 100%);
  color: white;
  font-size: 14px;
  font-weight: 400;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }

  &:disabled {
    background: ${theme.colors.border};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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
        <LockIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </LockIcon>
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