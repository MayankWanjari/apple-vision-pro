import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a demo — Apple Vision Pro',
  description: 'See spatial computing in person. Schedule a personalized demo at your nearest Apple Store.',
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
