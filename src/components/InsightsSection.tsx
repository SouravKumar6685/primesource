import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

import { api } from '../lib/api';
import type { Insight } from '../lib/api';

const gridLayouts = [
  // Layout 1
  [
    "md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2",
    "md:col-start-2 md:col-span-3 md:row-start-1 md:row-span-1",
    "md:col-start-4 md:col-span-1 md:row-start-3 md:row-span-1",
    "md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1",
    "md:col-start-3 md:col-span-2 md:row-start-2 md:row-span-1",
    "md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1",
    "md:col-start-2 md:col-span-2 md:row-start-3 md:row-span-1",
  ],
  // Layout 2
  [
    "md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-1",
    "md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-3",
    "md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-1",
    "md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-1",
    "md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1",
    "md:col-start-3 md:col-span-1 md:row-start-2 md:row-span-2",
    "md:col-start-1 md:col-span-2 md:row-start-3 md:row-span-1",
  ],
  // Layout 3
  [
    "md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1",
    "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1",
    "md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-2",
    "md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-2",
    "md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-1",
    "md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1",
    "md:col-start-2 md:col-span-3 md:row-start-3 md:row-span-1",
  ],
];

const InsightsSection: React.FC = () => {
    const [currentLayout, setCurrentLayout] = useState(0);
    const [articles, setArticles] = useState<Insight[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const data = await api.insights.getAll();
                setArticles(data || []);
            } catch (error) {
                console.error("Failed to fetch insights:", error);
            }
        };
        fetchInsights();
    }, []);

    const nextLayout = () => {
        setCurrentLayout((prev) => (prev + 1) % gridLayouts.length);
    };

    const prevLayout = () => {
        setCurrentLayout((prev) => (prev - 1 + gridLayouts.length) % gridLayouts.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentLayout(prev => (prev + 1) % gridLayouts.length);
        }, 15000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".insights-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(gridRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#0a0a0a] py-24 px-8 md:px-16" data-scroll-section>
            <div className="max-w-[1400px] mx-auto w-full">

                {/* Header */}
                <div className="insights-header flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <h2 className="font-['Outfit'] font-bold text-4xl md:text-5xl lg:text-6xl text-white">
                        What we think
                    </h2>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        {/* Navigation Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevLayout}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextLayout}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <Link to="/insights" className="text-[#3bda5c] font-['Outfit'] font-bold text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity flex items-center gap-2">
                            Explore Our Insights
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Animated Grid Area */}
                <div 
                    ref={gridRef} 
                    className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:grid-rows-3 gap-4 w-full h-auto min-h-[600px] md:h-[700px] lg:h-[800px]"
                >
                    {articles.map((article, index) => (
                        <Link to={`/insights/${article.slug || article.id}`} key={article.id || index} className={`relative overflow-hidden rounded-3xl group cursor-pointer col-span-1 row-span-1 block ${gridLayouts[currentLayout]?.[index % gridLayouts[currentLayout].length]}`}>
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 60, damping: 14 },
                                    opacity: { duration: 0.5 }
                                }}
                                className="w-full h-full relative"
                            >
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111618] via-[#111618]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                <span className="font-['Outfit'] text-[0.65rem] uppercase tracking-[0.2em] text-[#3bda5c] mb-3">
                                    {article.category}
                                </span>
                                <h3 className="font-['Inter'] font-semibold text-white leading-[1.2] text-xl md:text-2xl lg:text-3xl line-clamp-3 mb-2">
                                    {article.title}
                                </h3>
                                {/* Hover reveal Read Article */}
                                <div className="mt-2 md:mt-4 flex items-center gap-2 text-white font-['Outfit'] text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <span>Read Article</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default InsightsSection;
