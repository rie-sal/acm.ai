'use client'

import { useEffect, useRef } from 'react'

export function LandingSection() {
  const rotatingGroupRef = useRef<SVGGElement>(null)
  const innerCircleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const rotationDegree = scrollTop / 10
      const scaleFactor = Math.max(0.5, 1 - scrollTop / 1000)

      if (rotatingGroupRef.current) {
        rotatingGroupRef.current.setAttribute('transform', `translate(105, 197) rotate(${rotationDegree})`)
      }

      if (innerCircleRef.current) {
        innerCircleRef.current.setAttribute('transform', `scale(${scaleFactor})`)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="landing" className="min-h-screen flex flex-col items-center justify-center relative">
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 210 297"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#5ddee6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#8b56ff', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#5ddee6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#8b56ff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g ref={rotatingGroupRef}>
          <path
            d="m -92.084194,0 91.729804,91.7298 91.85452,-91.85453 z"
            fill="url(#gradient1)"
          />
          <path
            d="m 91.854536,0 -91.72981,-91.7298 -91.854532,91.85453 z"
            fill="url(#gradient2)"
          />
          <circle
            ref={innerCircleRef}
            cx="0"
            cy="0"
            r="49.624805"
            className="fill-background"
          />
        </g>
      </svg>
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">acm ai</h1>
        <p className="text-4xl">at</p>
        <h2 className="text-6xl font-bold">txst</h2>
      </div>
    </section>
  )
}
