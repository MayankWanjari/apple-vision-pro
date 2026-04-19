'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCheckout, type ShippingData } from '@/lib/checkout-store'

const shippingSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Enter a valid ZIP code'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{10,}$/, 'Enter a valid phone'),
})

type ShippingFormData = z.infer<typeof shippingSchema>

type InputProps = {
  label: string
  error?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className={className}>
      <label className="text-sm text-text-muted mb-1.5 block">{label}</label>
      <input
        {...props}
        className={[
          'w-full bg-white border rounded-xl px-4 py-3.5 text-base',
          'focus:outline-none focus:ring-2 focus:ring-text-dark/10 transition-colors',
          'placeholder:text-text-muted',
          error
            ? 'border-[#e30000] focus:border-[#e30000]'
            : 'border-black/15 focus:border-text-dark',
        ].join(' ')}
      />
      {error && <p className="text-xs text-[#e30000] mt-1.5">{error}</p>}
    </div>
  )
}

type SelectProps = {
  label: string
  error?: string
  className?: string
  children: React.ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>

function Select({ label, error, className = '', children, ...props }: SelectProps) {
  return (
    <div className={className}>
      <label className="text-sm text-text-muted mb-1.5 block">{label}</label>
      <select
        {...props}
        className={[
          'w-full bg-white border rounded-xl px-4 py-3.5 text-base appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-text-dark/10 transition-colors',
          error
            ? 'border-[#e30000] focus:border-[#e30000]'
            : 'border-black/15 focus:border-text-dark',
        ].join(' ')}
      >
        {children}
      </select>
      {error && <p className="text-xs text-[#e30000] mt-1.5">{error}</p>}
    </div>
  )
}

export default function ShippingPage() {
  const router = useRouter()
  const { shipping, setShipping } = useCheckout()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shipping ?? {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      phone: '',
    },
  })

  const onSubmit = (data: ShippingFormData) => {
    setShipping(data as ShippingData)
    router.push('/checkout/payment')
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Shipping Address</h1>
      <p className="text-text-muted mb-8">Where should we deliver your order?</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Last Name"
              placeholder="Appleseed"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <Select
            label="Country"
            autoComplete="country-name"
            error={errors.country?.message}
            {...register('country')}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </Select>

          <Input
            label="Address"
            placeholder="1 Apple Park Way"
            autoComplete="street-address"
            error={errors.address?.message}
            {...register('address')}
          />

          <Input
            label="Apartment, suite, etc. (optional)"
            placeholder="Apt 4B"
            autoComplete="address-line2"
            {...register('apartment')}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="Cupertino"
              autoComplete="address-level2"
              error={errors.city?.message}
              {...register('city')}
            />
            <Input
              label="State"
              placeholder="CA"
              autoComplete="address-level1"
              error={errors.state?.message}
              {...register('state')}
            />
            <Input
              label="ZIP Code"
              placeholder="95014"
              autoComplete="postal-code"
              error={errors.zip?.message}
              {...register('zip')}
            />
          </div>

          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (800) 275-2273"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            type="button"
            onClick={() => router.push('/shop')}
            className="text-sm text-text-muted hover:text-text-dark transition-colors"
          >
            ← Return to Bag
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-text-dark text-white rounded-full px-8 py-3.5 font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  )
}
