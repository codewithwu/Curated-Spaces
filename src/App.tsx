import { useState } from 'react'
import { Header } from './components/Header'
import { SectionGrid } from './components/SectionGrid'
import { FloatingButton } from './components/FloatingButton'
import { AddSectionModal } from './components/AddSectionModal'
import { AddWorkModal } from './components/AddWorkModal'
import { usePortfolio } from './hooks/usePortfolio'

export default function App() {
  const {
    sections,
    addSection,
    deleteSection,
    updateSectionSize,
    addWork,
    updateWork,
    deleteWork,
  } = usePortfolio()

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  const handleAddSection = (name: string) => {
    addSection(name)
  }

  const handleDeleteSection = (sectionId: string) => {
    if (window.confirm('确定要删除这个区域及其所有作品吗？')) {
      deleteSection(sectionId)
    }
  }

  const handleOpenAddWork = (sectionId: string) => {
    setActiveSectionId(sectionId)
    setIsWorkModalOpen(true)
  }

  const handleAddWork = (title: string, url: string, description: string) => {
    if (activeSectionId) {
      addWork(activeSectionId, title, url, description)
    }
    setActiveSectionId(null)
  }

  const handleUpdateSectionSize = (sectionId: string, width: number, height: number) => {
    updateSectionSize(sectionId, width, height)
  }

  return (
    <>
      <Header />
      <SectionGrid
        sections={sections}
        onDeleteSection={handleDeleteSection}
        onAddWork={handleOpenAddWork}
        onUpdateWork={updateWork}
        onDeleteWork={deleteWork}
        onUpdateSectionSize={handleUpdateSectionSize}
      />
      <FloatingButton onClick={() => setIsSectionModalOpen(true)} />
      <AddSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        onSubmit={handleAddSection}
      />
      <AddWorkModal
        isOpen={isWorkModalOpen}
        onClose={() => {
          setIsWorkModalOpen(false)
          setActiveSectionId(null)
        }}
        onSubmit={handleAddWork}
      />
    </>
  )
}
