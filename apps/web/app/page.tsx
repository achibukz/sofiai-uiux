import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import WhatGIAShows from '@/components/landing/WhatGIAShows'
import Positioning from '@/components/landing/Positioning'
import FinalCTA from '@/components/landing/FinalCTA'

export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <WhatGIAShows />
      <Positioning />
      <FinalCTA />
    </>
  )
}
