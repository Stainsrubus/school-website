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
    { id: 1, name: "Science & Innovation Center", description: "State-of-the-art laboratories equipped with modern technology for physics, chemistry, biology, and robotics. Features include 3D printers and VR learning stations.", icon: <Brain className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80", clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)" },
    { id: 2, name: "Spiritual & Cultural Center", description: "A serene chapel, meditation rooms, and cultural hall for spiritual growth and interfaith understanding. Hosts daily prayers and retreats.", icon: <BookHeart className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1545885290-d4c0972c5eaf?auto=format&fit=crop&w=800&q=80", clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)" },
    { id: 3, name: "Sports & Fitness Complex", description: "Olympic-sized swimming pool, indoor basketball courts, fitness center, soccer field, and athletics track for holistic development.", icon: <Activity className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80", clipPath: "polygon(0% 0%, 100% 15%, 100% 100%, 0% 85%)" }
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full mb-6 shadow-xl shadow-blue-500/20">
            <SchoolIcon className="w-4 h-4" />
            Established 1970
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Welcome to<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400">
              St. Pius X High School
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-blue-600 dark:text-cyan-400 mb-10 italic">
            " LIGHTED TO ENLIGHTEN "
          </p>

          {/* VISION & MISSION - PRESERVED */}
          <div className='flex flex-col md:flex-row gap-8 items-center justify-center'>
            <div className={`relative w-full max-w-md p-8 bg-gradient-to-br ${primaryColor} text-white rounded-3xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl`}>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg">
                  <GemIcon className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Our Vision</h2>
              <p className="text-blue-100 text-lg leading-relaxed text-center">
                Striving for Excellence Today<br/>
                To prepare students to succeed<br/>
                In a challenging world of Tomorrow
              </p>
            </div>
            
            <div className={`relative w-full max-w-md p-8 bg-gradient-to-br ${secondaryColor} text-white rounded-3xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl`}>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
                  <Target className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
              <p className="text-cyan-100 text-lg leading-relaxed text-center">
                To be a catalyst in unlocking the potentials of the students and creating an awareness of their intellectual, creative and spiritual capabilities.
              </p>
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

        {/* CORE VALUES */}
        <div ref={valuesRef} className={`mb-32 transition-all duration-1000 ${isVisible[1] ? 'opacity-100' : 'opacity-0'}`}>
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
        <div ref={leadershipRef} className={`mb-32 transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
        <div ref={facilitiesRef} className={`mb-32 transition-all duration-1000 ${isVisible[3] ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our <span className="text-blue-600">Facilities</span></h2>
          </div>
          <div className="space-y-12">
            {facilities.map((facility, i) => (
              <div key={facility.id} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800`}>
                <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                  <img src={facility.image} alt={facility.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-600 to-cyan-500' : 'from-cyan-500 to-blue-600'} text-white flex items-center justify-center mb-6 shadow-lg`}>
                    {facility.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{facility.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">{facility.description}</p>
                  <button className="text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                    Explore Space <ChevronDown className="-rotate-90 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HISTORY & ACHIEVEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div className={`p-10 rounded-[3rem] bg-gradient-to-br ${primaryColor} text-white shadow-2xl transform hover:-translate-y-2 transition-transform`}>
            <div className="flex items-center gap-4 mb-10">
              <History className="w-10 h-10 text-cyan-300" />
              <h2 className="text-3xl font-bold">Our History</h2>
            </div>
            <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/20">
              {[
                { year: "1970", title: "Foundation", desc: "Started with a vision for holistic excellence." },
                { year: "1995", title: "Digital Era", desc: "First computers and tech labs introduced." },
                { year: "2020", title: "Modernization", desc: "Complete smart-campus transformation." }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-12 group">
                  <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-blue-900 border-4 border-cyan-400 flex items-center justify-center text-[10px] font-bold z-10">
                    {item.year}
                  </div>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <p className="text-blue-100/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-10 rounded-[3rem] bg-gradient-to-br ${secondaryColor} text-white shadow-2xl transform hover:-translate-y-2 transition-transform`}>
            <div className="flex items-center gap-4 mb-10">
              <Trophy className="w-10 h-10 text-blue-200" />
              <h2 className="text-3xl font-bold">Key Milestones</h2>
            </div>
            <div className="grid gap-6">
              {[
                "Consistently ranked Top 10 in State",
                "95% Graduate University Placement",
                "National Excellence in Sports Award",
                "Pioneer in Interfaith Education",
                "Green Campus Platinum Certification"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                  <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.5)]"></div>
                  <span className="font-semibold text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;