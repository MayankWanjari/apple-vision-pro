'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/cart-store'
import { useCheckout } from '@/lib/checkout-store'
import { useOrders } from '@/lib/orders-store'

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

function SectionHeader({
  title,
  onEdit,
}: {
  title: string
  onEdit: () => void
}) {
  return (
    <div className="flex justify-between items-start mb-4">
      <span className="text-sm font-semibold uppercase tracking-wider">{title}</span>
      <button
        type="button"
        onClick={onEdit}
        className="text-sm text-[#0071e3] hover:underline"
      >
        Edit
      </button>
    </div>
  )
}

export default function ReviewPage() {
  const router = useRouter()
  const { items, getSubtotal, clearCart } = useCart()
  const { shipping, payment, clearCheckout } = useCheckout()
  const addOrder = useOrders((s) => s.addOrder)
  const [isPlacing, setIsPlacing] = useState(false)

  useEffect(() => {
    if (isPlacing) return
    if (!shipping) {
      router.push('/checkout')
      return
    }
    if (!payment) {
      router.push('/checkout/payment')
    }
  }, [shipping, payment, router, isPlacing])

  if (!shipping || !payment) return null

  const subtotal = getSubtotal()
  const tax = Math.round(subtotal * 0.085)
  const total = subtotal + tax

  const last4 = payment.cardNumber.replace(/\s/g, '').slice(-4)

  async function handlePlaceOrder() {
    if (isPlacing) return
    setIsPlacing(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const orderId = 'VP-' + Math.random().toString(36).slice(2, 10).toUpperCase()
    const orderData = {
      orderId,
      email: shipping!.email,
      items,
      total,
      shipping,
    }
    sessionStorage.setItem('vp-last-order', JSON.stringify(orderData))

    const fullOrder = {
      id: orderId,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'processing' as const,
      items: items.map((item) => ({
        name: 'Apple Vision Pro',
        config: [
          item.storageLabel,
          item.bandLabel,
          item.sizeLabel + ' size',
          ...(item.applecareId !== 'none' ? [item.applecareLabel] : []),
        ],
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        image: '/assets/hero-poster.jpg',
      })),
      subtotal: getSubtotal(),
      shipping: 0,
      tax: Math.round(getSubtotal() * 0.085),
      total,
      estimatedDelivery: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      shippingAddress: {
        name: `${shipping!.firstName} ${shipping!.lastName}`,
        street: shipping!.address,
        city: shipping!.city,
        state: shipping!.state,
        zip: shipping!.zip,
      },
      paymentLast4: payment!.cardNumber.replace(/\s/g, '').slice(-4),
    }
    addOrder(fullOrder)

    router.push('/checkout/success')

    setTimeout(() => {
      clearCart()
      clearCheckout()
    }, 100)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Review your order</h1>
      <p className="text-text-muted mb-8">
        Make sure everything looks good before placing your order.
      </p>

      <div className="space-y-6">
        {/* Shipping address */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <SectionHeader title="Shipping Address" onEdit={() => router.push('/checkout')} />
          <div className="text-sm text-text-dark space-y-0.5">
            <p>
              {shipping.firstName} {shipping.lastName}
            </p>
            <p>
              {shipping.address}
              {shipping.apartment ? `, ${shipping.apartment}` : ''}
            </p>
            <p>
              {shipping.city}, {shipping.state} {shipping.zip}
            </p>
            <p>{shipping.country}</p>
            <p className="mt-1">{shipping.phone}</p>
            <p>{shipping.email}</p>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <SectionHeader title="Payment Method" onEdit={() => router.push('/checkout/payment')} />
          <div className="text-sm text-text-dark space-y-0.5">
            <p>Credit Card ending in {last4}</p>
            <p>{payment.cardholderName}</p>
            <p>Expires {payment.expiry}</p>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <SectionHeader title="Order Items" onEdit={() => router.push('/shop')} />
          <div className="space-y-5">
            {items.map((item) => {
              const itemTotal = item.unitPrice * item.quantity
              return (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-bg-light shrink-0 relative overflow-hidden">
                    <Image
                      src="/assets/hero-poster.jpg"
                      alt="Apple Vision Pro"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Apple Vision Pro</p>
                    <div className="text-sm text-text-muted space-y-0.5 mt-1">
                      <p>{item.storageLabel}</p>
                      <p>{item.bandLabel}</p>
                      <p>{item.sizeLabel} size</p>
                      {item.applecareId !== 'none' && <p>{item.applecareLabel}</p>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-text-muted">Qty {item.quantity}</p>
                    <p className="font-semibold mt-0.5">{fmt(itemTotal)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          onClick={() => router.push('/checkout/payment')}
          className="text-sm text-text-muted hover:text-text-dark transition-colors"
        >
          ← Back to Payment
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className="bg-[#0071e3] text-white rounded-full px-8 py-3.5 font-medium hover:bg-[#0077ED] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPlacing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}
