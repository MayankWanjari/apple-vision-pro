'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Close() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRefs = useRef<(HTMLElement | null)[]>([])
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRefs.current.filter(Boolean), { opacity: 0, y: 20 })
      gsap.set(imageRef.current, { opacity: 0, scale: 1.05 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(textRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }).to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-bg-light flex items-center overflow-hidden"
    >
      {/* Full-width grid — no container wrapper so right column reaches viewport edge */}
      <div
        className="w-full pt-[var(--space-section-y)] pb-0
                   grid grid-cols-1 md:grid-cols-[1fr_1.3fr]
                   gap-10 md:gap-[80px] items-center"
      >

        {/* LEFT: Text stack — pinned to left viewport edge with basic padding */}
        <div
          className="flex flex-col gap-8 items-center text-center
                     md:items-start md:text-left
                     order-2 md:order-1
                     px-[var(--space-section-x)] md:pr-0"
        >
          <p
            ref={(el) => { textRefs.current[0] = el }}
            className="text-text-muted text-[15px] font-medium tracking-[0.02em]"
          >
            Apple Vision Pro
          </p>
          <h2
            ref={(el) => { textRefs.current[1] = el }}
            className="text-text-dark text-[clamp(48px,6vw,84px)]
                       font-semibold tracking-[-0.03em] leading-none
                       whitespace-nowrap"
          >
            From $3,499
          </h2>
          <div
            ref={(el) => { textRefs.current[2] = el }}
            className="flex items-center gap-6 flex-wrap"
          >
            <Link
              href="/shop"
              className="bg-text-dark text-text-light px-11 py-[18px]
                         text-[17px] font-medium rounded-pill
                         transition-transform duration-300
                         hover:scale-[1.03] cursor-pointer inline-block"
            >
              Buy
            </Link>
            <a
              href="#"
              className="text-text-muted text-base font-medium
                         transition-colors duration-200
                         hover:text-text-dark"
            >
              Watch the film →
            </a>
          </div>
        </div>

        {/* RIGHT: Image — bleeds to right viewport edge on desktop */}
        <div
          className="order-1 md:order-2 flex items-center justify-center
                     px-[var(--space-section-x)] md:px-0"
        >
          <img
            ref={imageRef}
            src="/assets/woman-with-headset.jpg"
            alt="Woman putting on Apple Vision Pro headset"
            className="w-full h-auto"
          />
        </div>

      </div>
    </section>
  )
}
