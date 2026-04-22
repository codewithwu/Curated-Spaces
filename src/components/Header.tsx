import { useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { PortfolioData } from '../types'

const HeaderWrapper = styled.header`
  padding: ${theme.spacing.pagePadding}px;
  padding-bottom: 32px;
  background-color: ${theme.colors.background};
  position: relative;
`

const HeaderLine = styled.div`
  position: absolute;
  bottom: 0;
  left: ${theme.spacing.pagePadding}px;
  right: ${theme.spacing.pagePadding}px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    ${theme.colors.border} 20%,
    ${theme.colors.border} 80%,
    transparent
  );
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleGroup = styled.div``

const Title = styled.h1`
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.textSecondary};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

const Subtitle = styled.span`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-left: 16px;
  opacity: 0.6;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
`

const ActionButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.border};
    color: ${theme.colors.textPrimary};
  }
`

interface HeaderProps {
  exportData: () => PortfolioData
  importData: (data: PortfolioData) => void
}

export function Header({ exportData, importData }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
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

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
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

    // reset input
    e.target.value = ''
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <TitleGroup>
          <Title>
            作品集
            <Subtitle>Portfolio</Subtitle>
          </Title>
        </TitleGroup>
        <Actions>
          <ActionButton onClick={handleExport}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            导出
          </ActionButton>
          <ActionButton onClick={handleImportClick}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            导入
          </ActionButton>
        </Actions>
      </HeaderContent>
      <HeaderLine />
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </HeaderWrapper>
  )
}
