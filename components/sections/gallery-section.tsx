import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    category: "annual-day",
    title: "Annual Day Celebration 2024-25",
    date: "February 15, 2025",
    location: "School Auditorium",
    description: "Cultural performances, awards & vibrant celebrations",
    image: "/gallery/annual-day-1.jpg",
  },
  {
    id: 2,
    category: "sports",
    title: "Annual Sports Meet 2024",
    date: "December 10, 2024",
    location: "School Ground",
    description: "Athletic spirit and team competitions",
    image: "/gallery/sports-1.jpg",
  },
  {
    id: 3,
    category: "childrens-day",
    title: "Children's Day Festivities",
    date: "November 14, 2024",
    location: "School Campus",
    description: "Games, cultural programs & special treats",
    image: "/gallery/childrens-day-1.jpg",
  },
  {
    id: 4,
    category: "excursions",
    title: "Educational Field Trip",
    date: "October 18, 2024",
    location: "Chennai Science Centre",
    description: "Hands-on science exploration",
    image: "/gallery/excursion-1.jpg",
  },
  {
    id: 5,
    category: "festivals",
    title: "Diwali Celebration 2024",
    date: "October 31, 2024",
    location: "School Premises",
    description: "Rangoli, diyas & eco-friendly festivities",
    image: "/gallery/diwali-1.jpg",
  },
  {
    id: 6,
    category: "academics",
    title: "Science Lab Experiments",
    date: "Ongoing",
    location: "School Laboratories",
    description: "Practical learning in action",
    image: "/gallery/science-lab-experiments.jpg",
  },
  {
    id: 7,
    category: "sports",
    title: "Athletic Competitions",
    date: "2024 Season",
    location: "Various Venues",
    description: "Inter-school sports events",
    image: "/gallery/athletic-competition.jpg",
  },
  {
    id: 8,
    category: "arts",
    title: "Cultural Events & Performances",
    date: "Throughout the year",
    location: "School Auditorium",
    description: "Dance, music & drama showcases",
    image: "/gallery/cultural-event.jpg",
  },
  {
    id: 9,
    category: "academics",
    title: "Classroom Learning Moments",
    date: "Daily Life",
    location: "Classrooms",
    description: "Interactive and joyful learning",
    image: "/gallery-academics-classroom.jpg",
  },
]

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
  }, [filteredItems]) // re-observe when filter changes

  return (
    <div className="min-h-screen bg-gray-50/70">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 text-white py-28 md:py-40">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,#60a5fa_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,#a5b4fc_0%,transparent_60%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-5">
            School Gallery
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/90 max-w-4xl mx-auto font-light">
            Capturing every smile, achievement, celebration and cherished moment at St. Pius X High School
          </p>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Category Filters */}
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white opacity-0 translate-y-10 scale-95 transition-all duration-700 ease-out"
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