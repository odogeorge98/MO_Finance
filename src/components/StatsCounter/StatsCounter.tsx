import React, { useEffect, useRef, useState } from 'react'
import './StatsCounter.css'

interface StatsCounterProps {
  endValue: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  endValue,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // IntersectionObserver setup — starts animation when element enters viewport
  useEffect(() => {
    // If IntersectionObserver isn't available (older browsers / SSR), immediately show
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (observerRef.current) {
            observerRef.current.disconnect()
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current && observerRef.current) {
      observerRef.current.observe(ref.current)
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  // Animation effect
  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(progress * endValue)

      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        // ensure exact final value
        setCount(Math.round(endValue))
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(step)

    // cleanup on unmount or if dependencies change
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isVisible, endValue, duration])

  return (
    <div
      ref={ref}
      className={`stats-counter ${className}`}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {prefix ? <span className="stats-counter__prefix">{prefix}</span> : null}
      <span className="stats-counter__value">{count.toLocaleString()}</span>
      {suffix ? <span className="stats-counter__suffix">{suffix}</span> : null}
    </div>
  )
}

export default StatsCounter
