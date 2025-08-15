"use client"

import { useState, useEffect } from "react"
import { TrendingUp, MessageCircle, Send, Newspaper, BarChart3, Target, Eye, Bookmark, Share2, Download, Clock, Building2, TrendingDown, AlertTriangle, FileText } from "lucide-react"

import { NewsItem, MarketTrend, DashboardStats } from "@/types"
import { NEWS_TYPES, COLORS, ICONS } from "@/constants"
import { getAIRecommendation, getMarketNews, getMarketTrends, getDashboardStats } from "@/lib/api"

export function MarketScanningV2() {
  const [query, setQuery] = useState("")
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(true)
  const [selectedNews, setSelectedNews] = useState<any>(null)

  // Статические новости с полным содержанием
  const staticNews = [
    {
      id: "news-1",
      title: "Company X has raised a $10 million seed round to scale its operations",
      company: "Company X",
      type: "funding" as const,
      date: "2024-01-15",
      preview: "Revolutionary AI startup raised $10M from leading VCs. Revenue growth of 300%+ this year due to contracts with Fortune 500...",
      summary: "Company X has raised a $10 million seed round to grow its AI operations unit. In a recent interview, the CEO told ABC News that revenue growth this year is expected to exceed 300%, driven by strong interest from its big-name clients. Company X is one of the most successful startups recently, with innovative AI solutions that are transforming the industry. The funding will be used to expand the team, enhance product development, and accelerate market expansion into new geographical regions. The company's proprietary AI technology has already secured partnerships with major tech giants and is positioned to capture significant market share in the rapidly growing artificial intelligence sector.",
      impact: "high" as const,
      source: "ABC News"
    },
    {
      id: "news-2", 
      title: "Company Y considering Series B round in Q2 next year",
      company: "Company Y",
      type: "funding" as const,
      date: "2024-01-14",
      preview: "Profit-making company plans Series B round. 250% growth in user base over the past year. International expansion on the horizon...",
      summary: "The CEO of Company Y said in an interview that the company may be considering raising a Series B round in Q2 next year. The company has shown strong growth metrics with a 250% increase in user base over the past year. They are currently profitable and looking to expand their operations internationally. The potential funding round would help accelerate product development and market expansion plans. With strong unit economics and proven product-market fit, Company Y is attracting attention from tier-1 investors and could command a significant valuation premium in the upcoming funding round.",
      impact: "medium" as const,
      source: "TechCrunch"
    },
    {
      id: "news-3",
      title: "Company Z sales leadership discusses market strategy",
      company: "Company Z", 
      type: "interview" as const,
      date: "2024-01-13",
      preview: "Unprecedented demand for company services. Expansion of sales team by 40%. Signed agreements with three Fortune 500...",
      summary: "The Head of Sales of Company Z mentioned in an interview that the company is seeing unprecedented demand for their services. They have successfully closed several major enterprise deals this quarter and are expanding their sales team by 40%. The company is focusing on strategic partnerships and has recently signed agreements with three Fortune 500 companies. The sales pipeline has never been stronger, with enterprise clients showing increased interest in the company's innovative solutions. This momentum suggests potential for significant revenue growth in the coming quarters.",
      impact: "medium" as const,
      source: "Business Weekly"
    },
    {
      id: "news-4",
      title: "XYZ Group files for bankruptcy",
      company: "XYZ Group",
      type: "bankruptcy" as const, 
      date: "2024-01-12",
      preview: "Company valued at $500M declared bankruptcy. Opportunities for competitors to acquire key assets and talent...",
      summary: "XYZ Group has filed for bankruptcy after struggling with debt obligations and declining market conditions. The company, which was once valued at $500 million, has been facing challenges due to increased competition and regulatory pressures. This development may create opportunities for competitors to acquire key assets and talent from the organization. Industry analysts suggest this could trigger consolidation in the sector, with several companies already expressing interest in acquiring XYZ Group's intellectual property and customer base at attractive valuations.",
      impact: "high" as const,
      source: "Financial Times"
    },
    {
      id: "news-5",
      title: "Bank Alpha releases quarterly economic outlook",
      company: "Bank Alpha",
      type: "outlook" as const,
      date: "2024-01-11", 
      preview: "Conservative positive outlook from leading bank. Growth in tech and healthcare sectors. Risks in traditional retail...",
      summary: "Bank Alpha released its quarterly economic outlook, with the main sentiment being conservatively positive. The report highlights growth opportunities in technology and healthcare sectors, while cautioning about potential risks in traditional retail. The bank expects moderate economic growth with continued innovation in fintech and digital transformation driving market opportunities. The comprehensive 50-page report provides detailed sector analysis and investment recommendations that could influence major institutional investment decisions in the coming quarter.",
      impact: "low" as const,
      source: "Bank Alpha Research"
    }
  ]

  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'funding': return TrendingUp
      case 'interview': return MessageCircle  
      case 'bankruptcy': return TrendingDown
      case 'outlook': return BarChart3
      default: return FileText
    }
  }

  const getNewsColor = (type: string) => {
    switch (type) {
      case 'funding': return 'text-green-600 bg-green-100'
      case 'interview': return 'text-blue-600 bg-blue-100'
      case 'bankruptcy': return 'text-red-600 bg-red-100'
      case 'outlook': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 h-full min-h-[400px] transition-all duration-300">
            {selectedNews ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const Icon = getNewsIcon(selectedNews.type)
                      return <Icon className="w-5 h-5 text-green-600" />
                    })()}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(selectedNews.impact)}`}>
                      {selectedNews.impact?.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <Clock className="w-3 h-3" />
                  <span>{selectedNews.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-green-800 leading-tight">
                  {selectedNews.title}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-700">{selectedNews.company}</span>
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  <p className="text-sm text-green-700 leading-relaxed">
                    {selectedNews.summary}
                  </p>
                </div>
                
                {selectedNews.source && (
                  <div className="pt-3 border-t border-green-200">
                    <span className="text-xs text-green-600">Source: {selectedNews.source}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <Newspaper className="w-12 h-12 text-green-400 mx-auto" />
                  <h3 className="text-lg font-semibold text-green-800">
                    News Details
                  </h3>
                  <p className="text-sm text-green-600">
                    Click on a news item to see the full information
                  </p>
                </div>
              </div>
            )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Static News Items with enhanced design */}
            {staticNews.map((item) => {
              const Icon = getNewsIcon(item.type)
              const isSelected = selectedNews?.id === item.id
              
              return (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-lg p-5 border transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                    isSelected ? 'border-green-400 shadow-lg ring-2 ring-green-200' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedNews(item)}
                >
                  {/* News Type Icon and Impact Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${getNewsColor(item.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                      {item.impact?.toUpperCase()}
                    </span>
                  </div>

                  {/* Company Name */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-900 text-sm">{item.company}</span>
                  </div>

                  {/* News Title */}
                  <h4 className="text-sm font-medium text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>

                  {/* Preview Text */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                    {item.preview}
                  </p>

                  {/* Read More Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.source && (
                        <span className="text-xs text-blue-600">{item.source}</span>
                      )}
                      <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                        Read more →
                      </span>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Dynamic News Items */}
            {newsItems.length > 0 && newsItems.slice(0, 3).map((item) => {
              const Icon = getNewsIcon(item.type || 'default')
              const isSelected = selectedNews?.id === item.id
              
              return (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-lg p-5 border transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                    isSelected ? 'border-green-400 shadow-lg ring-2 ring-green-200' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedNews(item)}
                >
                  {/* News Type Icon and Impact Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${getNewsColor(item.type || 'default')}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {item.impact && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                        {item.impact.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-900 text-sm">{item.company}</span>
                  </div>

                  {/* News Title */}
                  <h4 className="text-sm font-medium text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>

                  {/* Preview Text */}
                  {item.summary && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                      {item.summary.substring(0, 120)}...
                    </p>
                  )}

                  {/* Read More Indicator */}
                  <div className="flex items-center justify-between">
                    {item.date && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {item.source && (
                        <span className="text-xs text-blue-600">{item.source}</span>
                      )}
                      <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                        Read more →
                      </span>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
