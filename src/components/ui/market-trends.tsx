"use client"

import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react"
import { MarketTrend } from "@/types"
import { useState } from "react"

interface MarketTrendsProps {
  trends: MarketTrend[]
}

export function MarketTrends({ trends }: MarketTrendsProps) {
  const [selectedTrend, setSelectedTrend] = useState<MarketTrend | null>(null)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "down":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <Minus className="w-5 h-5 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50 border-green-200"
      case "down":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case "up":
        return "Growing"
      case "down":
        return "Declining"
      default:
        return "Stable"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600"
    if (confidence >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BarChart3 className="w-5 h-5 text-foreground" />
        <h3 className="text-lg font-medium text-foreground">Market Trends</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className={`border border-border rounded-lg p-4 cursor-pointer transition-colors bg-card ${
              selectedTrend?.id === trend.id ? 'ring-1 ring-foreground' : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelectedTrend(selectedTrend?.id === trend.id ? null : trend)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  {getTrendIcon(trend.trend)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{trend.sector}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTrendColor(trend.trend)}`}>
                    {getTrendLabel(trend.trend)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-medium ${
                  trend.trend === 'up' ? 'text-green-600' : 
                  trend.trend === 'down' ? 'text-red-600' : 'text-foreground'
                }`}>
                  {trend.trend === 'up' ? '+' : ''}{trend.change}%
                </div>
                <div className={`text-sm font-medium ${getConfidenceColor(trend.confidence)}`}>
                  {trend.confidence}% confidence
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{trend.description}</p>

            {/* Confidence Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Confidence</span>
                <span>{trend.confidence}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                    trend.confidence >= 80 ? 'bg-green-500' : 
                    trend.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${trend.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedTrend && (
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-foreground">Detailed Analysis: {selectedTrend.sector}</h4>
            <button
              onClick={() => setSelectedTrend(null)}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Close
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-foreground mb-2">Trend Analysis</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedTrend.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Change Rate:</span>
                  <span className="text-sm font-medium text-foreground">
                    {selectedTrend.trend === 'up' ? '+' : ''}{selectedTrend.change}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Confidence Level:</span>
                  <span className="text-sm font-medium text-foreground">{selectedTrend.confidence}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-foreground mb-2">Recommendations</h5>
              <div className="space-y-2">
                {selectedTrend.trend === 'up' ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Consider increasing exposure to this sector</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Look for early-stage investment opportunities</span>
                    </div>
                  </>
                ) : selectedTrend.trend === 'down' ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Reduce exposure to this sector</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Focus on defensive positions</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span>Maintain current exposure levels</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span>Monitor for emerging opportunities</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
