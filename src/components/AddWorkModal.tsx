import { useState, useEffect, useRef } from 'react'
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
  padding: 36px;
  width: 500px;
  max-width: 90vw;
  box-shadow: ${theme.shadows.modal};
  animation: ${scaleIn} 300ms cubic-bezier(0.4, 0, 0.2, 1);
`

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: 28px;
  letter-spacing: 0.02em;
`

const FormGroup = styled.div`
  margin-bottom: 18px;
`

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 8px;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-transform: uppercase;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.input}px;
  font-size: 14px;
  background-color: ${theme.colors.background};
  transition: all ${theme.transitions.buttonHover};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.surface};
    box-shadow: 0 0 0 4px rgba(139, 115, 85, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.input}px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  background-color: ${theme.colors.background};
  transition: all ${theme.transitions.buttonHover};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.surface};
    box-shadow: 0 0 0 4px rgba(139, 115, 85, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 28px;
`

const CancelButton = styled.button`
  padding: 12px 22px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.button}px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 400;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    border-color: ${theme.colors.borderDark};
    background-color: ${theme.colors.highlight};
    color: ${theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: ${theme.borderRadius.button}px;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentLight} 100%);
  color: white;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }

  &:disabled {
    background: ${theme.colors.border};
    color: ${theme.colors.textMuted};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

interface AddWorkModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, url: string, previewUrl: string, description: string) => void
}

export function AddWorkModal({ isOpen, onClose, onSubmit }: AddWorkModalProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [description, setDescription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setUrl('')
      setPreviewUrl('')
      setDescription('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (title.trim() && url.trim()) {
      onSubmit(title.trim(), url.trim(), previewUrl.trim(), description.trim())
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
          <Label>在线预览（可选）</Label>
          <Input
            value={previewUrl}
            onChange={(e) => setPreviewUrl(e.target.value)}
            placeholder="在线预览地址"
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