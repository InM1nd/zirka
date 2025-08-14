interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div className="text-center">
      <div className={`${sizeClasses[size]} border-2 border-border border-t-foreground rounded-full animate-spin mx-auto mb-2`}></div>
      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  )
}
