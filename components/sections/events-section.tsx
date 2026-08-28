import { useState, useRef, useEffect, useCallback } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Filter,
  CalendarDays,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCmsCollection, resolveCmsAssetUrl } from "@/lib/useCmsCollection"

interface EventItem {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  image: string
  sortOrder: number
}

const fallbackEvents: EventItem[] = [
  {
    id: "1",
    title: "Annual Day Celebration",
    date: "December 20, 2026",
    time: "10:00 AM",
    location: "School Auditorium",
    category: "Cultural",
    description: "Join us for a spectacular evening of performances, awards, and celebrations marking another year of excellence.",
    image: "",
    sortOrder: 1,
  },
  {
    id: "2",
    title: "Science Exhibition",
    date: "September 15, 2026",
    time: "9:00 AM",
    location: "School Hall",
    category: "Academic",
    description: "Students showcase their innovative science projects and experiments. Open to all parents and guardians.",
    image: "",
    sortOrder: 2,
  },
  {
    id: "3",
    title: "Inter-School Sports Meet",
    date: "October 5, 2026",
    time: "7:30 AM",
    location: "School Ground",
    category: "Sports",
    description: "Annual sports competition featuring athletics, football, basketball, and cricket tournaments.",
    image: "",
    sortOrder: 3,
  },
]

const categoryColors: Record<string, string> = {
  Academic: "from-blue-500 to-indigo-500",
  Sports: "from-emerald-500 to-teal-500",
  Cultural: "from-purple-500 to-pink-500",
  "Community Service": "from-amber-500 to-orange-500",
  Religious: "from-rose-500 to-red-500",
}

const categoryBg: Record<string, string> = {
  Academic: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  Sports: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  Cultural: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  "Community Service": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  Religious: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const events = useCmsCollection<EventItem>(
    "events",
    fallbackEvents,
    (entry) => ({
      id: entry.id,
      title: entry.data.title || "Untitled Event",
      date: entry.data.date || "",
      time: entry.data.time || "",
      location: entry.data.location || "",
      category: entry.data.category || "",
      description: entry.data.description || "",
      image: entry.data.image || "",
      sortOrder: parseInt(entry.data.sort_order || "0", 10) || 0,
    })
  )

  const sortedEvents = [...events]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 10)

  const categories = ["All", ...Array.from(new Set(sortedEvents.map((e) => e.category).filter(Boolean)))]

  const filteredEvents =
    activeFilter === "All"
      ? sortedEvents
      : sortedEvents.filter((e) => e.category === activeFilter)

  const autoScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || isPaused) {
      rafRef.current = requestAnimationFrame(autoScroll)
      return
    }
    el.scrollLeft += 0.5
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
      el.scrollLeft = 0
    }
    rafRef.current = requestAnimationFrame(autoScroll)
  }, [isPaused])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(autoScroll)
    return () => cancelAnimationFrame(rafRef.current)
  }, [autoScroll])

  if (sortedEvents.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-[120px]" />
        <CalendarDays className="absolute top-20 left-[8%] text-blue-200/20 w-16 h-16 animate-float-slow" />
        <Sparkles className="absolute bottom-20 right-[12%] text-cyan-200/20 w-12 h-12 animate-float-slow delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mb-6">
            <Calendar size={16} />
            <span data-cms="events:title">Ongoing & Upcoming Events</span>
            <Sparkles size={14} />
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
            data-cms="events:subtitle"
          >
            What&apos;s Happening at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">St. Pius</span>
          </h2>
          <p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            data-cms="events:description"
          >
            Stay updated with our latest school events, competitions, and celebrations.
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeFilter === cat
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <Filter size={14} />
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Events Auto-Scroll Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredEvents.map((event, index) => {
            const gradient = categoryColors[event.category] || "from-blue-500 to-cyan-500"
            const badgeClass = categoryBg[event.category] || "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"

            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative shrink-0 w-[340px] snap-start"
              >
                {/* Card glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                  {/* Image or gradient header */}
                  {event.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={resolveCmsAssetUrl(event.image)}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {event.category && (
                        <span className={`absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
                          {event.category}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className={`relative h-4 bg-gradient-to-r ${gradient}`} />
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Date & Time row */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-slate-500 dark:text-slate-400">
                      {event.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={14} className="text-blue-500" />
                          {event.date}
                        </span>
                      )}
                      {event.time && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} className="text-cyan-500" />
                          {event.time}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2" data-cms={`event:${event.id}:title`}>
                      {event.title}
                    </h3>

                    {/* Location */}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <MapPin size={14} className="text-rose-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    {event.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1" data-cms={`event:${event.id}:description`}>
                        {event.description}
                      </p>
                    )}

                    {/* Category badge (only if no image) */}
                    {!event.image && event.category && (
                      <div className="mt-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
                          {event.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Link */}
        {sortedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              View Gallery
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </section>
  )
}
