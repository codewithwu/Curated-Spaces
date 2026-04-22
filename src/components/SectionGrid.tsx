import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'
import type { Section, Work } from '../types'
import { SectionCard } from './SectionCard'

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: ${theme.spacing.cardGap}px;
  padding: ${theme.spacing.pagePadding}px;
  padding-top: 36px;
  padding-bottom: 140px;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    padding: 20px 16px 120px;
  }
`

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
  animation: ${fadeSlideUp} 600ms cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 200ms;
`

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 28px;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' stroke='%231A1A1A' stroke-width='1.5'/%3E%3Cpath d='M8 12h8M12 8v8' stroke='%231A1A1A' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
`

const EmptyText = styled.p`
  font-size: 17px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 10px;
  letter-spacing: 0.03em;
  font-weight: 400;
`

const EmptyHint = styled.p`
  font-size: 14px;
  color: ${theme.colors.textMuted};
  font-weight: 300;
`

interface SectionGridProps {
  sections: Section[]
  onDeleteSection: (sectionId: string) => void
  onAddWork: (sectionId: string) => void
  onUpdateWork: (sectionId: string, workId: string, updates: Partial<Omit<Work, 'id'>>) => void
  onDeleteWork: (sectionId: string, workId: string) => void
  onUpdateSectionSize: (sectionId: string, width: number, height: number) => void
  onUpdateSection: (sectionId: string, name: string) => void
}

export function SectionGrid({
  sections,
  onDeleteSection,
  onAddWork,
  onUpdateWork,
  onDeleteWork,
  onUpdateSectionSize,
  onUpdateSection,
}: SectionGridProps) {
  if (sections.length === 0) {
    return (
      <Grid>
        <EmptyState>
          <EmptyIcon />
          <EmptyText>还没有任何区域</EmptyText>
          <EmptyHint>点击右下角 + 按钮添加第一个作品分类</EmptyHint>
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
          onUpdateSection={(name) => onUpdateSection(section.id, name)}
        />
      ))}
    </Grid>
  )
}