import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Header } from './components/Header'
import { SectionGrid } from './components/SectionGrid'
import { FloatingButton } from './components/FloatingButton'
import { AddSectionModal } from './components/AddSectionModal'
import { AddWorkModal } from './components/AddWorkModal'
import { PasswordModal } from './components/PasswordModal'
import { usePortfolio } from './hooks/usePortfolio'
import { theme } from './styles/theme'
import type { PortfolioData } from './types'

const AUTH_KEY = 'portfolio_auth'
const ADMIN_PASSWORD = 'helloworld' // 可在此修改密码

const FooterButton = styled.a`
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 28px;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentLight} 100%);
  border: none;
  border-radius: 40px;
  color: white;
  font-size: 13px;
  font-weight: 400;
  text-decoration: none;
  box-shadow: ${theme.shadows.float};
  transition: all ${theme.transitions.buttonHover};
  z-index: 100;
  letter-spacing: 0.02em;

  &:hover {
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 8px 32px rgba(139, 115, 85, 0.4);
  }
`

export default function App() {
  const {
    sections,
    addSection,
    deleteSection,
    updateSectionSize,
    updateSection,
    addWork,
    updateWork,
    deleteWork,
    exportData,
    importData,
    setInitialData,
  } = usePortfolio()

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [isLocked, setIsLocked] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) !== 'true'
  })
  const [pendingAction, setPendingAction] = useState<'export' | 'import' | null>(null)
  const initialDataLoadedRef = useRef(false)

  useEffect(() => {
    if (initialDataLoadedRef.current || sections.length > 0) return
    initialDataLoadedRef.current = true

    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data: PortfolioData) => {
        if (data && data.version === 1 && data.sections?.length > 0) {
          setInitialData(data)
        }
      })
      .catch(() => {
        // ignore errors, use empty initial state
      })
  }, [sections.length, setInitialData])

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

  const handleUpdateSection = (sectionId: string, name: string) => {
    updateSection(sectionId, name)
  }

  const handlePasswordSubmit = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsLocked(false)
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsPasswordModalOpen(false)

      // Execute pending action if any
      if (pendingAction === 'export') {
        handleExport()
      } else if (pendingAction === 'import') {
        handleImport()
      }
      setPendingAction(null)
      return true
    }
    return false
  }

  const handleLock = () => {
    setIsLocked(true)
    sessionStorage.removeItem(AUTH_KEY)
  }

  const handleUnlockClick = () => {
    setIsPasswordModalOpen(true)
  }

  const handleExport = () => {
    if (isLocked) {
      setPendingAction('export')
      setIsPasswordModalOpen(true)
      return
    }
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    if (isLocked) {
      setPendingAction('import')
      setIsPasswordModalOpen(true)
      return
    }
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as PortfolioData
          if (data && data.version === 1 && Array.isArray(data.sections)) {
            importData(data)
          } else {
            alert('无效的 Portfolio 数据格式')
          }
        } catch {
          alert('无法解析 JSON 文件')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <>
      <Header
        isLocked={isLocked}
        onLock={handleLock}
        onExport={handleExport}
        onImport={handleImport}
      />
      <SectionGrid
        sections={sections}
        onDeleteSection={isLocked ? () => {} : handleDeleteSection}
        onAddWork={isLocked ? () => {} : handleOpenAddWork}
        onUpdateWork={isLocked ? () => {} : updateWork}
        onDeleteWork={isLocked ? () => {} : deleteWork}
        onUpdateSectionSize={handleUpdateSectionSize}
        onUpdateSection={isLocked ? () => {} : handleUpdateSection}
      />
      <FooterButton href="https://github.com/codewithwu" target="_blank" rel="noopener noreferrer">
        更多实践应用前往我的Github主页
      </FooterButton>
      {isLocked ? (
        <FooterButton as="button" onClick={handleUnlockClick} style={{ bottom: 90 }}>
          解锁编辑
        </FooterButton>
      ) : (
        <FloatingButton onClick={() => setIsSectionModalOpen(true)} />
      )}
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
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onSubmit={handlePasswordSubmit}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  )
}
