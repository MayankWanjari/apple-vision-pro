'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-store'

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, getSubtotal } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  const subtotal = getSubtotal()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={[
          'fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={[
          'fixed right-0 top-0 h-full w-full max-w-[480px] bg-bg-light z-[70]',
          'shadow-2xl flex flex-col',
          'transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-5 border-b border-black/10 flex items-center justify-between">
          <span className="text-xl font-semibold">Your Bag</span>
          <button
            onClick={closeDrawer}
            aria-label="Close bag"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="text-lg font-medium mt-4">Your bag is empty</p>
              <p className="text-sm text-text-muted mt-2">Add a Vision Pro to get started.</p>
              <button
                onClick={() => { closeDrawer(); router.push('/shop') }}
                className="mt-6 bg-text-dark text-white rounded-full px-6 py-3 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Shop Vision Pro
              </button>
            </div>
          ) : (
            <div className="px-6 py-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product image */}
                  <div className="w-24 h-24 bg-white rounded-xl shrink-0 relative overflow-hidden">
                    <Image
                      src="/assets/hero-poster.jpg"
                      alt="Apple Vision Pro"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold">Apple Vision Pro</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-text-muted hover:text-text-dark transition-colors"
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-sm text-text-muted space-y-0.5 mt-1">
                      <p>{item.storageLabel}</p>
                      <p>{item.bandLabel}</p>
                      <p>{item.sizeLabel} size</p>
                      {item.applecareId !== 'none' && <p>{item.applecareLabel}</p>}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity stepper */}
                      <div className="flex items-center rounded-full border border-black/15 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-base disabled:opacity-30 hover:bg-black/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          className="w-8 h-8 flex items-center justify-center text-base disabled:opacity-30 hover:bg-black/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 px-6 py-6 border-t border-black/10">
            <div className="flex justify-between items-center text-base mb-2">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-text-muted mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <button
              onClick={() => { closeDrawer(); router.push('/checkout') }}
              disabled={items.length === 0}
              className="w-full bg-[#0071e3] text-white rounded-full py-4 font-medium hover:bg-[#0077ED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Out
            </button>
            <p className="text-center mt-3">
              <button
                onClick={closeDrawer}
                className="text-sm text-text-muted hover:text-text-dark transition-colors"
              >
                Continue Shopping
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
