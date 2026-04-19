import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apple Vision Pro — Technical Specifications',
  description: 'Every detail considered. Display, chips, sensors, audio, and more.',
};

export default function TechSpecsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
