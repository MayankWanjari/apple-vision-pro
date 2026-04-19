import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'visionOS — A new dimension of apps',
  description: 'Designed for spatial computing. Built to reimagine how you work, play, and connect.',
};

export default function VisionOSLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
