export type Section = "profiling" | "screening" | "scanning"

export interface Opportunity {
  id: string
  name: string
  vertical: string
  summary: string
  fit: "best" | "medium" | "worst"
}

export interface NewsItem {
  id: string
  title: string
  company: string
  type: "funding" | "interview" | "bankruptcy" | "outlook"
}

export interface CompanyAnalysis {
  companyName: string
  description: string
  industry: string
  headquarters: string
  keyMetrics: {
    revenue?: string
    employees?: number
    founded?: number
  }
  sources: string[]
}
