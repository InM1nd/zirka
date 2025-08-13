import { config } from "@/config"
import { CompanyAnalysis, Opportunity, NewsItem, MarketTrend, DashboardStats } from "@/types"
import { SECTORS, STAGES, LOCATIONS } from "@/constants"

// Mock API functions for demo purposes
// In production, these would make real HTTP requests

export async function analyzeCompany(query: string): Promise<CompanyAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock response with richer data
  return {
    companyName: query,
    description: `${query} is a leading technology company that specializes in innovative solutions for the modern market. They have demonstrated exceptional growth and market leadership in their sector.`,
    industry: "Technology",
    headquarters: "San Francisco, CA",
    keyMetrics: {
      revenue: "$50M - $100M",
      employees: 250,
      founded: 2018,
      valuation: "$500M",
      growth: "150% YoY",
      marketCap: "$750M"
    },
    sources: ["PitchBook", "LSEG", "SEC", "Crunchbase", "LinkedIn"],
    financials: {
      revenueGrowth: 150,
      profitMargin: 25,
      debtRatio: 0.15
    },
    risks: [
      "Market competition intensifying",
      "Regulatory changes in target markets",
      "Key personnel retention risk"
    ],
    opportunities: [
      "International expansion potential",
      "Strategic partnerships with major players",
      "New product line development"
    ]
  }
}

export async function screenOpportunities(email: string): Promise<Opportunity[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock response with richer data
  return [
    {
      id: "1",
      name: "AI Financial Platform",
      vertical: "Fintech",
      summary: "AI-powered financial services platform with $2M ARR and 300% growth",
      fit: "best",
      funding: "$5M Series A",
      stage: "Series A",
      location: "San Francisco, CA",
      teamSize: 45,
      lastUpdated: "2024-01-15",
      tags: ["AI", "Payments", "B2B"]
    },
    {
      id: "2",
      name: "Digital Health Monitor",
      vertical: "Healthtech",
      summary: "Digital health monitoring system with FDA approval and $1.5M ARR",
      fit: "medium",
      funding: "$3M Seed",
      stage: "Seed",
      location: "Boston, MA",
      teamSize: 28,
      lastUpdated: "2024-01-10",
      tags: ["IoT", "Healthcare", "Wearables"]
    }
  ]
}

export async function getMarketNews(): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock response with richer data
  return [
    {
      id: "1",
      title: "TechCorp Raises $25M Series B Funding Round",
      company: "TechCorp",
      type: "funding",
      date: "2024-01-20",
      summary: "Leading AI company secures major funding to expand operations",
      impact: "high",
      source: "TechCrunch"
    },
    {
      id: "2",
      title: "GrowthInc CEO Discusses Expansion Strategy in Exclusive Interview",
      company: "GrowthInc",
      type: "interview",
      date: "2024-01-18",
      summary: "CEO reveals plans for European market entry and new product launches",
      impact: "medium",
      source: "Forbes"
    },
    {
      id: "3",
      title: "StartupXYZ Files for Bankruptcy Protection",
      company: "StartupXYZ",
      type: "bankruptcy",
      date: "2024-01-15",
      summary: "Failed startup cites market conditions and funding challenges",
      impact: "low",
      source: "Reuters"
    },
    {
      id: "4",
      title: "Market Outlook: Fintech Sector Shows Strong Growth Potential",
      company: "Market Analysis",
      type: "outlook",
      date: "2024-01-12",
      summary: "Analysts predict continued growth in digital payments and banking",
      impact: "medium",
      source: "Bloomberg"
    },
    {
      id: "5",
      title: "HealthTech Startup Secures $15M in Series A Funding",
      company: "MediTech",
      type: "funding",
      date: "2024-01-10",
      summary: "Digital health platform expands to new markets",
      impact: "high",
      source: "PitchBook"
    },
    {
      id: "6",
      title: "AI Startup Interview: The Future of Enterprise Software",
      company: "AI Solutions Inc",
      type: "interview",
      date: "2024-01-08",
      summary: "CTO discusses AI integration strategies for enterprise clients",
      impact: "medium",
      source: "VentureBeat"
    }
  ]
}

export async function getAIRecommendation(query: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500))
  
  // Mock AI response with more detailed analysis
  return `Based on your query "${query}", I recommend focusing on companies in the fintech and healthtech sectors that have shown consistent growth and have strong market positioning. 

Key criteria to consider:
• Revenue between $10M-$50M with 100%+ YoY growth
• Established customer bases with enterprise clients
• Strong IP portfolio and regulatory compliance
• Experienced management teams with successful exits

Top sectors to watch: Fintech (payments, lending), Healthtech (digital health, diagnostics), and AI/ML enterprise solutions.`
}

export async function getMarketTrends(): Promise<MarketTrend[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  return [
    {
      id: "1",
      sector: "Fintech",
      trend: "up",
      change: 15.2,
      description: "Strong growth in digital payments and neobanking",
      confidence: 85
    },
    {
      id: "2",
      sector: "Healthtech",
      trend: "up",
      change: 12.8,
      description: "Increased adoption of telemedicine and digital health",
      confidence: 78
    },
    {
      id: "3",
      sector: "AI/ML",
      trend: "up",
      change: 22.5,
      description: "Explosive growth in enterprise AI adoption",
      confidence: 92
    },
    {
      id: "4",
      sector: "Manufacturing",
      trend: "down",
      change: -3.2,
      description: "Supply chain challenges and labor shortages",
      confidence: 65
    }
  ]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    totalCompanies: 1247,
    activeOpportunities: 89,
    fundingRounds: 156,
    predictionAccuracy: 89.2,
    marketSentiment: "bullish",
    topSectors: ["Fintech", "AI/ML", "Healthtech", "Cybersecurity", "Cleantech"]
  }
}

// Error handling utility
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return "An unexpected error occurred"
}
