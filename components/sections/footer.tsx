
import { useState } from "react"
import { Facebook, Twitter, Instagram, Linkedin, Heart, ArrowUp, Mail } from "lucide-react"
import { Link } from "@tanstack/react-router"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")

  const footerColumns = [
    {
      title: "About School",
      links: [
        { label: "Overview", href: "/about#overview" },
        { label: "Vision & Mission", href: "/about#vision-mission" },
        { label: "Principal's Message", href: "/about#principal-message" },
        { label: "Leadership", href: "/about#leadership" },
        { label: "Facilities & Campus", href: "/about#facilities" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Gallery", href: "/gallery" },
        { label: "Events & Calendar", href: "/events" },
        { label: "Contact Us", href: "/contact" },
        { label: "Parent Portal", href: "/parent-portal" },
        { label: "Student Portal", href: "/student-portal" },
      ],
    },
  ]

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="relative  bg-gradient-to-r from-yellow-100 to-blue-100  text-gray-300 overflow-hidden">
      {/* Subtle top wave for smooth transition */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24 fill-white rotate-180 translate-y-1"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,80C160,96,320,128,480,117.3C640,107,800,53,960,48C1120,43,1280,85,1360,106.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand + Socials */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Link to="/" className="flex items-center gap-4">
                <img
                  src="/st_pius/LOGO-St-pius.png"
                  alt="St. Pius X Logo"
                  className="h-16 w-auto"
                />
                <span className="text-3xl font-bold text-indigo-950 tracking-tight">St. Pius X High School</span>
              </Link>
              <p className="mt-5 text-gray-700 leading-relaxed text-lg">
                Excellence in Education • Character Building • Holistic Development since 1975
              </p>
            </div>

            <div className="space-y-5">
              <h4 className="text-xl font-semibold text-indigo-900">Stay Connected</h4>
              <div className="flex gap-5">
                {socials.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      className="p-3.5 bg-white/80 rounded-full shadow-sm hover:shadow-md hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300 text-gray-700"
                    >
                      <Icon size={22} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-6">
              <h4 className="text-xl font-semibold text-indigo-900">{column.title}</h4>
              <ul className="space-y-4 text-base">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-gray-700 hover:text-indigo-700 transition-colors hover:translate-x-1.5 inline-block duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-10 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">

          <p>© {currentYear} <span className="text-black"> St. Pius X High School, Mulund.</span> All rights reserved.</p>
          <p className=" flex items-center gap-2 mb-4 md:mb-0">
            Powered by
            <a className="underline text-black" href="https://creoleap.com">Creoleap Technologies Private Limited</a>
          </p>
        </div>
      </div>
      {/* Refined Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-sky-600 to-cyan-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Back to top"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  )
}