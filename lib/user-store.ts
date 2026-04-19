import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  memberSince: string
}

export type Address = {
  id: string
  label: string
  isDefault: boolean
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export type Preferences = {
  newsletter: boolean
  productUpdates: boolean
  orderNotifications: boolean
}

type UserState = {
  user: User
  addresses: Address[]
  preferences: Preferences
  updateUser: (partial: Partial<User>) => void
  updatePreferences: (partial: Partial<Preferences>) => void
  addAddress: (addr: Omit<Address, 'id'>) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

const DEFAULT_USER: User = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Appleseed',
  email: 'john.appleseed@icloud.com',
  phone: '+1 (408) 996-1010',
  avatar: 'JA',
  memberSince: 'March 2024',
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    isDefault: true,
    firstName: 'John',
    lastName: 'Appleseed',
    street: '1 Apple Park Way',
    city: 'Cupertino',
    state: 'CA',
    zip: '95014',
    country: 'United States',
  },
]

const DEFAULT_PREFERENCES: Preferences = {
  newsletter: true,
  productUpdates: true,
  orderNotifications: true,
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      addresses: DEFAULT_ADDRESSES,
      preferences: DEFAULT_PREFERENCES,
      updateUser: (partial) =>
        set((s) => ({ user: { ...s.user, ...partial } })),
      updatePreferences: (partial) =>
        set((s) => ({ preferences: { ...s.preferences, ...partial } })),
      addAddress: (addr) =>
        set((s) => ({
          addresses: [...s.addresses, { ...addr, id: `addr-${Date.now()}` }],
        })),
      removeAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.filter((a) => a.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
    }),
    { name: 'vision-pro-user' }
  )
)
