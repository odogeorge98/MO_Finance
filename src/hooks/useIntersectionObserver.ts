import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<Element | null>(null)

  useEffect(() => {
    const node = ref?.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && freezeOnceVisible) {
          observer.unobserve(node)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return [ref, isIntersecting] as const
}