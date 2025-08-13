"use client"

import { useState } from "react"
import { Search, Mail, FolderOpen, List, Send, Plus } from "lucide-react"
import { Opportunity } from "@/types"
import { OPPORTUNITY_FIT, COLORS } from "@/constants"

export function OpportunityScreening() {
  const [emailInput, setEmailInput] = useState("")
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      name: "Project 1",
      vertical: "Fintech",
      summary: "AI-powered payment processing platform",
      fit: OPPORTUNITY_FIT.BEST
    },
    {
      id: "2",
      name: "Project 2",
      vertical: "Fintech",
      summary: "Blockchain-based remittance service",
      fit: OPPORTUNITY_FIT.BEST
    },
    {
      id: "3",
      name: "Project 3",
      vertical: "Healthtech",
      summary: "Telemedicine platform with AI diagnostics",
      fit: OPPORTUNITY_FIT.BEST
    },
    {
      id: "4",
      name: "Project 4",
      vertical: "Agritech",
      summary: "Smart farming IoT solution",
      fit: OPPORTUNITY_FIT.MEDIUM
    },
    {
      id: "5",
      name: "Project 5",
      vertical: "Agritech",
      summary: "Vertical farming automation",
      fit: OPPORTUNITY_FIT.MEDIUM
    },
    {
      id: "6",
      name: "Project 6",
      vertical: "Insurtech",
      summary: "AI-driven insurance underwriting",
      fit: OPPORTUNITY_FIT.MEDIUM
    },
    {
      id: "7",
      name: "Project 7",
      vertical: "Manufacturing",
      summary: "Heavy machinery production",
      fit: OPPORTUNITY_FIT.WORST
    },
    {
      id: "8",
      name: "Project 8",
      vertical: "Manufacturing",
      summary: "Industrial automation systems",
      fit: OPPORTUNITY_FIT.WORST
    },
    {
      id: "9",
      name: "Project 9",
      vertical: "Defense",
      summary: "Military technology development",
      fit: OPPORTUNITY_FIT.WORST
    }
  ])

  const getFitColor = (fit: string) => {
    switch (fit) {
      case OPPORTUNITY_FIT.BEST:
        return COLORS.BEST_FIT
      case OPPORTUNITY_FIT.MEDIUM:
        return COLORS.MEDIUM_FIT
      case OPPORTUNITY_FIT.WORST:
        return COLORS.WORST_FIT
      default:
        return "bg-gray-100 border-gray-200 text-gray-800"
    }
  }

  const getFitLabel = (fit: string) => {
    switch (fit) {
      case OPPORTUNITY_FIT.BEST:
        return "Best Fit"
      case OPPORTUNITY_FIT.MEDIUM:
        return "Medium Fit"
      case OPPORTUNITY_FIT.WORST:
        return "Worst Fit"
      default:
        return "Unknown"
    }
  }

  const handleEmailSubmit = () => {
    if (!emailInput.trim()) return
    // Здесь будет логика обработки email
    console.log("Processing email:", emailInput)
    setEmailInput("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Search className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunity Screening</h1>
          <p className="text-gray-600">Automated investment opportunity screening and categorization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Email Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Email Input</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Example emails:</div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-white rounded border">Investment Opportunity: Fintech project</div>
                  <div className="p-2 bg-white rounded border">Investment Opportunity: Factory in Germany</div>
                  <div className="p-2 bg-white rounded border">Investment Opportunity: Agritech project</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type here..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Clickable dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Categorized by vertical</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <List className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">Summaries for each opportunity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Best Fit */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-700">Best Fit</h3>
              </div>
              <div className="space-y-2">
                {opportunities.filter(o => o.fit === OPPORTUNITY_FIT.BEST).map((opportunity) => (
                  <div key={opportunity.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFitColor(opportunity.fit)}`}>
                        {getFitLabel(opportunity.fit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{opportunity.vertical}</div>
                    <div className="text-xs text-gray-700">{opportunity.summary}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Fit */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-yellow-700">Medium Fit</h3>
              </div>
              <div className="space-y-2">
                {opportunities.filter(o => o.fit === OPPORTUNITY_FIT.MEDIUM).map((opportunity) => (
                  <div key={opportunity.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFitColor(opportunity.fit)}`}>
                        {getFitLabel(opportunity.fit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{opportunity.vertical}</div>
                    <div className="text-xs text-gray-700">{opportunity.summary}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worst Fit */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-700">Worst Fit</h3>
              </div>
              <div className="space-y-2">
                {opportunities.filter(o => o.fit === OPPORTUNITY_FIT.WORST).map((opportunity) => (
                  <div key={opportunity.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFitColor(opportunity.fit)}`}>
                        {getFitLabel(opportunity.fit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{opportunity.vertical}</div>
                    <div className="text-xs text-gray-700">{opportunity.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
