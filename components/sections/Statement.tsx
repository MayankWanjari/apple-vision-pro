'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const sublineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(wordRefs.current.filter(Boolean), {
        opacity: 0,
        y: 30,
      })
      gsap.set(sublineRef.current, {
        opacity: 0,
        y: 20,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(wordRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
      }).to(
        sublineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = ['The', 'future,', 'worn.']

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-bg-dark flex items-center justify-center px-6"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <h2
          className="text-text-light text-[clamp(64px,10vw,128px)] leading-[1.05] tracking-[-0.03em] font-semibold"
        >
          {words.map((word, index) => (
            <span key={index}>
              <span
                ref={(el) => {
                  wordRefs.current[index] = el
                }}
                className="inline-block"
              >
                {word}
              </span>
              {index < words.length - 1 && ' '}
            </span>
          ))}
        </h2>
        <p
          ref={sublineRef}
          className="text-text-muted text-[clamp(18px,2vw,24px)] mt-8 font-normal"
        >
          Spatial computing has arrived.
        </p>
      </div>
    </section>
  )
}
