export const SECTIONS = {
  PROFILING: "profiling",
  SCREENING: "screening",
  SCANNING: "scanning",
} as const

export const OPPORTUNITY_FIT = {
  BEST: "best",
  MEDIUM: "medium",
  WORST: "worst",
} as const

export const NEWS_TYPES = {
  FUNDING: "funding",
  INTERVIEW: "interview",
  BANKRUPTCY: "bankruptcy",
  OUTLOOK: "outlook",
} as const

export const COLORS = {
  BEST_FIT: "bg-transparent border-green-600 text-green-600",
  MEDIUM_FIT: "bg-transparent border-yellow-600 text-yellow-600", 
  WORST_FIT: "bg-transparent border-red-600 text-red-600",
  FUNDING: "bg-transparent text-green-600 border-green-600",
  INTERVIEW: "bg-transparent text-blue-600 border-blue-600",
  BANKRUPTCY: "bg-transparent text-red-600 border-red-600",
  OUTLOOK: "bg-transparent text-purple-600 border-purple-600",
  HIGH_IMPACT: "bg-transparent text-red-600 border-red-600",
  MEDIUM_IMPACT: "bg-transparent text-yellow-600 border-yellow-600",
  LOW_IMPACT: "bg-transparent text-green-600 border-green-600",
} as const

export const ICONS = {
  FUNDING: "💰",
  INTERVIEW: "🎤",
  BANKRUPTCY: "📉",
  OUTLOOK: "📊",
} as const

export const SECTORS = [
  "Fintech",
  "Healthtech",
  "Agritech",
  "Insurtech",
  "Edtech",
  "Proptech",
  "Cleantech",
  "Cybersecurity",
  "AI/ML",
  "SaaS",
  "E-commerce",
  "Manufacturing",
  "Biotech",
  "Robotics",
  "Blockchain"
] as const

export const STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D+",
  "IPO",
  "Acquired"
] as const

export const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Berlin, Germany",
  "Singapore",
  "Toronto, Canada",
  "Austin, TX",
  "Boston, MA",
  "Seattle, WA",
  "Amsterdam, Netherlands"
] as const
