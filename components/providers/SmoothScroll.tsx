'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCheckout = pathname?.startsWith('/checkout')
  const isBookDemo = pathname?.startsWith('/book-demo')
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (isCheckout || isBookDemo) return

    const lenis = new Lenis()
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(tickerCallback)
    }
  }, [isCheckout, isBookDemo])

  return <>{children}</>
}
