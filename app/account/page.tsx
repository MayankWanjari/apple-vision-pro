'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@/lib/user-store'
import { useOrders } from '@/lib/orders-store'
import type { OrderStatus } from '@/lib/orders-store'

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  delivered: 'bg-green-50 text-green-700 border border-green-200',
  shipped: 'bg-blue-50 text-blue-700 border border-blue-200',
  processing: 'bg-amber-50 text-amber-700 border border-amber-200',
  cancelled: 'bg-red-50 text-red-700 border border-red-200',
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={[
        'w-12 h-7 rounded-full relative transition-colors cursor-pointer shrink-0',
        checked ? 'bg-[#0071e3]' : 'bg-black/10',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  )
}

export default function AccountPage() {
  const { user, addresses, preferences, removeAddress, setDefaultAddress, updatePreferences } =
    useUser()
  const orders = useOrders((s) => s.orders)

  return (
    <div>
      {/* Section: Overview */}
      <section id="overview" className="scroll-mt-24">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-2">
          Welcome back, {user.firstName}.
        </h2>
        <p className="text-text-muted text-lg mb-10">
          Manage your account, orders, and preferences.
        </p>
      </section>

      {/* Section: Orders */}
      <section id="orders" className="scroll-mt-24">
        <h3 className="text-2xl font-semibold mb-6">Recent Orders</h3>

        {orders.length === 0 ? (
          <div className="bg-white border border-black/5 rounded-2xl p-10 text-center">
            <p className="text-text-muted mb-4">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/shop"
              className="inline-block bg-[#0071e3] text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[#0077ed] transition-colors"
            >
              Shop Apple Vision Pro
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const firstItem = order.items[0]
              return (
                <div
                  key={order.id}
                  className="bg-white border border-black/5 rounded-2xl p-6"
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span
                        className={[
                          'px-3 py-1 rounded-full text-xs font-medium uppercase',
                          STATUS_STYLES[order.status],
                        ].join(' ')}
                      >
                        {order.status}
                      </span>
                      <p className="font-semibold text-lg mt-2">{order.id}</p>
                      <p className="text-sm text-text-muted">
                        Ordered on {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-sm text-[#0071e3] hover:underline shrink-0 mt-1"
                    >
                      View Details →
                    </Link>
                  </div>

                  <div className="border-t border-black/10 my-4" />

                  {/* Item preview */}
                  {firstItem && (
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl bg-bg-light shrink-0 relative overflow-hidden">
                        <Image
                          src={firstItem.image}
                          alt={firstItem.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{firstItem.name}</p>
                        <p className="text-sm text-text-muted truncate">
                          {firstItem.config.join(' · ')}
                        </p>
                      </div>
                      <p className="font-semibold shrink-0">{fmt(order.total)}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Section: Addresses */}
      <section id="addresses" className="scroll-mt-24 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Addresses</h3>
          <button
            type="button"
            onClick={() => window.alert('Address management coming soon.')}
            className="text-sm text-[#0071e3] hover:underline"
          >
            Add new
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white border border-black/5 rounded-2xl p-5"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-xs bg-text-dark text-white px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <div className="mt-3 text-sm text-text-dark space-y-0.5">
                <p>
                  {addr.firstName} {addr.lastName}
                </p>
                <p>{addr.street}</p>
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p>{addr.country}</p>
              </div>

              <div className="mt-4 flex gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => window.alert('Address management coming soon.')}
                  className="text-text-muted hover:text-text-dark transition-colors"
                >
                  Edit
                </button>
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => removeAddress(addr.id)}
                    className="text-text-muted hover:text-text-dark transition-colors"
                  >
                    Remove
                  </button>
                )}
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[#0071e3] hover:underline"
                  >
                    Set as default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Preferences */}
      <section id="preferences" className="scroll-mt-24 mt-16">
        <h3 className="text-2xl font-semibold mb-6">Preferences</h3>

        <div className="space-y-1">
          <div className="bg-white border border-black/5 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-text-muted mt-1">Receive our monthly newsletter.</p>
            </div>
            <Toggle
              label="Toggle newsletter"
              checked={preferences.newsletter}
              onChange={() =>
                updatePreferences({ newsletter: !preferences.newsletter })
              }
            />
          </div>

          <div className="bg-white border border-black/5 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-medium">Product Updates</p>
              <p className="text-sm text-text-muted mt-1">
                Get notified about new features and releases.
              </p>
            </div>
            <Toggle
              label="Toggle product updates"
              checked={preferences.productUpdates}
              onChange={() =>
                updatePreferences({ productUpdates: !preferences.productUpdates })
              }
            />
          </div>

          <div className="bg-white border border-black/5 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-medium">Order Notifications</p>
              <p className="text-sm text-text-muted mt-1">
                Email updates on order status.
              </p>
            </div>
            <Toggle
              label="Toggle order notifications"
              checked={preferences.orderNotifications}
              onChange={() =>
                updatePreferences({ orderNotifications: !preferences.orderNotifications })
              }
            />
          </div>
        </div>
      </section>
    </div>
  )
}
