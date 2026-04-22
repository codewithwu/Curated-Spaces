import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Work } from '../types'

const ItemWrapper = styled.div`
  position: relative;
  background-color: transparent;
  padding: 16px 0;
  margin-bottom: 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: all ${theme.transitions.buttonHover};
  cursor: text;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    .delete-btn {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }
`

const DeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(4px);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${theme.colors.danger};
  color: white;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    background-color: #B09090;
    transform: translateY(-50%) scale(1.1) !important;
  }
`

const Title = styled.h4`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  margin-bottom: 8px;
  padding-right: 36px;
  line-height: 1.4;
  letter-spacing: 0.01em;
`

const UrlRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 4px;
`

const UrlPrefix = styled.span`
  font-size: 12px;
  color: ${theme.colors.textMuted};
  font-weight: 400;
`

const Url = styled.a`
  font-size: 12px;
  color: ${theme.colors.accent};
  font-weight: 400;
  letter-spacing: 0.01em;
  word-break: break-all;
  display: inline-block;
  padding: 2px 0;
  border-bottom: 1px solid transparent;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    border-bottom-color: ${theme.colors.accent};
    color: ${theme.colors.accentLight};
  }
`

const UrlLine = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`

const PreviewUrlPrefix = styled.span`
  font-size: 12px;
  color: ${theme.colors.textMuted};
  font-weight: 400;
`

const Description = styled.p`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-top: 10px;
  line-height: 1.65;
  font-weight: 300;
`

const EditInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${theme.colors.accent};
  border-radius: ${theme.borderRadius.input}px;
  font-size: 14px;
  margin-bottom: 10px;
  background-color: ${theme.colors.highlight};
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

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${theme.colors.accent};
  border-radius: ${theme.borderRadius.input}px;
  font-size: 13px;
  resize: vertical;
  min-height: 80px;
  background-color: ${theme.colors.highlight};
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

const EditHint = styled.div`
  margin-top: 10px;
  font-size: 11px;
  color: ${theme.colors.textMuted};
  opacity: 0.8;
  letter-spacing: 0.02em;
`

interface WorkItemProps {
  work: Work
  onUpdate: (updates: Partial<Omit<Work, 'id'>>) => void
  onDelete: () => void
}

export function WorkItem({ work, onUpdate, onDelete }: WorkItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(work.title)
  const [editUrl, setEditUrl] = useState(work.url)
  const [editPreviewUrl, setEditPreviewUrl] = useState(work.previewUrl || '')
  const [editDescription, setEditDescription] = useState(work.description)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    onUpdate({
      title: editTitle,
      url: editUrl,
      previewUrl: editPreviewUrl || undefined,
      description: editDescription,
    })
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditTitle(work.title)
      setEditUrl(work.url)
      setEditPreviewUrl(work.previewUrl || '')
      setEditDescription(work.description)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <ItemWrapper>
        <EditInput
          ref={inputRef}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="作品名称"
        />
        <EditInput
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="GitHub 地址"
        />
        <EditInput
          value={editPreviewUrl}
          onChange={(e) => setEditPreviewUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="在线预览地址（可选）"
        />
        <EditTextarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="简要描述这个作品..."
        />
        <EditHint>Ctrl + Enter 保存 · Esc 取消</EditHint>
      </ItemWrapper>
    )
  }

  return (
    <ItemWrapper onClick={() => setIsEditing(true)}>
      <DeleteButton
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        ×
      </DeleteButton>
      <Title>{work.title}</Title>
      <UrlRow>
        <UrlPrefix>github地址：</UrlPrefix>
        <Url href={work.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          {work.url}
        </Url>
      </UrlRow>
      {work.previewUrl && (
        <UrlLine>
          <PreviewUrlPrefix>在线预览：</PreviewUrlPrefix>
          <Url href={work.previewUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            {work.previewUrl}
          </Url>
        </UrlLine>
      )}
      {work.description && <Description>{work.description}</Description>}
    </ItemWrapper>
  )
}