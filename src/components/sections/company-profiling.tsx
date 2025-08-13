"use client"

import { useState } from "react"
import { Building2, Send, Plus, FileText, TrendingUp, Users } from "lucide-react"
import { analyzeCompany } from "@/lib/api"
import { CompanyAnalysis } from "@/types"

export function CompanyProfiling() {
  const [companyQuery, setCompanyQuery] = useState("")
  const [analysisResult, setAnalysisResult] = useState<CompanyAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Building2 className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profiling</h1>
          <p className="text-gray-600">Comprehensive company analysis and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основная секция анализа */}
        <div className="lg:col-span-2 space-y-6">
          {/* Поиск компании */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analyze Company
            </h3>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter company name or description..."
                value={companyQuery}
                onChange={(e) => setCompanyQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !companyQuery.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Analyze</span>
              </button>
            </div>
          </div>

          {/* Результат анализа */}
          {analysisResult && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Analysis Result
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">
                      {analysisResult.companyName}
                    </h4>
                    <p className="text-gray-700">{analysisResult.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Company Details</h5>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Industry:</span> {analysisResult.industry}</div>
                        <div><span className="font-medium">Headquarters:</span> {analysisResult.headquarters}</div>
                        <div><span className="font-medium">Founded:</span> {analysisResult.keyMetrics.founded}</div>
                        <div><span className="font-medium">Employees:</span> {analysisResult.keyMetrics.employees}</div>
                        <div><span className="font-medium">Revenue:</span> {analysisResult.keyMetrics.revenue}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Data Sources</h5>
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
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель с источниками */}
        <div className="space-y-6">
          {/* Источники */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sources
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">PitchBook</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">LSEG</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">SEC</span>
              </div>
              <button className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add yours</span>
              </button>
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                Export Report
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                Save Analysis
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
