import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Work } from '../types'

const ItemWrapper = styled.div`
  position: relative;
  background-color: transparent;
  padding: 14px 0;
  margin-bottom: 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: all ${theme.transitions.buttonHover};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    .delete-btn {
      opacity: 1;
    }
  }
`

const DeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  border: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    background-color: ${theme.colors.danger};
    color: white;
  }
`

const Title = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  margin-bottom: 4px;
  padding-right: 32px;
  line-height: 1.4;
`

const UrlPrefix = styled.span`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-right: 4px;
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
  }
`

const Description = styled.p`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-top: 8px;
  line-height: 1.6;
`

const EditInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid ${theme.colors.accent};
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 8px;
  background-color: ${theme.colors.surface};
  transition: all ${theme.transitions.buttonHover};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(124, 154, 146, 0.15);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid ${theme.colors.accent};
  border-radius: 8px;
  font-size: 13px;
  resize: vertical;
  min-height: 72px;
  background-color: ${theme.colors.surface};
  transition: all ${theme.transitions.buttonHover};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(124, 154, 146, 0.15);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`

const EditHint = styled.div`
  margin-top: 8px;
  font-size: 11px;
  color: ${theme.colors.textSecondary};
  opacity: 0.7;
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
          placeholder="标题"
        />
        <EditInput
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="链接"
        />
        <EditTextarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="描述（可选）"
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
      <UrlPrefix>github地址：</UrlPrefix>
      <Url href={work.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        {work.url}
      </Url>
      {work.description && <Description>{work.description}</Description>}
    </ItemWrapper>
  )
}
