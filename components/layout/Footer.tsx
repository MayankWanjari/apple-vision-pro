export default function Footer() {
  return (
    <footer className="bg-bg-light text-text-dark px-[clamp(24px,5vw,80px)] pt-8 pb-12">
      <div className="max-w-container mx-auto">

        {/* Fine print */}
        <div className="border-b border-black/10 pb-8 mb-8">
          <p className="text-[12px] text-text-muted leading-relaxed">
            1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit.
          </p>
          <p className="text-[12px] text-text-muted leading-relaxed mt-2">
            2. Apple Vision Pro is available online and in select Apple Store locations. Demos available by appointment.
          </p>
        </div>

        {/* 4-column link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">Shop and Learn</h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Store', href: 'https://www.apple.com/store' },
                { name: 'Mac', href: 'https://www.apple.com/mac/' },
                { name: 'iPad', href: 'https://www.apple.com/ipad/' },
                { name: 'iPhone', href: 'https://www.apple.com/iphone/' },
                { name: 'Vision Pro', href: 'https://www.apple.com/apple-vision-pro/' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">Services</h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Apple Music', href: 'https://www.apple.com/apple-music/' },
                { name: 'Apple TV+', href: 'https://www.apple.com/apple-tv-plus/' },
                { name: 'iCloud', href: 'https://www.apple.com/icloud/' },
                { name: 'Apple Arcade', href: 'https://www.apple.com/apple-arcade/' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">About Apple</h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Newsroom', href: 'https://www.apple.com/newsroom/' },
                { name: 'Apple Leadership', href: 'https://www.apple.com/leadership/' },
                { name: 'Careers', href: 'https://www.apple.com/careers/us/' },
                { name: 'Contact Apple', href: 'https://www.apple.com/contact/' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">For Business</h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Apple and Business', href: 'https://www.apple.com/business/' },
                { name: 'Shop for Business', href: 'https://www.apple.com/retail/business/' },
                { name: 'Apple Vision Pro for Business', href: 'https://www.apple.com/business/vision-pro/' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-text-muted">
          <div>Copyright © 2026 Apple Inc. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Privacy Policy', href: 'https://www.apple.com/legal/privacy/' },
              { name: 'Terms of Use', href: 'https://www.apple.com/legal/internet-services/terms/site.html' },
              { name: 'Sales and Refunds', href: 'https://www.apple.com/shop/help/returns_refund' },
              { name: 'Legal', href: 'https://www.apple.com/legal/' },
              { name: 'Site Map', href: 'https://www.apple.com/sitemap/' }
            ].map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-text-dark transition-colors">{item.name}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
