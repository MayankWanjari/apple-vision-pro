'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send to error tracking (Sentry etc.)
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-light flex items-center
         justify-center px-6">
      <div className="text-center max-w-xl">
        <div className="text-xs tracking-[0.3em] uppercase text-text-muted
             font-medium mb-6">
          Something went wrong
        </div>

        <h1 className="text-[clamp(40px,5vw,64px)] font-semibold
            tracking-[-0.03em] text-text-dark">
          Unexpected error.
        </h1>

        <p className="text-text-muted text-lg mt-4">
          Don&apos;t worry — it&apos;s not you, it&apos;s us. Try refreshing, or
          head back home.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mt-10">
          <button
            onClick={reset}
            className="bg-text-dark text-white rounded-full px-8 py-3.5
                       font-medium hover:bg-black transition-colors
                       focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 outline-none"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-black/20 text-text-dark rounded-full
                       px-8 py-3.5 font-medium hover:border-black/40
                       transition-colors
                       focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 outline-none"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
