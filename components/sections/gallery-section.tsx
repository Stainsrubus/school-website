import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useCmsCollection, type CmsCollectionEntry } from "@/lib/useCmsCollection"

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
    id: 991,
    category: "annual-day",
    title: "Annual Day Celebration 2024-25",
    date: "February 15, 2025",
    location: "School Auditorium",
    description: "Cultural performances, awards & vibrant celebrations",
    image: "/st_pius/culturals2.jpeg",
  },
  {
    id: 992,
    category: "annual-day",
    title: "Annual Day Celebration 2024-25",
    date: "February 15, 2025",
    location: "School Auditorium",
    description: "Cultural performances, awards & vibrant celebrations",
    image: "/st_pius/culturals2.jpeg",
  },
  {
    id: 993,
    category: "annual-day",
    title: "Annual Day Celebration 2024-25",
    date: "February 15, 2025",
    location: "School Auditorium",
    description: "Cultural performances, awards & vibrant celebrations",
    image: "/st_pius/culturals3.jpeg",
  },
  { id: 2, category: "first-day", title: "FIRST DAY OF THE SCHOOL", date: "2024-25", location: "School Campus", description: "Welcoming students for the new academic year", image: "/images/gallery/event-first-day-of-the-school-4.png" },
  { id: 3, category: "first-day", title: "FIRST DAY OF THE SCHOOL", date: "2024-25", location: "School Campus", description: "Welcoming students for the new academic year", image: "/images/gallery/event-first-day-of-the-school-5.png" },

  { id: 4, category: "investiture", title: "INVESTITURE CEREMONY", date: "2024-25", location: "School Ground", description: "Swearing-in of the new student council", image: "/images/gallery/event-investiture-ceremony-6.jpeg" },
  { id: 5, category: "investiture", title: "INVESTITURE CEREMONY", date: "2024-25", location: "School Ground", description: "Swearing-in of the new student council", image: "/images/gallery/event-investiture-ceremony-7.jpeg" },
  { id: 6, category: "investiture", title: "INVESTITURE CEREMONY", date: "2024-25", location: "School Ground", description: "Swearing-in of the new student council", image: "/images/gallery/event-investiture-ceremony-8.jpeg" },

  { id: 7, category: "yoga-day", title: "INTERNATIONAL YOGA DAY", date: "2024-25", location: "School Hall", description: "Promoting health and mindfulness", image: "/images/gallery/event-international-yoga-day-9.jpeg" },
  { id: 8, category: "yoga-day", title: "INTERNATIONAL YOGA DAY", date: "2024-25", location: "School Hall", description: "Promoting health and mindfulness", image: "/images/gallery/event-international-yoga-day-10.jpeg" },
  { id: 9, category: "yoga-day", title: "INTERNATIONAL YOGA DAY", date: "2024-25", location: "School Hall", description: "Promoting health and mindfulness", image: "/images/gallery/event-international-yoga-day-11.png" },

  { id: 10, category: "english-week", title: "ENGLISH ENHANCEMENT WEEK", date: "2024-25", location: "Classrooms", description: "Activities to boost English language skills", image: "/images/gallery/event-english-enhancement-week-12.png" },
  { id: 11, category: "english-week", title: "ENGLISH ENHANCEMENT WEEK", date: "2024-25", location: "Classrooms", description: "Activities to boost English language skills", image: "/images/gallery/event-english-enhancement-week-13.jpeg" },
  { id: 12, category: "english-week", title: "ENGLISH ENHANCEMENT WEEK", date: "2024-25", location: "Classrooms", description: "Activities to boost English language skills", image: "/images/gallery/event-english-enhancement-week-14.jpeg" },

  { id: 13, category: "enactment-speech", title: "ENACTMENT & SPEECH (STD 5)", date: "2024-25", location: "Classrooms", description: "Showcasing speaking talents", image: "/images/gallery/event-enactment-and-speech-competition-for-std-5th-15.jpeg" },
  { id: 14, category: "enactment-speech", title: "ENACTMENT & SPEECH (STD 5)", date: "2024-25", location: "Classrooms", description: "Showcasing speaking talents", image: "/images/gallery/event-enactment-and-speech-competition-for-std-5th-16.jpeg" },
  { id: 15, category: "enactment-speech", title: "ENACTMENT & SPEECH (STD 5)", date: "2024-25", location: "Classrooms", description: "Showcasing speaking talents", image: "/images/gallery/event-enactment-and-speech-competition-for-std-5th-17.jpeg" },

  { id: 16, category: "choral-recitation", title: "CHORAL RECITATION (STD 6)", date: "2024-25", location: "Auditorium", description: "Group poetry recitation event", image: "/images/gallery/event-choral-recitation-competition-for-std-6th-18.jpeg" },
  { id: 17, category: "choral-recitation", title: "CHORAL RECITATION (STD 6)", date: "2024-25", location: "Auditorium", description: "Group poetry recitation event", image: "/images/gallery/event-choral-recitation-competition-for-std-6th-19.jpeg" },

  { id: 18, category: "speech-personalities", title: "SPEECH BY GREAT PERSONALITIES", date: "2024-25", location: "Auditorium", description: "Inspirational talks for students", image: "/images/gallery/event-speech-by-great-personalites-for-std-7th-and-8th-20.jpeg" },
  { id: 19, category: "speech-personalities", title: "SPEECH BY GREAT PERSONALITIES", date: "2024-25", location: "Auditorium", description: "Inspirational talks for students", image: "/images/gallery/event-speech-by-great-personalites-for-std-7th-and-8th-21.jpeg" },
  { id: 20, category: "speech-personalities", title: "SPEECH BY GREAT PERSONALITIES", date: "2024-25", location: "Auditorium", description: "Inspirational talks for students", image: "/images/gallery/event-speech-by-great-personalites-for-std-7th-and-8th-22.jpeg" },

  { id: 21, category: "spell-bee", title: "SPELL BEE COMPETITION", date: "2024-25", location: "Classroom", description: "Testing vocabulary and spelling", image: "/images/gallery/event-spell-bee-comeptition-for-std-9th-23.jpeg" },
  { id: 22, category: "spell-bee", title: "SPELL BEE COMPETITION", date: "2024-25", location: "Classroom", description: "Testing vocabulary and spelling", image: "/images/gallery/event-spell-bee-comeptition-for-std-9th-24.jpeg" },

  { id: 23, category: "declamation", title: "DECLAMATION CONTEST", date: "2024-25", location: "Auditorium", description: "Powerful speech delivery", image: "/images/gallery/event-declamation-contest-for-std-9th-and-10th-25.jpeg" },

  { id: 24, category: "solo-singing", title: "SOLO-SINGING COMPETITION", date: "2024-25", location: "Auditorium", description: "Where Melody Meets Passion", image: "/images/gallery/event-solo-singing-competition-where-melody-meets-passion-26.png" },
  { id: 25, category: "solo-singing", title: "SOLO-SINGING COMPETITION", date: "2024-25", location: "Auditorium", description: "Where Melody Meets Passion", image: "/images/gallery/event-solo-singing-competition-where-melody-meets-passion-27.png" },

  { id: 26, category: "instrumental", title: "INSTRUMENTAL COMPETITION", date: "2024-25", location: "Auditorium", description: "Strings of Talent", image: "/images/gallery/event-instrumental-competition-strings-of-talent-28.png" },
  { id: 27, category: "instrumental", title: "INSTRUMENTAL COMPETITION", date: "2024-25", location: "Auditorium", description: "Strings of Talent", image: "/images/gallery/event-instrumental-competition-strings-of-talent-29.jpeg" },
  { id: 28, category: "instrumental", title: "INSTRUMENTAL COMPETITION", date: "2024-25", location: "Auditorium", description: "Strings of Talent", image: "/images/gallery/event-instrumental-competition-strings-of-talent-30.jpeg" },

  { id: 29, category: "hindi-diwas", title: "HINDI DIWAS CELEBRATION", date: "2024-25", location: "Auditorium", description: "हमारी भाषा हमारा अभिमान", image: "/images/gallery/event--31.jpeg" },
  { id: 30, category: "hindi-diwas", title: "HINDI DIWAS CELEBRATION", date: "2024-25", location: "Auditorium", description: "हमारी भाषा हमारा अभिमान", image: "/images/gallery/event--32.png" },
  { id: 31, category: "hindi-diwas", title: "HINDI DIWAS CELEBRATION", date: "2024-25", location: "Auditorium", description: "हमारी भाषा हमारा अभिमान", image: "/images/gallery/event--33.png" },

  { id: 32, category: "marathi-elocution", title: "MARATHI ELOCUTION", date: "2024-25", location: "Auditorium", description: "Expressing thoughts in Marathi", image: "/images/gallery/event-marathi-elocution-competition-34.jpeg" },
  { id: 33, category: "marathi-elocution", title: "MARATHI ELOCUTION", date: "2024-25", location: "Auditorium", description: "Expressing thoughts in Marathi", image: "/images/gallery/event-marathi-elocution-competition-35.jpeg" },
  { id: 34, category: "marathi-elocution", title: "MARATHI ELOCUTION", date: "2024-25", location: "Auditorium", description: "Expressing thoughts in Marathi", image: "/images/gallery/event-marathi-elocution-competition-36.jpeg" },
  { id: 35, category: "marathi-elocution", title: "MARATHI ELOCUTION", date: "2024-25", location: "Auditorium", description: "Expressing thoughts in Marathi", image: "/images/gallery/event-marathi-elocution-competition-37.jpeg" },
  { id: 36, category: "marathi-elocution", title: "MARATHI ELOCUTION", date: "2024-25", location: "Auditorium", description: "Expressing thoughts in Marathi", image: "/images/gallery/event-marathi-elocution-competition-38.png" },
]

const categories = [
  { id: "all", label: "All" },
  { id: "annual-day", label: "Annual Day" },
  { id: "first-day", label: "First Day of School" },
  { id: "investiture", label: "Investiture Ceremony" },
  { id: "yoga-day", label: "Yoga Day" },
  { id: "english-week", label: "Enhancement Week" },
  { id: "enactment-speech", label: "Enactment & Speech" },
  { id: "choral-recitation", label: "Choral Recitation" },
  { id: "speech-personalities", label: "Guest Speeches" },
  { id: "spell-bee", label: "Spell Bee" },
  { id: "declamation", label: "Declamation" },
  { id: "solo-singing", label: "Solo Singing" },
  { id: "instrumental", label: "Instrumental" },
  { id: "hindi-diwas", label: "Hindi Diwas" },
  { id: "marathi-elocution", label: "Marathi Elocution" },
]

interface GalleryItem {
  id: number | string
  category: string
  title: string
  date: string
  location: string
  description: string
  image: string
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const cmsItems = useCmsCollection<GalleryItem>("gallery_items", galleryItems, (entry: CmsCollectionEntry) => ({
    id: entry.id,
    category: entry.data.category || "",
    title: entry.data.title || "",
    date: entry.data.date || "",
    location: entry.data.location || "",
    description: entry.data.description || "",
    image: entry.data.image || "",
  }))

  const allCategories = [...categories]
  const knownCategories = new Set(allCategories.map((cat) => cat.id))
  cmsItems.forEach((item) => {
    if (item.category && !knownCategories.has(item.category)) {
      knownCategories.add(item.category)
      allCategories.push({ id: item.category, label: item.category })
    }
  })

  const filteredItems =
    activeCategory === "all"
      ? cmsItems
      : cmsItems.filter((item) => item.category === activeCategory)

  // Handlers for Lightbox
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1))
  }

  const handleClose = () => setSelectedIndex(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1))
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1))
    }
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, filteredItems.length])

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
    <div className="min-h-screen bg-gray-50/70 relative" data-cms-page="gallery">
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
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSelectedIndex(null)
                  }}
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
              <span className="relative z-10 bg-gradient-to-r from-blue-200 via-white to-cyan-200 bg-clip-text text-transparent" data-cms="gallery:title">
                Moments That Define Us
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

      {/* Filter + Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div ref={filterRef} className="flex justify-center mb-12 md:mb-16 w-full px-2 sm:px-0">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-1.5 sm:p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] shadow-lg border border-slate-200/50 w-full max-w-fit">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSelectedIndex(null)
                  }}
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

          {/* Gallery Uniform Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-black cursor-pointer"
              >
                <div className="aspect-[4/3] w-full relative flex items-center justify-center">
                  {/* Blurred Background Filter */}
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110"
                  />
                  {/* Actual Uncropped Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
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

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md" onClick={handleClose}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
          >
            <X size={36} />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[60] p-2 md:p-4"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[60] p-2 md:p-4"
          >
            <ChevronRight size={48} />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[75vh] flex flex-col items-center px-12 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[selectedIndex].image}
              alt={filteredItems[selectedIndex].title}
              className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />

            <div className="text-white text-center mt-6 max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">{filteredItems[selectedIndex].title}</h3>
              <p className="text-gray-300">{filteredItems[selectedIndex].description}</p>
            </div>
          </div>

          {/* Thumbnails */}
          <div
            className="absolute bottom-4 left-0 right-0 flex justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 p-2 bg-black/50 rounded-xl overflow-x-auto max-w-full scrollbar-hide snap-x">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative flex-shrink-0 h-16 w-24 snap-center rounded overflow-hidden transition-all duration-300 ${idx === selectedIndex ? "ring-2 ring-blue-500 scale-100 opacity-100" : "opacity-40 hover:opacity-100 scale-95"
                    }`}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
