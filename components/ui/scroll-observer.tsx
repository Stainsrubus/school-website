"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollObserverProps {
  children: React.ReactNode
  className?: string
  threshold?: number
}

export function ScrollObserver({ children, className = "", threshold = 0.1 }: ScrollObserverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={`${className} ${isVisible ? "scroll-fade-in" : "opacity-0"}`}>
      {children}
    </div>
  )
}
