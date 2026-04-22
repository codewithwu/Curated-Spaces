import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { SectionGrid } from './components/SectionGrid'
import { FloatingButton } from './components/FloatingButton'
import { AddSectionModal } from './components/AddSectionModal'
import { AddWorkModal } from './components/AddWorkModal'
import { usePortfolio } from './hooks/usePortfolio'
import type { PortfolioData } from './types'

const INITIAL_DATA_KEY = 'portfolio_initialized'

export default function App() {
  const {
    sections,
    addSection,
    deleteSection,
    updateSectionSize,
    addWork,
    updateWork,
    deleteWork,
    exportData,
    importData,
  } = usePortfolio()

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  useEffect(() => {
    if (!initialDataLoaded && sections.length === 0) {
      fetch('/data/portfolio.json')
        .then((res) => res.json())
        .then((data: PortfolioData) => {
          if (data && data.version === 1 && data.sections?.length > 0) {
            importData(data)
            sessionStorage.setItem(INITIAL_DATA_KEY, 'true')
          }
        })
        .catch(() => {
          // fallback to localStorage
        })
        .finally(() => {
          setInitialDataLoaded(true)
        })
    }
  }, [initialDataLoaded, sections.length, importData])

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

  const handleAddWork = (title: string, url: string, previewUrl: string, description: string) => {
    if (activeSectionId) {
      addWork(activeSectionId, title, url, previewUrl, description)
    }
    setActiveSectionId(null)
  }

  const handleUpdateSectionSize = (sectionId: string, width: number, height: number) => {
    updateSectionSize(sectionId, width, height)
  }

  return (
    <>
      <Header exportData={exportData} importData={importData} />
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
