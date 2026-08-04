import React, { useState } from 'react';
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { motion } from 'framer-motion';
import {
    Building2,
    Brain,
    Monitor,
    BookOpen,
    Laptop,
    Music,
    Palette,
    Activity,
    UtensilsCrossed,
    Sparkles,
    ArrowRight,
    ChevronDown,
    Shield,
    Wifi,
    TreePine,
    HeartPulse,
    Church,
    GraduationCap,
    Users,
    MapPin,
    Star,
    Zap,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function FacilitiesPage() {
    const [expandedFacility, setExpandedFacility] = useState<number | null>(0);

    const facilities = [
        {
            id: 0,
            name: "Science & Innovation Labs",
            shortName: "Science Labs",
            description: "State-of-the-art laboratories equipped with modern technology for physics, chemistry, biology, and robotics. Features include advanced equipment, digital measurement tools, and hands-on discovery stations that make science come alive.",
            features: ["Physics Lab", "Chemistry Lab", "Biology Lab", "Innovation Hub"],
            icon: <Brain className="w-6 h-6" />,
            image: "/st_pius/science.jpg",
            color: "from-blue-600 to-indigo-600"
        },
        {
            id: 1,
            name: "ICT & Computer Labs",
            shortName: "ICT Labs",
            description: "Advanced computer laboratories with latest hardware and software. Equipped with high-speed internet, coding platforms, and digital learning tools for technology education, digital literacy, and innovation.",
            features: ["High-Speed Internet", "Coding Platforms", "Digital Learning", "Latest Hardware"],
            icon: <Monitor className="w-6 h-6" />,
            image: "/st_pius/ict.JPG",
            color: "from-cyan-500 to-blue-600"
        },
        {
            id: 2,
            name: "Library & Resource Centre",
            shortName: "Library",
            description: "A vast collection of over 15,000 books, digital resources, e-journals, and quiet study spaces. Features reading rooms, research zones, and a digital library with online databases to foster a love of lifelong learning.",
            features: ["15,000+ Books", "Digital Resources", "Reading Rooms", "Research Zones"],
            icon: <BookOpen className="w-6 h-6" />,
            image: "/st_pius/library.JPG",
            color: "from-blue-600 to-cyan-500"
        },
        {
            id: 3,
            name: "Smart Classrooms",
            shortName: "Smart Classes",
            description: "Technology-integrated learning spaces with interactive whiteboards, projectors, and audio-visual systems. Enables digital content delivery, collaborative learning, and multimedia-rich educational experiences.",
            features: ["Interactive Whiteboards", "Projectors", "Audio-Visual Systems", "Digital Content"],
            icon: <Laptop className="w-6 h-6" />,
            image: "/st_pius/smart.JPG",
            color: "from-indigo-500 to-blue-600"
        },
        {
            id: 4,
            name: "Cultural Auditorium",
            shortName: "Auditorium",
            description: "A magnificent 500-seat auditorium with professional lighting, sound systems, and stage facilities. Hosts cultural programmes, annual functions, drama productions, music concerts, and inter-school competitions.",
            features: ["500-Seat Capacity", "Professional Sound", "Stage Lighting", "Event Hosting"],
            icon: <Music className="w-6 h-6" />,
            image: "/st_pius/culturals3.jpeg",
            color: "from-blue-500 to-indigo-600"
        },
        {
            id: 5,
            name: "Arts & Music Studios",
            shortName: "Arts Studios",
            description: "Dedicated spaces for visual arts, music practice, and performing arts. Equipped with instruments, art supplies, practice rooms, and recording facilities to nurture creative talents and artistic expression.",
            features: ["Visual Arts Studio", "Music Practice Rooms", "Art Supplies", "Performance Space"],
            icon: <Palette className="w-6 h-6" />,
            image: "/st_pius/art2.jpeg",
            color: "from-cyan-500 to-blue-500"
        },
        {
            id: 6,
            name: "Sports & Fitness Complex",
            shortName: "Sports Complex",
            description: "Comprehensive sports facilities including football, basketball, tennis, badminton courts, running tracks, kabaddi and cricket grounds. Indoor games like table tennis, carrom, and chess develop teamwork and balanced individuals.",
            features: ["Football Ground", "Basketball Court", "Cricket Pitch", "Indoor Games"],
            icon: <Activity className="w-6 h-6" />,
            image: "/st_pius/sport1.jpg",
            color: "from-blue-600 to-cyan-500"
        },
        {
            id: 7,
            name: "Cafeteria & Dining Hall",
            shortName: "Cafeteria",
            description: "Spacious, hygienic dining facility serving nutritious meals prepared under strict quality standards. Offers diverse menu options catering to different dietary requirements and preferences.",
            features: ["Hygienic Kitchen", "Nutritious Meals", "Spacious Seating", "Diverse Menu"],
            icon: <UtensilsCrossed className="w-6 h-6" />,
            image: "/st_pius/culturals4.jpeg",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    const campusHighlights = [
        { icon: <MapPin className="w-6 h-6" />, title: "Prime Location", description: "Centrally located with excellent connectivity" },
        { icon: <Shield className="w-6 h-6" />, title: "Safe & Secure", description: "24/7 CCTV surveillance and secure campus" },
        { icon: <Wifi className="w-6 h-6" />, title: "Wi-Fi Enabled", description: "High-speed internet across the campus" },
        { icon: <TreePine className="w-6 h-6" />, title: "Green Campus", description: "Eco-friendly with gardens and open spaces" },
        { icon: <HeartPulse className="w-6 h-6" />, title: "Health Centre", description: "On-campus medical facilities and first aid" },
        { icon: <Church className="w-6 h-6" />, title: "Chapel", description: "Serene space for prayer and reflection" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden" data-cms-page="facilities">
            {/* Background Orbs */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float-particle opacity-30"
                            style={{
                                left: `${10 + i * 16}%`,
                                top: `${15 + i * 12}%`,
                                animationDelay: `${i * 0.6}s`,
                                animationDuration: `${5 + Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full mb-6 shadow-xl shadow-blue-500/20"
                        >
                            <Building2 className="w-4 h-4" />
                            <span data-cms="facilities:badge">World-Class Infrastructure</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
                            data-cms="facilities:title"
                        >
                            A Campus Built for<br />
                            <span className="font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400">
                                Tomorrow's Leaders
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
                        >
                            From smart classrooms to sprawling sports grounds, our modern campus provides everything
                            students need to learn, grow, and excel in a safe, inspiring environment.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ===== CAMPUS HIGHLIGHTS BAR ===== */}
            <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8">
                <ScrollObserver className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 p-5 sm:p-8 md:p-10 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 rounded-2xl sm:rounded-[2.5rem] shadow-2xl text-white">
                    {campusHighlights.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-1">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2">
                                {item.icon}
                            </div>
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="text-blue-200 text-xs">{item.description}</div>
                        </div>
                    ))}
                </ScrollObserver>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ===== FACILITIES SHOWCASE ===== */}
                <section className="py-24 md:py-32">
                    <ScrollObserver className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={14} />
                            Explore Our Campus
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Facilities</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            State-of-the-art infrastructure designed to provide an enriching, safe, and inspiring learning environment.
                        </p>
                    </ScrollObserver>

                    {/* Alternating Facility Cards */}
                    <div className="space-y-10 sm:space-y-14">
                        {facilities.map((facility, i) => (
                            <ScrollObserver key={facility.id}>
                                <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-blue-500/10`}>
                                    {/* Image Side */}
                                    <div className="lg:w-1/2 h-56 sm:h-64 md:h-80 lg:min-h-[400px] overflow-hidden relative group">
                                        <img
                                            src={facility.image}
                                            alt={facility.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>

                                        {/* Floating Badge */}
                                        <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${facility.color} text-white text-xs font-bold uppercase tracking-widest shadow-lg`}>
                                            {facility.icon}
                                            <span className="hidden sm:inline">{facility.shortName}</span>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${facility.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                                            {facility.icon}
                                        </div>

                                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                            {facility.name}
                                        </h3>

                                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-6">
                                            {facility.description}
                                        </p>

                                        {/* Feature Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {facility.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-800"
                                                >
                                                    <Star className="w-3 h-3" />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollObserver>
                        ))}
                    </div>
                </section>

                {/* ===== CAMPUS STATS SECTION ===== */}
                <section className="pb-24 md:pb-32">
                    <ScrollObserver>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Building2 className="w-7 h-7" />,
                                    stat: "5+ Acres",
                                    title: "Campus Area",
                                    description: "Spacious grounds with gardens, playgrounds, and modern buildings designed for optimal learning.",
                                    color: "from-blue-600 to-indigo-600"
                                },
                                {
                                    icon: <Users className="w-7 h-7" />,
                                    stat: "1200+",
                                    title: "Students",
                                    description: "A vibrant community of learners from diverse backgrounds thriving in our nurturing environment.",
                                    color: "from-cyan-500 to-blue-600"
                                },
                                {
                                    icon: <GraduationCap className="w-7 h-7" />,
                                    stat: "54+",
                                    title: "Years of Excellence",
                                    description: "A legacy of academic achievement, character formation, and holistic development since 1970.",
                                    color: "from-blue-500 to-cyan-500"
                                }
                            ].map((item, i) => (
                                <div key={i} className="group relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-2xl transition-all duration-700 hover:-translate-y-2">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-5 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        {item.icon}
                                    </div>

                                    <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1">
                                        {item.stat}
                                    </div>
                                    <div className="text-blue-600 dark:text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">
                                        {item.title}
                                    </div>
                                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2">
                                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-gradient-to-r from-slate-200 via-blue-500 to-slate-200 transition-all duration-700"></div>
                                        <Sparkles className="w-4 h-4 text-blue-500/50 group-hover:scale-125 transition-transform duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollObserver>
                </section>

                {/* ===== CTA SECTION ===== */}
                <section className="pb-24 md:pb-32">
                    <ScrollObserver className="relative overflow-hidden rounded-2xl sm:rounded-[3rem] bg-slate-900 dark:bg-blue-950 p-6 sm:p-10 md:p-16 text-center md:text-left shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px]"></div>
                        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Experience Our <span className="text-cyan-400 font-serif">Campus In Person</span>
                                </h3>
                                <p className="text-blue-100/70 text-lg leading-relaxed">
                                    Schedule a visit to explore our world-class facilities and see how we're shaping the future of education. Walk through our labs, classrooms, and sports grounds.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <Link
                                    to="/contact"
                                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap text-center"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    Schedule a Visit
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </ScrollObserver>
                </section>
            </div>
        </div>
    );
}
