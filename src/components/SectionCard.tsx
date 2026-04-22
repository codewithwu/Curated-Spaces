import { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Section, Work } from '../types'
import { WorkItem } from './WorkItem'

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div<{ $width?: number; $height?: number }>`
  position: relative;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.card}px;
  padding: ${theme.spacing.cardPadding}px;
  min-width: 280px;
  min-height: 180px;
  width: ${(props) => props.$width ?? 340}px;
  height: ${(props) => props.$height ?? 'auto'}px;
  display: flex;
  flex-direction: column;
  box-shadow: ${theme.shadows.card};
  transition: all ${theme.transitions.cardHover};

  &:hover {
    box-shadow: ${theme.shadows.cardHover};
  }

  &:hover .delete-btn {
    opacity: 1;
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${theme.colors.border};
`

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.primary};
  letter-spacing: 0.02em;
`

const SectionTitleInput = styled.input`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.colors.primary};
  letter-spacing: 0.02em;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.accent};
  outline: none;
  padding: 0;
  width: 100%;
  max-width: 200px;
`

const WorkCount = styled.span`
  font-size: 11px;
  color: ${theme.colors.textSecondary};
  letter-spacing: 0.05em;
`

const DeleteSectionButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  border: none;
  font-size: 16px;
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

const WorksList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px;
`

const AddWorkButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: 1px dashed ${theme.colors.border};
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: all ${theme.transitions.buttonHover};

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
    background-color: rgba(124, 154, 146, 0.04);
  }
`

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 0;
  transition: opacity ${theme.transitions.buttonHover};

  &::after {
    content: '';
    position: absolute;
    bottom: 6px;
    right: 6px;
    width: 6px;
    height: 6px;
    border-right: 1.5px solid ${theme.colors.textSecondary};
    border-bottom: 1.5px solid ${theme.colors.textSecondary};
    opacity: 0.4;
  }

  ${CardWrapper}:hover & {
    opacity: 1;
  }
`

interface SectionCardProps {
  section: Section
  onDelete: () => void
  onAddWork: () => void
  onUpdateWork: (workId: string, updates: Partial<Omit<Work, 'id'>>) => void
  onDeleteWork: (workId: string) => void
  onUpdateSize: (width: number, height: number) => void
  onUpdateSection: (name: string) => void
}

export function SectionCard({
  section,
  onDelete,
  onAddWork,
  onUpdateWork,
  onDeleteWork,
  onUpdateSize,
  onUpdateSection,
}: SectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(section.name)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: cardRef.current?.offsetWidth ?? 340,
        height: cardRef.current?.offsetHeight ?? 200,
      }
    },
    []
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y
      const newWidth = Math.max(280, resizeStartRef.current.width + deltaX)
      const newHeight = Math.max(180, resizeStartRef.current.height + deltaY)

      if (cardRef.current) {
        cardRef.current.style.width = `${newWidth}px`
        cardRef.current.style.height = `${newHeight}px`
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      if (cardRef.current) {
        onUpdateSize(cardRef.current.offsetWidth, cardRef.current.offsetHeight)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, onUpdateSize])

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus()
      titleInputRef.current?.select()
    }
  }, [isEditing])

  const handleTitleClick = () => {
    setEditName(section.name)
    setIsEditing(true)
  }

  const handleTitleBlur = () => {
    setIsEditing(false)
    if (editName.trim() && editName !== section.name) {
      onUpdateSection(editName.trim())
    }
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleBlur()
    } else if (e.key === 'Escape') {
      setEditName(section.name)
      setIsEditing(false)
    }
  }

  const workCount = section.works.length

  return (
    <CardContainer>
      <CardWrapper ref={cardRef} $width={section.width} $height={section.height}>
        <CardHeader>
          {isEditing ? (
            <SectionTitleInput
              ref={titleInputRef}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <SectionTitle onClick={handleTitleClick}>{section.name}</SectionTitle>
          )}
          <WorkCount>{workCount} {workCount === 1 ? '项' : '项'}</WorkCount>
          <DeleteSectionButton className="delete-btn" onClick={onDelete}>
            ×
          </DeleteSectionButton>
        </CardHeader>
        <WorksList>
          {section.works.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              onUpdate={(updates) => onUpdateWork(work.id, updates)}
              onDelete={() => onDeleteWork(work.id)}
            />
          ))}
        </WorksList>
        <AddWorkButton onClick={onAddWork}>+ 添加作品</AddWorkButton>
        <ResizeHandle onMouseDown={handleMouseDown} />
      </CardWrapper>
    </CardContainer>
  )
}
