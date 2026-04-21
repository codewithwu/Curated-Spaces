import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Work } from '../types'

const ItemWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.surface};
  border-left: 3px solid ${theme.colors.accent};
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 0 4px 4px 0;
  transition: box-shadow ${theme.transitions.cardHover};

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &:hover .delete-btn {
    opacity: 1;
  }
`

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.colors.textSecondary};
  color: white;
  border: none;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${theme.transitions.buttonHover};
`

const Title = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  margin-bottom: 4px;
`

const Url = styled.a`
  font-size: 12px;
  color: ${theme.colors.accent};
  font-family: 'JetBrains Mono', monospace;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`

const Description = styled.p`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-top: 6px;
  line-height: 1.4;
`

const EditInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: 2px solid ${theme.colors.highlight};
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 4px;

  &:focus {
    outline: none;
  }
`

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 4px 8px;
  border: 2px solid ${theme.colors.highlight};
  border-radius: 4px;
  font-size: 12px;
  resize: vertical;
  min-height: 60px;
  margin-top: 4px;

  &:focus {
    outline: none;
  }
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
          placeholder="描述"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: theme.colors.textSecondary }}>
          Ctrl+Enter 保存 | Esc 取消
        </div>
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
      <Url href={work.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        {work.url}
      </Url>
      {work.description && <Description>{work.description}</Description>}
    </ItemWrapper>
  )
}
