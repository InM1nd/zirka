import { Section } from "@/types"
import { Building2, Search, TrendingUp } from "lucide-react"
import { config } from "@/config"

interface SidebarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    {
      id: "profiling" as Section,
      title: "Company Profiling",
      description: "Comprehensive company analysis",
      icon: Building2,
    },
    {
      id: "screening" as Section,
      title: "Opportunity Screening",
      description: "Automated investment screening",
      icon: Search,
    },
    {
      id: "scanning" as Section,
      title: "Market Scanning",
      description: "Intelligent market analysis",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{config.app.name}</h1>
        <p className="text-sm text-gray-600">{config.app.description}</p>
      </div>
      
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                  : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`} />
                <div>
                  <div className={`font-medium ${
                    isActive ? "text-blue-700" : "text-gray-900"
                  }`}>
                    {section.title}
                  </div>
                  <div className={`text-sm ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {section.description}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
