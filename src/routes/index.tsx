import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import HeroSection from '@/components/sections/hero-section'
import AdmissionSection from '@/components/sections/admission-section'
import FeaturesSection from '@/components/sections/features-section'
import AboutPage from '@/components/sections/about'
import Testimonials from '@/components/sections/testimonials'
import ContactSection from '@/components/sections/contact-section'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <main className="w-full overflow-x-hidden">
            <Suspense fallback={<div className="h-screen bg-background" />}>
                <HeroSection />
            </Suspense>
            <AboutPage />
            <AdmissionSection />
            <FeaturesSection />
            <Testimonials />
            <div id="form">
                <ContactSection />
            </div>
        </main>
    )
}
