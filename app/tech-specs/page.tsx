'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { TECH_SPECS, type SpecSection } from '@/lib/tech-specs-data'

export default function TechSpecsPage() {
  const [activeSection, setActiveSection] = useState<string>(TECH_SPECS[0].id)
  const heroRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Scroll spy
  useEffect(() => {
    const NAVBAR_OFFSET = 120

    function handleScroll() {
      const sections = TECH_SPECS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter((s) => s.el !== null)

      if (sections.length === 0) return

      let currentId = sections[0].id

      for (const section of sections) {
        const rect = section.el!.getBoundingClientRect()
        if (rect.top <= NAVBAR_OFFSET) {
          currentId = section.id
        } else {
          break
        }
      }

      setActiveSection(currentId)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power2.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleNavClick = (id: string) => {
    const el = sectionRefs.current.get(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
    else sectionRefs.current.delete(id)
  }

  return (
    <div className="bg-bg-light min-h-screen pt-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        {/* Hero */}
        <div ref={heroRef} className="py-20 text-center">
          <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-4">
            Technical Specifications
          </p>
          <h1
            className="font-semibold tracking-[-0.03em]"
            style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}
          >
            Apple Vision Pro
          </h1>
          <p
            className="text-text-muted mt-4"
            style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
          >
            Every detail, considered.
          </p>
        </div>

        {/* Main grid */}
        <div ref={mainRef} className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16 pb-32">

          {/* Left sticky nav */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 self-start">
              <p className="text-xs uppercase tracking-widest text-text-muted mb-4">
                On This Page
              </p>
              <ul className="space-y-0">
                {TECH_SPECS.map((section: SpecSection) => {
                  const isActive = activeSection === section.id
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => handleNavClick(section.id)}
                        className={[
                          'text-sm py-2 block text-left w-full transition-colors',
                          isActive
                            ? 'text-text-dark font-medium pl-3 border-l-2 border-[#0071e3]'
                            : 'text-text-muted hover:text-text-dark',
                        ].join(' ')}
                      >
                        {section.title}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Right spec sections */}
          <div>
            {TECH_SPECS.map((section: SpecSection, sectionIndex: number) => (
              <section
                key={section.id}
                className={sectionIndex > 0 ? 'mt-20' : ''}
              >
                <h2
                  id={section.id}
                  ref={setSectionRef(section.id)}
                  className="font-semibold tracking-[-0.02em] mb-8 scroll-mt-24"
                  style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}
                >
                  {section.title}
                </h2>

                <ul>
                  {section.rows.map((row, rowIndex: number) => {
                    const isLast = rowIndex === section.rows.length - 1
                    return (
                      <li
                        key={row.label}
                        className={[
                          'flex justify-between items-start py-5',
                          isLast ? '' : 'border-b border-black/10',
                        ].join(' ')}
                      >
                        <span className="text-sm text-text-muted w-[40%] shrink-0">
                          {row.label}
                        </span>
                        <span className="text-base text-text-dark text-right">
                          {Array.isArray(row.value) ? (
                            <ul className="space-y-1">
                              {row.value.map((line: string) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          ) : (
                            row.value
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
