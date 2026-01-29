"use client"

import { ScrollObserver } from "@/components/ui/scroll-observer"
import { useState } from "react"

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const galleryItems = [
    {
      category: "academics",
      title: "Academic Excellence",
      image: "/gallery-academics-classroom.jpg",
      description: "Interactive learning sessions",
    },
    {
      category: "sports",
      title: "Sports & Fitness",
      image: "/gallery-sports-ground.jpg",
      description: "Training on professional grounds",
    },
    {
      category: "arts",
      title: "Cultural Events",
      image: "/gallery-cultural-event.jpg",
      description: "Annual cultural extravaganza",
    },
    {
      category: "academics",
      title: "Science Lab",
      image: "/gallery-science-lab-experiments.jpg",
      description: "Hands-on scientific learning",
    },
    {
      category: "events",
      title: "School Events",
      image: "/gallery-school-assembly-event.jpg",
      description: "Community and school celebrations",
    },
    {
      category: "sports",
      title: "Athletic Competitions",
      image: "/gallery-athletic-competition.jpg",
      description: "Inter-school competitions",
    },
  ]

  const categories = ["all", "academics", "sports", "arts", "events"]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollObserver className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">School Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the vibrant life and activities at St Pius School
          </p>
        </ScrollObserver>

        {/* Category Filter */}
        <ScrollObserver className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-foreground border border-border hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </ScrollObserver>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollObserver
              key={index}
              className="group relative overflow-hidden rounded-xl hover-scale"
              threshold={0.2}
            >
              <div className="aspect-square relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </div>
              </div>
            </ScrollObserver>
          ))}
        </div>
      </div>
    </section>
  )
}
