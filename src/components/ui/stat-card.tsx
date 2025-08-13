interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  color?: "blue" | "green" | "purple" | "orange"
}

export function StatCard({ title, value, description, icon, color = "blue" }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  }

  return (
    <div className="text-center p-4 rounded-lg">
      {icon && (
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center mx-auto mb-3`}>
          {icon}
        </div>
      )}
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-700">{title}</div>
      {description && <div className="text-xs text-gray-500 mt-1">{description}</div>}
    </div>
  )
}
