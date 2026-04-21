import { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Section } from '../types'
import { WorkItem } from './WorkItem'

const CardWrapper = styled.div<{ $width?: number; $height?: number }>`
  position: relative;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.card}px;
  padding: ${theme.spacing.cardPadding}px;
  min-width: 200px;
  min-height: 150px;
  width: ${(props) => props.$width ?? 320}px;
  height: ${(props) => props.$height ?? 'auto'}px;
  display: flex;
  flex-direction: column;
  transition: transform ${theme.transitions.cardHover},
    box-shadow ${theme.transitions.cardHover};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

const DeleteSectionButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.border};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${theme.transitions.buttonHover},
    background-color ${theme.transitions.buttonHover};

  ${CardWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #fee2e2;
    color: #dc2626;
    border-color: #dc2626;
  }
`

const WorksList = styled.div`
  flex: 1;
  overflow-y: auto;
`

const AddWorkButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  border: 1px dashed ${theme.colors.border};
  border-radius: 4px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 13px;
  transition: border-color ${theme.transitions.buttonHover},
    color ${theme.transitions.buttonHover};

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
  }
`

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: se-resize;
  opacity: 0;
  transition: opacity ${theme.transitions.buttonHover};

  ${CardWrapper}:hover & {
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${theme.colors.textSecondary};
    border-bottom: 2px solid ${theme.colors.textSecondary};
  }
`

const CardContainer = styled.div`
  position: relative;
`

interface SectionCardProps {
  section: Section
  onDelete: () => void
  onAddWork: () => void
  onUpdateWork: (workId: string, updates: Partial<Omit<Work, 'id'>>) => void
  onDeleteWork: (workId: string) => void
  onUpdateSize: (width: number, height: number) => void
}

export function SectionCard({
  section,
  onDelete,
  onAddWork,
  onUpdateWork,
  onDeleteWork,
  onUpdateSize,
}: SectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: cardRef.current?.offsetWidth ?? 320,
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
      const newWidth = Math.max(200, resizeStartRef.current.width + deltaX)
      const newHeight = Math.max(150, resizeStartRef.current.height + deltaY)

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

  return (
    <CardContainer>
      <CardWrapper ref={cardRef} $width={section.width} $height={section.height}>
        <CardHeader>
          <SectionTitle>{section.name}</SectionTitle>
          <DeleteSectionButton onClick={onDelete}>×</DeleteSectionButton>
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
      </CardWrapper>
      <ResizeHandle onMouseDown={handleMouseDown} />
    </CardContainer>
  )
}
