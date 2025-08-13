"use client"

import { useState } from "react"
import { Search, Mail, FolderOpen, List, Send, Plus, Filter, TrendingUp, MapPin, Users, DollarSign, Calendar, Tag, Eye, Bookmark, Share2 } from "lucide-react"
import { Opportunity } from "@/types"
import { OPPORTUNITY_FIT, COLORS, SECTORS, STAGES, LOCATIONS } from "@/constants"

export function OpportunityScreening() {
  const [emailInput, setEmailInput] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    sector: "",
    stage: "",
    location: "",
    fit: ""
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      name: "AI Financial Platform",
      vertical: "Fintech",
      summary: "AI-powered financial services platform with $2M ARR and 300% growth",
      fit: "best",
      funding: "$5M Series A",
      stage: "Series A",
      location: "San Francisco, CA",
      teamSize: 45,
      lastUpdated: "2024-01-15",
      tags: ["AI", "Payments", "B2B"]
    },
    {
      id: "2",
      name: "Digital Health Monitor",
      vertical: "Healthtech",
      summary: "Digital health monitoring system with FDA approval and $1.5M ARR",
      fit: "best",
      funding: "$3M Seed",
      stage: "Seed",
      location: "Boston, MA",
      teamSize: 28,
      lastUpdated: "2024-01-10",
      tags: ["IoT", "Healthcare", "Wearables"]
    },
    {
      id: "3",
      name: "Blockchain Remittance",
      vertical: "Fintech",
      summary: "Cross-border payment solution using blockchain technology",
      fit: "best",
      funding: "$8M Series B",
      stage: "Series B",
      location: "London, UK",
      teamSize: 65,
      lastUpdated: "2024-01-12",
      tags: ["Blockchain", "Payments", "International"]
    },
    {
      id: "4",
      name: "Smart Farming IoT",
      vertical: "Agritech",
      summary: "IoT sensors and AI for precision agriculture optimization",
      fit: "medium",
      funding: "$2M Seed",
      stage: "Seed",
      location: "Austin, TX",
      teamSize: 22,
      lastUpdated: "2024-01-08",
      tags: ["IoT", "Agriculture", "AI"]
    },
    {
      id: "5",
      name: "Vertical Farming Automation",
      vertical: "Agritech",
      summary: "Automated vertical farming systems for urban areas",
      fit: "medium",
      funding: "$4M Series A",
      stage: "Series A",
      location: "Berlin, Germany",
      teamSize: 35,
      lastUpdated: "2024-01-05",
      tags: ["Automation", "Urban Farming", "Sustainability"]
    },
    {
      id: "6",
      name: "AI Insurance Underwriting",
      vertical: "Insurtech",
      summary: "Machine learning platform for insurance risk assessment",
      fit: "medium",
      funding: "$6M Series A",
      stage: "Series A",
      location: "New York, NY",
      teamSize: 42,
      lastUpdated: "2024-01-03",
      tags: ["AI", "Insurance", "Risk Assessment"]
    },
    {
      id: "7",
      name: "Heavy Machinery Production",
      vertical: "Manufacturing",
      summary: "Industrial machinery manufacturing for construction sector",
      fit: "worst",
      funding: "$15M Series C",
      stage: "Series C",
      location: "Chicago, IL",
      teamSize: 120,
      lastUpdated: "2024-01-01",
      tags: ["Manufacturing", "Construction", "Industrial"]
    },
    {
      id: "8",
      name: "Industrial Automation Systems",
      vertical: "Manufacturing",
      summary: "Factory automation and robotics solutions",
      fit: "worst",
      funding: "$12M Series B",
      stage: "Series B",
      location: "Detroit, MI",
      teamSize: 85,
      lastUpdated: "2023-12-28",
      tags: ["Automation", "Robotics", "Manufacturing"]
    },
    {
      id: "9",
      name: "Military Technology Development",
      vertical: "Defense",
      summary: "Advanced military technology and defense systems",
      fit: "worst",
      funding: "$25M Series D",
      stage: "Series D",
      location: "Washington, DC",
      teamSize: 150,
      lastUpdated: "2023-12-25",
      tags: ["Defense", "Military", "Technology"]
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
    alert("Email processed successfully! New opportunities will be screened.")
    setEmailInput("")
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      sector: "",
      stage: "",
      location: "",
      fit: ""
    })
  }

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedFilters.sector && opp.vertical !== selectedFilters.sector) return false
    if (selectedFilters.stage && opp.stage !== selectedFilters.stage) return false
    if (selectedFilters.location && opp.location !== selectedFilters.location) return false
    if (selectedFilters.fit && opp.fit !== selectedFilters.fit) return false
    return true
  })

  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(selectedOpportunity?.id === opportunity.id ? null : opportunity)
  }

  const handleSaveOpportunity = (opportunity: Opportunity) => {
    console.log("Saving opportunity:", opportunity.name)
    alert("Opportunity saved to favorites!")
  }

  const handleShareOpportunity = (opportunity: Opportunity) => {
    console.log("Sharing opportunity:", opportunity.name)
    alert("Opportunity shared successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <Search className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunity Screening</h1>
          <p className="text-gray-600">AI-powered investment opportunity screening and categorization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Email Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl border border-green-200 p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Email Input</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-800 mb-2 font-medium">Example emails:</div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-white rounded border text-green-700">Investment Opportunity: Fintech project</div>
                  <div className="p-2 bg-white rounded border text-green-700">Investment Opportunity: Factory in Germany</div>
                  <div className="p-2 bg-white rounded border text-green-700">Investment Opportunity: Agritech project</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type here..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            {showFilters && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <select
                    value={selectedFilters.sector}
                    onChange={(e) => handleFilterChange("sector", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Sectors</option>
                    {SECTORS.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                  <select
                    value={selectedFilters.stage}
                    onChange={(e) => handleFilterChange("stage", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Stages</option>
                    {STAGES.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {LOCATIONS.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fit</label>
                  <select
                    value={selectedFilters.fit}
                    onChange={(e) => handleFilterChange("fit", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Fits</option>
                    <option value="best">Best Fit</option>
                    <option value="medium">Medium Fit</option>
                    <option value="worst">Worst Fit</option>
                  </select>
                </div>
                
                <button
                  onClick={clearFilters}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">AI-powered screening</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Smart categorization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <List className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">Detailed insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Opportunities ({filteredOpportunities.length})
            </h3>
            <div className="text-sm text-gray-600">
              Showing {filteredOpportunities.length} of {opportunities.length} opportunities
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Best Fit */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-lg">Best Fit</h3>
              </div>
              <div className="space-y-2">
                {filteredOpportunities.filter(o => o.fit === OPPORTUNITY_FIT.BEST).map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedOpportunity?.id === opportunity.id ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => handleOpportunityClick(opportunity)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFitColor(opportunity.fit)}`}>
                        {getFitLabel(opportunity.fit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{opportunity.vertical}</div>
                    <div className="text-xs text-gray-700 mb-3">{opportunity.summary}</div>
                    
                    {/* Additional Details */}
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{opportunity.funding}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{opportunity.teamSize} team</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opportunity.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Fit */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-yellow-700 bg-yellow-50 px-4 py-2 rounded-lg">Medium Fit</h3>
              </div>
              <div className="space-y-2">
                {filteredOpportunities.filter(o => o.fit === OPPORTUNITY_FIT.MEDIUM).map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedOpportunity?.id === opportunity.id ? 'ring-2 ring-yellow-500' : ''
                    }`}
                    onClick={() => handleOpportunityClick(opportunity)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFitColor(opportunity.fit)}`}>
                        {getFitLabel(opportunity.fit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{opportunity.vertical}</div>
                    <div className="text-xs text-gray-700 mb-3">{opportunity.summary}</div>
                    
                    {/* Additional Details */}
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{opportunity.funding}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{opportunity.teamSize} team</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opportunity.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worst Fit */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-700 bg-red-50 px-4 py-2 rounded-lg">Worst Fit</h3>
              </div>
              <div className="space-y-2">
                {filteredOpportunities.filter(o => o.fit === OPPORTUNITY_FIT.WORST).map((opportunity) => (
                  <div 
                    key={opportunity.id} 
                    className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedOpportunity?.id === opportunity.id ? 'ring-2 ring-red-500' : ''
                    }`}
                    onClick={() => handleOpportunityClick(opportunity)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFitColor(opportunity.fit)}`}>
                        {getFitLabel(opportunity.fit)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{opportunity.vertical}</div>
                    <div className="text-xs text-gray-700 mb-3">{opportunity.summary}</div>
                    
                    {/* Additional Details */}
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{opportunity.funding}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{opportunity.teamSize} team</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opportunity.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Opportunity View */}
      {selectedOpportunity && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold text-blue-900">Opportunity Details: {selectedOpportunity.name}</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSaveOpportunity(selectedOpportunity)}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                title="Save to favorites"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShareOpportunity(selectedOpportunity)}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                title="Share opportunity"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-blue-800 mb-3">Company Information</h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Vertical:</span>
                  <span className="text-sm font-medium text-blue-800">{selectedOpportunity.vertical}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Stage:</span>
                  <span className="text-sm font-medium text-blue-800">{selectedOpportunity.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Location:</span>
                  <span className="text-sm font-medium text-blue-800">{selectedOpportunity.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Team Size:</span>
                  <span className="text-sm font-medium text-blue-800">{selectedOpportunity.teamSize} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-600">Last Updated:</span>
                  <span className="text-sm font-medium text-blue-800">{selectedOpportunity.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-blue-800 mb-3">Investment Details</h5>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">Funding Round</div>
                  <div className="text-lg font-bold text-blue-900">{selectedOpportunity.funding}</div>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">Fit Score</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getFitColor(selectedOpportunity.fit)}`}>
                    {getFitLabel(selectedOpportunity.fit)}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedOpportunity.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h5 className="font-medium text-blue-800 mb-3">Description</h5>
            <p className="text-blue-700 leading-relaxed">{selectedOpportunity.summary}</p>
          </div>
        </div>
      )}
    </div>
  )
}
