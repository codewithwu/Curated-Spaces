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
  width: 480px;
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

const FormGroup = styled.div`
  margin-bottom: 12px;
`

const Label = styled.label`
  display: block;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
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
          <Label>标题 *</Label>
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="作品名称"
          />
        </FormGroup>
        <FormGroup>
          <Label>链接 *</Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
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