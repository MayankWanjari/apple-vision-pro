'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'

type OrderData = {
  orderId: string
  email: string
  total: number
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export default function SuccessPage() {
  const router = useRouter()
  const checkRef = useRef<HTMLDivElement>(null)
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('vp-last-order')
    if (!raw) {
      router.push('/')
      return
    }
    try {
      setOrder(JSON.parse(raw) as OrderData)
    } catch {
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    if (!order || !checkRef.current) return
    gsap.fromTo(
      checkRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
  }, [order])

  if (!order) return null

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      {/* Animated checkmark */}
      <div
        ref={checkRef}
        className="w-20 h-20 rounded-full bg-[#0071e3] flex items-center justify-center mx-auto"
        style={{ transform: 'scale(0)' }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 18 13.5 25.5 30 9" />
        </svg>
      </div>

      <h1 className="text-3xl font-semibold mt-8">Thank you for your order</h1>
      <p className="text-text-muted mt-3">
        Your order{' '}
        <span className="font-medium text-text-dark">{order.orderId}</span> has been placed.
        We&apos;ve sent a confirmation email to{' '}
        <span className="font-medium text-text-dark">{order.email}</span>.
      </p>

      {/* Order details card */}
      <div className="bg-white rounded-2xl border border-black/5 p-6 mt-8 text-left">
        <p className="text-sm text-text-muted">Estimated delivery</p>
        <p className="text-lg font-semibold mt-1">2–3 business days</p>
        <div className="border-t border-black/10 my-4" />
        <p className="text-sm text-text-muted">Total paid</p>
        <p className="text-lg font-semibold mt-1">{fmt(order.total)}</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-8 justify-center">
        <Link
          href="/"
          className="border border-text-dark/30 rounded-full px-6 py-3 text-sm font-medium hover:border-text-dark transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href={`/account/orders/${order.orderId}`}
          className="bg-text-dark text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-black transition-colors"
        >
          View Order Details
        </Link>
      </div>
    </div>
  )
}
