'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import {
  STORAGE_OPTIONS,
  BAND_COLORS,
  LIGHT_SEAL_SIZES,
  APPLECARE_OPTIONS,
} from '@/lib/mock-data'
import { useCart } from '@/lib/cart-store'

export default function ShopPage() {
  const { addItem } = useCart()
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[0].id)
  const [selectedBand, setSelectedBand] = useState(BAND_COLORS[0].id)
  const [selectedSize, setSelectedSize] = useState(LIGHT_SEAL_SIZES[1].id)
  const [selectedCare, setSelectedCare] = useState(APPLECARE_OPTIONS[0].id)

  const configuratorRef = useRef<HTMLDivElement>(null)

  const storagePrice = STORAGE_OPTIONS.find(o => o.id === selectedStorage)?.price ?? 3499
  const carePrice = APPLECARE_OPTIONS.find(o => o.id === selectedCare)?.price ?? 0
  const total = storagePrice + carePrice

  const activeBandLabel = BAND_COLORS.find(b => b.id === selectedBand)?.label ?? ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        configuratorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      )
    })
    return () => ctx.revert()
  }, [])

  function handleAddToBag() {
    const storage = STORAGE_OPTIONS.find(o => o.id === selectedStorage)!
    const band = BAND_COLORS.find(b => b.id === selectedBand)!
    const size = LIGHT_SEAL_SIZES.find(s => s.id === selectedSize)!
    const care = APPLECARE_OPTIONS.find(o => o.id === selectedCare)!

    addItem({
      id: `${storage.id}-${band.id}-${size.id}-${care.id}`,
      storageId: storage.id,
      storageLabel: storage.label,
      bandId: band.id,
      bandLabel: band.label,
      bandHex: band.hex,
      sizeId: size.id,
      sizeLabel: size.label,
      applecareId: care.id,
      applecareLabel: care.label,
      unitPrice: storage.price + care.price,
    })
  }

  return (
    <main className="min-h-screen bg-bg-light">
      <div className="max-w-container mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-0">

          {/* ── Left: sticky product image ── */}
          <div className="md:sticky md:top-24 md:h-[calc(100vh-6rem)] flex items-center justify-center bg-bg-light">
            <div className="relative w-full aspect-square md:aspect-auto md:h-full">
              <Image
                src="/assets/hero-poster.jpg"
                alt="Apple Vision Pro"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* ── Right: configurator ── */}
          <div
            ref={configuratorRef}
            className="px-0 md:px-12 py-16 md:max-w-[600px] opacity-0"
          >

            {/* 1. Eyebrow + Headline */}
            <p className="text-[#0071e3] text-xs uppercase tracking-widest font-medium mb-3">
              New
            </p>
            <h1
              className="font-semibold tracking-[-0.03em] leading-[1.05] mb-3"
              style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
            >
              Apple Vision Pro
            </h1>
            <p className="text-text-muted text-lg mb-12">From $3,499</p>

            {/* 2. Storage */}
            <div className="mb-10">
              <p className="text-sm font-semibold mb-1">Storage</p>
              <p className="text-xs text-text-muted mb-4">How much storage is right for you?</p>
              <div className="flex flex-col gap-3">
                {STORAGE_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedStorage(option.id)}
                    className={[
                      'flex items-center justify-between rounded-2xl p-5 cursor-pointer transition-colors text-left',
                      selectedStorage === option.id
                        ? 'border-2 border-text-dark'
                        : 'border border-black/15 hover:border-black/40',
                    ].join(' ')}
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="font-semibold">${option.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Band Color */}
            <div className="mb-10">
              <p className="text-sm font-semibold mb-1">Band Color</p>
              <p className="text-sm text-text-muted mb-4">{activeBandLabel}</p>
              <div className="flex gap-3">
                {BAND_COLORS.map(band => (
                  <button
                    key={band.id}
                    onClick={() => setSelectedBand(band.id)}
                    title={band.label}
                    className={[
                      'w-10 h-10 rounded-full border-2 transition-all',
                      selectedBand === band.id
                        ? 'ring-2 ring-text-dark ring-offset-2'
                        : 'ring-0',
                      band.id === 'white' ? 'border-black/15' : 'border-transparent',
                    ].join(' ')}
                    style={{ backgroundColor: band.hex }}
                  />
                ))}
              </div>
            </div>

            {/* 4. Light Seal Size */}
            <div className="mb-10">
              <p className="text-sm font-semibold mb-1">Light Seal Size</p>
              <p className="text-xs text-text-muted mb-4">Select a size for the best fit.</p>
              <div className="flex gap-2 flex-wrap">
                {LIGHT_SEAL_SIZES.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={[
                      'px-6 py-2 text-sm rounded-full border transition-colors',
                      selectedSize === size.id
                        ? 'bg-text-dark text-white border-text-dark'
                        : 'border-black/20 hover:border-black/50',
                    ].join(' ')}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. AppleCare+ */}
            <div className="mb-10">
              <p className="text-sm font-semibold mb-4">Protection Plan</p>
              <div className="flex flex-col gap-3">
                {APPLECARE_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedCare(option.id)}
                    className={[
                      'flex items-start justify-between rounded-2xl p-5 cursor-pointer transition-colors text-left',
                      selectedCare === option.id
                        ? 'border-2 border-text-dark'
                        : 'border border-black/15 hover:border-black/40',
                    ].join(' ')}
                  >
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-xs text-text-muted mt-1">{option.description}</p>
                    </div>
                    <span className="font-semibold ml-4 shrink-0">
                      {option.price === 0 ? 'Free' : `+$${option.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Total */}
            <div className="border-t border-black/10 pt-6 mb-6">
              <p className="text-sm text-text-muted mb-1">Total</p>
              <p className="text-3xl font-semibold tracking-[-0.03em]">
                ${total.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-2">
                or from $145.79/mo. for 24 months
              </p>
            </div>

            {/* 7. Add to Bag */}
            <button
              onClick={handleAddToBag}
              className="w-full bg-[#0071e3] text-white rounded-full py-4 text-base font-medium hover:bg-[#0077ED] transition-colors"
            >
              Add to Bag
            </button>

          </div>
        </div>
      </div>
    </main>
  )
}
