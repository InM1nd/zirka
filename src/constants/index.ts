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
  BEST_FIT: "bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 text-green-800",
  MEDIUM_FIT: "bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200 text-yellow-800",
  WORST_FIT: "bg-gradient-to-r from-red-100 to-rose-100 border-red-200 text-red-800",
  FUNDING: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
  INTERVIEW: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200",
  BANKRUPTCY: "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200",
  OUTLOOK: "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200",
  HIGH_IMPACT: "bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200",
  MEDIUM_IMPACT: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200",
  LOW_IMPACT: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
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
