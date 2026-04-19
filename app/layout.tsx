import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll'
import BackgroundTransitions from '@/components/providers/BackgroundTransitions'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vision-pro-site.vercel.app'),
  title: {
    template: '%s | Apple Vision Pro',
    default: 'Apple Vision Pro',
  },
  description: 'Welcome to the era of spatial computing.',
  openGraph: {
    title: 'Apple Vision Pro',
    description: 'Welcome to the era of spatial computing.',
    type: 'website',
    images: ['/assets/woman-with-headset.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-bg-light text-text-dark antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-text-dark focus:text-white focus:px-4 focus:py-2 focus:rounded outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
        <BackgroundTransitions />
        <CartDrawer />
      </body>
    </html>
  )
}
