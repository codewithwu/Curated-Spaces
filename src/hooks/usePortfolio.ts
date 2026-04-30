import { useState, useCallback } from 'react'
import type { PortfolioData, Section, Work } from '../types'

const initialData: PortfolioData = {
  version: 1,
  sections: [],
}

export function usePortfolio(initialLoadedData?: PortfolioData) {
  const [data, setData] = useState<PortfolioData>(initialLoadedData || initialData)

  const addSection = useCallback((name: string) => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      name,
      works: [],
    }
    setData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }, [])

  const deleteSection = useCallback((sectionId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }))
  }, [])

  const updateSectionSize = useCallback((sectionId: string, width: number, height: number) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, width, height } : s
      ),
    }))
  }, [])

  const updateSection = useCallback((sectionId: string, name: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, name } : s
      ),
    }))
  }, [])

  const addWork = useCallback(
    (sectionId: string, title: string, url: string, previewUrl: string, description: string) => {
      const newWork: Work = {
        id: crypto.randomUUID(),
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
    []
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
    []
  )

  const deleteWork = useCallback((sectionId: string, workId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? { ...s, works: s.works.filter((w) => w.id !== workId) }
          : s
      ),
    }))
  }, [])

  const exportData = useCallback((): PortfolioData => {
    return { ...data }
  }, [data])

  const importData = useCallback((newData: PortfolioData) => {
    setData(newData)
  }, [])

  const setInitialData = useCallback((newData: PortfolioData) => {
    setData(newData)
  }, [])

  return {
    sections: data.sections,
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
  }
}
