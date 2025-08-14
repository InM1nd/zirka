"use client"

import { useState, useEffect } from "react"
import { CompanyProfiling } from "./sections/company-profiling"
import { OpportunityScreening } from "./sections/opportunity-screening"
import { MarketScanning } from "./sections/market-scanning"
import { MarketScanningV2 } from "./sections/market-scanning-v2"
import { Building2, Target, TrendingUp } from "lucide-react"

export function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<"profiling" | "screening" | "scanning">("profiling")
  const [marketScanningVersion, setMarketScanningVersion] = useState<1 | 2>(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-foreground">Loading...</div>
      </div>
    )
  }

  const sections = [
    {
      id: "profiling" as const,
      title: "Company Profiling",
      description: "Comprehensive company analysis and insights",
      icon: Building2,
    },
    {
      id: "screening" as const,
      title: "Opportunity Screening", 
      description: "Screen and filter investment opportunities",
      icon: Target,
    },
    {
      id: "scanning" as const,
      title: "Market Scanning",
      description: "Monitor market trends and dynamics",
      icon: TrendingUp,
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-medium text-foreground">Zirka Dashboard</h1>
          <p className="text-muted-foreground mt-1">AI-powered investment analysis platform</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
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
        {activeSection === "scanning" && (
          <div className="space-y-6">
            {/* Version Selector */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Market Scanning</h2>
                <p className="text-muted-foreground">Choose your preferred interface</p>
              </div>
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setMarketScanningVersion(1)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    marketScanningVersion === 1
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Classic View
                </button>
                <button
                  onClick={() => setMarketScanningVersion(2)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    marketScanningVersion === 2
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Chat View
                </button>
              </div>
            </div>
            
            {/* Render Selected Version */}
            {marketScanningVersion === 1 ? <MarketScanning /> : <MarketScanningV2 />}
          </div>
        )}
      </div>
    </div>
  )
}
