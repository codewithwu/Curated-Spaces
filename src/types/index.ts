export interface Work {
  id: string
  title: string
  url: string
  previewUrl?: string
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
