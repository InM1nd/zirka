"use client"

import { CompanyProfiling } from "./sections/company-profiling"
import { Section } from "@/types"
import { OpportunityScreening } from "./sections/opportunity-screening"
import { MarketScanning } from "./sections/market-scanning"
import { useState } from "react"
import { Sidebar } from "./sidebar"

export function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("profiling")

  const renderSection = () => {
    switch (activeSection) {
      case "profiling":
        return <CompanyProfiling />
      case "screening":
        return <OpportunityScreening />
      case "scanning":
        return <MarketScanning />
      default:
        return <CompanyProfiling />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="animate-fade-in">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  )
}
