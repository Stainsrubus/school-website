
import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = scrollYRef.current * 0.5
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-5"
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/st_pius/school.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <div className="scale-in">

          {/* ── Marathi School Name ── */}
          <p className="text-xl md:text-2xl font-bold text-blue-100 mb-1 tracking-wide">
            मुलुंड येथील सेंट पायस द टेन्थ हायस्कूल
          </p>

          {/* ── Registration & Index Numbers ── */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-5 text-sm text-white/70">
            <span>Udise Number : 27230400358</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span>Index Number : 33.06.061</span>
          </div>

          {/* ── Main English Heading ── */}
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 leading-tight">
            Excellence in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-200">
              Education
            </span>
          </h1>

          {/* ── English Subheading ── */}
          <p className="text-xl md:text-2xl mb-4 font-light max-w-2xl mx-auto text-gray-100">
            Join St. Pius X School for world-class education, holistic development, and character building
          </p>

          {/* ── Marathi Affiliation Line ── */}
          <p className="text-sm md:text-base text-blue-100/80 max-w-2xl mx-auto mb-2 leading-relaxed">
            मुलुंड येथील सेंट पायस द टेन्थ हायस्कूल महाराष्ट्र बोर्डाच्या एसएससी बोर्ड अभ्यासक्रमाशी संलग्न आहे. मुलांसाठी शाळा.
          </p>

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold hover-lift shadow-lg">
            <a href="/#contact">Apply for Admission</a>
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold hover:bg-white/20 transition-colors">
            <a href="/about">Learn More</a>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>

      {/* Wave divider */}
      <div className="absolute rotate-180 bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24 lg:h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  )
}