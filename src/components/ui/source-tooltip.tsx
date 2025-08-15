"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Info, ExternalLink } from 'lucide-react'

interface SourceInfo {
  source: string
  excerpt: string
  url?: string
  date?: string
}

interface SourceTooltipProps {
  children: React.ReactNode
  sourceInfo: SourceInfo
  className?: string
}

export function SourceTooltip({ children, sourceInfo, className = "" }: SourceTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + 8
      let left = triggerRect.left

      // Adjust if tooltip goes beyond right edge
      if (left + tooltipRect.width > viewportWidth - 16) {
        left = viewportWidth - tooltipRect.width - 16
      }

      // Adjust if tooltip goes beyond left edge
      if (left < 16) {
        left = 16
      }

      // Adjust if tooltip goes beyond bottom edge
      if (top + tooltipRect.height > viewportHeight - 16) {
        top = triggerRect.top - tooltipRect.height - 8
      }

      setPosition({ top, left })
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Небольшая задержка для корректного расчета позиции
      const timeoutId = setTimeout(updatePosition, 10)
      window.addEventListener('scroll', updatePosition)
      window.addEventListener('resize', updatePosition)
      
      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('scroll', updatePosition)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isVisible, updatePosition])

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(!isVisible)
  }, [isVisible])

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-flex items-center cursor-pointer ${className}`}
        onClick={handleClick}
      >
        {children}
        <sup className="ml-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
          <Info className="w-3 h-3 inline" />
        </sup>
      </div>

      {isVisible && (
        <>
          {/* Backdrop для закрытия при клике вне tooltip */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Tooltip */}
          <div
            ref={tooltipRef}
            className="fixed z-50 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {/* Стрелка */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
            
            {/* Содержимое */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-900 text-sm">
                  Data Source
                </h4>
                {sourceInfo.url && (
                  <a
                    href={sourceInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              
              <div className="text-sm text-gray-700">
                <div className="font-medium text-blue-600 mb-1">
                  {sourceInfo.source}
                </div>
                {sourceInfo.date && (
                  <div className="text-xs text-gray-500 mb-2">
                    {sourceInfo.date}
                  </div>
                )}
                <div className="text-gray-600 leading-relaxed">
                  "{sourceInfo.excerpt}"
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
