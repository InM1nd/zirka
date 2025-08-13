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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Total Companies</p>
            <p className="text-3xl font-bold text-blue-900">{stats.totalCompanies.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-blue-700">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+12% from last month</span>
        </div>
      </div>

      {/* Active Opportunities */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600">Active Opportunities</p>
            <p className="text-3xl font-bold text-green-900">{stats.activeOpportunities}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-700">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+8 new this week</span>
        </div>
      </div>

      {/* Funding Rounds */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600">Funding Rounds</p>
            <p className="text-3xl font-bold text-purple-900">{stats.fundingRounds}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-purple-700">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+23% from last quarter</span>
        </div>
      </div>

      {/* Prediction Accuracy */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-600">Prediction Accuracy</p>
            <p className="text-3xl font-bold text-orange-900">{stats.predictionAccuracy}%</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-orange-700">
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Market Sentiment</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentIcon(stats.marketSentiment)}`}>
          <div className="flex items-center space-x-2">
            {getSentimentIcon(stats.marketSentiment)}
            <span>{getSentimentLabel(stats.marketSentiment)}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Top Sectors</span>
          <span className="text-sm font-medium text-gray-900">{stats.topSectors.slice(0, 3).join(", ")}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${stats.predictionAccuracy}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          AI-powered sentiment analysis based on {stats.totalCompanies} companies
        </div>
      </div>
    </div>
  )
}
