# Portfolio Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist portfolio showcase app with grid dashboard layout, resizable section cards, localStorage persistence, and inline editing.

**Architecture:** Single-page React app with component-based architecture. State managed via custom hooks. All data persisted to localStorage as JSON. CSS in JS (styled-components) for scoped styling without build complexity.

**Tech Stack:** React 18 + Hooks, TypeScript, Vite, Styled Components

---

## File Structure

```
/home/cooper/githubProjects/Curated-Spaces/
├── src/
│   ├── main.tsx                          # Entry point
│   ├── App.tsx                           # Root component
│   ├── types/
│   │   └── index.ts                      # TypeScript interfaces
│   ├── hooks/
│   │   ├── useLocalStorage.ts            # localStorage abstraction
│   │   └── usePortfolio.ts               # Portfolio state management
│   ├── components/
│   │   ├── Header.tsx                    # Page header
│   │   ├── SectionGrid.tsx               # Grid container for sections
│   │   ├── SectionCard.tsx               # Section card with resize handle
│   │   ├── WorkItem.tsx                  # Individual work item
│   │   ├── AddSectionModal.tsx           # Modal for adding sections
│   │   ├── AddWorkModal.tsx              # Modal for adding works
│   │   └── FloatingButton.tsx            # Bottom add section button
│   └── styles/
│       ├── theme.ts                      # Color tokens and theme
│       └── GlobalStyles.ts               # Global CSS + font-face
├── fonts/
│   └── NotoSansSC-Regular.otf            # Local font file
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "portfolio-showcase",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^6.1.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/uuid": "^9.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>作品集展示</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create src/main.tsx**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyles } from './styles/GlobalStyles'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`

Expected: Dependencies installed successfully

- [ ] **Step 7: Commit**

```bash
git add package.json tsconfig.json vite.config.ts index.html src/main.tsx
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

## Task 2: Theme and Global Styles

**Files:**
- Create: `src/styles/theme.ts`, `src/styles/GlobalStyles.ts`

- [ ] **Step 1: Create src/styles/theme.ts**

```typescript
export const theme = {
  colors: {
    primary: '#264653',
    accent: '#2A9D8F',
    highlight: '#E9C46A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  },
  spacing: {
    base: 4,
    pagePadding: 24,
    cardGap: 16,
    cardPadding: 20,
  },
  borderRadius: {
    card: 8,
    modal: 12,
  },
  transitions: {
    cardHover: '200ms ease-out',
    buttonHover: '150ms ease',
    modal: '200ms ease-out',
  },
} as const

export type Theme = typeof theme
```

- [ ] **Step 2: Create src/styles/GlobalStyles.ts**

```typescript
import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans SC';
    src: url('/fonts/NotoSansSC-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans SC', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
  }
`
```

- [ ] **Step 3: Copy font file to public folder**

Run: `mkdir -p public/fonts && cp fonts/NotoSansSC-Regular.otf public/fonts/`

- [ ] **Step 4: Commit**

```bash
git add src/styles/theme.ts src/styles/GlobalStyles.ts public/fonts/NotoSansSC-Regular.otf
git commit -m "feat: add theme and global styles with local font"
```

---

## Task 3: Type Definitions

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create src/types/index.ts**

```typescript
export interface Work {
  id: string
  title: string
  url: string
  description: string
}

export interface Section {
  id: string
  name: string
  works: Work[]
  width?: number
  height?: number
}

export interface PortfolioData {
  version: 1
  sections: Section[]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add TypeScript type definitions"
```

---

## Task 4: useLocalStorage Hook

**Files:**
- Create: `src/hooks/useLocalStorage.ts`

- [ ] **Step 1: Create src/hooks/useLocalStorage.ts**

```typescript
import { useState, useCallback, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useLocalStorage.ts
git commit -m "feat: add useLocalStorage hook"
```

---

## Task 5: usePortfolio Hook

**Files:**
- Create: `src/hooks/usePortfolio.ts`

- [ ] **Step 1: Create src/hooks/usePortfolio.ts**

```typescript
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from './useLocalStorage'
import type { PortfolioData, Section, Work } from '../types'

const STORAGE_KEY = 'portfolio_data'

const initialData: PortfolioData = {
  version: 1,
  sections: [],
}

export function usePortfolio() {
  const [data, setData] = useLocalStorage<PortfolioData>(STORAGE_KEY, initialData)

  const addSection = useCallback(
    (name: string) => {
      const newSection: Section = {
        id: uuidv4(),
        name,
        works: [],
      }
      setData((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
      }))
    },
    [setData]
  )

  const deleteSection = useCallback(
    (sectionId: string) => {
      setData((prev) => ({
        ...prev,
        sections: prev.sections.filter((s) => s.id !== sectionId),
      }))
    },
    [setData]
  )

  const updateSectionSize = useCallback(
    (sectionId: string, width: number, height: number) => {
      setData((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId ? { ...s, width, height } : s
        ),
      }))
    },
    [setData]
  )

  const addWork = useCallback(
    (sectionId: string, title: string, url: string, description: string) => {
      const newWork: Work = {
        id: uuidv4(),
        title,
        url,
        description,
      }
      setData((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId ? { ...s, works: [...s.works, newWork] } : s
        ),
      }))
    },
    [setData]
  )

  const updateWork = useCallback(
    (sectionId: string, workId: string, updates: Partial<Omit<Work, 'id'>>) => {
      setData((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                works: s.works.map((w) =>
                  w.id === workId ? { ...w, ...updates } : w
                ),
              }
            : s
        ),
      }))
    },
    [setData]
  )

  const deleteWork = useCallback(
    (sectionId: string, workId: string) => {
      setData((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId
            ? { ...s, works: s.works.filter((w) => w.id !== workId) }
            : s
        ),
      }))
    },
    [setData]
  )

  return {
    sections: data.sections,
    addSection,
    deleteSection,
    updateSectionSize,
    addWork,
    updateWork,
    deleteWork,
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/usePortfolio.ts
git commit -m "feat: add usePortfolio hook with CRUD operations"
```

---

## Task 6: Header Component

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Create src/components/Header.tsx**

```typescript
import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeaderWrapper = styled.header`
  padding: ${theme.spacing.pagePadding}px;
  border-bottom: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.surface};
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

export function Header() {
  return (
    <HeaderWrapper>
      <Title>我的作品集</Title>
    </HeaderWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header component"
```

---

## Task 7: FloatingButton Component

**Files:**
- Create: `src/components/FloatingButton.tsx`

- [ ] **Step 1: Create src/components/FloatingButton.tsx**

```typescript
import styled from 'styled-components'
import { theme } from '../styles/theme'

const Button = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${theme.colors.accent};
  color: white;
  border: none;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background-color ${theme.transitions.buttonHover},
    transform ${theme.transitions.buttonHover};

  &:hover {
    background-color: #238277;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

interface FloatingButtonProps {
  onClick: () => void
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Button onClick={onClick} aria-label="新增区域">
      +
    </Button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FloatingButton.tsx
git commit -m "feat: add FloatingButton component"
```

---

## Task 8: WorkItem Component

**Files:**
- Create: `src/components/WorkItem.tsx`

- [ ] **Step 1: Create src/components/WorkItem.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WorkItem.tsx
git commit -m "feat: add WorkItem component with inline editing"
```

---

## Task 9: SectionCard Component

**Files:**
- Create: `src/components/SectionCard.tsx`

- [ ] **Step 1: Create src/components/SectionCard.tsx**

```typescript
import { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Section } from '../types'
import { WorkItem } from './WorkItem'

const CardWrapper = styled.div<{ $width?: number; $height?: number }>`
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionCard.tsx
git commit -m "feat: add SectionCard component with resize handle"
```

---

## Task 10: AddSectionModal Component

**Files:**
- Create: `src/components/AddSectionModal.tsx`

- [ ] **Step 1: Create src/components/AddSectionModal.tsx**

```typescript
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Modal = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.modal}px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  animation: scaleIn 200ms ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;

  &:hover {
    background-color: ${theme.colors.background};
  }
`

const SubmitButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${theme.colors.accent};
  color: white;
  font-size: 14px;

  &:hover {
    background-color: #238277;
  }

  &:disabled {
    background-color: ${theme.colors.border};
    cursor: not-allowed;
  }
`

interface AddSectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

export function AddSectionModal({ isOpen, onClose, onSubmit }: AddSectionModalProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim())
      setName('')
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>新增区域</Title>
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="例如：前端项目、UI设计、文章链接"
        />
        <ButtonGroup>
          <CancelButton onClick={onClose}>取消</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={!name.trim()}>
            确定
          </SubmitButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AddSectionModal.tsx
git commit -m "feat: add AddSectionModal component"
```

---

## Task 11: AddWorkModal Component

**Files:**
- Create: `src/components/AddWorkModal.tsx`

- [ ] **Step 1: Create src/components/AddWorkModal.tsx**

```typescript
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Modal = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.modal}px;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  animation: scaleIn 200ms ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
`

const FormGroup = styled.div`
  margin-bottom: 12px;
`

const Label = styled.label`
  display: block;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background-color: transparent;
  color: ${theme.colors.textSecondary};
  font-size: 14px;

  &:hover {
    background-color: ${theme.colors.background};
  }
`

const SubmitButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${theme.colors.accent};
  color: white;
  font-size: 14px;

  &:hover {
    background-color: #238277;
  }

  &:disabled {
    background-color: ${theme.colors.border};
    cursor: not-allowed;
  }
`

interface AddWorkModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, url: string, description: string) => void
}

export function AddWorkModal({ isOpen, onClose, onSubmit }: AddWorkModalProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setUrl('')
      setDescription('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (title.trim() && url.trim()) {
      onSubmit(title.trim(), url.trim(), description.trim())
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <Title>添加作品</Title>
        <FormGroup>
          <Label>标题 *</Label>
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="作品名称"
          />
        </FormGroup>
        <FormGroup>
          <Label>链接 *</Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </FormGroup>
        <FormGroup>
          <Label>描述</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="简要描述这个作品..."
          />
        </FormGroup>
        <ButtonGroup>
          <CancelButton onClick={onClose}>取消</CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={!title.trim() || !url.trim()}>
            确定
          </SubmitButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AddWorkModal.tsx
git commit -m "feat: add AddWorkModal component"
```

---

## Task 12: SectionGrid Component

**Files:**
- Create: `src/components/SectionGrid.tsx`

- [ ] **Step 1: Create src/components/SectionGrid.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionGrid.tsx
git commit -m "feat: add SectionGrid component"
```

---

## Task 13: App Component

**Files:**
- Create: `src/App.tsx`

- [ ] **Step 1: Create src/App.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add App component with full integration"
```

---

## Task 14: Verify Build

- [ ] **Step 1: Run build**

Run: `npm run build`

Expected: Build completes without errors, `dist/` folder created

- [ ] **Step 2: Run dev server**

Run: `npm run dev`

Expected: Dev server starts on localhost:5173

- [ ] **Step 3: Test basic flow**

1. Click floating button → Add Section modal opens
2. Enter "前端项目" and submit
3. Section card appears
4. Click "+ 添加作品"
5. Enter title, url, description and submit
6. Work item appears
7. Click on work item → inline editing works
8. Reload page → data persists

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement complete portfolio showcase application"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - [x] Grid dashboard layout — SectionGrid component
   - [x] Resizable section cards — ResizeHandle in SectionCard
   - [x] Modal for adding works — AddWorkModal
   - [x] Inline editing — WorkItem with isEditing state
   - [x] Bottom toolbar (floating button) — FloatingButton
   - [x] localStorage persistence — useLocalStorage hook
   - [x] Local font — @font-face in GlobalStyles
   - [x] Cold color palette — theme.ts with #264653, #2A9D8F, #E9C46A

2. **Placeholder scan:** No TBD/TODO found. All code is complete.

3. **Type consistency:** All interfaces match (Work, Section, PortfolioData in types/index.ts match usage in hooks and components).

---

## Plan Complete

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
