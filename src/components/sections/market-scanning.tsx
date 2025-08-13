"use client"

import { useState, useEffect } from "react"
import { TrendingUp, MessageCircle, Send, Newspaper, BarChart3, Target } from "lucide-react"

import { NewsItem } from "@/types"
import { NEWS_TYPES, COLORS, ICONS } from "@/constants"
import { getAIRecommendation, getMarketNews } from "@/lib/api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { StatCard } from "@/components/ui/stat-card"

export function MarketScanning() {
  const [query, setQuery] = useState("")
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await getMarketNews()
        setNewsItems(news)
      } catch (error) {
        console.error("Error loading news:", error)
      } finally {
        setIsLoadingNews(false)
      }
    }

    loadNews()
  }, [])



  const getNewsTypeColor = (type: string) => {
    switch (type) {
      case NEWS_TYPES.FUNDING:
        return COLORS.FUNDING
      case NEWS_TYPES.INTERVIEW:
        return COLORS.INTERVIEW
      case NEWS_TYPES.BANKRUPTCY:
        return COLORS.BANKRUPTCY
      case NEWS_TYPES.OUTLOOK:
        return COLORS.OUTLOOK
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getNewsTypeIcon = (type: string) => {
    switch (type) {
      case NEWS_TYPES.FUNDING:
        return ICONS.FUNDING
      case NEWS_TYPES.INTERVIEW:
        return ICONS.INTERVIEW
      case NEWS_TYPES.BANKRUPTCY:
        return ICONS.BANKRUPTCY
      case NEWS_TYPES.OUTLOOK:
        return ICONS.OUTLOOK
      default:
        return "📰"
    }
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Scanning</h1>
          <p className="text-gray-600">Intelligent market analysis and predictive opportunity detection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Left - Company News */}
        <div className="lg:col-span-1">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 h-full">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Company X has raised a $10 million seed round to scale its operations
            </h3>
            <p className="text-sm text-green-700 leading-relaxed">
              Company X has raised a $10 million seed round to grow its AI operations unit. 
              In a recent interview, the CEO told ABC News that revenue growth this year is 
              expected to exceed 300%, driven by strong interest from its big-name clients. 
              Company X is one of the most successful startups recently, with...
            </p>
          </div>
        </div>

        {/* Top Right - AI Query */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-full">
            <div className="space-y-4">
              {/* AI Question */}
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">AI Query</span>
                </div>
                <p className="text-sm text-blue-700">
                  Which companies that fit my strategy may be fundraising soon?
                </p>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">AI Recommendation</span>
                  </div>
                  <p className="text-sm text-gray-700">{aiResponse}</p>
                </div>
              )}

              {/* Input Field */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleQuerySubmit}
                  disabled={isLoading || !query.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">News Feed</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingNews ? (
                <div className="col-span-full py-8">
                  <LoadingSpinner size="md" color="blue" text="Loading market news..." />
                </div>
              ) : newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getNewsTypeIcon(item.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getNewsTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <span className="text-xs text-gray-500">{item.company}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-600">No news available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Market Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Companies Monitored"
            value="47"
            color="blue"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Funding Rounds Detected"
            value="12"
            color="green"
            icon={<BarChart3 className="w-6 h-6" />}
          />
          <StatCard
            title="Prediction Accuracy"
            value="89%"
            color="purple"
            icon={<Target className="w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  )
}
