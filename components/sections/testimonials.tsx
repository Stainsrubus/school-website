"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  ShieldCheck,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Zap,
  Heart,
  Target,
  Activity,
  School,
  CheckCircle2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [progress, setProgress] = useState(0)
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0])
  const numbersRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Savio D'Souza",
      role: "Alumni (Batch of 2005)",
      school: "Ex-Head Boy",
      content: "St. Pius X isn't just a school; it's where my character was forged. The Jesuit values of discipline and service to others have been my north star in my professional career.",
      rating: 5,
      avatarColor: "from-blue-600 to-indigo-600",
    },
    {
      name: "Mrs. Anjali Iyer",
      role: "Parent",
      school: "Grade 10 Parent",
      content: "The dedication of the teachers here is unmatched. Even with the pressure of SSC boards, the school ensures our children participate in RSP and Sports, keeping them well-rounded.",
      rating: 5,
      avatarColor: "from-cyan-500 to-blue-500",
    },
    {
      name: "Vikram Malhotra",
      role: "Alumni & Professional",
      school: "Entrepreneur",
      content: "From the football grounds of Mulund to the top-tier science labs, Pius provided the perfect environment to explore my potential. 100% recommended for holistic growth.",
      rating: 5,
      avatarColor: "from-blue-700 to-cyan-400",
    }
  ]

  // Statistics data with targets
  const statsData = [
    { 
      label: "SSC Results", 
      target: 100, 
      suffix: "%", 
      icon: <GraduationCap className="w-6 h-6" />, 
      color: "from-blue-500 to-cyan-500",
      description: "Consistent Excellence"
    },
    { 
      label: "Legacy Years", 
      target: 54, 
      suffix: "+ Yrs", 
      icon: <School className="w-6 h-6" />, 
      color: "from-purple-500 to-pink-500",
      description: "Since 1970"
    },
    { 
      label: "Student Clubs", 
      target: 20, 
      suffix: "+", 
      icon: <Activity className="w-6 h-6" />, 
      color: "from-emerald-500 to-teal-500",
      description: "Activities"
    },
    { 
      label: "Successful Alumni", 
      target: 5000, 
      suffix: "+", 
      icon: <Users className="w-6 h-6" />, 
      color: "from-amber-500 to-orange-500",
      description: "Global Network"
    }
  ]

  // Animate numbers on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers()
        }
      },
      { threshold: 0.5 }
    )

    if (numbersRef.current) {
      observer.observe(numbersRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateNumbers = () => {
    const duration = 2000
    const steps = 100
    const stepDuration = duration / steps

    statsData.forEach((stat, index) => {
      let current = 0
      const increment = stat.target / steps

      setTimeout(() => {
        const interval = setInterval(() => {
          current += increment
          if (current >= stat.target) {
            current = stat.target
            clearInterval(interval)
          }

          setAnimatedNumbers(prev => {
            const updated = [...prev]
            updated[index] = Math.floor(current)
            return updated
          })
        }, stepDuration)
      }, index * 300) // Stagger animations
    })
  }

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setProgress(0)
  }, [testimonials.length])

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setProgress(0)
  }

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide()
            return 0
          }
          return prev + 1
        })
      }, 50) 
      return () => clearInterval(timer)
    }
  }, [isHovering, nextSlide])

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
        
        {/* Large Glow Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        
        {/* Floating Icons */}
        <BookOpen className="absolute top-20 left-[10%] text-blue-200/20 w-12 h-12 animate-float-slow" />
        <Trophy className="absolute top-1/4 right-[15%] text-amber-200/20 w-16 h-16 animate-float-slow delay-500" />
        <Star className="absolute bottom-1/3 left-[20%] text-cyan-200/20 w-10 h-10 animate-float-slow delay-700" />
        <Award className="absolute bottom-20 right-[20%] text-purple-200/20 w-14 h-14 animate-float-slow delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Enhanced Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mb-6 animate-pulse-slow">
            <ShieldCheck size={16} />
            <span>A Legacy of Excellence</span>
            <Sparkles size={14} />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6"
          >
            Trusted by <span className="relative">
              <span className="relative z-10">Generations</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-md"></span>
            </span> in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800 animate-gradient-x">Mulund</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            From 100% SSC results to state-level sports, see how we empower the youth of tomorrow with excellence and innovation.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Enhanced Statistics Dashboard */}
          <div ref={numbersRef} className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500">
                    {/* Floating Icon */}
                    <div className="relative mb-4">
                      <div className={`absolute -top-2 -right-2 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        {stat.icon}
                      </div>
                    </div>
                    
                    {/* Animated Number */}
                    <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-1">
                      <span className="relative">
                        {animatedNumbers[index]}
                        <span className="text-lg font-bold ml-1">{stat.suffix}</span>
                        {/* Underline Animation */}
                        {/* <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"></span> */}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                      {stat.description}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${(animatedNumbers[index] / stat.target) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-float"
                          style={{
                            left: `${10 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
     
          </div>

          {/* Enhanced Testimonial Card */}
          <div 
            className="lg:col-span-7 "
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
                   {/* Additional Mini Stats */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.4 }}
  viewport={{ once: true }}
  className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto px-2"
>
  {[
    { icon: <CheckCircle2 className="w-5 h-5" />, text: "100% Pass Rate", color: "emerald" },
    { icon: <Trophy className="w-5 h-5" />, text: "Consistently Top Ranked", color: "blue" },
    { icon: <Sparkles className="w-5 h-5" />, text: "State-of-the-Art Facilities", color: "amber" },
  ].map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
      viewport={{ once: true }}
      className={`
        group relative overflow-hidden rounded-2xl bg-gradient-to-b 
        from-slate-50/80 to-slate-100/40 dark:from-slate-900/60 dark:to-slate-950/40
        border border-slate-200/70 dark:border-slate-700/50
        backdrop-blur-sm shadow-sm hover:shadow-md
        p-4 flex items-center gap-3 transition-all duration-300
        hover:-translate-y-1 hover:border-${item.color}-400/40
      `}
    >
      {/* subtle background glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br from-${item.color}-500/10 to-transparent`} />

      <div className={`
        flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/5
        text-${item.color}-500 dark:text-${item.color}-400
        group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
      `}>
        {item.icon}
      </div>

      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {item.text}
      </span>
    </motion.div>
  ))}
</motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {/* Floating Background Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-4 md:p-8 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Giant Animated Quote Icon */}
                <Quote className="absolute -top-4 -right-4 w-48 h-48 text-blue-500/5 rotate-12 animate-pulse-slow" />
                
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-t-[3.5rem]">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="relative z-10">
                  {/* Rating and Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-6 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star size={22} className="fill-amber-400 text-amber-400 drop-shadow-lg" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevSlide}
                        className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-gradient-to-r from-blue-600 to-cyan-500 hover:text-white hover:border-transparent transition-all shadow-lg"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextSlide}
                        className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-gradient-to-r from-cyan-500 to-blue-600 hover:text-white hover:border-transparent transition-all shadow-lg"
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed  italic mb-2"
                    >
                      "{testimonials[activeIndex].content}"
                    </motion.blockquote>
                  </AnimatePresence>

                  {/* Testimonial Author */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800"
                    >
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${testimonials[activeIndex].avatarColor} flex items-center justify-center text-white text-xl font-black shadow-2xl transform rotate-3 relative`}
                      >
                        {/* Avatar Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"></div>
                        {testimonials[activeIndex].name.charAt(0)}
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-blue-600 dark:text-cyan-400 font-semibold text-base">
                          {testimonials[activeIndex].role}
                        </p>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="mt-1 inline-flex items-center text-xs gap-2 px-4 py-1 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 font-bold"
                        >
                          <GraduationCap size={16} />
                          {testimonials[activeIndex].school}
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial Dots */}
                  {/* <div className="flex justify-center gap-3 mt-4">
                    {testimonials.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => {
                          setActiveIndex(index)
                          setProgress(0)
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === activeIndex 
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 scale-125' 
                            : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 rounded-[3rem] p-10 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full animate-pulse-slow"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/20 blur-[100px] rounded-full animate-pulse-slow delay-500"></div>
            </div>
            
            {/* Floating Icons */}
            <Heart className="absolute top-6 left-6 text-white/10 w-12 h-12 animate-float-slow" />
            <Target className="absolute bottom-6 right-6 text-white/10 w-12 h-12 animate-float-slow delay-300" />
             
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Be Part of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Pius Legacy</span>
              </h3>
              <p className="text-blue-200/80 text-lg max-w-2xl">
                Join thousands of successful alumni who started their journey here. Shape your future with excellence.
              </p>
            </div>
             
            <div className="relative z-10">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-white to-blue-50 text-blue-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all text-lg group relative overflow-hidden"
              >
                <span className="relative z-10">Enquire for Admission</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -50px); }
          66% { transform: translate(-20px, 20px); }
        }
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}