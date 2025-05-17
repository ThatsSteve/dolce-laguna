"use client"

import React, { useState, useEffect, memo, useRef } from "react"
import Image from "next/image"
import useIntersectionObserver from "../hooks/use-intersection-observer"

interface OptimizedImageProps {
  src: string
  alt: string
  defaultImage?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

const OptimizedImage = memo(({
  src,
  alt,
  defaultImage = "/placeholder.svg",
  fill = false,
  width,
  height,
  priority = false,
  className = "",
  sizes = "100vw",
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isVisible, ref] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "200px",
    freezeOnceVisible: true
  })
  
  const loadedRef = useRef(false);
  
  const handleLoad = () => {
    setIsLoaded(true)
    loadedRef.current = true
    if (ref.current) {
      ref.current.classList.add('already-loaded')
    }
    onLoad?.()
  }
  
  const handleError = () => {
    setError(true)
    onError?.()
  }
  
  useEffect(() => {
    if (loadedRef.current) {
      setIsLoaded(true)
    }
  }, []);
  
  const imageSrc = error ? defaultImage : src || defaultImage
  
  return (
    <div 
      ref={ref}
      className={`image-optimize ${isLoaded ? '' : 'loading'}`}
      style={{ 
        width: fill ? '100%' : width ? `${width}px` : '100%',
        height: fill ? '100%' : height ? `${height}px` : 'auto',
        position: fill ? 'relative' : 'relative',
      }}
      data-loaded={isLoaded}
    >
      {(isVisible || priority || loadedRef.current) && (
        <Image
          src={imageSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          placeholder="empty"
        />
      )}
    </div>
  )
})

OptimizedImage.displayName = "OptimizedImage"

export default OptimizedImage
