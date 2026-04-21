import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Modal = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.modal}px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  animation: scaleIn 200ms ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;

  &:hover {
    background-color: ${theme.colors.background};
  }
`

const SubmitButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${theme.colors.accent};
  color: white;
  font-size: 14px;

  &:hover {
    background-color: #238277;
  }

  &:disabled {
    background-color: ${theme.colors.border};
    cursor: not-allowed;
  }
`

interface AddSectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

export function AddSectionModal({ isOpen, onClose, onSubmit }: AddSectionModalProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim())
      setName('')
      onClose()
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
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>新增区域</Title>
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="例如：前端项目、UI设计、文章链接"
        />
        <ButtonGroup>
          <CancelButton onClick={onClose}>取消</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={!name.trim()}>
            确定
          </SubmitButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}
