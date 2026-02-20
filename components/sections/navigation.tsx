
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link } from "@tanstack/react-router"
import TopBar from "./topbar"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)

  const aboutSubmenu = [
    { label: "Overview", href: "/about#overview" },
    { label: "Vision & Mission", href: "/about#vision-mission" },
    { label: "Principal's Message", href: "/about#principal-message" },
    { label: "Core Values", href: "/about#core-values" },
    { label: "Leadership Team", href: "/about#leadership" },
    { label: "Facilities", href: "/about#facilities" },
    { label: "History & Milestones", href: "/about#history-milestones" },
  ]

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about", hasSubmenu: true },
    { label: "Admissions", to: "https://creativesaints.com/st-pius-x-high-school/login", isExternal: true, },
    { label: "Academics", to: "/" },
    { label: "Facilities", to: "/" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/st_pius/LOGO-St-pius.png" className="h-20" alt="St. Pius X Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.hasSubmenu ? (
                    <>
                      <button
                        className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-1"
                        onMouseEnter={() => setAboutDropdownOpen(true)}
                        onMouseLeave={() => setAboutDropdownOpen(false)}
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 transition-all duration-200 ${aboutDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                          }`}
                        onMouseEnter={() => setAboutDropdownOpen(true)}
                        onMouseLeave={() => setAboutDropdownOpen(false)}
                      >
                        {aboutSubmenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href as any}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.to as any}
                      {...(item.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg transition-shadow font-semibold">
              <Link to="/contact">
                Apply Now
              </Link>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 flex items-center justify-between"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mobile Submenu */}
                      {aboutDropdownOpen && (
                        <div className="pl-4 mt-1 space-y-1">
                          {aboutSubmenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href as any}
                              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.to as any}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <button className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg transition-shadow font-semibold">
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}