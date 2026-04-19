'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Features() {
  const feature1Ref = useRef<HTMLElement>(null)
  const feature2Ref = useRef<HTMLElement>(null)
  const feature3Ref = useRef<HTMLElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const video3Ref = useRef<HTMLVideoElement>(null)

  const f1TextRefs = useRef<(HTMLElement | null)[]>([])
  const f2TextRefs = useRef<(HTMLElement | null)[]>([])
  const f3TextRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ;[f1TextRefs, f2TextRefs, f3TextRefs].forEach((refs) => {
        gsap.set(refs.current.filter(Boolean), { opacity: 0, y: 20 })
      })

      ScrollTrigger.create({
        trigger: feature1Ref.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(f1TextRefs.current.filter(Boolean), {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          })
        },
      })

      ScrollTrigger.create({
        trigger: feature2Ref.current,
        start: 'top 60%',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(f2TextRefs.current.filter(Boolean), {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          })
          video2Ref.current?.play().catch(() => {})
        },
        onLeave: () => video2Ref.current?.pause(),
        onEnterBack: () => video2Ref.current?.play().catch(() => {}),
        onLeaveBack: () => video2Ref.current?.pause(),
      })

      ScrollTrigger.create({
        trigger: feature3Ref.current,
        start: 'top 60%',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(f3TextRefs.current.filter(Boolean), {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          })
          video3Ref.current?.play().catch(() => {})
        },
        onLeave: () => video3Ref.current?.pause(),
        onEnterBack: () => video3Ref.current?.play().catch(() => {}),
        onLeaveBack: () => video3Ref.current?.pause(),
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-bg-dark">

      {/* ── Feature 1: Sensor Array ── */}
      <section
        ref={feature1Ref}
        className="relative min-h-screen w-full overflow-hidden bg-bg-dark mb-[clamp(80px,12vh,160px)]"
      >
        {/* Background image — object-contain to keep all sensors visible */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/assets/sensor-array.jpg"
            alt="Apple Vision Pro sensor array with cameras and microphones"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Gradient overlay — transparent left, dark right */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 to-transparent md:from-transparent md:via-transparent md:to-black/90" />

        {/* Text overlay */}
        <div className="relative z-10 min-h-screen flex items-end md:items-center justify-start md:justify-end px-[clamp(24px,5vw,80px)] py-[clamp(40px,8vh,120px)]">
          <div className="w-full md:max-w-[520px]">
            <p
              ref={(el) => { f1TextRefs.current[0] = el }}
              className="text-[15px] tracking-[0.1em] text-text-muted uppercase font-medium mb-5"
            >
              01 — Technology
            </p>
            <h3
              ref={(el) => { f1TextRefs.current[1] = el }}
              className="text-[clamp(42px,6vw,72px)] text-text-light font-semibold tracking-[-0.02em] leading-[1.1] mb-6 max-w-[500px]"
            >
              Built to see the world<br />as you do.
            </h3>
            <p
              ref={(el) => { f1TextRefs.current[2] = el }}
              className="text-[clamp(18px,1.5vw,22px)] leading-[1.5] text-text-muted [&>strong]:text-text-light [&>strong]:font-semibold max-w-[480px]"
              dangerouslySetInnerHTML={{
                __html: `Twelve cameras, five sensors, and six microphones capture every detail of your surroundings. <strong>Advanced spatial mapping</strong> tracks your space in real time, while <strong>eye tracking</strong> and <strong>hand gestures</strong> feel as natural as looking and reaching.`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Feature 2: Spatial Audio ── */}
      <section
        ref={feature2Ref}
        className="relative min-h-screen w-full overflow-hidden bg-bg-dark mb-[clamp(80px,12vh,160px)]"
      >
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={video2Ref}
            src="/assets/videos/spatial-audio.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 to-transparent md:from-transparent md:via-transparent md:to-black/90" />

        {/* Text overlay */}
        <div className="relative z-10 min-h-screen flex items-end md:items-center justify-start md:justify-end px-[clamp(24px,5vw,80px)] py-[clamp(40px,8vh,120px)]">
          <div className="w-full md:max-w-[520px]">
            <p
              ref={(el) => { f2TextRefs.current[0] = el }}
              className="text-[15px] tracking-[0.1em] text-text-muted uppercase font-medium mb-5"
            >
              02 — Audio
            </p>
            <h3
              ref={(el) => { f2TextRefs.current[1] = el }}
              className="text-[clamp(42px,6vw,72px)] text-text-light font-semibold tracking-[-0.02em] leading-[1.1] mb-6 max-w-[500px]"
            >
              The world,<br />heard in space.
            </h3>
            <p
              ref={(el) => { f2TextRefs.current[2] = el }}
              className="text-[clamp(18px,1.5vw,22px)] leading-[1.5] text-text-muted [&>strong]:text-text-light [&>strong]:font-semibold max-w-[480px]"
              dangerouslySetInnerHTML={{
                __html: `Dual-driver audio pods positioned next to each ear deliver personalized sound while letting you hear what's around you. <strong>Spatial Audio</strong> makes sounds feel like they're coming from your surroundings, with <strong>audio ray tracing</strong> that adapts to your room.`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Feature 3: Eye Tracking ── */}
      <section
        ref={feature3Ref}
        className="relative min-h-screen w-full overflow-hidden bg-bg-dark"
      >
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={video3Ref}
            src="/assets/videos/eye-tracking.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top fade — blends video top into black */}
        <div className="absolute top-0 left-0 right-0 h-[100px] md:h-[140px] bg-gradient-to-b from-black to-transparent pointer-events-none z-[2]" />

        {/* Bottom fade — blends video bottom into black */}
        <div className="absolute bottom-0 left-0 right-0 h-[100px] md:h-[140px] bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />

        {/* Text readability gradient */}
        <div className="absolute inset-0 pointer-events-none z-[3] bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 to-transparent md:from-transparent md:via-transparent md:to-black/90" />

        {/* Text overlay */}
        <div className="relative z-10 min-h-screen flex items-end md:items-center justify-start md:justify-end px-[clamp(24px,5vw,80px)] py-[clamp(40px,8vh,120px)]">
          <div className="w-full md:max-w-[520px]">
            <p
              ref={(el) => { f3TextRefs.current[0] = el }}
              className="text-[15px] tracking-[0.1em] text-text-muted uppercase font-medium mb-5"
            >
              03 — Input
            </p>
            <h3
              ref={(el) => { f3TextRefs.current[1] = el }}
              className="text-[clamp(42px,6vw,72px)] text-text-light font-semibold tracking-[-0.02em] leading-[1.1] mb-6 max-w-[500px]"
            >
              Look to choose.<br />Pinch to select.
            </h3>
            <p
              ref={(el) => { f3TextRefs.current[2] = el }}
              className="text-[clamp(18px,1.5vw,22px)] leading-[1.5] text-text-muted [&>strong]:text-text-light [&>strong]:font-semibold max-w-[480px]"
              dangerouslySetInnerHTML={{
                __html: `Your eyes are the input. Precise <strong>infrared eye tracking</strong> lets you browse, navigate, and interact simply by looking. Combined with <strong>subtle hand gestures</strong>, every interaction feels effortless — no controllers needed.`,
              }}
            />
          </div>
        </div>
      </section>

    </section>
  )
}
