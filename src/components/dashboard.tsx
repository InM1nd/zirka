"use client"

import { useState, useEffect } from "react"
import { CompanyProfiling } from "./sections/company-profiling"
import { OpportunityScreening } from "./sections/opportunity-screening"
import { MarketScanning } from "./sections/market-scanning"
import { Building2, Target, TrendingUp } from "lucide-react"

export function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<"profiling" | "screening" | "scanning">("profiling")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading...</div>
      </div>
    )
  }

  const sections = [
    {
      id: "profiling" as const,
      title: "Company Profiling",
      description: "Comprehensive company analysis and insights",
      icon: Building2,
      color: "blue"
    },
    {
      id: "screening" as const,
      title: "Opportunity Screening", 
      description: "Screen and filter investment opportunities",
      icon: Target,
      color: "green"
    },
    {
      id: "scanning" as const,
      title: "Market Scanning",
      description: "Monitor market trends and dynamics",
      icon: TrendingUp,
      color: "purple"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Zirka Dashboard</h1>
          <p className="text-gray-600 mt-1">AI-powered investment analysis and opportunity screening platform</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                    isActive
                      ? `border-${section.color}-500 text-${section.color}-600`
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.title}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === "profiling" && <CompanyProfiling />}
        {activeSection === "screening" && <OpportunityScreening />}
        {activeSection === "scanning" && <MarketScanning />}
      </div>
    </div>
  )
}
