import { createFileRoute } from '@tanstack/react-router'
import ContactSection from '@/components/sections/contact-section'

export const Route = createFileRoute('/contact')({
    component: Contact,
})

function Contact() {
    return (
        <>
            <ContactSection />
        </>
    )
}
