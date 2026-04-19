'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-store'

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export default function OrderSummary() {
  const router = useRouter()
  const pathname = usePathname()
  const { items, getSubtotal } = useCart()

  useEffect(() => {
    if (pathname?.startsWith('/checkout/success')) return
    if (items.length === 0) {
      router.push('/shop')
    }
  }, [items.length, pathname, router])

  const subtotal = getSubtotal()
  const tax = Math.round(subtotal * 0.085)
  const total = subtotal + tax

  return (
    <div className="sticky top-8 self-start bg-white rounded-2xl p-6 border border-black/5">
      <h2 className="text-lg font-semibold mb-5">Order Summary</h2>

      <div className="space-y-4">
        {items.map((item) => {
          const itemTotal = item.unitPrice * item.quantity
          return (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 rounded-lg bg-bg-light shrink-0 relative overflow-hidden">
                <Image
                  src="/assets/hero-poster.jpg"
                  alt="Apple Vision Pro"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Apple Vision Pro</p>
                <div className="text-xs text-text-muted space-y-0.5 mt-0.5">
                  <p>{item.storageLabel}</p>
                  <p>{item.bandLabel}</p>
                  <p>{item.sizeLabel} size</p>
                  {item.applecareId !== 'none' && <p>{item.applecareLabel}</p>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-text-muted">Qty {item.quantity}</p>
                <p className="text-sm font-semibold mt-0.5">{fmt(itemTotal)}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-black/10 my-5" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-[#0071e3] font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (estimated)</span>
          <span>{fmt(tax)}</span>
        </div>
      </div>

      <div className="border-t border-black/10 my-4" />

      <div className="flex justify-between items-baseline">
        <span className="font-semibold">Total</span>
        <span className="text-xl font-semibold">{fmt(total)}</span>
      </div>
    </div>
  )
}
