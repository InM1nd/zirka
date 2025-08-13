"use client"

import { useState } from "react"
import { Building2, Send, Plus, FileText, TrendingUp, Users, DollarSign, MapPin, Calendar, Target, AlertTriangle, Lightbulb, BarChart3, Download, Share2, Bookmark } from "lucide-react"
import { analyzeCompany } from "@/lib/api"
import { CompanyAnalysis } from "@/types"

export function CompanyProfiling() {
  const [companyQuery, setCompanyQuery] = useState("")
  const [analysisResult, setAnalysisResult] = useState<CompanyAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"overview" | "financials" | "risks" | "opportunities">("overview")

  const handleAnalyze = async () => {
    if (!companyQuery.trim()) return
    
    setIsLoading(true)
    try {
      const result = await analyzeCompany(companyQuery)
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing company:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting analysis...")
    alert("Analysis exported successfully!")
  }

  const handleShare = () => {
    // Simulate share functionality
    console.log("Sharing analysis...")
    alert("Analysis shared successfully!")
  }

  const handleSave = () => {
    // Simulate save functionality
    console.log("Saving analysis...")
    alert("Analysis saved to favorites!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profiling</h1>
          <p className="text-gray-600">Comprehensive company analysis and insights powered by AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основная секция анализа */}
        <div className="lg:col-span-2 space-y-6">
          {/* Поиск компании */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Analyze Company</span>
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter company name or description..."
                  value={companyQuery}
                  onChange={(e) => setCompanyQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading || !companyQuery.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Analyze</span>
                </button>
              </div>
              
              {/* Quick Examples */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Quick examples:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Stripe", "OpenAI", "Notion", "Figma"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setCompanyQuery(example)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors duration-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Результат анализа */}
          {analysisResult && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Analysis Result</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Save to favorites"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Share analysis"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExport}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Export report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Company Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {analysisResult.companyName}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">{analysisResult.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{analysisResult.headquarters}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Founded {analysisResult.keyMetrics.founded}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{analysisResult.keyMetrics.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{analysisResult.keyMetrics.revenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: "overview", label: "Overview", icon: BarChart3 },
                    { id: "financials", label: "Financials", icon: DollarSign },
                    { id: "risks", label: "Risks", icon: AlertTriangle },
                    { id: "opportunities", label: "Opportunities", icon: Lightbulb }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id as any)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                          selectedTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {selectedTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Company Details</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Industry:</span>
                            <span className="text-sm font-medium text-gray-900">{analysisResult.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Valuation:</span>
                            <span className="text-sm font-medium text-gray-900">{analysisResult.keyMetrics.valuation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Growth Rate:</span>
                            <span className="text-sm font-medium text-gray-900">{analysisResult.keyMetrics.growth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Market Cap:</span>
                            <span className="text-sm font-medium text-gray-900">{analysisResult.keyMetrics.marketCap}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Data Sources</h5>
                        <div className="space-y-2">
                          {analysisResult.sources.map((source, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{source}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "financials" && analysisResult.financials && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                        <h6 className="font-medium text-green-800 mb-2">Revenue Growth</h6>
                        <div className="text-2xl font-bold text-green-900">{analysisResult.financials.revenueGrowth}%</div>
                        <div className="text-sm text-green-700">Year over Year</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                        <h6 className="font-medium text-blue-800 mb-2">Profit Margin</h6>
                        <div className="text-2xl font-bold text-blue-900">{analysisResult.financials.profitMargin}%</div>
                        <div className="text-sm text-blue-700">Net Profit</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
                        <h6 className="font-medium text-purple-800 mb-2">Debt Ratio</h6>
                        <div className="text-2xl font-bold text-purple-900">{analysisResult.financials.debtRatio}</div>
                        <div className="text-sm text-purple-700">Total Debt/Assets</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "risks" && analysisResult.risks && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900 mb-3">Risk Assessment</h5>
                    <div className="space-y-3">
                      {analysisResult.risks.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-800">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === "opportunities" && analysisResult.opportunities && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900 mb-3">Growth Opportunities</h5>
                    <div className="space-y-3">
                      {analysisResult.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-800">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Источники */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Data Sources</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: "PitchBook", icon: FileText, color: "blue" },
                { name: "LSEG", icon: TrendingUp, color: "green" },
                { name: "SEC", icon: Users, color: "purple" },
                { name: "Crunchbase", icon: Building2, color: "orange" },
                { name: "LinkedIn", icon: Users, color: "indigo" }
              ].map((source, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <div className={`w-8 h-8 bg-${source.color}-100 rounded-lg flex items-center justify-center`}>
                    <source.icon className={`w-4 h-4 text-${source.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{source.name}</span>
                </div>
              ))}
              <button className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center space-x-2 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                <span>Add Custom Source</span>
              </button>
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 text-sm transition-all duration-200 shadow-md hover:shadow-lg">
                Export Report
              </button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 text-sm transition-all duration-200 shadow-md hover:shadow-lg">
                Save Analysis
              </button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 text-sm transition-all duration-200 shadow-md hover:shadow-lg">
                Share Results
              </button>
            </div>
          </div>

          {/* Статистика */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Analysis Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-700">Data Points</span>
                <span className="text-lg font-bold text-indigo-900">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-700">Accuracy</span>
                <span className="text-lg font-bold text-indigo-900">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-700">Last Updated</span>
                <span className="text-sm font-medium text-indigo-800">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
