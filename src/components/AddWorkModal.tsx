import { useState, useEffect, useRef } from 'react'
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
  width: 480px;
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
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 6px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${theme.colors.border};
  border-radius: 10px;
  font-size: 14px;
  background-color: ${theme.colors.background};
  transition: all ${theme.transitions.buttonHover};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.surface};
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${theme.colors.border};
  border-radius: 10px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  background-color: ${theme.colors.background};
  transition: all ${theme.transitions.buttonHover};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.surface};
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`

const CancelButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 400;
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
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    background-color: #6B8A82;
  }

  &:disabled {
    background-color: ${theme.colors.border};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }
`

interface AddWorkModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, url: string, description: string) => void
}

export function AddWorkModal({ isOpen, onClose, onSubmit }: AddWorkModalProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setUrl('')
      setDescription('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (title.trim() && url.trim()) {
      onSubmit(title.trim(), url.trim(), description.trim())
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <Title>添加作品</Title>
        <FormGroup>
          <Label>标题</Label>
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="作品名称"
          />
        </FormGroup>
        <FormGroup>
          <Label>链接</Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="github地址："
          />
        </FormGroup>
        <FormGroup>
          <Label>描述</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="简要描述这个作品..."
          />
        </FormGroup>
        <ButtonGroup>
          <CancelButton onClick={onClose}>取消</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={!title.trim() || !url.trim()}>
            确定
          </SubmitButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}
