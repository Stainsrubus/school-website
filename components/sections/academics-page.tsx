import React, { useState } from 'react';
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { motion } from 'framer-motion';
import {
    GraduationCap,
    BookOpen,
    FlaskConical,
    Calculator,
    Globe2,
    Languages,
    Palette,
    Monitor,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Trophy,
    Star,
    Users,
    Target,
    Brain,
    Zap,
    ChevronRight,
    Award,
    BookMarked,
    Lightbulb,
    Activity
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useCmsCollection, type CmsCollectionEntry } from '@/lib/useCmsCollection';

export interface SubjectItem {
    name: string;
    icon: React.ReactNode;
    description: string;
    highlights: string[];
    color: string;
    image: string;
    cmsKey?: string;
}

const defaultSubjects: SubjectItem[] = [
    {
        name: "Mathematics",
        icon: <Calculator className="w-6 h-6" />,
        description: "Building logical thinking and problem-solving skills through applied mathematics, mental math competitions, and real-world problem scenarios.",
        highlights: ["Applied Mathematics", "Math Olympiad Training", "Vedic Mathematics"],
        color: "from-blue-600 to-indigo-600",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/smartLearning.JPG",
        cmsKey: "academics:subject_0"
    },
    {
        name: "Science",
        icon: <FlaskConical className="w-6 h-6" />,
        description: "Hands-on exploration in state-of-the-art labs covering Physics, Chemistry, and Biology with practical experiments and science exhibitions.",
        highlights: ["Practical Lab Sessions", "Science Exhibition", "Innovation Projects"],
        color: "from-cyan-500 to-blue-600",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/science.jpg",
        cmsKey: "academics:subject_1"
    },
    {
        name: "English & Languages",
        icon: <Languages className="w-6 h-6" />,
        description: "Mastery of English language skills along with Hindi and Marathi, fostering effective communication and literary appreciation.",
        highlights: ["Creative Writing", "Elocution", "Debate Competitions"],
        color: "from-blue-600 to-cyan-500",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/culturals3.jpeg",
        cmsKey: "academics:subject_2"
    },
    {
        name: "Social Studies",
        icon: <Globe2 className="w-6 h-6" />,
        description: "Understanding history, geography, civics, and economics through interactive learning methods, field trips, and project-based exploration.",
        highlights: ["Heritage Projects", "Model Parliament", "Geography Expeditions"],
        color: "from-indigo-600 to-blue-500",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/expo.jpg",
        cmsKey: "academics:subject_3"
    },
    {
        name: "Information Technology",
        icon: <Monitor className="w-6 h-6" />,
        description: "Digital literacy and coding fundamentals using advanced ICT labs with latest hardware and software platforms for the 21st-century learner.",
        highlights: ["Computer Science", "Coding & Robotics", "Digital Literacy"],
        color: "from-blue-500 to-cyan-400",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/ict.JPG",
        cmsKey: "academics:subject_4"
    },
    {
        name: "Arts & Culture",
        icon: <Palette className="w-6 h-6" />,
        description: "Nurturing creative talents through visual arts, music, drama, and cultural programs that celebrate artistic expression and cultural heritage.",
        highlights: ["Visual Arts", "Music & Drama", "Pius Fest Cultural Program"],
        color: "from-cyan-500 to-indigo-500",
        image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/art2.jpeg",
        cmsKey: "academics:subject_5"
    }
];

function getSubjectIcon(name: string) {
    const lower = name.toLowerCase();
    if (lower.includes('math')) return <Calculator className="w-6 h-6" />;
    if (lower.includes('sci')) return <FlaskConical className="w-6 h-6" />;
    if (lower.includes('lang') || lower.includes('eng') || lower.includes('hindi') || lower.includes('marathi')) return <Languages className="w-6 h-6" />;
    if (lower.includes('social') || lower.includes('geo') || lower.includes('hist')) return <Globe2 className="w-6 h-6" />;
    if (lower.includes('tech') || lower.includes('ict') || lower.includes('comp') || lower.includes('it')) return <Monitor className="w-6 h-6" />;
    if (lower.includes('art') || lower.includes('cult') || lower.includes('music') || lower.includes('drama')) return <Palette className="w-6 h-6" />;
    return <BookOpen className="w-6 h-6" />;
}

function resolveSubjectImage(img?: string) {
    if (!img) return "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/smartLearning.JPG";
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) return img;
    if (img.startsWith('/')) return img;
    return `https://schoolpress-cms.creoleaptech.workers.dev/api/assets/${img}`;
}

export default function AcademicsPage() {
    const [activeSubject, setActiveSubject] = useState<number>(0);
    const [activeBoard, setActiveBoard] = useState<'sslc' | 'hsc'>('sslc');

    const subjects = useCmsCollection<SubjectItem>('academics_subjects', defaultSubjects, (entry: CmsCollectionEntry) => {
        const rawHighlights = entry.data.highlights || '';
        const highlights = rawHighlights
            ? rawHighlights.split(',').map(h => h.trim()).filter(Boolean)
            : [];
        const name = entry.data.name || 'Subject';
        return {
            name: name,
            icon: getSubjectIcon(name),
            description: entry.data.description || '',
            highlights: highlights.length > 0 ? highlights : ['Subject Mastery', 'Hands-on Projects', 'Excellence'],
            color: entry.data.color || "from-blue-600 to-indigo-600",
            image: resolveSubjectImage(entry.data.image),
            cmsKey: `academics:subject_${entry.id}`
        };
    });

    const safeIndex = Math.min(activeSubject, Math.max(0, subjects.length - 1));
    const currentSubject = subjects[safeIndex] || defaultSubjects[0];

    const curriculum = [
        {
            title: "SSC Board Curriculum",
            badge: "Maharashtra State Board",
            description: "Our school follows the SSC (Secondary School Certificate) curriculum under the Maharashtra State Board of Secondary and Higher Secondary Education, ensuring students are well-prepared for board examinations with a comprehensive, structured programme.",
            icon: <BookMarked className="w-7 h-7" />,
            color: "from-blue-600 to-blue-800",
            cmsKey: "academics:curriculum_0"
        },
        {
            title: "Co-Curricular Integration",
            badge: "Beyond Textbooks",
            description: "We integrate co-curricular activities seamlessly with academics. From science exhibitions to literary fests, from sports days to cultural programmes, every student gets opportunities to explore interests beyond the classroom.",
            icon: <Activity className="w-7 h-7" />,
            color: "from-cyan-500 to-blue-600",
            cmsKey: "academics:curriculum_1"
        },
        {
            title: "Value-Based Education",
            badge: "Holistic Formation",
            description: "Rooted in Christian values, our education model emphasises moral formation, social responsibility, and spiritual growth alongside academic excellence, creating well-rounded individuals prepared for life's challenges.",
            icon: <Lightbulb className="w-7 h-7" />,
            color: "from-blue-500 to-indigo-600",
            cmsKey: "academics:curriculum_2"
        }
    ];

    const achievements = [
        { number: "100%", label: "SSC Pass Rate", description: "Consistent board results", icon: <Trophy className="w-6 h-6" />, cmsKey: "academics:stat_0" },
        { number: "75+", label: "Expert Faculty", description: "Highly qualified teachers", icon: <Users className="w-6 h-6" />, cmsKey: "academics:stat_1" },
        { number: "20+", label: "Student Clubs", description: "Enrichment programmes", icon: <Star className="w-6 h-6" />, cmsKey: "academics:stat_2" },
        { number: "25+", label: "National Awards", description: "Recognised excellence", icon: <Award className="w-6 h-6" />, cmsKey: "academics:stat_3" }
    ];

    const teachingMethods = [
        {
            title: "Smart Classroom Learning",
            description: "Interactive whiteboards, projectors, and audio-visual systems enabling digital content delivery and collaborative learning experiences.",
            icon: <Monitor className="w-6 h-6" />,
            cmsKey: "academics:method_0"
        },
        {
            title: "Experiential Learning",
            description: "Hands-on experiments, field trips, and project-based learning that bring concepts to life and deepen understanding.",
            icon: <Brain className="w-6 h-6" />,
            cmsKey: "academics:method_1"
        },
        {
            title: "Personalised Attention",
            description: "Small class sizes and dedicated mentoring ensure every student receives individual guidance and support for academic growth.",
            icon: <Target className="w-6 h-6" />,
            cmsKey: "academics:method_2"
        },
        {
            title: "Continuous Assessment",
            description: "Regular evaluations, diagnostic tests, and remedial classes to track progress and address learning gaps proactively.",
            icon: <CheckCircle2 className="w-6 h-6" />,
            cmsKey: "academics:method_3"
        },
    ];

    const sslcToppers = [
        { name: "Arjun Sharma", marks: 489, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader.jpeg" },
        { name: "Priya Nair", marks: 482, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader1.jpeg" },
        { name: "Rohan Deshmukh", marks: 478, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader2.jpeg" },
        { name: "Sneha Kulkarni", marks: 475, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader3.jpeg" },
        { name: "Aditya Patil", marks: 471, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leadership.jpeg" },
        { name: "Meera Joshi", marks: 468, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/pride.jpg" },
    ];

    const hscToppers = [
        { name: "Kavitha Menon", marks: 584, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader.jpeg" },
        { name: "Rahul Iyer", marks: 576, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader1.jpeg" },
        { name: "Ananya Reddy", marks: 571, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader2.jpeg" },
        { name: "Vikram Singh", marks: 568, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leader3.jpeg" },
        { name: "Divya Pillai", marks: 562, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/leadership.jpeg" },
        { name: "Siddharth Das", marks: 558, image: "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/st-pius/pride2.jpg" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden" data-cms-page="academics">
            {/* Background Orbs */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float-particle opacity-30"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + i * 10}%`,
                                animationDelay: `${i * 0.7}s`,
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
                            <GraduationCap className="w-4 h-4" />
                            <span data-cms="academics:badge">Academic Excellence Since 1970</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
                        >
                            Shaping Futures Through<br />
                            <span className="font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400" data-cms="academics:title">
                                Academic Mastery
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
                            data-cms="academics:hero_description"
                        >
                            At St. Pius X High School, we deliver a rigorous SSC Board curriculum enriched with co-curricular
                            programmes, modern pedagogy, and value-based education to prepare students for global success.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ===== ACHIEVEMENT STATS BAR ===== */}
            <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8">
                <ScrollObserver className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-8 md:p-10 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 rounded-2xl sm:rounded-[2.5rem] text-center shadow-2xl text-white">
                    {achievements.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-1">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2">
                                {item.icon}
                            </div>
                            <div className="text-2xl sm:text-3xl font-black">{item.number}</div>
                            <div className="font-bold text-sm" data-cms={`${item.cmsKey}:label`}>{item.label}</div>
                            <div className="text-blue-200 text-xs" data-cms={`${item.cmsKey}:description`}>{item.description}</div>
                        </div>
                    ))}
                </ScrollObserver>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ===== CURRICULUM OVERVIEW ===== */}
                <section className="py-24 md:py-32">
                    <ScrollObserver className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <BookOpen size={14} />
                            <span data-cms="academics:curriculum_badge">Our Framework</span>
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight" data-cms="academics:curriculum_title">
                            Curriculum & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Approach</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-cms="academics:curriculum_description">
                            A structured, comprehensive educational framework that balances academic rigour with holistic development.
                        </p>
                    </ScrollObserver>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {curriculum.map((item, index) => (
                            <ScrollObserver key={index} className="group relative">
                                <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-2xl transition-all duration-700 group-hover:-translate-y-2">
                                    {/* Top Gradient Bar */}
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>

                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6" data-cms={`${item.cmsKey}:badge`}>
                                        {item.badge}
                                    </div>

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        {item.icon}
                                    </div>

                                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4" data-cms={`${item.cmsKey}:title`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed" data-cms={`${item.cmsKey}:description`}>
                                        {item.description}
                                    </p>

                                    <div className="mt-auto pt-8 flex items-center gap-2">
                                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-gradient-to-r from-slate-200 via-blue-500 to-slate-200 transition-all duration-700"></div>
                                        <Sparkles className="w-4 h-4 text-blue-500/50 group-hover:scale-125 transition-transform duration-500" />
                                    </div>
                                </div>
                            </ScrollObserver>
                        ))}
                    </div>
                </section>

                {/* ===== SUBJECTS / DEPARTMENTS ===== */}
                <section className="pb-24 md:pb-32">
                    <ScrollObserver className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap size={14} className="fill-current" />
                            <span data-cms="academics:departments_badge">Explore Departments</span>
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight" data-cms="academics:departments_title">
                            Academic <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Departments</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-cms="academics:departments_description">
                            Comprehensive departments staffed by expert educators, each dedicated to nurturing subject mastery and a passion for learning.
                        </p>
                    </ScrollObserver>

                    {/* Interactive Subject Showcase */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Subject List */}
                        <div className="lg:col-span-4 space-y-3">
                            {subjects.map((subject, index) => (
                                <ScrollObserver key={index}>
                                    <button
                                        onClick={() => setActiveSubject(index)}
                                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${safeIndex === index
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-xl shadow-blue-500/20 scale-[1.02]'
                                            : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-slate-900 dark:text-white hover:shadow-lg'
                                            }`}
                                    >
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${safeIndex === index
                                            ? 'bg-white/20'
                                            : `bg-gradient-to-br ${subject.color} text-white shadow-md`
                                            }`}>
                                            {subject.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-base" data-cms={subject.cmsKey ? `${subject.cmsKey}:name` : undefined}>{subject.name}</div>
                                            <div className={`text-xs mt-0.5 ${safeIndex === index ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                                {subject.highlights[0]}
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${safeIndex === index ? 'translate-x-1' : ''}`} />
                                    </button>
                                </ScrollObserver>
                            ))}
                        </div>

                        {/* Subject Detail Panel */}
                        <div className="lg:col-span-8">
                            <ScrollObserver>
                                <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
                                    {/* Image Header */}
                                    <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
                                        <img
                                            src={currentSubject.image}
                                            alt={currentSubject.name}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                                        {/* Overlay Title */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${currentSubject.color} text-white text-xs font-bold uppercase tracking-widest mb-3`}>
                                                {currentSubject.icon}
                                                <span>{currentSubject.name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8 md:p-10">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6" data-cms={currentSubject.cmsKey ? `${currentSubject.cmsKey}:description` : undefined}>
                                            {currentSubject.description}
                                        </p>

                                        <div className="space-y-3">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider" data-cms={currentSubject.cmsKey ? `${currentSubject.cmsKey}:highlights_title` : undefined}>Key Highlights</h4>
                                            {currentSubject.highlights.map((highlight, i) => (
                                                <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                                    <span className="font-medium" data-cms={currentSubject.cmsKey ? `${currentSubject.cmsKey}:highlight_${i}` : undefined}>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollObserver>
                        </div>
                    </div>
                </section>

                {/* ===== TEACHING METHODOLOGY ===== */}
                <section className="pb-24 md:pb-32">
                    <ScrollObserver className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Lightbulb size={14} />
                            <span data-cms="academics:methodology_badge">How We Teach</span>
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight" data-cms="academics:methodology_title">
                            Teaching <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Methodology</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-cms="academics:methodology_description">
                            Modern pedagogical approaches that engage, inspire, and empower every student to reach their full potential.
                        </p>
                    </ScrollObserver>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {teachingMethods.map((method, index) => (
                            <ScrollObserver key={index}>
                                <div className="group flex gap-6 p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-900/40 rounded-[2rem] border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-600 to-cyan-500' : 'from-cyan-500 to-blue-600'} flex items-center justify-center text-white flex-shrink-0 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2" data-cms={`${method.cmsKey}:title`}>
                                            {method.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed" data-cms={`${method.cmsKey}:description`}>
                                            {method.description}
                                        </p>
                                    </div>
                                </div>
                            </ScrollObserver>
                        ))}
                    </div>
                </section>

                {/* ===== ACADEMIC TOPPERS ===== */}
                <section className="pb-24 md:pb-32">
                    <ScrollObserver className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Trophy size={14} className="text-yellow-500" />
                            <span data-cms="academics:toppers_badge">Wall of Fame</span>
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight" data-cms="academics:toppers_title">
                            Academic <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Toppers</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8" data-cms="academics:toppers_description">
                            Celebrating our stellar performers who have brought laurels to the school with exceptional board examination results.
                        </p>

                        {/* Board Switcher */}
                        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <button
                                onClick={() => setActiveBoard('sslc')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeBoard === 'sslc'
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                SSLC (Class X)
                            </button>
                            <button
                                onClick={() => setActiveBoard('hsc')}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeBoard === 'hsc'
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                HSC (Class XII)
                            </button>
                        </div>
                    </ScrollObserver>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                        {(activeBoard === 'sslc' ? sslcToppers : hscToppers).map((student, i) => (
                            <ScrollObserver key={i} className="group">
                                <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                    <div className="aspect-square overflow-hidden relative">
                                        <img
                                            src={student.image}
                                            alt={student.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg">
                                            #{i + 1}
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="font-bold text-sm text-slate-900 dark:text-white truncate mb-1">
                                            {student.name}
                                        </div>
                                        <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400">
                                            <Star className="w-3 h-3 fill-current" />
                                            {student.marks} / {activeBoard === 'sslc' ? 500 : 600}
                                        </div>
                                    </div>
                                </div>
                            </ScrollObserver>
                        ))}
                    </div>
                </section>

                {/* ===== CTA SECTION ===== */}
                <section className="pb-24 md:pb-32">
                    <ScrollObserver className="relative overflow-hidden rounded-2xl sm:rounded-[3rem] bg-slate-900 dark:bg-blue-950 p-6 sm:p-10 md:p-16 text-center md:text-left shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px]"></div>
                        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" data-cms="academics:cta_title">
                                    Ready to Begin Your <span className="text-cyan-400 font-serif">Academic Journey?</span>
                                </h3>
                                <p className="text-blue-100/70 text-lg leading-relaxed" data-cms="academics:cta_description">
                                    Join St. Pius X High School and empower your child with quality education, experienced faculty, and a nurturing learning environment.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <Link
                                    to="/contact"
                                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap text-center"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    data-cms="academics:cta_button"
                                >
                                    Apply for Admission
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
