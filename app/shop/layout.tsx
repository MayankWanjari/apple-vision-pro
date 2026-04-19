import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Apple Vision Pro — Apple',
  description: 'Configure your Apple Vision Pro. Choose storage, bands, and more. From $3,499.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
