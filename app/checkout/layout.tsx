'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import OrderSummary from '@/components/checkout/OrderSummary'

const STEPS = ['Shipping', 'Payment', 'Review'] as const

function getStepIndex(pathname: string): number {
  if (pathname.startsWith('/checkout/success')) return 3
  if (pathname.startsWith('/checkout/review')) return 2
  if (pathname.startsWith('/checkout/payment')) return 1
  return 0
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 7 5.5 10.5 12 3.5" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const currentStep = getStepIndex(pathname)
  const isSuccess = pathname.startsWith('/checkout/success')

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-lg font-semibold hover:opacity-70 transition-opacity">
            Apple Vision Pro
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-text-muted">
            <LockIcon />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Progress indicator */}
        {!isSuccess && (
          <div className="flex items-center justify-center mb-12 max-w-sm mx-auto">
            {STEPS.map((step, i) => {
              const isCompleted = i < currentStep
              const isActive = i === currentStep

              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                        isCompleted
                          ? 'bg-[#0071e3] text-white'
                          : isActive
                          ? 'bg-text-dark text-white'
                          : 'bg-black/10 text-text-muted',
                      ].join(' ')}
                    >
                      {isCompleted ? <CheckIcon /> : i + 1}
                    </div>
                    <span
                      className={[
                        'text-xs mt-1.5 whitespace-nowrap',
                        isActive ? 'text-text-dark font-medium' : 'text-text-muted',
                      ].join(' ')}
                    >
                      {step}
                    </span>
                  </div>

                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-3 mb-5 relative bg-black/10">
                      <div
                        className="absolute inset-y-0 left-0 bg-[#0071e3] transition-all duration-500"
                        style={{ width: isCompleted ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Main content */}
        {isSuccess ? (
          <div>{children}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
            <div>{children}</div>
            <div>
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
