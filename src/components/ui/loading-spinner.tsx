interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "blue" | "green" | "red" | "gray"
  text?: string
}

export function LoadingSpinner({ size = "md", color = "blue", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16"
  }

  const colorClasses = {
    blue: "border-blue-200 border-t-blue-600",
    green: "border-green-200 border-t-green-600",
    red: "border-red-200 border-t-red-600",
    gray: "border-gray-200 border-t-gray-600"
  }

  return (
    <div className="text-center">
      <div className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin mx-auto mb-4`}></div>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  )
}
