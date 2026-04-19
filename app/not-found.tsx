'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           w-[800px] h-[800px] bg-gradient-to-br from-[#0071e3]/10
           via-[#a04aff]/5 to-transparent blur-[150px]
           pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl">
        <div className="text-xs tracking-[0.3em] uppercase text-white/60
             font-medium mb-6">
          Page not found
        </div>

        <h1 className="text-[clamp(72px,12vw,144px)] font-semibold
            tracking-[-0.04em] leading-none
            bg-gradient-to-b from-white to-white/40
            bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-[clamp(24px,3vw,40px)] font-semibold
            tracking-[-0.02em] text-white mt-6">
          Lost in spatial computing.
        </h2>

        <p className="text-white/60 text-lg mt-4 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist in this dimension.
          Let&apos;s get you back to familiar space.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mt-10">
          <Link
            href="/"
            className="bg-white text-black rounded-full px-8 py-3.5
                       font-medium hover:bg-white/90 transition-colors
                       focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark outline-none"
          >
            Return home
          </Link>
          <Link
            href="/shop"
            className="border border-white/30 text-white rounded-full
                       px-8 py-3.5 font-medium hover:border-white/60
                       hover:bg-white/5 transition-colors
                       focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark outline-none"
          >
            Explore Vision Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
