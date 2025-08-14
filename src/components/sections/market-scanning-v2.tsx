"use client"

import { useState, useEffect } from "react"
import { TrendingUp, MessageCircle, Send, Newspaper, BarChart3, Target, Eye, Bookmark, Share2, Download } from "lucide-react"

import { NewsItem, MarketTrend, DashboardStats } from "@/types"
import { NEWS_TYPES, COLORS, ICONS } from "@/constants"
import { getAIRecommendation, getMarketNews, getMarketTrends, getDashboardStats } from "@/lib/api"

export function MarketScanningV2() {
  const [query, setQuery] = useState("")
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const news = await getMarketNews()
        setNewsItems(news)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoadingNews(false)
      }
    }

    loadData()
  }, [])

  const handleQuerySubmit = async () => {
    if (!query.trim()) return
    
    setIsLoading(true)
    try {
      const response = await getAIRecommendation(query)
      setAiResponse(response)
    } catch (error) {
      console.error("Error getting AI recommendation:", error)
      setAiResponse("Sorry, there was an error processing your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleQuerySubmit()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-background" />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-foreground">Intelligent Market Scanning & Predictive Opportunity Detection</h1>
          <p className="text-muted-foreground">AI-powered market analysis and predictive opportunity detection</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Featured News */}
        <div className="lg:col-span-1">
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 h-full">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Company X has raised a $10 million seed round to scale its operations
            </h3>
            <p className="text-sm text-green-700 leading-relaxed mb-4">
              Company X has raised a $10 million seed round to grow its AI operations unit. 
              In a recent interview, the CEO told ABC News that revenue growth this year is 
              expected to exceed 300%, driven by strong interest from its big-name clients. 
              Company X is one of the most successful startups recently, with...
            </p>
          </div>
        </div>

        {/* Right Side - AI Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 rounded-xl p-6 h-full min-h-[400px] flex flex-col">
            {/* Chat Messages Area */}
            <div className="flex-1 space-y-4 mb-4">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                  <p className="text-sm">Which companies that fit my strategy may be fundraising soon?</p>
                </div>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="flex justify-start">
                  <div className="bg-blue-500 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                    <p className="text-sm whitespace-pre-line">{aiResponse}</p>
                  </div>
                </div>
              )}

              {/* Default AI Response */}
              {!aiResponse && (
                <div className="flex justify-start">
                  <div className="bg-blue-500 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                    <p className="text-sm">
                      Based on your strategy, you should consider Company Y, as its business 
                      model is asset-light and it is highly likely that it will be fundraising soon.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type here"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleQuerySubmit}
                disabled={isLoading || !query.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - News Feed */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-2 mb-6">
          <Newspaper className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">News Feed:</h3>
        </div>
        
        {isLoadingNews ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-blue-600">Loading market news...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Static News Items from Design */}
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-blue-800 text-sm">
                <strong>Company X</strong> has raised a $10 million seed round to scale its operations.
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-blue-800 text-sm">
                The CEO of <strong>Company Y</strong> said in an interview that the company may be considering raising a Series B round in Q2 next year.
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-blue-800 text-sm">
                The Head of Sales of <strong>Company Z</strong> mentioned in an interview...
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-blue-800 text-sm">
                <strong>XYZ Group</strong> has filed for bankruptcy.
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-blue-800 text-sm">
                <strong>Bank Alpha</strong> released its quarterly economic outlook, with the main sentiment being conservatively positive.
              </p>
            </div>

            {/* Dynamic News Items */}
            {newsItems.length > 0 && newsItems.slice(0, 3).map((item, index) => (
              <div key={item.id} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-blue-800 text-sm">
                  <strong>{item.company}</strong> - {item.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
