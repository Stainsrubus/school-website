import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Calendar,
  Star,
  Target,
  History,
  Shield,
  Globe,
  Brain,
  Activity,
  ChevronDown,
  GemIcon,
  Sparkles,
  Lightbulb,
  TargetIcon,
  HeartHandshake,
  BookHeart,
  SchoolIcon,
  Trophy,
  BookOpen,
  Heart,
  Laptop,
  Monitor,
  Music,
  Palette,
  UtensilsCrossed
} from 'lucide-react';
import { motion } from 'framer-motion';

// Type definitions
interface Stat {
  id: number;
  number: number;
  target: number;
  label: string;
  icon: React.ReactNode;
  suffix: string;
  color: string;
  description: string;
}

interface Leader {
  id: number;
  name: string;
  position: string;
  experience: string;
  specialty: string[];
  color: string;
  quote: string;
}

interface Value {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Facility {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  clipPath: string;
}

const AboutPage: React.FC = () => {
  // Primary and secondary colors
  const primaryColor = "from-blue-600 to-blue-800";
  const secondaryColor = "from-cyan-500 to-cyan-700";

  // Statistics with animation targets
  const initialStats: Stat[] = [
    { id: 1, number: 0, target: 1200, label: "Students Enrolled", icon: <Users className="w-6 h-6" />, suffix: "+", color: "from-blue-600 to-cyan-500", description: "From diverse backgrounds across the region" },
    { id: 2, number: 0, target: 95, label: "Graduation Rate", icon: <GraduationCap className="w-6 h-6" />, suffix: "%", color: "from-cyan-500 to-blue-700", description: "Consistently high year after year" },
    { id: 3, number: 0, target: 75, label: "Expert Faculty", icon: <Star className="w-6 h-6" />, suffix: "+", color: "from-blue-600 to-cyan-500", description: "Highly qualified and experienced educators" },
    { id: 4, number: 0, target: 54, label: "Years of Excellence", icon: <Calendar className="w-6 h-6" />, suffix: "+", color: "from-cyan-500 to-blue-700", description: "Established tradition of quality education" },
    { id: 5, number: 0, target: 25, label: "National Awards", icon: <Award className="w-6 h-6" />, suffix: "+", color: "from-blue-600 to-cyan-500", description: "Recognized for academic excellence" },
    { id: 6, number: 0, target: 20, label: "Student Clubs", icon: <Activity className="w-6 h-6" />, suffix: "+", color: "from-cyan-500 to-blue-700", description: "Extracurricular activities and organizations" }
  ];

  const [animatedStats, setAnimatedStats] = useState<Stat[]>(initialStats);
  const [expandedFacility, setExpandedFacility] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean[]>(Array(10).fill(false));
  const hasAnimated = useRef(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);

  // Core Values
  const values: Value[] = [
    { id: 1, title: "Excellence", description: "Striving for the highest standards in academics and character development", icon: <TargetIcon className="w-8 h-8" />, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 2, title: "Integrity", description: "Cultivating honesty, responsibility, and ethical behavior in all we do", icon: <Shield className="w-8 h-8" />, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" },
    { id: 3, title: "Innovation", description: "Embracing creativity and forward-thinking approaches to learning", icon: <Lightbulb className="w-8 h-8" />, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 4, title: "Community", description: "Building strong relationships and supporting one another's growth", icon: <HeartHandshake className="w-8 h-8" />, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" },
    { id: 5, title: "Global Citizenship", description: "Preparing students to contribute positively to the world", icon: <Globe className="w-8 h-8" />, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 6, title: "Spiritual Growth", description: "Nurturing faith, values, and moral development in every student", icon: <BookHeart className="w-8 h-8" />, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" }
  ];

  // Leadership team
  const leadership: Leader[] = [
    { id: 1, name: "Rev. Fr. John Mathew", position: "Principal & Director", experience: "25 Years Experience", specialty: ["Spiritual Leadership", "Academic Administration"], color: "from-blue-600 to-blue-800", quote: "Education is the kindling of a flame, not the filling of a vessel." },
    { id: 2, name: "Mrs. Susan Rodrigues", position: "Vice Principal", experience: "18 Years Experience", specialty: ["Curriculum Development", "Student Welfare"], color: "from-cyan-500 to-cyan-700", quote: "Every child deserves a champion who believes in them." },
    { id: 3, name: "Mr. Thomas Kurien", position: "Academic Dean", experience: "15 Years Experience", specialty: ["Science Education", "Research Programs"], color: "from-blue-600 to-blue-800", quote: "Learning is not attained by chance, it must be sought with ardor." },
    { id: 4, name: "Ms. Mary Thomas", position: "Head of Student Affairs", experience: "12 Years Experience", specialty: ["Student Development", "Extra-curricular"], color: "from-cyan-500 to-cyan-700", quote: "The goal of education is not to increase knowledge but to create possibilities." }
  ];

  // Facilities
  const facilities: Facility[] = [
    {
      id: 1,
      name: "Science & Innovation Labs",
      description: "State-of-the-art laboratories equipped with modern technology for physics, chemistry, biology, and robotics. Features include 3D printers and VR learning stations.",
      icon: <Brain className="w-6 h-6" />,
      image: "/st_pius/IMG_8389.JPG",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)"
    },
    {
      id: 2,
      name: "ICT Labs",
      description: "Advanced computer laboratories with latest hardware and software. Equipped with high-speed internet, coding platforms, and digital learning tools for technology education and innovation.",
      icon: <Monitor className="w-6 h-6" />,
      image: "/st_pius/ict.JPG",
      clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)"
    },
    {
      id: 3,
      name: "Library",
      description: "A vast collection of over 15,000 books, digital resources, e-journals, and quiet study spaces. Features reading rooms, research zones, and a digital library with online databases.",
      icon: <BookOpen className="w-6 h-6" />,
      image: "st_pius/library.JPG",
      clipPath: "polygon(0% 0%, 100% 15%, 100% 100%, 0% 85%)"
    },
    {
      id: 4,
      name: "Smart Classrooms",
      description: "Technology-integrated learning spaces with interactive whiteboards, projectors, and audio-visual systems. Enables digital content delivery and collaborative learning experiences.",
      icon: <Laptop className="w-6 h-6" />,
      image: "st_pius/smart.JPG",
      clipPath: "polygon(0% 15%, 100% 0%, 100% 85%, 0% 100%)"
    },
    {
      id: 5,
      name: "Cultural Auditorium",
      description: "A magnificent 500-seat auditorium with professional lighting, sound systems, and stage facilities. Hosts cultural programs, annual functions, drama, music concerts and inter-school competitions.",
      icon: <Music className="w-6 h-6" />,
      image: "st_pius/culturals3.jpeg",
      clipPath: "polygon(0% 0%, 100% 15%, 100% 100%, 0% 85%)"
    },
    {
      id: 6,
      name: "Arts & Music Studios",
      description: "Dedicated spaces for visual arts, music practice, and performing arts. Equipped with instruments, art supplies, practice rooms, and recording facilities to nurture creative talents.",
      icon: <Palette className="w-6 h-6" />,
      image: "st_pius/art2.jpeg",
      clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)"
    },
    {
      id: 7,
      name: "Sports & Fitness Complex",
      description: "Comprehensive sports facilities including football, basketball, tennis, badminton courts, running tracks, kabaddi, cricket grounds. Indoor games like table tennis, carrom, and chess help develop teamwork and well-balanced individuals.",
      icon: <Activity className="w-6 h-6" />,
      image: "/st_pius/sport1.jpg",
      clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)"
    },
    {
      id: 8,
      name: "Cafeteria & Dining Hall",
      description: "Spacious, hygienic dining facility serving nutritious meals prepared under strict quality standards. Offers diverse menu options catering to different dietary requirements and preferences.",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      image: "/st_pius/culturals4.jpeg",
      clipPath: "polygon(0% 0%, 100% 15%, 100% 100%, 0% 85%)"
    }
  ];

  // Logic for counting up stats
  const animateStatistics = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    initialStats.forEach(stat => {
      let current = 0;
      const increment = stat.target / steps;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(interval);
        }
        setAnimatedStats(prev => prev.map(s => s.id === stat.id ? { ...s, number: Math.floor(current) } : s));
      }, stepDuration);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) animateStatistics();
    }, { threshold: 0.1 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const refs = [statsRef, valuesRef, leadershipRef, facilitiesRef];
    const observers = refs.map((ref, index) => new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(prev => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }, { threshold: 0.1 }));
    refs.forEach((ref, i) => ref.current && observers[i].observe(ref.current));
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Handle incoming hash links and offset
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 180;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 150); // Small delay to let the page render properly
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24">
        {/* HERO SECTION */}
        <div id="overview" className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full mb-6 shadow-xl shadow-blue-500/20">
            <SchoolIcon className="w-4 h-4" />
            Established 1970
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Welcome to<br />
            <span className="font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400">
              St. Pius X High School
            </span>
          </h1>
          <p className="font-serif text-xl md:text-2xl font-medium text-blue-600 dark:text-cyan-400 mb-10 italic">
            " LIGHTED TO ENLIGHTEN "
          </p>
          <p className="text-lg font-serif md:text-xl font-medium text-slate-700 dark:text-slate-300 mb-10">
            St. Pius X High School is a Christian School administered by the Roman Catholic Archdiocese of Mumbai. The School is under the religious jurisdiction of the Roman Catholic Archbishop of Mumbai. The primary purpose of the School is to provide Catholic Education for Catholic boys. However, pupils of other faiths are also admitted and their religious feelings and freedom of conscience are duly respected without sacrificing the Christian character of the Institution.

          </p>
          {/* VISION & MISSION - ENHANCED ANIMATIONS */}
          <div id="vision-mission" className="relative mt-20">
            {/* Animated Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-64 md:h-64 bg-blue-500/10 blur-[100px] rounded-full hidden md:block animate-pulse-slow"></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float-particle"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + i * 10}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${5 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch relative z-10">

              {/* VISION CARD - Enhanced Animations */}
              <div className="group relative">
                {/* Pulsing Glow Effect */}
                {/* <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div> */}

                {/* Floating Icon Ornament */}
                {/* <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl rotate-12 transition-all duration-700 group-hover:rotate-45 group-hover:scale-110 opacity-20 blur-xl animate-glow-slow"></div> */}

                {/* Hover Shine Effect */}
                {/* <div className="absolute -top-10 left-1/3 w-48 h-32 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shine"></div> */}

                <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-5 sm:p-8 md:p-12 shadow-2xl transition-all duration-700 group-hover:-translate-y-2 ">
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-500"></div>

                  {/* Subtle Pulsing Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent animate-gradient-x-slow"></div>

                  {/* Floating Particles Inside Card */}
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full animate-float"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${30 + i * 15}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${4 + i}s`
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex flex-col h-full relative z-10">
                    <div className="mb-8 flex items-center gap-4 transform transition-transform duration-500 group-hover:translate-x-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <GemIcon className="h-8 w-8 transform transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                      <div className="transform transition-all duration-500 group-hover:translate-y-1">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 animate-pulse-slow">Our Future</h2>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">The Vision</h3>
                      </div>
                    </div>

                    <div className="relative transform transition-transform duration-500 group-hover:translate-y-1">
                      <span className="absolute -top-4 -left-2 text-6xl font-serif text-blue-600/10 select-none animate-pulse">"</span>
                      <p className="text-xl font-serif md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic transform transition-all duration-500 group-hover:translate-x-1">
                        Striving for <span className="text-blue-600 dark:text-blue-400 font-bold not-italic underline decoration-blue-500/30 underline-offset-8 animate-pulse-slow">Excellence Today</span> to prepare students to succeed in a challenging world of tomorrow.
                      </p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center gap-2 transform transition-all duration-500 group-hover:gap-4">
                      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-gradient-to-r from-slate-200 via-blue-500 to-slate-200 dark:from-slate-700 dark:via-blue-500 dark:to-slate-700 transition-all duration-700"></div>
                      <Sparkles className="w-5 h-5 text-blue-500/50 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-180" />
                    </div>
                  </div>
                </div>
              </div>

              {/* MISSION CARD - Enhanced Animations */}
              <div className="group relative">
                {/* Pulsing Glow Effect */}
                {/* <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div> */}

                {/* Floating Icon Ornament */}
                {/* <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:-rotate-45 opacity-20 blur-xl animate-glow-slow-delayed"></div> */}

                {/* Hover Shine Effect */}
                {/* <div className="absolute -bottom-10 right-1/3 w-48 h-32 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shine-delayed"></div> */}

                <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-5 sm:p-8 md:p-12 shadow-2xl transition-all duration-700 group-hover:-translate-y-2 ">
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-cyan-500/30 transition-all duration-500"></div>

                  {/* Subtle Pulsing Bottom Bar */}
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-cyan-500 via-blue-600 to-transparent animate-gradient-x-slow-reverse"></div>

                  {/* Floating Particles Inside Card */}
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full animate-float-delayed"
                        style={{
                          right: `${20 + i * 20}%`,
                          bottom: `${30 + i * 15}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${4 + i}s`
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex flex-col h-full relative z-10">
                    <div className="mb-8 flex items-center gap-4 transform transition-transform duration-500 group-hover:translate-x-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 ">
                        <Target className="h-8 w-8 transform transition-transform duration-500 group-hover:-rotate-12" />
                      </div>
                      <div className="transform transition-all duration-500 group-hover:translate-y-1">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 animate-pulse-slow-delayed">Our Purpose</h2>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">The Mission</h3>
                      </div>
                    </div>

                    <div className="relative transform transition-transform duration-500 group-hover:translate-y-1">
                      <span className="absolute -top-4 -left-2 text-6xl font-serif text-blue-600/10 select-none animate-pulse">"</span>
                      <p className="text-xl font-serif md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic transform transition-all duration-500 group-hover:translate-x-1">
                        To be a  <span className="text-blue-600 dark:text-blue-400 font-bold not-italic underline decoration-blue-500/30 underline-offset-8 animate-pulse-slow">catalyst </span>
                        in unlocking the potentials of the

                        students and creating an awareness of his

                        intellectual, creative and spiritual capabilities.
                      </p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center gap-2 transform transition-all duration-500 group-hover:gap-4">
                      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-gradient-to-r from-slate-200 via-blue-500 to-slate-200 dark:from-slate-700 dark:via-blue-500 dark:to-slate-700 transition-all duration-700"></div>
                      <Sparkles className="w-5 h-5 text-blue-500/50 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-180" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div ref={statsRef} className={`mb-32 transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {animatedStats.map((stat, i) => (
              <div key={stat.id} className="group bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-600 to-cyan-500' : 'from-cyan-500 to-blue-600'} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div id="principal-message" className="mb-32 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-[120px] -translate-y-1/2" />
          </div>

          <div className="relative">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-amber-100 border border-blue-200/50 mb-4">
                <Heart className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">From Our Principal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                A Message of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600">Welcome</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Side - Photo & Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4"
              >
                <div className="relative">
                  {/* Main Photo Card */}
                  <div className="relative bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 shadow-2xl border border-gray-100 overflow-hidden group">
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-[3rem]" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-tr-[3rem]" />

                    {/* Photo Container */}
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-gradient-to-br from-blue-100 to-amber-100">
                      <img
                        src="/st_pius/principal.JPG"
                        alt="Principal"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Photo Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
                    </div>

                    {/* Name & Title */}
                    <div className="relative text-center space-y-2">
                      <h3 className="text-2xl font-black text-gray-900">Rev Fr Norbert D'souza</h3>
                      <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">Principal</p>
                      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold">25+ Years in Education</span>
                      </div>
                    </div>

                    {/* Decorative Line & Legacy Badge */}
                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
                        className="flex justify-end"
                      >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg shadow-orange-500/25 border-2 border-white/80">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-extrabold tracking-wide whitespace-nowrap">25+ Years Legacy</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Message Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-8"
              >
                <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                  {/* Decorative Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#1E40AF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.9,76.8C26,84.6,9.2,87.6,-6.5,87.1C-22.2,86.6,-36.8,82.6,-50.1,74.9C-63.4,67.2,-75.4,55.8,-82.3,41.8C-89.2,27.8,-91,11.2,-89.3,-5.1C-87.6,-21.4,-82.4,-37.4,-73.3,-50.8C-64.2,-64.2,-51.2,-75,-36.8,-81.3C-22.4,-87.6,-6.6,-89.4,7.5,-90C21.6,-90.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                  </div>

                  {/* Large Opening Quote */}
                  <div className="relative mb-6">
                    <span className="absolute -top-4 -left-2 text-8xl font-serif text-blue-600/10 select-none leading-none">"</span>
                    <div className="relative pl-8">
                      <p className="text-2xl md:text-3xl font-serif italic text-gray-900 leading-relaxed mb-8">
                        <span className="text-blue-600 font-bold not-italic">Dear Students, Parents, and Friends,</span>
                      </p>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-6 relative z-10">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      It gives me immense pleasure to welcome you to <span className="font-bold text-blue-600">St. Pius X High School</span>,
                      where we have been nurturing young minds and shaping futures for over five decades. Our journey has been one of
                      unwavering commitment to <span className="font-semibold">academic excellence, moral integrity, and holistic development</span>.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      At St. Pius X, we believe that education extends far beyond textbooks and examinations. We strive to create an
                      environment where every student discovers their unique talents, develops critical thinking skills, and builds the
                      confidence to face tomorrow's challenges. Our dedicated faculty works tirelessly to ensure that each child receives
                      personalized attention and guidance.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      We take pride in our rich tradition of fostering <span className="font-semibold text-amber-600">spiritual growth,
                        academic achievement, and social responsibility</span>. Our students are not just prepared for successful careers,
                      but are also equipped to become compassionate leaders who contribute positively to society.
                    </p>

                    {/* Highlighted Quote */}
                    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl border-l-4 border-blue-600">
                      <p className="text-xl font-serif italic text-gray-800 leading-relaxed">
                        "Education is not the filling of a vessel, but the kindling of a flame. At St. Pius X High School, we ignite the flame of
                        curiosity, passion, and purpose in every student."
                      </p>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      I invite you to be part of our vibrant community where tradition meets innovation, and where every student is
                      valued, supported, and empowered to achieve their fullest potential.
                    </p>

                    {/* Signature Section */}
                    <div className="mt-10 pt-6 border-t border-gray-200 flex items-end justify-between flex-wrap gap-6">
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-1">With warm regards,</p>
                        <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600 font-serif">
                          Rev Fr Norbert D'souza
                        </p>
                        <p className="text-sm text-gray-600 font-semibold mt-1">Principal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Academic Vision",
                  desc: "Excellence in learning",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Pastoral Care",
                  desc: "Nurturing every student",
                  color: "from-amber-500 to-orange-600"
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Global Outlook",
                  desc: "Preparing world citizens",
                  color: "from-blue-500 to-blue-600"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all flex items-center gap-4"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* CORE VALUES */}
        <div id="core-values" ref={valuesRef} className={`mb-32 transition-all duration-1000 ${isVisible[1] ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core <span className="text-blue-600">Values</span></h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-blue-500/20 transition-all">
                <div className={`w-16 h-16 rounded-2xl ${v.color} text-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LEADERSHIP TEAM */}
        <div id="leadership" ref={leadershipRef} className={`mb-32 transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Educational <span className="text-cyan-500">Leadership</span></h2>
            <p className="text-slate-600 dark:text-slate-400">Guided by visionaries and experienced educators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, i) => (
              <div key={leader.id} className="group bg-white dark:bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all">
                <div className={`h-2 bg-gradient-to-r ${leader.color}`}></div>
                <div className="p-8">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${leader.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-1">{leader.name}</h3>
                  <p className="text-blue-600 dark:text-cyan-400 font-bold text-sm text-center mb-4">{leader.position}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {leader.specialty.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-bold uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 italic text-sm text-center border-t dark:border-slate-800 pt-4">"{leader.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FACILITIES */}
        <div id="facilities" ref={facilitiesRef} className={`mb-32 transition-all duration-1000 ${isVisible[3] ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our <span className="text-blue-600">Facilities</span></h2>
          </div>
          <div className="space-y-12">
            {facilities.map((facility, i) => (
              <div key={facility.id} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800`}>
                <div className="lg:w-1/2 h-52 sm:h-64 md:h-80 lg:min-h-96 object-cover overflow-hidden">
                  <img src={facility.image} alt={facility.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="lg:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col justify-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-600 to-cyan-500' : 'from-cyan-500 to-blue-600'} text-white flex items-center justify-center mb-6 shadow-lg`}>
                    {facility.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{facility.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">{facility.description}</p>
                  {/* <button className="text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                    Explore Space <ChevronDown className="-rotate-90 w-5 h-5" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="history-milestones" className="relative py-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-blue-100 border border-amber-200/50 mb-4"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Legacy & Excellence</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-blue-600">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Five decades of transforming lives and shaping future leaders
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">

              {/* HISTORY TIMELINE - Left Side (3 columns) */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden h-full"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="relative flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <History className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white mb-1">Our History</h3>
                        <p className="text-blue-100 text-sm font-medium">Building excellence since 1970</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Content */}
                  <div className="p-8 lg:p-10">
                    <div className="space-y-8 relative">
                      {/* Timeline Line */}
                      <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-amber-200 to-blue-200" />

                      {[
                        {
                          year: "1970",
                          title: "The Foundation",
                          desc: "Established with a vision to provide holistic education that nurtures mind, body, and spirit.",
                          color: "from-blue-500 to-blue-600",
                          icon: "🏛️"
                        },
                        {
                          year: "1985",
                          title: "First Expansion",
                          desc: "Added new academic blocks and introduced advanced science laboratories.",
                          color: "from-indigo-500 to-purple-600",
                          icon: "🔬"
                        },
                        {
                          year: "1995",
                          title: "Digital Revolution",
                          desc: "Pioneered computer education with state-of-the-art ICT labs and digital resources.",
                          color: "from-purple-500 to-pink-600",
                          icon: "💻"
                        },
                        {
                          year: "2010",
                          title: "Global Recognition",
                          desc: "Received national awards for academic excellence and innovative teaching methodologies.",
                          color: "from-amber-500 to-orange-600",
                          icon: "🏆"
                        },
                        {
                          year: "2020",
                          title: "Smart Campus",
                          desc: "Complete digital transformation with smart classrooms, AI-powered learning, and green initiatives.",
                          color: "from-green-500 to-emerald-600",
                          icon: "🌟"
                        }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative pl-14 sm:pl-20 group"
                        >
                          {/* Timeline Node */}
                          <div className="absolute left-0 top-0 flex items-center gap-3">
                            <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                              <span className="text-base sm:text-2xl">{item.icon}</span>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:border-blue-200 group-hover:shadow-lg transition-all duration-300">
                            <div className="flex items-baseline gap-3 mb-2">
                              <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                                {item.year}
                              </span>
                              <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ACHIEVEMENTS - Right Side (2 columns) */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-[2.5rem] shadow-2xl overflow-hidden h-full relative"
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white/30 rounded-full" />
                  </div>

                  <div className="relative p-8 lg:p-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 mb-4">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2">Key Milestones</h3>
                      <p className="text-orange-100 text-sm font-medium">Celebrating 50+ years of achievements</p>
                    </div>

                    {/* Achievements List */}
                    <div className="space-y-4 flex-1">
                      {[
                        { icon: "🎖️", text: "Consistently Ranked Top 10 in State", stat: "#1" },
                        { icon: "🎓", text: "95% Graduate University Placement", stat: "95%" },
                        { icon: "⚽", text: "National Excellence in Sports Award", stat: "50+" },
                        { icon: "🕊️", text: "Pioneer in Interfaith Education", stat: "1st" },
                        { icon: "🌱", text: "Green Campus Platinum Certification", stat: "★★★" }
                      ].map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-white text-lg leading-tight mb-1">
                                {achievement.text}
                              </p>
                              <span className="text-orange-100 text-sm font-medium">
                                Excellence recognized
                              </span>
                            </div>
                            <div className="text-3xl font-black text-white/30 group-hover:text-white/50 transition-colors">
                              {achievement.stat}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Stat */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="text-center">
                        <div className="text-5xl font-black text-white mb-2">50+</div>
                        <p className="text-orange-100 font-semibold">Years of Educational Excellence</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { number: "15,000+", label: "Alumni Worldwide", icon: "👥" },
                { number: "100+", label: "Expert Faculty", icon: "👨‍🏫" },
                { number: "2,500+", label: "Current Students", icon: "📚" },
                { number: "40+", label: "Countries Represented", icon: "🌍" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all text-center group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;