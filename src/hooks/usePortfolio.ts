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
    (sectionId: string, title: string, url: string, previewUrl: string, description: string) => {
      const newWork: Work = {
        id: uuidv4(),
        title,
        url,
        previewUrl: previewUrl || undefined,
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

  const exportData = useCallback((): PortfolioData => {
    return { ...data }
  }, [data])

  const importData = useCallback(
    (newData: PortfolioData) => {
      setData(newData)
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
    exportData,
    importData,
  }
}