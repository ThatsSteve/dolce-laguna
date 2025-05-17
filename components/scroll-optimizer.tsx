"use client"

import React, { useEffect, useState } from "react"
import { throttle } from "lodash"

interface ScrollOptimizerProps {
  children: React.ReactNode
}

export default function ScrollOptimizer({ children }: ScrollOptimizerProps) {
  const [isScrolling, setIsScrolling] = useState(false)
  
  useEffect(() => {
    // Throttled scroll handler to prevent too many state updates
    const handleScroll = throttle(() => {
      if (!isScrolling) {
        setIsScrolling(true)
      }
      
      // Clear the scrolling state after scrolling stops
      clearTimeout(window.scrollTimer)
      window.scrollTimer = setTimeout(() => {
        setIsScrolling(false)
      }, 200) as unknown as number
    }, 100)
    
    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(window.scrollTimer)
    }
  }, [isScrolling])
  
  return (
    <div className={`scroll-optimizer ${isScrolling ? "is-scrolling" : ""}`}>
      {children}
    </div>
  )
}

// Add these styles to your globals.css or a dedicated component CSS file
// .scroll-optimizer.is-scrolling * {
//   animation-play-state: paused !important;
//   transition: none !important;
// }
