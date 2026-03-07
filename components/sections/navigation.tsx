
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link } from "@tanstack/react-router"
import TopBar from "./topbar"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)

  const aboutSubmenu = [
    { label: "Overview", to: "/about", hash: "overview" },
    { label: "Vision & Mission", to: "/about", hash: "vision-mission" },
    { label: "Principal's Message", to: "/about", hash: "principal-message" },
    { label: "Core Values", to: "/about", hash: "core-values" },
    { label: "Leadership Team", to: "/about", hash: "leadership" },
    { label: "Facilities", to: "/about", hash: "facilities" },
    { label: "History & Milestones", to: "/about", hash: "history-milestones" },
  ]

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about", hasSubmenu: true },
    { label: "Admissions", to: "https://creativesaints.com/st-pius-x-high-school/login", isExternal: true, },
    { label: "Academics", to: "/academics" },
    { label: "Facilities", to: "/facilities" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src="/st_pius/LOGO-St-pius.png" className="h-14 sm:h-20" alt="St. Pius X Logo" />
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
                        className="px-3 py-2 rounded-md text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-1"
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
                            to={subItem.to as any}
                            hash={subItem.hash}
                            onClick={(e) => {
                              if (window.location.pathname === '/about') {
                                setTimeout(() => {
                                  const el = document.getElementById(subItem.hash);
                                  if (el) {
                                    const y = el.getBoundingClientRect().top + window.scrollY - 180;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                  }
                                }, 100);
                              }
                            }}
                            className="block px-4 py-2 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
                      className="px-3 py-2 rounded-md text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
            <button className="px-4 lg:px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg transition-shadow font-semibold text-xs sm:text-sm lg:text-lg whitespace-nowrap">
              <Link to="/contact">
                Admissions Open for 2026-2027
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
                        className="w-full text-left px-3 py-2 rounded-md text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 flex items-center justify-between"
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
                              to={subItem.to as any}
                              hash={subItem.hash}
                              className="block px-3 py-2 rounded-md text-lg font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
                              onClick={(e) => {
                                setIsOpen(false);
                                if (window.location.pathname === '/about') {
                                  setTimeout(() => {
                                    const el = document.getElementById(subItem.hash);
                                    if (el) {
                                      const y = el.getBoundingClientRect().top + window.scrollY - 180;
                                      window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                  }, 100);
                                }
                              }}
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
                      className="block px-3 py-2 rounded-md text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <button className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg transition-shadow font-semibold text-lg">
                Admissions Open for 2026-2027
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}