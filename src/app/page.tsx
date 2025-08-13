'use client'

import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('@/components/dashboard').then(mod => ({ default: mod.Dashboard })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-2xl font-bold text-gray-600">Loading Dashboard...</div>
    </div>
  )
})

export default function Home() {
  return (
    <Dashboard />
  )
}
