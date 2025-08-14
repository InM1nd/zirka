interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="text-center p-4 rounded-lg border border-border bg-card">
      {icon && (
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
          {icon}
        </div>
      )}
      <div className="text-xl font-medium text-foreground mb-1">{value}</div>
      <div className="text-sm text-foreground">{title}</div>
      {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
    </div>
  )
}
