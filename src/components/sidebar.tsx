import { Section } from "@/types"
import { Building2, Search, TrendingUp, BarChart3, Settings, User, Bell } from "lucide-react"
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
      color: "blue",
      emoji: "🏢"
    },
    {
      id: "screening" as Section,
      title: "Opportunity Screening",
      description: "Automated investment screening",
      icon: Search,
      color: "green",
      emoji: "🔍"
    },
    {
      id: "scanning" as Section,
      title: "Market Scanning",
      description: "Intelligent market analysis",
      icon: TrendingUp,
      color: "purple",
      emoji: "📊"
    },
  ]

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      switch (color) {
        case "blue":
          return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 shadow-md"
        case "green":
          return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 shadow-md"
        case "purple":
          return "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 text-purple-700 shadow-md"
        default:
          return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 shadow-md"
      }
    } else {
      return "hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-transparent"
    }
  }

  const getIconColor = (color: string, isActive: boolean) => {
    if (isActive) {
      switch (color) {
        case "blue":
          return "text-blue-600"
        case "green":
          return "text-green-600"
        case "purple":
          return "text-purple-600"
        default:
          return "text-blue-600"
      }
    } else {
      return "text-gray-500"
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{config.app.name}</h1>
            <p className="text-xs text-gray-600">{config.app.description}</p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-600">Investment Analyst</div>
            </div>
            <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-3 mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main Sections</h3>
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                getColorClasses(section.color, isActive)
              } ${isActive ? 'transform scale-105' : 'hover:scale-102'}`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{section.emoji}</span>
                  <Icon className={`w-5 h-5 ${getIconColor(section.color, isActive)}`} />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${
                    isActive ? 'text-gray-900' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </div>
                  <div className={`text-sm ${
                    isActive ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {section.description}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
        <button className="w-full p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-sm text-green-700 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
        <button className="w-full p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-sm text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Market Report</span>
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </div>
        </div>
      </div>
    </div>
  )
}
