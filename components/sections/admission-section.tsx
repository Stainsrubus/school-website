
import React from 'react'
import { ScrollObserver } from "@/components/ui/scroll-observer"
import { CheckCircle, Users, BookOpen, Award, ArrowRight, Sparkles } from "lucide-react"

export default function AdmissionSection() {
  const admissionReasons = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "A world-class curriculum focusing on STEM and humanities, designed to prepare students for global challenges.",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Users,
      title: "Holistic Development",
      description: "Beyond textbooks: nurturing well-rounded personalities through arts, leadership, and emotional intelligence.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Award,
      title: "Expert Faculty",
      description: "Our educators are mentors with advanced qualifications and a deep-seated passion for shaping young minds.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: CheckCircle,
      title: "Modern Infrastructure",
      description: "Digital classrooms, advanced science labs, and a comprehensive sports complex for the 21st-century learner.",
      gradient: "from-blue-500 to-cyan-400"
    },
  ]

  return (
    <section id="admission" className="relative py-24 overflow-hidden bg-white dark:bg-slate-950">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollObserver className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            Empowering Our Students
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">St. Pius X?</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We provide a nurturing environment where academic rigor meets creative freedom, ensuring every student finds their unique path to success.
          </p>
        </ScrollObserver>

        {/* Admission Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {admissionReasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <ScrollObserver
                key={index}
                className="group relative p-8 bg-slate-50/50 dark:bg-slate-900/40 rounded-[2rem] border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 overflow-hidden"
                threshold={0.1}
              >
                {/* Hover Gradient Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <Icon size={28} />
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </ScrollObserver>
            )
          })}
        </div>

        {/* Admission CTA Section */}
        <ScrollObserver className="mt-20 relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-blue-950 p-8 md:p-16 text-center md:text-left shadow-2xl">
          {/* Animated Background for CTA */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Begin Your Child's <span className="text-cyan-400 font-serif">Journey to Excellence</span>
              </h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">
                Join our vibrant community of learners. Applications for the upcoming academic year are now being processed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                <a href="/#form">Apply Now</a>
              </button>
            </div>
          </div>
        </ScrollObserver>
      </div>
    </section>
  )
}