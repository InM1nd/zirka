"use client"

import { useState, useEffect } from "react"
import { TrendingUp, MessageCircle, Send, Newspaper, BarChart3, Target, Eye, Bookmark, Share2, Download } from "lucide-react"

import { NewsItem, MarketTrend, DashboardStats } from "@/types"
import { NEWS_TYPES, COLORS, ICONS } from "@/constants"
import { getAIRecommendation, getMarketNews, getMarketTrends, getDashboardStats } from "@/lib/api"

export function MarketScanning() {
  const [query, setQuery] = useState("")
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(true)
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([])
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [news, trends, stats] = await Promise.all([
          getMarketNews(),
          getMarketTrends(),
          getDashboardStats()
        ])
        setNewsItems(news)
        setMarketTrends(trends)
        setDashboardStats(stats)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoadingNews(false)
      }
    }

    loadData()
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return COLORS.HIGH_IMPACT
      case "medium":
        return COLORS.MEDIUM_IMPACT
      case "low":
        return COLORS.LOW_IMPACT
      case "outlook":
        return COLORS.OUTLOOK
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const handleNewsItemClick = (newsItem: NewsItem) => {
    setSelectedNewsItem(selectedNewsItem?.id === newsItem.id ? null : newsItem)
  }

  const handleSaveNews = (newsItem: NewsItem) => {
    console.log("Saving news:", newsItem.title)
    alert("News saved to favorites!")
  }

  const handleShareNews = (newsItem: NewsItem) => {
    console.log("Sharing news:", newsItem.title)
    alert("News shared successfully!")
  }

  const handleExportNews = () => {
    console.log("Exporting news...")
    alert("News exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-background" />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-foreground">Market Scanning</h1>
          <p className="text-muted-foreground">AI-powered market analysis and predictive opportunity detection</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      {dashboardStats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600"  >Total Companies</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardStats.totalCompanies.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Opportunities</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardStats.activeOpportunities}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Funding Rounds</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardStats.fundingRounds}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Prediction Accuracy</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardStats.predictionAccuracy}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Trends */}
      {marketTrends.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-foreground">Market Trends</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketTrends.map((trend) => (
              <div key={trend.id} className="bg-card border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      trend.trend === 'up' ? 'bg-green-600' : 
                      trend.trend === 'down' ? 'bg-red-600' : 'bg-gray-400'
                    }`}>
                      {trend.trend === 'up' ? '📈' : trend.trend === 'down' ? '📉' : '➡️'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{trend.sector}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        trend.trend === 'up' ? 'text-green-600 bg-green-50 border-green-400' : 
                        trend.trend === 'down' ? 'text-red-600 bg-red-50 border-red-400' : 'text-gray-600 bg-gray-50 border-gray-400'
                      }`}>
                        {trend.trend === 'up' ? 'Growing' : trend.trend === 'down' ? 'Declining' : 'Stable'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      trend.trend === 'up' ? 'text-green-600' : 
                      trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {trend.trend === 'up' ? '+' : ''}{trend.change}%
                    </div>
                    <div className={`text-sm font-medium ${
                      trend.confidence >= 80 ? 'text-green-600' : 
                      trend.confidence >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {trend.confidence}% confidence
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{trend.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Left - Company News */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 border border-green-600 h-full shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Company X has raised a $10 million seed round to scale its operations
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              Company X has raised a $10 million seed round to grow its AI operations unit. 
              In a recent interview, the CEO told ABC News that revenue growth this year is 
              expected to exceed 300%, driven by strong interest from its big-name clients. 
              Company X is one of the most successful startups recently, with...
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-xs font-medium border border-green-600 text-green-600 px-2 py-1 rounded-full">High Impact</span>
              <span className="text-xs font-medium text-foreground">2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Top Right - AI Query */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl p-6 border border-border h-full shadow-sm">
            <div className="space-y-4">
              {/* AI Question */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-foreground">AI Query</span>
                </div>
                <p className="text-sm text-foreground">
                  Which companies that fit my strategy may be fundraising soon?
                </p>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">AI Recommendation</span>
                  </div>
                  <div className="text-sm text-foreground whitespace-pre-line">{aiResponse}</div>
                </div>
              )}

              {/* Input Field */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask AI about market trends, opportunities, or analysis..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-2 text-foreground border border-border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleQuerySubmit}
                  disabled={isLoading || !query.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
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
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-foreground">Market News Feed</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportNews}
                  className="p-2 text-gray-100 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Export news"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingNews ? (
                <div className="col-span-full py-8">
                  <div className="text-center"  >
                    <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading market news...</p>
                  </div>
                </div>
              ) : newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer ${
                      selectedNewsItem?.id === item.id ? 'ring-2 ring-blue-600' : ''
                    }`}
                    onClick={() => handleNewsItemClick(item)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getNewsTypeIcon(item.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getNewsTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          {item.impact && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(item.impact)}`}>
                              {item.impact} impact
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-600">{item.company}</span>
                          {item.date && (
                            <span className="text-xs text-gray-600">• {item.date}</span>
                          )}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed mb-2">{item.title}</p>
                        {item.summary && (
                          <p className="text-xs text-foreground line-clamp-2">{item.summary}</p>
                        )}
                        {item.source && (
                          <div className="text-xs text-gray-600 mt-2">Source: {item.source}</div>
                        )}
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

      {/* Detailed News View */}
      {selectedNewsItem && (
        <div className="border border-blue-600 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold text-blue-900">News Details: {selectedNewsItem.title}</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSaveNews(selectedNewsItem)}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                title="Save to favorites"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShareNews(selectedNewsItem)}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                title="Share news"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedNewsItem(null)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-blue-800 mb-3">News Information</h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Company:</span>
                  <span className="text-sm font-medium text-blue-800">{selectedNewsItem.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Type:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getNewsTypeColor(selectedNewsItem.type)}`}>
                    {selectedNewsItem.type}
                  </span>
                </div>
                {selectedNewsItem.impact && (
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Impact:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(selectedNewsItem.impact)}`}>
                      {selectedNewsItem.impact} impact
                    </span>
                  </div>
                )}
                {selectedNewsItem.date && (
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Date:</span>
                    <span className="text-sm font-medium text-blue-800">{selectedNewsItem.date}</span>
                  </div>
                )}
                {selectedNewsItem.source && (
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Source:</span>
                    <span className="text-sm font-medium text-blue-800">{selectedNewsItem.source}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-blue-800 mb-3">Content</h5>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h6 className="font-medium text-gray-900 mb-2">{selectedNewsItem.title}</h6>
                {selectedNewsItem.summary && (
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedNewsItem.summary}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
