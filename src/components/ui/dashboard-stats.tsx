"use client"

import type { DashboardStats } from "@/types"
import { TrendingUp, TrendingDown, Minus, Target, Building2, DollarSign, Users } from "lucide-react"


interface DashboardStatsProps {
  stats: DashboardStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "bearish":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <Minus className="w-5 h-5 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-600 bg-green-50 border-green-200"
      case "bearish":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "Bullish"
      case "bearish":
        return "Bearish"
      default:
        return "Neutral"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Companies */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Companies</p>
            <p className="text-2xl font-medium text-foreground">{stats.totalCompanies.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-foreground" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+12% from last month</span>
        </div>
      </div>

      {/* Active Opportunities */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Opportunities</p>
            <p className="text-2xl font-medium text-foreground">{stats.activeOpportunities}</p>
          </div>
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-foreground" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+8 new this week</span>
        </div>
      </div>

      {/* Funding Rounds */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Funding Rounds</p>
            <p className="text-2xl font-medium text-foreground">{stats.fundingRounds}</p>
          </div>
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-foreground" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+23% from last quarter</span>
        </div>
      </div>

      {/* Prediction Accuracy */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Prediction Accuracy</p>
            <p className="text-2xl font-medium text-foreground">{stats.predictionAccuracy}%</p>
          </div>
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-foreground" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+2.1% improvement</span>
        </div>
      </div>
    </div>
  )
}

export function MarketSentiment({ stats }: DashboardStatsProps) {
  function getSentimentIcon(marketSentiment: string): import("react").ReactNode {
    throw new Error("Function not implemented.")
  }

  function getSentimentLabel(marketSentiment: string): import("react").ReactNode {
    throw new Error("Function not implemented.")
  }

  function getSentimentColor(marketSentiment: string): import("react").ReactNode {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-foreground">Market Sentiment</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentColor(stats.marketSentiment)}`}>
          <div className="flex items-center space-x-2">
            {getSentimentIcon(stats.marketSentiment)}
            <span>{getSentimentLabel(stats.marketSentiment)}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Top Sectors</span>
          <span className="text-sm font-medium text-foreground">{stats.topSectors.slice(0, 3).join(", ")}</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-foreground h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${stats.predictionAccuracy}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          AI-powered sentiment analysis based on {stats.totalCompanies} companies
        </div>
      </div>
    </div>
  )
}
