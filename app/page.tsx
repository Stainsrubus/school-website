"use client"

import { Suspense } from "react"
import Navigation from "@/components/sections/navigation"
import HeroSection from "@/components/sections/hero-section"
import AdmissionSection from "@/components/sections/admission-section"
import GallerySection from "@/components/sections/gallery-section"
import FeaturesSection from "@/components/sections/features-section"
import CarouselSection from "@/components/sections/carousel-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/sections/footer"
import AboutPage from "@/components/sections/about"
import Testimonials from "@/components/sections/testimonials"

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navigation />
      <Suspense fallback={<div className="h-screen bg-background" />}>
        <HeroSection />
      </Suspense>
      <AboutPage />
      <AdmissionSection />
      <FeaturesSection />
      <Testimonials />
      {/* <GallerySection /> */}
      {/* <CarouselSection /> */}
      <ContactSection />
      <Footer />
    </main>
  )
}
