import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ShippingData = {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}

export type PaymentData = {
  cardNumber: string
  cardholderName: string
  expiry: string
  cvc: string
  billingAddressSame: boolean
}

export type CheckoutState = {
  shipping: ShippingData | null
  payment: PaymentData | null
  setShipping: (data: ShippingData) => void
  setPayment: (data: PaymentData) => void
  clearCheckout: () => void
}

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      shipping: null,
      payment: null,
      setShipping: (data) => set({ shipping: data }),
      setPayment: (data) => set({ payment: data }),
      clearCheckout: () => set({ shipping: null, payment: null }),
    }),
    {
      name: 'vision-pro-checkout',
    }
  )
)
