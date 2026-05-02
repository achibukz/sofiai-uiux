import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import GIAStory from '@/components/landing/GIAStory'
import NoJargon from '@/components/landing/NoJargon'
import WhatGIAShows from '@/components/landing/WhatGIAShows'
import Positioning from '@/components/landing/Positioning'
import Pricing from '@/components/landing/Pricing'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <GIAStory />
      <NoJargon />
      <WhatGIAShows />
      <Positioning />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  )
}
