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
  Trophy
} from 'lucide-react';

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

const About: React.FC = () => {
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

  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean[]>([false, false, false, false]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSectionVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  // Core Values
  const values: Value[] = [
    { id: 1, title: "Excellence", description: "Striving for the highest standards in academics and character development", icon: <TargetIcon className="w-8 h-8" />, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 2, title: "Integrity", description: "Cultivating honesty, responsibility, and ethical behavior in all we do", icon: <Shield className="w-8 h-8" />, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" },
    { id: 3, title: "Innovation", description: "Embracing creativity and forward-thinking approaches to learning", icon: <Lightbulb className="w-8 h-8" />, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 4, title: "Community", description: "Building strong relationships and supporting one another's growth", icon: <HeartHandshake className="w-8 h-8" />, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" },
    { id: 5, title: "Global Citizenship", description: "Preparing students to contribute positively to the world", icon: <Globe className="w-8 h-8" />, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 6, title: "Spiritual Growth", description: "Nurturing faith, values, and moral development in every student", icon: <BookHeart className="w-8 h-8" />, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" }
  ]

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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden" data-cms-page="about">
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full mb-6 shadow-xl shadow-blue-500/20">
            <SchoolIcon className="w-4 h-4" />
<span data-cms="about-section:established_year">Established 1970</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Welcome to<br />
            <span className="font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400">
<span data-cms="about:title">St. Pius X High School</span>
            </span>
          </h1>
          <p className="font-serif text-xl md:text-2xl font-medium text-blue-600 dark:text-cyan-400 mb-10 italic" data-cms="about:motto">
            " LIGHTED TO ENLIGHTEN "
          </p>

          {/* OVERVIEW / WELCOME */}
          <div className="relative mt-20">
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
              <div className="group relative">
                <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl transition-all duration-700 group-hover:-translate-y-2">
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent animate-gradient-x-slow"></div>
                  <div className="relative flex flex-col h-full z-10">
                    <div className="mb-8 flex items-center gap-4 transform transition-transform duration-500 group-hover:translate-x-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <GemIcon className="h-8 w-8 transform transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                      <div className="transform transition-all duration-500 group-hover:translate-y-1">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 animate-pulse-slow">Our Future</h2>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-serif" data-cms="about:vision_title">The Vision</h3>
                      </div>
                    </div>

                    <div className="relative transform transition-transform duration-500 group-hover:translate-y-1">
                      <span className="absolute -top-4 -left-2 text-6xl font-serif text-blue-600/10 select-none animate-pulse">"</span>
                      <p className="text-xl font-serif md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic transform transition-all duration-500 group-hover:translate-x-1" data-cms="about:vision_quote">
                        Striving for Excellence Today to prepare students to succeed in a challenging world of tomorrow.
                      </p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center gap-2 transform transition-all duration-500 group-hover:gap-4">
                      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-gradient-to-r from-slate-200 via-blue-500 to-slate-200 dark:from-slate-700 dark:via-blue-500 dark:to-slate-700 transition-all duration-700"></div>
                      <Sparkles className="w-5 h-5 text-blue-500/50 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-180" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl transition-all duration-700 group-hover:-translate-y-2">
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-cyan-500/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-cyan-500 via-blue-600 to-transparent animate-gradient-x-slow-reverse"></div>
                  <div className="relative flex flex-col h-full z-10">
                    <div className="mb-8 flex items-center gap-4 transform transition-transform duration-500 group-hover:translate-x-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <Target className="h-8 w-8 transform transition-all duration-500 group-hover:-rotate-12" />
                      </div>
                      <div className="transform transition-all duration-500 group-hover:translate-y-1">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 animate-pulse-slow-delayed">Our Purpose</h2>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-serif" data-cms="about:mission_title">The Mission</h3>
                      </div>
                    </div>

                    <div className="relative transform transition-transform duration-500 group-hover:translate-y-1">
                      <span className="absolute -top-4 -left-2 text-6xl font-serif text-blue-600/10 select-none animate-pulse">"</span>
                      <p className="text-xl font-serif md:text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic transform transition-all duration-500 group-hover:translate-x-1" data-cms="about:mission_quote">
                        To be a catalyst in unlocking the potentials of the students and creating an awareness of his intellectual, creative and spiritual capabilities.
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
      </div>
    </div>
  );
};

export default About;