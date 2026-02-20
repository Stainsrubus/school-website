"use client"

import { useState, useRef, useEffect } from "react"
import { CreditCard, ChevronDown, ChevronUp, Bell, X } from "lucide-react"

const FEE_PAYMENT_URL = "https://formbuilder.ccavenue.com/live/st-pius-x-high-school"

export default function TopBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Pause marquee when dropdown is open
    useEffect(() => {
        if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = dropdownOpen ? "paused" : "running"
        }
        // Prevent body scroll when dropdown is open
        document.body.style.overflow = dropdownOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [dropdownOpen])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false)
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [dropdownOpen])

    const noticeText =
        "🔔 NOTICE: ONLINE FEE PAYMENT FOR PRIMARY SECTION — Fee payments for Classes 2, 3, and 4 can now be made online. Have your child's GR number ready."

    return (
        <>
            <style>{`
        @keyframes marquee {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
          white-space: nowrap;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown-animate {
          animation: dropdownFadeIn 0.2s ease-out forwards;
        }
      `}</style>

            {/* ── Topbar Strip ── */}
            <div className="relative z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
                <div className="flex items-center h-9 px-3 gap-3">

                    {/* Bell badge — toggles dropdown */}
                    <div className="relative flex-shrink-0">
                        <button
                            ref={buttonRef}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide cursor-pointer"
                            aria-label="Toggle fee payment notice"
                            aria-expanded={dropdownOpen}
                        >
                            <Bell size={11} className="text-yellow-300 animate-pulse" />
                            <span className="hidden sm:inline">ONLINE FEE PAYMENT</span>
                            <span className="sm:hidden">NOTICE</span>
                            {dropdownOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                    </div>

                    {/* Scrolling marquee */}
                    <div className="flex-1 overflow-hidden relative h-full flex items-center">
                        <div ref={marqueeRef} className="marquee-track text-xs sm:text-sm font-medium text-white/90">
                            {noticeText}
                        </div>
                    </div>

                    {/* Pay Fees button */}
                    <a
                        href={FEE_PAYMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 bg-white text-blue-700 hover:bg-yellow-300 hover:text-blue-900 transition-all duration-200 rounded-full px-3 py-1 text-xs font-bold shadow-md"
                    >
                        <CreditCard size={12} />
                        <span>Pay Fees</span>
                    </a>
                </div>
            </div>

            {/* ── Dropdown Overlay + Panel ── */}
            {dropdownOpen && (
                <>
                    {/* Backdrop overlay */}
                    <div
                        className="fixed inset-0 z-[998] bg-black/30 "
                        onClick={() => setDropdownOpen(false)}
                    />

                    {/* Dropdown panel — positioned absolutely below the button */}
                    <div
                        ref={dropdownRef}
                        className="dropdown-animate fixed z-[999] left-3 top-[42px]
                       !w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="notice-title"
                    >
                        {/* Panel header */}
                        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <Bell size={16} className="text-yellow-300" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                                        Official Notice
                                    </p>
                                    <h3
                                        id="notice-title"
                                        className="text-sm sm:text-base font-bold text-white leading-tight"
                                    >
                                        Online Fee Payment — Primary Section
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setDropdownOpen(false)}
                                className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
                                aria-label="Close notice"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        {/* Panel body */}
                        <div className="px-5 py-5">
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                Fee payments for{" "}
                                <span className="font-semibold text-blue-900">
                                    Classes 2, 3, and 4 (Primary Section)
                                </span>{" "}
                                can now be made online. Parents are requested to use the link provided below
                                to pay the fees. Please ensure you have your child's{" "}
                                <span className="font-semibold text-blue-900">GR number</span> ready
                                to complete the payment process.
                            </p>

                            {/* Info chips */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {["Class 2", "Class 3", "Class 4"].map((cls) => (
                                    <span
                                        key={cls}
                                        className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold rounded-full"
                                    >
                                        {cls}
                                    </span>
                                ))}
                                <span className="px-3 py-1 bg-yellow-50 border border-yellow-300 text-yellow-800 text-xs font-semibold rounded-full">
                                    📋 GR Number Required
                                </span>
                            </div>

                            {/* Divider */}
                            <hr className="border-gray-100 mb-5" />

                            {/* CTA row */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={FEE_PAYMENT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3
                             bg-gradient-to-r from-blue-600 to-cyan-500
                             hover:from-blue-700 hover:to-cyan-600
                             text-white font-semibold rounded-xl text-sm shadow-md
                             transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    <CreditCard size={15} />
                                    Proceed to Online Fee Payment
                                </a>
                                <button
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex-shrink-0 px-5 py-3 border border-gray-200 text-gray-500
                             hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}