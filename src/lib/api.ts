import { config } from "@/config"
import { CompanyAnalysis, Opportunity, NewsItem } from "@/types"

// Mock API functions for demo purposes
// In production, these would make real HTTP requests

export async function analyzeCompany(query: string): Promise<CompanyAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock response
  return {
    companyName: query,
    description: `${query} is a company that specializes in innovative solutions for the modern market.`,
    industry: "Technology",
    headquarters: "San Francisco, CA",
    keyMetrics: {
      revenue: "$10M - $50M",
      employees: 100,
      founded: 2020
    },
    sources: ["PitchBook", "LSEG", "SEC"]
  }
}

export async function screenOpportunities(email: string): Promise<Opportunity[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock response
  return [
    {
      id: "1",
      name: "AI Platform",
      vertical: "Fintech",
      summary: "AI-powered financial services platform",
      fit: "best"
    },
    {
      id: "2",
      name: "HealthTech Solution",
      vertical: "Healthtech",
      summary: "Digital health monitoring system",
      fit: "medium"
    }
  ]
}

export async function getMarketNews(): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock response
  return [
    {
      id: "1",
      title: "Tech Startup Raises Series A Funding",
      company: "TechCorp",
      type: "funding"
    },
    {
      id: "2",
      title: "CEO Interview on Growth Strategy",
      company: "GrowthInc",
      type: "interview"
    }
  ]
}

export async function getAIRecommendation(query: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500))
  
  // Mock AI response
  return `Based on your query "${query}", I recommend focusing on companies in the fintech sector that have shown consistent growth and have strong market positioning. Consider companies with revenue between $10M-$50M and established customer bases.`
}

// Error handling utility
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return "An unexpected error occurred"
}
