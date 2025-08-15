"use client"

import { useState } from "react"
import { Building2, Send, Plus, FileText, TrendingUp, Users, DollarSign, MapPin, Calendar, Target, AlertTriangle, Lightbulb, BarChart3, Download, Share2, Bookmark } from "lucide-react"
import { analyzeCompany } from "@/lib/api"
import { CompanyAnalysis } from "@/types"
import { SourceTooltip } from "@/components/ui/source-tooltip"

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
        <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-background" />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-foreground">Company Profiling</h1>
          <p className="text-muted-foreground">Comprehensive company analysis and insights powered by AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основная секция анализа */}
        <div className="lg:col-span-2 space-y-6">
          {/* Поиск компании */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
              <Target className="w-4 h-4 text-foreground" />
              <span>Analyze Company</span>
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter company name or description..."
                  value={companyQuery}
                  onChange={(e) => setCompanyQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-[#13131E] rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading || !companyQuery.trim()}
                  className="px-4 py-2 bg-blue-700 text-background rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
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
                <span className="font-medium text-foreground">Quick examples:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Stripe", "OpenAI", "Notion", "Figma"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setCompanyQuery(example)}
                      className="px-3 py-1 border border-foreground hover:text-blue-600 hover:border-blue-600 text-foreground rounded-full text-xs transition-colors duration-200"
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
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Analysis Result</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Save to favorites"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Share analysis"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExport}
                    className="p-2 text-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Export report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Company Header */}
              <div className="border border-border rounded-lg p-4 mb-4 bg-card">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">
                      {analysisResult.companyName}
                    </h4>
                    <p className="text-foreground leading-relaxed mb-4">{analysisResult.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-foreground"  />
                        <span className="text-sm text-foreground">{analysisResult.headquarters}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground">Founded {analysisResult.keyMetrics.founded}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground">{analysisResult.keyMetrics.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground">{analysisResult.keyMetrics.revenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-border mb-6">
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
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-foreground hover:text-blue-600 hover:border-blue-600"
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
                        <h5 className="font-medium text-foreground mb-3"  >Company Details</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-foreground">Industry:</span>
                            <span className="text-sm font-medium text-foreground">{analysisResult.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-foreground">Valuation:</span>
                            <span className="text-sm font-medium text-foreground">{analysisResult.keyMetrics.valuation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-foreground">Growth Rate:</span>
                            <span className="text-sm font-medium text-foreground">{analysisResult.keyMetrics.growth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-foreground">Market Cap:</span>
                            <span className="text-sm font-medium text-foreground">{analysisResult.keyMetrics.marketCap}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-foreground mb-3">Data Sources</h5>
                        <div className="space-y-2">
                          {analysisResult.sources.map((source, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm text-foreground">{source}</span>
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
                      <div className="border border-border rounded-lg p-4 bg-card">
                        <h6 className="font-medium text-foreground mb-2">Revenue Growth</h6>
                        <div className="text-xl font-medium text-green-600">
                          {analysisResult.financials.sourceInfo?.revenueGrowth ? (
                            <SourceTooltip sourceInfo={analysisResult.financials.sourceInfo.revenueGrowth}>
                              {analysisResult.financials.revenueGrowth}%
                            </SourceTooltip>
                          ) : (
                            `${analysisResult.financials.revenueGrowth}%`
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">Year over Year</div>
                      </div>
                      <div className="border border-border rounded-lg p-4 bg-card">
                        <h6 className="font-medium text-foreground mb-2">Profit Margin</h6>
                        <div className="text-xl font-medium text-foreground">
                          {analysisResult.financials.sourceInfo?.profitMargin ? (
                            <SourceTooltip sourceInfo={analysisResult.financials.sourceInfo.profitMargin}>
                              {analysisResult.financials.profitMargin}%
                            </SourceTooltip>
                          ) : (
                            `${analysisResult.financials.profitMargin}%`
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">Net Profit</div>
                      </div>
                      <div className="border border-border rounded-lg p-4 bg-card">
                        <h6 className="font-medium text-foreground mb-2">Debt Ratio</h6>
                        <div className="text-xl font-medium text-foreground">
                          {analysisResult.financials.sourceInfo?.debtRatio ? (
                            <SourceTooltip sourceInfo={analysisResult.financials.sourceInfo.debtRatio}>
                              {analysisResult.financials.debtRatio}
                            </SourceTooltip>
                          ) : (
                            analysisResult.financials.debtRatio
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Debt/Assets</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "risks" && analysisResult.risks && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground mb-3">Risk Assessment</h5>
                    <div className="space-y-3">
                      {analysisResult.risks.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-600">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === "opportunities" && analysisResult.opportunities && (
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground mb-3">Growth Opportunities</h5>
                    <div className="space-y-3">
                      {analysisResult.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-600">{opportunity}</span>
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
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-400" />
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
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:border-foreground transition-colors duration-200 cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <source.icon className={`w-4 h-4 text-${source.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{source.name}</span>
                </div>
              ))}
              <button className="w-full mt-3 px-6 py-4 border rounded-lg text-sm text-foreground hover:border-foreground flex items-center justify-center space-x-2 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                <span>Add Custom Source</span>
              </button>
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-card border text-foreground rounded-lg hover:border-foreground text-sm transition-colors">
                Export Report
              </button>
              <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:border-foreground text-sm transition-colors">
                Share Results
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:text-white text-sm transition-colors">
                Save Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
