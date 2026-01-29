"use client"

import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    About: [
      { label: "About Us", href: "#" },
      { label: "Mission & Vision", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Achievements", href: "#" },
    ],
    Academics: [
      { label: "Curriculum", href: "#" },
      { label: "Faculty", href: "#" },
      { label: "Programs", href: "#" },
      { label: "Admissions", href: "#" },
    ],
    Resources: [
      { label: "Student Portal", href: "#" },
      { label: "Parent Portal", href: "#" },
      { label: "Downloads", href: "#" },
      { label: "Events Calendar", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Code of Conduct", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, url: "#", label: "Facebook" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Instagram, url: "#", label: "Instagram" },
    { icon: Linkedin, url: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-playfair font-bold mb-4">St Pius School</h3>
            <p className="text-white/80 mb-6">Excellence in Education, Character Building, and Holistic Development</p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center text-white/80 text-sm">
          <p className="flex items-center gap-2 mb-4 md:mb-0">
            Made with <Heart size={16} className="text-accent" /> for quality education
          </p>
          <p>&copy; {currentYear} St Pius School Mulund. All rights reserved.</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-accent text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40 hidden md:flex items-center justify-center"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}
