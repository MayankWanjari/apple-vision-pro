'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ENVIRONMENTS } from '@/lib/visionos-data'

function splitWords(text: string) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <span
      key={i}
      className="word inline-block"
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {word}
      {i < words.length - 1 ? '\u00A0' : ''}
    </span>
  ))
}

export default function VisionOSPage() {
  const spatialImageRef = useRef<HTMLDivElement>(null)
  const appsImageRef = useRef<HTMLDivElement>(null)
  const envsGridRef = useRef<HTMLDivElement>(null)

  const heroHeadlineRef = useRef<HTMLHeadingElement>(null)
  const heroSublineRef = useRef<HTMLParagraphElement>(null)
  const spatialHeadlineRef = useRef<HTMLHeadingElement>(null)
  const spatialSublineRef = useRef<HTMLParagraphElement>(null)
  const appsHeadlineRef = useRef<HTMLHeadingElement>(null)
  const appsSublineRef = useRef<HTMLParagraphElement>(null)
  const envsHeadlineRef = useRef<HTMLHeadingElement>(null)
  const envsSublineRef = useRef<HTMLParagraphElement>(null)
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null)
  const ctaSublineRef = useRef<HTMLParagraphElement>(null)

  const [reduceMotion, setReduceMotion] = useState(false)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mq.matches
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches
      setReduceMotion(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── EXISTING IMAGE / GRID ANIMATIONS (unchanged) ──

      gsap.fromTo(
        spatialImageRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: spatialImageRef.current,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        appsImageRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: appsImageRef.current,
            start: 'top 70%',
          },
        }
      )

      const envCards = envsGridRef.current?.querySelectorAll('.env-card')
      if (envCards && envCards.length) {
        gsap.fromTo(
          envCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: envsGridRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // ── HEADLINE WORD-BY-WORD ANIMATIONS ──
      if (!reduceMotionRef.current) {
        const wordFrom = {
          opacity: 0,
          y: 40,
          scale: 0.92,
          filter: 'blur(8px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        }
        const sublineFrom = {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
        }

        // 1. Hero — on mount with slight delay, no ScrollTrigger
        gsap.from(heroHeadlineRef.current?.querySelectorAll('.word') ?? [], {
          ...wordFrom,
          delay: 0.2,
        })
        gsap.from(heroSublineRef.current, {
          ...sublineFrom,
          delay: 0.6,
        })

        // 2. Spatial UI
        gsap.from(spatialHeadlineRef.current?.querySelectorAll('.word') ?? [], {
          ...wordFrom,
          scrollTrigger: {
            trigger: spatialHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(spatialSublineRef.current, {
          ...sublineFrom,
          delay: 0.4,
          scrollTrigger: {
            trigger: spatialHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        // 3. Home screen
        gsap.from(appsHeadlineRef.current?.querySelectorAll('.word') ?? [], {
          ...wordFrom,
          scrollTrigger: {
            trigger: appsHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(appsSublineRef.current, {
          ...sublineFrom,
          delay: 0.4,
          scrollTrigger: {
            trigger: appsHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        // 4. Environments
        gsap.from(envsHeadlineRef.current?.querySelectorAll('.word') ?? [], {
          ...wordFrom,
          scrollTrigger: {
            trigger: envsHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(envsSublineRef.current, {
          ...sublineFrom,
          delay: 0.4,
          scrollTrigger: {
            trigger: envsHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        // 5. CTA
        gsap.from(ctaHeadlineRef.current?.querySelectorAll('.word') ?? [], {
          ...wordFrom,
          scrollTrigger: {
            trigger: ctaHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(ctaSublineRef.current, {
          ...sublineFrom,
          delay: 0.4,
          scrollTrigger: {
            trigger: ctaHeadlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-bg-dark min-h-screen text-text-light -mt-12">

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/visionos/spatial-ui-photos.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        >
          <source src="/assets/visionos/hero-loop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[1]" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
          <div
            className="w-[60%] h-[60%] rounded-full"
            style={{
              filter: 'blur(150px)',
              background: 'linear-gradient(135deg, rgba(74,159,255,0.15) 0%, rgba(160,74,255,0.10) 50%, rgba(255,74,159,0.15) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium mb-6">
            visionOS
          </p>
          <h1
            ref={heroHeadlineRef}
            className="font-semibold tracking-[-0.04em] leading-[1.05] text-white"
            style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}
          >
            <span className="word inline-block" style={{ willChange: 'transform, opacity, filter' }}>A</span>{'\u00A0'}
            <span className="word inline-block" style={{ willChange: 'transform, opacity, filter' }}>new</span>{'\u00A0'}
            <span className="word inline-block" style={{ willChange: 'transform, opacity, filter' }}>dimension</span>{'\u00A0'}
            <span className="word inline-block" style={{ willChange: 'transform, opacity, filter' }}>of</span>{'\u00A0'}
            <span
              className="word inline-block"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              apps.
            </span>
          </h1>
          <p
            ref={heroSublineRef}
            className="mt-8 text-text-muted leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
          >
            Designed for spatial computing. Built to reimagine how you work, play, and connect.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: SPATIAL UI ── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              ref={spatialHeadlineRef}
              className="font-semibold tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              {splitWords('Space becomes your canvas.')}
            </h2>
            <p ref={spatialSublineRef} className="text-lg text-text-muted">
              Apps flow freely in your space. Resize, reposition, and arrange windows wherever you want.
            </p>
          </div>

          <div
            ref={spatialImageRef}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
          >
            <Image
              src="/assets/visionos/spatial-ui-photos.jpg"
              alt="visionOS apps floating in a living room"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOME SCREEN ── */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-bg-dark via-[#0a0a14] to-bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              ref={appsHeadlineRef}
              className="font-semibold tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              {splitWords('All your favorite apps.')}
            </h2>
            <p ref={appsSublineRef} className="text-lg text-text-muted">
              The apps you rely on every day, reimagined for an infinite canvas.
            </p>
          </div>

          <div
            ref={appsImageRef}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
          >
            <Image
              src="/assets/visionos/apps-home-screen.jpg"
              alt="visionOS home screen with app icons"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ENVIRONMENTS ── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              ref={envsHeadlineRef}
              className="font-semibold tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              {splitWords('Transport yourself.')}
            </h2>
            <p ref={envsSublineRef} className="text-lg text-text-muted">
              Step inside stunning Environments that dynamically expand beyond the dimensions of any physical room.
            </p>
          </div>

          <div
            ref={envsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {ENVIRONMENTS.map((env) => (
              <div
                key={env.id}
                className="env-card relative aspect-[16/10] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={env.image}
                  alt={env.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />
                <div className="absolute bottom-0 inset-x-0 p-6 z-[2]">
                  <p className="text-2xl font-semibold text-white">{env.name}</p>
                  <p className="text-sm text-white/70 mt-1">{env.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ── */}
      <section className="relative w-full aspect-video overflow-hidden flex items-center justify-center min-h-[500px] md:min-h-0">
        <video
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/visionos/apps-home-screen.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        >
          <source src="/assets/visionos/closing-loop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 z-[1]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2
            ref={ctaHeadlineRef}
            className="font-semibold tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
          >
            {splitWords('Experience it for yourself.')}
          </h2>
          <p ref={ctaSublineRef} className="text-lg text-text-muted mb-12">
            See visionOS in person at an Apple Store near you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/book-demo"
              className="bg-[#0071e3] text-white rounded-full px-8 py-4 font-medium hover:bg-[#0077ED] transition-colors"
            >
              Book a demo
            </Link>
            <Link
              href="/shop"
              className="border border-white/30 text-white rounded-full px-8 py-4 font-medium hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              Buy Apple Vision Pro
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
