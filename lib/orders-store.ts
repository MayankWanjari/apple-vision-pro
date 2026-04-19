import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OrderStatus = 'delivered' | 'shipped' | 'processing' | 'cancelled'

export type OrderItem = {
  name: string
  config: string[]
  unitPrice: number
  quantity: number
  image: string
}

export type Order = {
  id: string
  orderDate: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  estimatedDelivery?: string
  deliveredDate?: string
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zip: string
  }
  paymentLast4: string
  trackingNumber?: string
}

const SEED_ORDERS: Order[] = [
  {
    id: 'VP-D8K9M2NP',
    orderDate: '2026-02-15',
    status: 'delivered',
    deliveredDate: '2026-02-19',
    items: [
      {
        name: 'Apple Vision Pro',
        config: ['512GB', 'Solo Knit Band - Black', 'Medium size', 'AppleCare+'],
        unitPrice: 4198,
        quantity: 1,
        image: '/assets/hero-poster.jpg',
      },
    ],
    subtotal: 4198,
    shipping: 0,
    tax: 357,
    total: 4555,
    shippingAddress: {
      name: 'John Appleseed',
      street: '1 Apple Park Way',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    },
    paymentLast4: '4242',
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'VP-A3F7Q1LM',
    orderDate: '2026-04-10',
    status: 'shipped',
    estimatedDelivery: '2026-04-22',
    items: [
      {
        name: 'Apple Vision Pro',
        config: ['256GB', 'Solo Knit Band - Storm Gray', 'Large size'],
        unitPrice: 3499,
        quantity: 1,
        image: '/assets/hero-poster.jpg',
      },
    ],
    subtotal: 3499,
    shipping: 0,
    tax: 297,
    total: 3796,
    shippingAddress: {
      name: 'John Appleseed',
      street: '1 Apple Park Way',
      city: 'Cupertino',
      state: 'CA',
      zip: '95014',
    },
    paymentLast4: '4242',
    trackingNumber: '1Z999AA10987654321',
  },
]

type OrdersState = {
  orders: Order[]
  getOrder: (id: string) => Order | undefined
  addOrder: (order: Order) => void
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: SEED_ORDERS,
      getOrder: (id) => get().orders.find((o) => o.id === id),
      addOrder: (order) =>
        set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: 'vision-pro-orders' }
  )
)
