export type AppleStoreLocation = {
  id: string
  name: string
  address: string
  city: string
}

export const APPLE_STORES: AppleStoreLocation[] = [
  { id: 'cupertino',     name: 'Apple Park Visitor Center', address: '10600 N Tantau Ave',  city: 'Cupertino, CA' },
  { id: 'union-square',  name: 'Apple Union Square',        address: '300 Post St',          city: 'San Francisco, CA' },
  { id: 'fifth-avenue',  name: 'Apple Fifth Avenue',        address: '767 5th Ave',          city: 'New York, NY' },
  { id: 'regent-street', name: 'Apple Regent Street',       address: '235 Regent St',        city: 'London, UK' },
  { id: 'omotesando',    name: 'Apple Omotesando',          address: '4-2-13 Jingumae',      city: 'Tokyo, Japan' },
  { id: 'bkc',           name: 'Apple BKC',                 address: 'Jio World Drive, BKC', city: 'Mumbai, India' },
]

export type TimeSlot = {
  id: string
  label: string
  period: 'morning' | 'afternoon' | 'evening'
}

export const TIME_SLOTS: TimeSlot[] = [
  { id: '10-00', label: '10:00 AM', period: 'morning' },
  { id: '11-00', label: '11:00 AM', period: 'morning' },
  { id: '12-00', label: '12:00 PM', period: 'afternoon' },
  { id: '13-30', label: '1:30 PM',  period: 'afternoon' },
  { id: '15-00', label: '3:00 PM',  period: 'afternoon' },
  { id: '16-30', label: '4:30 PM',  period: 'afternoon' },
  { id: '18-00', label: '6:00 PM',  period: 'evening' },
  { id: '19-00', label: '7:00 PM',  period: 'evening' },
]
