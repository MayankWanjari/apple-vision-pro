'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/lib/user-store'

const NAV_ITEMS = [
  { label: 'Overview', hash: '#overview' },
  { label: 'Orders', hash: '#orders' },
  { label: 'Addresses', hash: '#addresses' },
  { label: 'Preferences', hash: '#preferences' },
]

const SECTION_IDS = ['overview', 'orders', 'addresses', 'preferences']

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = useUser((s) => s.user)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const OFFSET = 130

    function handleScroll() {
      const sections = SECTION_IDS.map((id) => ({
        id,
        el: document.getElementById(id),
      })).filter((s) => s.el !== null)

      if (sections.length === 0) return

      let current = sections[0].id
      for (const s of sections) {
        const rect = s.el!.getBoundingClientRect()
        if (rect.top <= OFFSET) {
          current = s.id
        } else {
          break
        }
      }

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-32">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-12">
          Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-32 self-start">
            {/* User card */}
            <div className="bg-white rounded-2xl p-5 border border-black/5 mb-6">
              <div className="w-12 h-12 bg-text-dark text-white rounded-full flex items-center justify-center font-semibold text-lg">
                {mounted ? user.avatar : 'JA'}
              </div>
              <p className="text-sm font-semibold mt-3">
                {mounted ? `${user.firstName} ${user.lastName}` : 'John Appleseed'}
              </p>
              <p className="text-xs text-text-muted">
                Member since {mounted ? user.memberSince : 'March 2024'}
              </p>
            </div>

            {/* Nav */}
            <nav>
              <ul className="space-y-0.5">
                {NAV_ITEMS.map(({ label, hash }) => {
                  const sectionId = hash.slice(1)
                  const isActive = activeSection === sectionId
                  return (
                    <li key={hash}>
                      <a
                        href={hash}
                        className={[
                          'py-2 px-3 rounded-lg text-sm block transition-colors',
                          isActive
                            ? 'bg-text-dark text-white'
                            : 'text-text-muted hover:bg-black/5 hover:text-text-dark',
                        ].join(' ')}
                      >
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    'Sign out coming soon with Phase 2B (auth). Your session data will persist locally.'
                  )
                }
                className="text-sm text-text-muted hover:text-text-dark mt-6 pt-6 border-t border-black/10 w-full text-left px-3 transition-colors"
              >
                Sign out
              </button>
            </nav>
          </aside>

          {/* Page content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
