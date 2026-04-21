import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Section, Work } from '../types'
import { SectionCard } from './SectionCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.cardGap}px;
  padding: ${theme.spacing.pagePadding}px;
  padding-bottom: 100px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: ${theme.colors.textSecondary};
`

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`

const EmptyText = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`

const EmptyHint = styled.p`
  font-size: 14px;
  opacity: 0.7;
`

interface SectionGridProps {
  sections: Section[]
  onDeleteSection: (sectionId: string) => void
  onAddWork: (sectionId: string) => void
  onUpdateWork: (sectionId: string, workId: string, updates: Partial<Omit<Work, 'id'>>) => void
  onDeleteWork: (sectionId: string, workId: string) => void
  onUpdateSectionSize: (sectionId: string, width: number, height: number) => void
}

export function SectionGrid({
  sections,
  onDeleteSection,
  onAddWork,
  onUpdateWork,
  onDeleteWork,
  onUpdateSectionSize,
}: SectionGridProps) {
  if (sections.length === 0) {
    return (
      <Grid>
        <EmptyState>
          <EmptyIcon>📁</EmptyIcon>
          <EmptyText>还没有任何区域</EmptyText>
          <EmptyHint>点击右下角按钮添加第一个区域</EmptyHint>
        </EmptyState>
      </Grid>
    )
  }

  return (
    <Grid>
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          onDelete={() => onDeleteSection(section.id)}
          onAddWork={() => onAddWork(section.id)}
          onUpdateWork={(workId, updates) => onUpdateWork(section.id, workId, updates)}
          onDeleteWork={(workId) => onDeleteWork(section.id, workId)}
          onUpdateSize={(width, height) => onUpdateSectionSize(section.id, width, height)}
        />
      ))}
    </Grid>
  )
}