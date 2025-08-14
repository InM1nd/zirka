export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-blue-900 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">Loading Dashboard</h2>
        <p className="text-gray-100">Please wait while we prepare your investment intelligence platform...</p>
      </div>
    </div>
  )
}
