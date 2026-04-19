export type StorageOption = {
  id: string;
  label: string;
  price: number;
};

export type BandColor = {
  id: string;
  label: string;
  hex: string;
};

export type LightSealSize = {
  id: string;
  label: string;
};

export type AppleCareOption = {
  id: string;
  label: string;
  price: number;
  description: string;
};

export const STORAGE_OPTIONS: StorageOption[] = [
  { id: '256gb', label: '256GB', price: 3499 },
  { id: '512gb', label: '512GB', price: 3699 },
  { id: '1tb',   label: '1TB',   price: 3899 },
];

export const BAND_COLORS: BandColor[] = [
  { id: 'black', label: 'Solo Knit Band - Black',      hex: '#1d1d1f' },
  { id: 'white', label: 'Solo Knit Band - White',      hex: '#f5f5f7' },
  { id: 'gray',  label: 'Solo Knit Band - Storm Gray', hex: '#86868b' },
  { id: 'blue',  label: 'Solo Knit Band - Blue',       hex: '#0071e3' },
];

export const LIGHT_SEAL_SIZES: LightSealSize[] = [
  { id: 'small',  label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large',  label: 'Large' },
];

export const APPLECARE_OPTIONS: AppleCareOption[] = [
  {
    id: 'none',
    label: 'No coverage',
    price: 0,
    description: 'Standard 1-year limited warranty',
  },
  {
    id: 'plus',
    label: 'AppleCare+ for Apple Vision Pro',
    price: 499,
    description: '2 years of coverage, unlimited incidents of accidental damage',
  },
];
