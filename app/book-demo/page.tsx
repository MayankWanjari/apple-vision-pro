'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/style.css'
import { gsap } from '@/lib/gsap'
import { APPLE_STORES, TIME_SLOTS, type TimeSlot } from '@/lib/demo-booking-data'

const bookingSchema = z.object({
  location: z.string().min(1, 'Please select a store'),
  date: z.date('Please pick a date'),
  timeSlot: z.string().min(1, 'Please pick a time'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{10,}$/, 'Enter a valid phone'),
  purpose: z.enum(['personal', 'business', 'developer', 'other']),
  notes: z.string().max(500).optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

function splitWords(text: string) {
  return text.split(' ').map((word, i, arr) => (
    <span
      key={i}
      className="word inline-block"
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {word}{i < arr.length - 1 ? '\u00A0' : ''}
    </span>
  ))
}

const PURPOSES = [
  { value: 'personal'  as const, icon: '👤', label: 'Personal Use',  desc: 'Exploring for home, entertainment' },
  { value: 'business'  as const, icon: '💼', label: 'Business',       desc: 'Evaluating for my company' },
  { value: 'developer' as const, icon: '⚙️', label: 'Development',    desc: 'Building apps or experiences' },
  { value: 'other'     as const, icon: '✨', label: 'Just Curious',   desc: "Want to see what it's about" },
]

const PERIODS: Array<{ label: string; value: TimeSlot['period'] }> = [
  { label: 'Morning',   value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Evening',   value: 'evening' },
]

function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return 'VPD-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function BookDemoPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const checkRef    = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted]       = useState(false)
  const [confirmationId, setConfirmationId] = useState('')

  const { tomorrow, sixtyDaysOut } = useMemo(() => {
    const t = new Date()
    t.setDate(t.getDate() + 1)
    t.setHours(0, 0, 0, 0)
    const s = new Date()
    s.setDate(s.getDate() + 60)
    s.setHours(23, 59, 59, 999)
    return { tomorrow: t, sixtyDaysOut: s }
  }, [])

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      location: '',
      timeSlot: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      purpose: 'personal',
      notes: '',
    },
  })

  const loc       = watch('location')
  const date      = watch('date')
  const timeSlot  = watch('timeSlot')
  const firstName = watch('firstName')
  const lastName  = watch('lastName')
  const notes     = watch('notes') ?? ''
  const purpose   = watch('purpose')
  const email     = watch('email')

  const selectedStore = APPLE_STORES.find(s => s.id === loc)
  const selectedSlot  = TIME_SLOTS.find(s => s.id === timeSlot)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll('.word')
    gsap.from(words, {
      opacity: 0, y: 40, scale: 0.92, filter: 'blur(8px)',
      stagger: 0.08, duration: 0.9, ease: 'power3.out',
    })
  }, [])

  useEffect(() => {
    if (!submitted || !checkRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(checkRef.current, { scale: 0, duration: 0.6, ease: 'back.out(1.7)' })
  }, [submitted])

  const onSubmit = async (data: BookingFormData) => {
    await new Promise(r => setTimeout(r, 1000))
    const id = generateId()
    setConfirmationId(id)
    try {
      sessionStorage.setItem('vp-demo-booking', JSON.stringify({
        ...data, date: data.date.toISOString(), confirmationId: id,
      }))
    } catch {}
    setSubmitted(true)
  }

  // ── SUCCESS STATE ────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="bg-bg-dark min-h-screen relative -mt-12">
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0071e3]/15 to-transparent blur-[150px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-32">
          <div className="max-w-xl mx-auto py-16 text-center">

            <div
              ref={checkRef}
              className="w-20 h-20 rounded-full bg-[#0071e3] flex items-center justify-center mx-auto"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>

            <h1 className="text-3xl font-semibold text-white mt-8">Your demo is booked.</h1>
            <p className="text-white/70 mt-3">We'll send a confirmation to {email} shortly.</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8 text-left">
              <div className="flex items-start gap-3 py-3 border-b border-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 mt-0.5 shrink-0">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">Confirmation</div>
                  <div className="text-sm text-[#0071e3] font-mono mt-0.5">{confirmationId}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3 border-b border-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">Store</div>
                  <div className="text-sm text-white mt-0.5">{selectedStore?.name} — {selectedStore?.city}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3 border-b border-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 mt-0.5 shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">Date</div>
                  <div className="text-sm text-white mt-0.5">{date ? format(date, 'EEEE, MMMM d, yyyy') : ''}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
                </svg>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">Time</div>
                  <div className="text-sm text-white mt-0.5">{selectedSlot?.label}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-8">
              <Link
                href="/"
                className="px-6 py-3 rounded-full border border-white/30 text-white text-sm hover:bg-white/5 transition"
              >
                Return home
              </Link>
              <Link
                href="/visionos"
                className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
              >
                Explore visionOS
              </Link>
            </div>

          </div>
        </div>
      </div>
    )
  }

  // ── MAIN FORM ─────────────────────────────────────────────────────────────

  return (
    <div className="bg-bg-dark min-h-screen relative -mt-12">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0071e3]/15 to-transparent blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-32">

        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 font-medium mb-6">BOOK A DEMO</p>
          <h1
            ref={headlineRef}
            className="text-[clamp(40px,5vw,64px)] font-semibold tracking-[-0.03em] text-white leading-[1.1]"
          >
            {splitWords('See spatial computing in person.')}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mt-5">
            Experience Apple Vision Pro with a personalized demo at your nearest Apple Store.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">

          {/* ── LEFT: FORM ─────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* SECTION 1: Location */}
            <section className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                Choose a store
              </h2>
              <div className="relative">
                <select
                  {...register('location')}
                  className={[
                    'w-full bg-white/5 border rounded-xl px-4 py-4 text-white appearance-none focus:outline-none transition',
                    errors.location ? 'border-[#ff4d4d]' : 'border-white/15 focus:border-white/40',
                  ].join(' ')}
                >
                  <option value="" disabled className="bg-neutral-900 text-white/60">
                    Select an Apple Store…
                  </option>
                  {APPLE_STORES.map(store => (
                    <option key={store.id} value={store.id} className="bg-neutral-900 text-white">
                      {store.name} — {store.city}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
              </div>
              {errors.location && (
                <p className="text-xs text-[#ff4d4d] mt-1.5">{errors.location.message}</p>
              )}
            </section>

            {/* SECTION 2: Date */}
            <section className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                Pick a date
              </h2>

              {/* Dark-theme overrides for react-day-picker v9 (scoped to .vp-rdp) */}
              <style>{`
                .vp-rdp .rdp-month_caption{display:flex;justify-content:space-between;align-items:center;padding:0 4px;margin-bottom:12px}
                .vp-rdp .rdp-caption_label{font-size:14px;font-weight:500;color:white}
                .vp-rdp .rdp-nav{display:flex;gap:4px}
                .vp-rdp .rdp-button_previous,.vp-rdp .rdp-button_next{width:32px;height:32px;border-radius:50%;color:white;transition:background-color .15s;display:flex;align-items:center;justify-content:center}
                .vp-rdp .rdp-button_previous:hover,.vp-rdp .rdp-button_next:hover{background-color:rgba(255,255,255,.1)}
                .vp-rdp .rdp-chevron{fill:currentColor}
                .vp-rdp .rdp-weekdays{display:flex}
                .vp-rdp .rdp-weekday{width:40px;height:32px;font-size:12px;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-weight:normal}
                .vp-rdp .rdp-week{display:flex}
                .vp-rdp .rdp-day{width:40px;height:40px;text-align:center;padding:0}
                .vp-rdp .rdp-day_button{width:40px;height:40px;border-radius:50%;color:white;font-size:14px;transition:background-color .15s;display:flex;align-items:center;justify-content:center}
                .vp-rdp .rdp-day_button:hover:not(:disabled){background-color:rgba(255,255,255,.1)}
                .vp-rdp .rdp-selected .rdp-day_button{background-color:#0071e3!important;color:white!important}
                .vp-rdp .rdp-selected .rdp-day_button:hover{background-color:#0077ed!important}
                .vp-rdp .rdp-today:not(.rdp-selected) .rdp-day_button{color:#0071e3;font-weight:bold}
                .vp-rdp .rdp-disabled .rdp-day_button{opacity:.2!important;cursor:not-allowed;pointer-events:none}
                .vp-rdp .rdp-outside .rdp-day_button{opacity:.3}
              `}</style>

              <div className="vp-rdp bg-white/5 border border-white/15 rounded-2xl p-5 inline-block">
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DayPicker
                      mode="single"
                      selected={field.value}
                      onSelect={(d) => {
                        field.onChange(d)
                        setValue('timeSlot', '', { shouldValidate: false })
                      }}
                      disabled={[{ before: tomorrow }, { after: sixtyDaysOut }]}
                    />
                  )}
                />
              </div>
              {errors.date && (
                <p className="text-xs text-[#ff4d4d] mt-2">{errors.date.message}</p>
              )}
            </section>

            {/* SECTION 3: Time Slot (only when a date is selected) */}
            {date && (
              <section className="mb-12">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                  Select a time
                </h2>
                {PERIODS.map(period => {
                  const slots = TIME_SLOTS.filter(s => s.period === period.value)
                  return (
                    <div key={period.value} className="mb-5">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{period.label}</p>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {slots.map(slot => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setValue('timeSlot', slot.id, { shouldValidate: true })}
                            className={[
                              'px-4 py-3 rounded-xl border text-sm transition',
                              timeSlot === slot.id
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 border-white/15 text-white hover:border-white/40',
                            ].join(' ')}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {errors.timeSlot && (
                  <p className="text-xs text-[#ff4d4d] mt-1">{errors.timeSlot.message}</p>
                )}
              </section>
            )}

            {/* SECTION 4: Your Details */}
            <section className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                Your details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/60 mb-1.5 block">First name</label>
                    <input
                      {...register('firstName')}
                      placeholder="Jane"
                      className={[
                        'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none transition',
                        errors.firstName ? 'border-[#ff4d4d]' : 'border-white/15 focus:border-white/40',
                      ].join(' ')}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-[#ff4d4d] mt-1.5">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-white/60 mb-1.5 block">Last name</label>
                    <input
                      {...register('lastName')}
                      placeholder="Appleseed"
                      className={[
                        'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none transition',
                        errors.lastName ? 'border-[#ff4d4d]' : 'border-white/15 focus:border-white/40',
                      ].join(' ')}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-[#ff4d4d] mt-1.5">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/60 mb-1.5 block">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="jane@example.com"
                    className={[
                      'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none transition',
                      errors.email ? 'border-[#ff4d4d]' : 'border-white/15 focus:border-white/40',
                    ].join(' ')}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#ff4d4d] mt-1.5">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-white/60 mb-1.5 block">Phone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className={[
                      'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none transition',
                      errors.phone ? 'border-[#ff4d4d]' : 'border-white/15 focus:border-white/40',
                    ].join(' ')}
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#ff4d4d] mt-1.5">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 5: Purpose */}
            <section className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                What brings you in?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {PURPOSES.map(({ value, icon, label, desc }) => (
                  <div
                    key={value}
                    onClick={() => setValue('purpose', value, { shouldValidate: true })}
                    className={[
                      'p-4 rounded-xl border cursor-pointer transition select-none',
                      purpose === value
                        ? 'bg-white/10 border-white'
                        : 'bg-white/5 border-white/15 hover:border-white/30',
                    ].join(' ')}
                  >
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-sm font-medium text-white">{label}</div>
                    <div className="text-xs text-white/50 mt-0.5">{desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: Notes */}
            <section className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                Anything we should know?{' '}
                <span className="font-normal normal-case tracking-normal">(optional)</span>
              </h2>
              <textarea
                {...register('notes')}
                rows={4}
                maxLength={500}
                placeholder="Any accessibility needs, questions, or special requests…"
                className={[
                  'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none transition resize-none',
                  errors.notes ? 'border-[#ff4d4d]' : 'border-white/15 focus:border-white/40',
                ].join(' ')}
              />
              <p className="text-xs text-white/40 mt-1 text-right">{notes.length} / 500</p>
            </section>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={[
                'w-full md:w-auto bg-white text-black rounded-full px-10 py-4 font-medium hover:bg-white/90 transition',
                isSubmitting ? 'opacity-60 cursor-not-allowed' : '',
              ].join(' ')}
            >
              {isSubmitting ? 'Booking…' : 'Confirm Booking'}
            </button>

          </form>

          {/* ── RIGHT: DEMO SUMMARY ──────────────────────────────────────── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-5">Your Demo</h3>

              <div>
                <div className="py-3 border-b border-white/10">
                  <div className="text-xs uppercase tracking-wider text-white/50">Store</div>
                  <div className={['text-sm mt-1', selectedStore ? 'text-white' : 'text-white/30'].join(' ')}>
                    {selectedStore ? selectedStore.name : 'Not selected'}
                  </div>
                </div>
                <div className="py-3 border-b border-white/10">
                  <div className="text-xs uppercase tracking-wider text-white/50">Date</div>
                  <div className={['text-sm mt-1', date ? 'text-white' : 'text-white/30'].join(' ')}>
                    {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Pick a date'}
                  </div>
                </div>
                <div className="py-3 border-b border-white/10">
                  <div className="text-xs uppercase tracking-wider text-white/50">Time</div>
                  <div className={['text-sm mt-1', selectedSlot ? 'text-white' : 'text-white/30'].join(' ')}>
                    {selectedSlot ? selectedSlot.label : 'Pick a time'}
                  </div>
                </div>
                <div className="py-3">
                  <div className="text-xs uppercase tracking-wider text-white/50">Name</div>
                  <div className={['text-sm mt-1', (firstName && lastName) ? 'text-white' : 'text-white/30'].join(' ')}>
                    {(firstName && lastName) ? `${firstName} ${lastName}` : '—'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/50 mt-6">Demos typically last 30 minutes.</p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
