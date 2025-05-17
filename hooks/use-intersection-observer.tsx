"use client"

import { useState, useEffect, useRef, RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export default function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): [boolean, RefObject<T>] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)
  const frozen = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Skip if already frozen
    if (freezeOnceVisible && frozen.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        
        if (isIntersecting) {
          setIsVisible(true)
          
          if (freezeOnceVisible) {
            frozen.current = true
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return [isVisible, ref]
}
