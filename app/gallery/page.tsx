"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

const galleryItems = [
    {
        id: 1,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/culturals.jpg",
    },
    {
        id: 2,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/culturals2.jpeg",
    },
    {
        id: 3,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/culturals2.jpg",
    },
    {
        id: 4,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/culturals3.jpeg",
    },
    {
        id: 5,
        category: "sports",
        title: "Annual Sports Meet 2024",
        date: "December 10, 2024",
        location: "School Ground",
        description: "Athletic spirit and team competitions",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/sport1.jpg",
    },
    {
        id: 6,
        category: "childrens-day",
        title: "Children's Day Festivities",
        date: "November 14, 2024",
        location: "School Campus",
        description: "Games, cultural programs & special treats",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/childrens.jpg",
    },
    {
        id: 7,
        category: "excursions",
        title: "Educational Field Trip",
        date: "October 18, 2024",
        location: "Chennai Science Centre",
        description: "Hands-on science exploration",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/school.jpeg",
    },
    {
        id: 8,
        category: "festivals",
        title: "Diwali Celebration 2024",
        date: "October 31, 2024",
        location: "School Premises",
        description: "Rangoli, diyas & eco-friendly festivities",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/culturals4.jpeg",
    },
    {
        id: 9,
        category: "academics",
        title: "Science Lab Experiments",
        date: "Ongoing",
        location: "School Laboratories",
        description: "Practical learning in action",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/science.jpg",
    },
    {
        id: 10,
        category: "sports",
        title: "Athletic Competitions",
        date: "2024 Season",
        location: "Various Venues",
        description: "Inter-school sports events",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/pride.jpg",
    },
    {
        id: 11,
        category: "arts",
        title: "Cultural Events & Performances",
        date: "Throughout the year",
        location: "School Auditorium",
        description: "Dance, music & drama showcases",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/art2.jpeg",
    },
    {
        id: 12,
        category: "academics",
        title: "Classroom Learning Moments",
        date: "Daily Life",
        location: "Classrooms",
        description: "Interactive and joyful learning",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/smart.JPG",
    },
    {
        id: 13,
        category: "graduation",
        title: "Graduation Ceremony 2024",
        date: "March 25, 2024",
        location: "School Auditorium",
        description: "Celebrating student achievements",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/graduation.jpg",
    },
    {
        id: 14,
        category: "festivals",
        title: "Christmas Celebration 2024",
        date: "December 25, 2024",
        location: "School Premises",
        description: "Christmas carols and celebrations",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/foodfest.jpeg",
    },
    {
        id: 15,
        category: "teachers-day",
        title: "Teachers' Day Celebration",
        date: "September 5, 2024",
        location: "School Campus",
        description: "Honoring our dedicated teachers",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/Teacher -1.jpg",
    }
];
const categories = [
    { id: "all", label: "All" },
    { id: "annual-day", label: "Annual Day" },
    { id: "sports", label: "Sports" },
    { id: "childrens-day", label: "Children's Day" },
    { id: "excursions", label: "Excursions" },
    { id: "festivals", label: "Festivals" },
    { id: "academics", label: "Academics" },
    { id: "arts", label: "Arts & Culture" },
]

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [showFloatingBar, setShowFloatingBar] = useState(false)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const filterRef = useRef<HTMLDivElement>(null)

    const filteredItems =
        activeCategory === "all"
            ? galleryItems
            : galleryItems.filter((item) => item.category === activeCategory)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0", "scale-100")
                        entry.target.classList.remove("opacity-0", "translate-y-10", "scale-95")
                    }
                })
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -80px 0px",
            }
        )

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card)
        })

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card)
            })
        }
    }, [filteredItems]) // re-observe when filter changes

    // IntersectionObserver to detect when filter tabs scroll out of view
    useEffect(() => {
        const node = filterRef.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowFloatingBar(!entry.isIntersecting)
            },
            { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50/70">
            {/* Glassmorphism Floating Filter Bar */}
            <div
                className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ease-out ${showFloatingBar
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <div className="w-full bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`shrink-0 snap-center whitespace-nowrap px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                                            ? "bg-indigo-700 text-white shadow-md shadow-indigo-500/25 scale-105"
                                            : "bg-white/50 text-gray-700 hover:bg-white/80 hover:text-indigo-700 border border-gray-200/50"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 text-white py-16 md:py-20 overflow-hidden">
                {/* Animated floating orbs */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Large rotating orb */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-spin-slow">
                            <div className="absolute top-0 left-1/2 w-1 h-12 bg-cyan-300/40 transform -translate-x-1/2" />
                        </div>
                    </div>

                    {/* Small rotating particles */}
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 animate-spin-reverse-slow">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-white/30 rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(80px)`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Pulsing gradient rings */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
                        <div className="absolute inset-0 border-2 border-blue-400/10 rounded-full animate-ping-slow" />
                        <div className="absolute inset-8 border-2 border-cyan-400/10 rounded-full animate-ping-slow delay-1000" />
                        <div className="absolute inset-16 border-2 border-indigo-400/10 rounded-full animate-ping-slow delay-2000" />
                    </div>
                </div>

                {/* Floating photo-like elements */}
                {/* <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-24 h-32 md:w-32 md:h-40 rounded-lg bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 shadow-lg"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${10 + i * 15}%`,
                                animation: `float${i % 3 + 1} 15s ease-in-out infinite`,
                                animationDelay: `${i * 2}s`,
                                transform: `rotate(${i * 15}deg)`,
                            }}
                        >
                            <img src="https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/art1.jpeg" alt="" />
                            <div className="absolute inset-2 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded" />
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded" />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-white/20 rounded" />
                        </div>
                    ))}
                </div> */}

                {/* Animated grid lines */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(96,165,250,0.3)_100%)] bg-[length:60px_60px]"
                        style={{
                            animation: 'gridMoveX 20s linear infinite',
                        }}
                    />
                    <div
                        className="absolute inset-0 bg-[linear-gradient(transparent_99%,rgba(96,165,250,0.3)_100%)] bg-[length:60px_60px]"
                        style={{
                            animation: 'gridMoveY 20s linear infinite',
                        }}
                    />
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-5">
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-blue-200 via-white to-cyan-200 bg-clip-text text-transparent">
                                School Gallery
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-blue-400/30 blur-xl animate-pulse" />
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-200/90 max-w-4xl mx-auto font-light relative">
                        Capturing every smile, achievement, celebration and cherished moment at<br />
                        <span className="font-semibold text-cyan-300 ml-2">St. Pius X High School</span>
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                    </p>
                </div>

            </section>

            {/* Filter + Gallery */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    {/* Category Filters */}
                    <div ref={filterRef} className="flex justify-center mb-12 md:mb-16 w-full px-2 sm:px-0">
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-1.5 sm:p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] shadow-lg border border-slate-200/50 w-full max-w-fit">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`shrink-0 whitespace-nowrap px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === cat.id
                                        ? "bg-indigo-700 text-white shadow-md scale-105"
                                        : "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-indigo-700"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el
                                }}
                                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white opacity-0 translate-y-10 scale-100 transition-all duration-700 ease-out"
                                style={{
                                    transitionDelay: `${index * 80}ms`,
                                }}
                            >
                                <div className="aspect-[4/3] relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        quality={80}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <h3 className="text-white text-xl font-bold mb-1.5">{item.title}</h3>
                                        <p className="text-gray-200 text-sm mb-3">{item.description}</p>

                                        <div className="flex items-center gap-4 text-xs text-gray-300">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                <span>{item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-xl">No memories found in this category yet.</p>
                            <p className="mt-2">Try selecting another category!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}