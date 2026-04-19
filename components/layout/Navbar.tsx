'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-store'
import { useUser } from '@/lib/user-store'

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const detectTheme = useCallback(() => {
    // Sample a point just below the 48px navbar to detect which section it sits over
    const el = document.elementFromPoint(window.innerWidth / 2, 49)
    setTheme(el?.closest('.bg-bg-dark') ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    detectTheme()
    window.addEventListener('scroll', detectTheme, { passive: true })
    return () => window.removeEventListener('scroll', detectTheme)
  }, [detectTheme])

  useEffect(() => {
    // On route change, re-detect theme after DOM settles
    const timer = setTimeout(() => {
      detectTheme()
    }, 100)

    // Also run again to catch post-hydration DOM shifts (videos loading, etc.)
    const timer2 = setTimeout(() => {
      detectTheme()
    }, 400)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [pathname, detectTheme])

  const light = theme === 'light'
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)
  const activeClasses = (href: string) =>
    isActive(href)
      ? light
        ? 'border-b pb-0.5 border-text-dark'
        : 'border-b pb-0.5 border-text-light'
      : ''
  const { toggleDrawer, getTotalItems } = useCart()
  const avatar = useUser((s) => s.user.avatar)
  const bagCount = getTotalItems()
  const displayCount = mounted ? bagCount : 0
  const displayAvatar = mounted ? avatar : 'JA'

  const baseClasses = 'sticky top-0 z-50 w-full transition-all duration-300'
  const bgClasses = !scrolled
    ? 'bg-transparent'
    : light
      ? 'bg-[rgba(245,245,247,0.72)] backdrop-blur-xl'
      : 'bg-[rgba(29,29,31,0.72)] backdrop-blur-xl'
  const navClassName = `${baseClasses} ${bgClasses}`

  return (
    <header className={navClassName}>
      <nav className="max-w-container mx-auto px-[clamp(24px,5vw,80px)] h-12 flex items-center justify-between">

        <Link
          href="/"
          className={[
            'text-[18px] font-semibold tracking-[-0.01em] transition-colors duration-300 hover:opacity-80',
            light ? 'text-text-dark' : 'text-text-light',
          ].join(' ')}
        >
          Apple Vision Pro
        </Link>

        <div className="flex items-center gap-7">
          <Link
            href="/"
            className={[
              'text-[13px] transition duration-300',
              light ? 'text-text-dark hover:text-black' : 'text-text-light hover:text-white',
              activeClasses('/'),
            ].filter(Boolean).join(' ')}
          >
            Overview
          </Link>

          <Link
            href="/tech-specs"
            className={[
              'hidden md:block text-[13px] transition duration-300',
              light ? 'text-text-dark hover:text-black' : 'text-text-light hover:text-white',
              activeClasses('/tech-specs'),
            ].filter(Boolean).join(' ')}
          >
            Tech Specs
          </Link>

          <Link
            href="/visionos"
            className={[
              'hidden md:block text-[13px] transition duration-300',
              light ? 'text-text-dark hover:text-black' : 'text-text-light hover:text-white',
              activeClasses('/visionos'),
            ].filter(Boolean).join(' ')}
          >
            visionOS
          </Link>

          <Link
            href="/book-demo"
            className={[
              'text-[13px] px-[13px] py-[5px] rounded-pill border transition-colors duration-300',
              light
                ? 'text-text-dark border-black/30 hover:bg-black/5'
                : 'text-text-light border-white/30 hover:bg-white/5',
            ].join(' ')}
          >
            Book a demo
          </Link>

          {/* Bag icon with item count */}
          <button
            onClick={toggleDrawer}
            aria-label={displayCount > 0 ? `Open bag (${displayCount} items)` : 'Open bag'}
            className={[
              'relative p-2 rounded-full transition-colors duration-300',
              light ? 'hover:bg-black/5 text-text-dark' : 'hover:bg-white/5 text-text-light',
            ].join(' ')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {displayCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#0071e3] text-white text-[10px] font-semibold flex items-center justify-center px-1">
                {displayCount}
              </span>
            )}
          </button>

          {/* Account avatar */}
          <Link
            href="/account"
            aria-label="Your account"
            className={[
              'w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
              light ? 'bg-text-dark text-white hover:bg-black' : 'bg-white text-text-dark hover:bg-white/90',
            ].join(' ')}
          >
            {displayAvatar}
          </Link>

          {/* Buy CTA stays Apple blue in both themes */}
          <Link
            href="/shop"
            className="text-white text-[13px] px-[13px] py-[5px] rounded-pill bg-[#0071e3] hover:bg-[#0077ed] transition-colors"
          >
            Buy
          </Link>
        </div>

      </nav>
    </header>
  )
}
