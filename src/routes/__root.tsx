import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navigation from '@/components/sections/navigation'
import Footer from '@/components/sections/footer'

export const Route = createRootRoute({
    component: () => (
        <>
            <Navigation />
            <section className="pt-16">
                <Outlet />
            </section>
            <Footer />
        </>
    ),
})
