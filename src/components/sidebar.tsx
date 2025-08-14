import { Section } from "@/types"
import { Building2, Search, TrendingUp, BarChart3, Settings, User } from "lucide-react"
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
    <div className="w-80 bg-background border-r border-border p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-background" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-foreground">{config.app.name}</h1>
            <p className="text-xs text-muted-foreground">{config.app.description}</p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="border border-border rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-background" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">John Doe</div>
              <div className="text-xs text-muted-foreground">Investment Analyst</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Main Sections</h3>
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-muted text-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {section.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {section.description}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="space-y-2 mb-8">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h3>
        <button className="w-full p-3 border border-border text-foreground rounded-lg text-sm hover:bg-muted transition-colors flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
        <button className="w-full p-3 border border-border text-foreground rounded-lg text-sm hover:bg-muted transition-colors flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Market Report</span>
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full p-3 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}
