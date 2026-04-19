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
              {['Store', 'Mac', 'iPad', 'iPhone', 'Vision Pro'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">Services</h4>
            <ul className="flex flex-col gap-2">
              {['Apple Music', 'Apple TV+', 'iCloud', 'Apple Arcade'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">About Apple</h4>
            <ul className="flex flex-col gap-2">
              {['Newsroom', 'Apple Leadership', 'Careers', 'Contact Apple'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-dark mb-3">For Business</h4>
            <ul className="flex flex-col gap-2">
              {['Apple and Business', 'Shop for Business', 'Apple Vision Pro for Business'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-text-muted">
          <div>Copyright © 2026 Apple Inc. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            {['Privacy Policy', 'Terms of Use', 'Sales and Refunds', 'Legal', 'Site Map'].map((item) => (
              <a key={item} href="#" className="hover:text-text-dark transition-colors">{item}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
