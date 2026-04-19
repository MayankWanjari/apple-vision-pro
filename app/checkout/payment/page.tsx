'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCheckout, type PaymentData } from '@/lib/checkout-store'

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Enter a 16-digit card number'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY format'),
  cvc: z.string().regex(/^\d{3,4}$/, '3 or 4 digits'),
  billingAddressSame: z.boolean(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

type InputProps = {
  label: string
  error?: string
  className?: string
  rightSlot?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ label, error, className = '', rightSlot, ...props }: InputProps) {
  return (
    <div className={className}>
      <label className="text-sm text-text-muted mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          {...props}
          className={[
            'w-full bg-white border rounded-xl px-4 py-3.5 text-base',
            'focus:outline-none focus:ring-2 focus:ring-text-dark/10 transition-colors',
            'placeholder:text-text-muted',
            rightSlot ? 'pr-24' : '',
            error
              ? 'border-[#e30000] focus:border-[#e30000]'
              : 'border-black/15 focus:border-text-dark',
          ].join(' ')}
        />
        {rightSlot && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {rightSlot}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-[#e30000] mt-1.5">{error}</p>}
    </div>
  )
}

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) {
    return digits.slice(0, 2) + '/' + digits.slice(2)
  }
  return digits
}

function CardBrandHints() {
  return (
    <div className="flex gap-1 text-[10px] text-text-muted font-medium">
      <span className="border border-black/10 rounded px-1 py-0.5">VISA</span>
      <span className="border border-black/10 rounded px-1 py-0.5">MC</span>
      <span className="border border-black/10 rounded px-1 py-0.5">AMEX</span>
    </div>
  )
}

export default function PaymentPage() {
  const router = useRouter()
  const { shipping, payment, setPayment } = useCheckout()

  useEffect(() => {
    if (!shipping) {
      router.push('/checkout')
    }
  }, [shipping, router])

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: payment ?? {
      cardNumber: '',
      cardholderName: '',
      expiry: '',
      cvc: '',
      billingAddressSame: true,
    },
  })

  const billingAddressSame = watch('billingAddressSame')

  const onSubmit = (data: PaymentFormData) => {
    setPayment(data as PaymentData)
    router.push('/checkout/review')
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Payment</h1>
      <p className="text-text-muted mb-8">All transactions are encrypted and secure.</p>

      {/* Payment method tabs */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          className="px-5 py-2.5 rounded-full text-sm font-medium bg-text-dark text-white"
        >
          Credit Card
        </button>
        <button
          type="button"
          disabled
          className="px-5 py-2.5 rounded-full text-sm font-medium bg-black/5 text-text-muted cursor-not-allowed"
        >
          Apple Pay
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                inputMode="numeric"
                autoComplete="cc-number"
                error={errors.cardNumber?.message}
                rightSlot={<CardBrandHints />}
                value={field.value}
                onChange={(e) => {
                  field.onChange(formatCardNumber(e.target.value))
                }}
              />
            )}
          />

          <Input
            label="Cardholder Name"
            placeholder="John Appleseed"
            autoComplete="cc-name"
            error={errors.cardholderName?.message}
            {...register('cardholderName')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="expiry"
              control={control}
              render={({ field }) => (
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  maxLength={5}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  error={errors.expiry?.message}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(formatExpiry(e.target.value))
                  }}
                />
              )}
            />
            <Input
              label="CVC"
              placeholder="123"
              maxLength={4}
              inputMode="numeric"
              autoComplete="cc-csc"
              error={errors.cvc?.message}
              {...register('cvc')}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-black/20 accent-text-dark"
              {...register('billingAddressSame')}
            />
            <span className="text-sm">Billing address same as shipping</span>
          </label>

          {!billingAddressSame && (
            <p className="text-sm text-text-muted bg-black/5 rounded-xl px-4 py-3">
              Separate billing address fields would appear here.
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="text-sm text-text-muted hover:text-text-dark transition-colors"
          >
            ← Back to Shipping
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-text-dark text-white rounded-full px-8 py-3.5 font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Review Order
          </button>
        </div>
      </form>
    </div>
  )
}
