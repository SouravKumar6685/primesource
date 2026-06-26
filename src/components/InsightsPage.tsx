import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Insight } from '../lib/api';
import SEO from './SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InsightsPage: React.FC = () => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const data = await api.insights.getAll();
                setInsights(data || []);
            } catch (error) {
                console.error("Error fetching insights:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInsights();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            gsap.fromTo(".insight-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".insights-grid",
                        start: "top 80%"
                    }
                }
            );
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-[#0a0a0a] text-white">
                <div className="w-12 h-12 border-4 border-[#3bda5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-[#0a0a0a] text-white min-h-screen" data-scroll-section>
            <SEO
                title="What We Think | Insights"
                description="Explore our latest thoughts, insights, and perspectives."
            />
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">

                {/* Header Container */}
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <h1 className="font-['Outfit'] font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase leading-none">
                        What We <br /> Think
                    </h1>
                    <span className="hidden md:inline-block font-mono text-sm font-bold uppercase tracking-widest text-[#3bda5c] bg-[#3bda5c]/10 px-4 py-2 rounded-sm">
                        All Insights ({insights.length})
                    </span>
                </div>

                {/* Insights Grid */}
                <div className="insights-grid flex flex-wrap -mx-4">
                    {insights.map((insight) => (
                        <div key={insight.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-12">
                            <Link to={`/insights/${insight.slug || insight.id}`} className="insight-card block group cursor-pointer h-full flex flex-col">

                                {/* Image Container */}
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative bg-[#111618] shadow-sm border border-white/5">
                                    <img
                                        src={insight.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000'}
                                        alt={insight.title}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                    />

                                    {/* Hover Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111618] via-[#111618]/50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 z-10 pointer-events-none"></div>

                                    <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col justify-end items-start opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                                        <div className="flex items-center gap-2 text-[#3bda5c] font-['Outfit'] text-xs font-bold uppercase tracking-widest">
                                            <span>Read Article</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content Below Image */}
                                <div className="flex-1 flex flex-col px-2">
                                    <span className="font-['Outfit'] text-[0.65rem] uppercase tracking-[0.2em] text-[#3bda5c] mb-3">
                                        {insight.category || 'INSIGHT'}
                                    </span>
                                    <h3 className="font-['Inter'] font-semibold text-white leading-[1.2] text-xl md:text-2xl mb-4 line-clamp-3">
                                        {insight.title}
                                    </h3>
                                    
                                    <div className="mt-auto pt-4 flex items-center gap-2 text-gray-400 text-xs font-['Inter']">
                                        <span>{insight.author || 'Admin'}</span>
                                        <span>&bull;</span>
                                        <span>{insight.date || 'Recent'}</span>
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

                {insights.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-white/20 rounded-2xl bg-[#111618]">
                        <p className="text-gray-500 font-['Inter'] font-semibold">No insights found. Add some from the admin panel!</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default InsightsPage;
