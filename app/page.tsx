import Hero from '@/components/sections/Hero'
import Statement from '@/components/sections/Statement'
import Features from '@/components/sections/Features'
import Close from '@/components/sections/Close'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div id="statement"><Statement /></div>
      <div id="features"><Features /></div>
      <div id="close"><Close /></div>
    </main>
  )
}
