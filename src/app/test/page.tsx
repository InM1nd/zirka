export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Tailwind CSS Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Card 1</h2>
            <p className="text-gray-600">This is a test card to verify Tailwind CSS is working.</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Card 2</h2>
            <p className="text-blue-700">This card has a gradient background.</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-green-900 mb-4">Card 3</h2>
            <p className="text-green-700">This card has a green gradient.</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Results</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Tailwind CSS is working</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Gradients are working</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Hover effects are working</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Transitions are working</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
