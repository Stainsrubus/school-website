import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin } from "lucide-react"

export const Route = createFileRoute('/gallery')({
    component: GalleryPage,
})

const galleryItems = [
    {
        id: 1,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "/st_pius/culturals.jpg",
    },
    {
        id: 2,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "/st_pius/culturals2.jpeg",
    },
    {
        id: 3,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "/st_pius/culturals2.jpg",
    },
    {
        id: 4,
        category: "annual-day",
        title: "Annual Day Celebration 2024-25",
        date: "February 15, 2025",
        location: "School Auditorium",
        description: "Cultural performances, awards & vibrant celebrations",
        image: "/st_pius/culturals3.jpeg",
    },
    {
        id: 5,
        category: "sports",
        title: "Annual Sports Meet 2024",
        date: "December 10, 2024",
        location: "School Ground",
        description: "Athletic spirit and team competitions",
        image: "/st_pius/sport1.JPG",
    },
    {
        id: 6,
        category: "childrens-day",
        title: "Children's Day Festivities",
        date: "November 14, 2024",
        location: "School Campus",
        description: "Games, cultural programs & special treats",
        image: "/st_pius/childrens-day1.jpg",
    },
    {
        id: 7,
        category: "excursions",
        title: "Educational Field Trip",
        date: "October 18, 2024",
        location: "Chennai Science Centre",
        description: "Hands-on science exploration",
        image: "/st_pius/excursion1.jpg",
    },
    {
        id: 8,
        category: "festivals",
        title: "Diwali Celebration 2024",
        date: "October 31, 2024",
        location: "School Premises",
        description: "Rangoli, diyas & eco-friendly festivities",
        image: "/st_pius/diwali1.jpg",
    },
    {
        id: 9,
        category: "academics",
        title: "Science Lab Experiments",
        date: "Ongoing",
        location: "School Laboratories",
        description: "Practical learning in action",
        image: "/st_pius/science-lab1.jpg",
    },
    {
        id: 10,
        category: "sports",
        title: "Athletic Competitions",
        date: "2024 Season",
        location: "Various Venues",
        description: "Inter-school sports events",
        image: "/st_pius/sports2.jpg",
    },
    {
        id: 11,
        category: "arts",
        title: "Cultural Events & Performances",
        date: "Throughout the year",
        location: "School Auditorium",
        description: "Dance, music & drama showcases",
        image: "/st_pius/arts1.jpg",
    },
    {
        id: 12,
        category: "academics",
        title: "Classroom Learning Moments",
        date: "Daily Life",
        location: "Classrooms",
        description: "Interactive and joyful learning",
        image: "/st_pius/classroom1.jpg",
    },
    {
        id: 13,
        category: "graduation",
        title: "Graduation Ceremony 2024",
        date: "March 25, 2024",
        location: "School Auditorium",
        description: "Celebrating student achievements",
        image: "/st_pius/graduation1.jpg",
    },
    {
        id: 14,
        category: "festivals",
        title: "Christmas Celebration 2024",
        date: "December 25, 2024",
        location: "School Premises",
        description: "Christmas carols and celebrations",
        image: "/st_pius/christmas1.jpg",
    },
    {
        id: 15,
        category: "teachers-day",
        title: "Teachers' Day Celebration",
        date: "September 5, 2024",
        location: "School Campus",
        description: "Honoring our dedicated teachers",
        image: "/st_pius/teachers-day1.jpg",
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
];

function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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
    }, [filteredItems])

    return (
        <div className="min-h-screen bg-gray-50/70">
            <section className="relative bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 text-white py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-spin-slow">
                            <div className="absolute top-0 left-1/2 w-1 h-12 bg-cyan-300/40 transform -translate-x-1/2" />
                        </div>
                    </div>
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
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === cat.id
                                    ? "bg-indigo-700 text-white shadow-lg shadow-indigo-700/30 scale-105"
                                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-400 hover:text-indigo-700"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

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
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

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
