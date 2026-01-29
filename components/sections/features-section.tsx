"use client"

import React, { useState } from 'react'
import { ScrollObserver } from "@/components/ui/scroll-observer"
import { 
  Laptop, 
  Trophy, 
  Palette, 
  Compass, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  BookMarked
} from "lucide-react"

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "Smart Learning",
      tag: "Technology",
      description: "Equipped with Next-Gen Smart Boards and a state-of-the-art Computer Lab to foster technical literacy from a young age.",
      icon: <Laptop className="w-6 h-6" />,
      image: "/st_pius/smartLearning.JPG",
      color: "from-blue-600 to-cyan-500"
    },
    {
      title: "Scouts, Guides & RSP",
      tag: "Leadership",
      description: "Character building through Road Safety Patrol (RSP) and Scouting, instilling discipline and civic responsibility.",
      icon: <Compass className="w-6 h-6" />,
      image: "/st_pius/leader1.jpeg",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Sporting Legacy",
      tag: "Physical",
      description: "From inter-school football tournaments to specialized basketball coaching, we nurture the champions of tomorrow.",
      icon: <Trophy className="w-6 h-6" />,
      image: "/st_pius/sport1.jpg",
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Holistic Humanities",
      tag: "Arts",
      description: "Celebrating creativity through the 'Pius Fest', elocution competitions, and a rich performing arts.",
      icon: <Palette className="w-6 h-6" />,
      image: "/st_pius/art2.jpeg",
      color: "from-indigo-600 to-blue-500"
    }
  ]

  return (
    <section id="features" className=" bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollObserver className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4">
                <Zap size={18} className="fill-current" />
                Our Pillars of Excellence
              </div>
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Nurturing Minds, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Enlightening Souls.
                </span>
              </h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-sm border-l-2 border-blue-600 pl-6">
             " THOU SHALT LOVE THE LORD THY GOD WITH THY WHOLE HEART AND WITH THY

WHOLE SOUL AND WITH THY WHOLE MIND : AND THOU SHALT LOVE THY

NEIGHBOURS AS THYSELF. "</p>
          </div>
        </ScrollObserver>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6">
          {features.map((feature, index) => (
            <ScrollObserver 
              key={index} 
              className={`relative md:col-span-6 lg:col-span-${index === 0 || index === 3 ? '7' : '5'} group`}
            >
              <div 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative h-[450px] overflow-hidden rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 shadow-xl"
              >
                {/* Background Image with Parallax & Darken */}
                <div className="absolute inset-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-90' : 'opacity-70'}`} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className={`mb-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg transform transition-transform duration-500 ${hoveredIndex === index ? 'rotate-12 scale-110' : ''}`}>
                    {feature.icon}
                  </div>
                  
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
                    {feature.tag}
                  </span>
                  
                  <h3 className="font-serif text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <div className={`grid transition-all duration-500 ease-in-out ${hoveredIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <p className="overflow-hidden text-slate-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* <div className="mt-6 flex items-center gap-4">
                    <button className="flex items-center gap-2 text-white font-bold group/btn">
                      Explore Program 
                      <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-slate-900 transition-all">
                        <ArrowUpRight size={16} />
                      </div>
                    </button>
                  </div> */}
                </div>

                {/* Corner Decorative Element */}
                <div className={`absolute top-0 right-0 p-8 transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                   <ShieldCheck className="text-white/20 w-12 h-12" />
                </div>
              </div>
            </ScrollObserver>
          ))}
        </div>

        {/* Bottom Quick Facts */}
        <ScrollObserver className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-blue-600 rounded-[2rem] text-white">
          {[
            { label: "SSC Board", sub: "100% Results", icon: <BookMarked /> },
            { label: "Founded", sub: "Since 1970", icon: <Zap /> },
            { label: "Boys School", sub: "Jesuit Run", icon: <ShieldCheck /> },
            { label: "Campus", sub: "Tech Enabled", icon: <Laptop /> }
          ].map((fact, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-2">
                {React.cloneElement(fact.icon as React.ReactElement, { size: 20 })}
              </div>
              <div className="font-bold text-lg">{fact.label}</div>
              <div className="text-blue-100 text-xs uppercase tracking-widest">{fact.sub}</div>
            </div>
          ))}
        </ScrollObserver>

      </div>
    </section>
  )
}