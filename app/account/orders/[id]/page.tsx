'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useOrders } from '@/lib/orders-store'

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

const STATUS_STYLES: Record<string, string> = {
  delivered: 'bg-green-50 text-green-700 border border-green-200',
  shipped: 'bg-blue-50 text-blue-700 border border-blue-200',
  processing: 'bg-amber-50 text-amber-700 border border-amber-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const order = useOrders((s) => s.getOrder(id))

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl font-semibold mb-2">Order not found</p>
        <p className="text-text-muted mb-6">
          We couldn&apos;t find an order with that ID.
        </p>
        <Link
          href="/account"
          className="text-sm text-[#0071e3] hover:underline"
        >
          ← Back to Account
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/account"
        className="text-sm text-text-muted hover:text-text-dark transition-colors mb-8 inline-block"
      >
        ← Back to Account
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mt-2">
        <div>
          <span
            className={[
              'px-3 py-1 rounded-full text-xs font-medium uppercase',
              STATUS_STYLES[order.status] ?? '',
            ].join(' ')}
          >
            {order.status}
          </span>
          <h1 className="text-3xl font-semibold mt-3">{order.id}</h1>
          <p className="text-text-muted mt-1">Ordered on {formatDate(order.orderDate)}</p>
        </div>

        <div className="flex gap-3">
          {order.status === 'shipped' && order.trackingNumber && (
            <button
              type="button"
              onClick={() =>
                window.alert(`Tracking number: ${order.trackingNumber}`)
              }
              className="text-sm text-[#0071e3] hover:underline"
            >
              Track Package →
            </button>
          )}
          {order.status === 'delivered' && (
            <button
              type="button"
              onClick={() => window.alert('Return request coming soon.')}
              className="text-sm text-text-muted hover:text-text-dark transition-colors"
            >
              Request Return
            </button>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white border border-black/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-text-muted mb-3">
            Shipping to
          </p>
          <div className="text-sm text-text-dark space-y-0.5">
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zip}
            </p>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-text-muted mb-3">
            Payment
          </p>
          <p className="text-sm text-text-dark">
            Visa ending in {order.paymentLast4}
          </p>
        </div>

        <div className="bg-white border border-black/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-text-muted mb-3">
            Delivery
          </p>
          <p className="text-sm text-text-dark">
            {order.status === 'delivered' && order.deliveredDate
              ? `Delivered ${formatDate(order.deliveredDate)}`
              : order.status === 'shipped' && order.estimatedDelivery
                ? `Arriving ${formatDate(order.estimatedDelivery)}`
                : 'Processing'}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-black/5 p-5 flex gap-5 items-center"
            >
              <div className="w-24 h-24 rounded-xl bg-bg-light shrink-0 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{item.name}</p>
                <div className="text-sm text-text-muted mt-1 space-y-0.5">
                  {item.config.map((c, j) => (
                    <p key={j}>{c}</p>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-text-muted">Qty {item.quantity}</p>
                <p className="font-semibold mt-0.5">
                  {fmt(item.unitPrice * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-12 max-w-sm ml-auto">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-white border border-black/5 rounded-2xl p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Subtotal</span>
            <span>{fmt(order.subtotal)}</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3">
            <span className="text-text-muted">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3">
            <span className="text-text-muted">Tax</span>
            <span>{fmt(order.tax)}</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3 font-semibold text-xl">
            <span>Total</span>
            <span>{fmt(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
