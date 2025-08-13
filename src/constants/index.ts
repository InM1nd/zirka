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
  BEST_FIT: "bg-green-100 border-green-200 text-green-800",
  MEDIUM_FIT: "bg-yellow-100 border-yellow-200 text-yellow-800",
  WORST_FIT: "bg-red-100 border-red-200 text-red-800",
  FUNDING: "bg-green-100 text-green-800 border-green-200",
  INTERVIEW: "bg-blue-100 text-blue-800 border-blue-200",
  BANKRUPTCY: "bg-red-100 text-red-800 border-red-200",
  OUTLOOK: "bg-purple-100 text-purple-800 border-purple-200",
} as const

export const ICONS = {
  FUNDING: "💰",
  INTERVIEW: "🎤",
  BANKRUPTCY: "📉",
  OUTLOOK: "📊",
} as const
