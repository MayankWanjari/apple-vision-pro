'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

// Light bg: #f5f5f7  →  rgb(245, 245, 247)
// Dark bg:  #000000  →  rgb(0, 0, 0)

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

export default function BackgroundTransitions() {
  useEffect(() => {
    // Hero (light) → Statement (dark)
    const t1 = ScrollTrigger.create({
      trigger: '#statement',
      start: 'top bottom',
      end: 'top center',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        const r = lerp(245, 0, p)
        const g = lerp(245, 0, p)
        const b = lerp(247, 0, p)
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`
      },
    })

    // Features (dark) → Close (light)
    const t2 = ScrollTrigger.create({
      trigger: '#close',
      start: 'top bottom',
      end: 'top center',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        const r = lerp(0, 245, p)
        const g = lerp(0, 245, p)
        const b = lerp(0, 247, p)
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`
      },
    })

    return () => {
      t1.kill()
      t2.kill()
    }
  }, [])

  return null
}
