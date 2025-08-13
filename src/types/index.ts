export type Section = "profiling" | "screening" | "scanning"

export interface Opportunity {
  id: string
  name: string
  vertical: string
  summary: string
  fit: "best" | "medium" | "worst"
  funding?: string
  stage?: string
  location?: string
  teamSize?: number
  lastUpdated?: string
  tags?: string[]
}

export interface NewsItem {
  id: string
  title: string
  company: string
  type: "funding" | "interview" | "bankruptcy" | "outlook"
  date?: string
  summary?: string
  impact?: "high" | "medium" | "low"
  source?: string
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
    valuation?: string
    growth?: string
    marketCap?: string
  }
  sources: string[]
  financials?: {
    revenueGrowth: number
    profitMargin: number
    debtRatio: number
  }
  risks?: string[]
  opportunities?: string[]
}

export interface MarketTrend {
  id: string
  sector: string
  trend: "up" | "down" | "stable"
  change: number
  description: string
  confidence: number
}

export interface DashboardStats {
  totalCompanies: number
  activeOpportunities: number
  fundingRounds: number
  predictionAccuracy: number
  marketSentiment: "bullish" | "bearish" | "neutral"
  topSectors: string[]
}
