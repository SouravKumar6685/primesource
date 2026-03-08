import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Article {
    category: string;
    title: string;
    author: string;
    date: string;
    imageUrl: string;
}

const articles: Article[] = [
    {
        category: "ARTICLE",
        title: "Leveraging AI to Accelerate Firmware Unit Testing for C/C++ Microcontrollers",
        author: "By Peter Cornwell",
        date: "February 19, 2026",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" // PCB/Circuit board image
    },
    {
        category: "INSIGHT",
        title: "The Future of Robotic Process Automation in Manufacturing",
        author: "By Sarah Jenkins",
        date: "January 12, 2026",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop" // Robotics image
    },
    {
        category: "CASE STUDY",
        title: "Scaling Cloud Infrastructure for Global E-commerce in Record Time",
        author: "By Alex Rivera",
        date: "March 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" // Tech/Cloud image
    }
];

const InsightsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const nextArticle = () => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
    };

    const prevArticle = () => {
        setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animation for the entire section
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
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            gsap.fromTo(carouselRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animation for content change
    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
    }, [currentIndex]);

    const currentArticle = articles[currentIndex];

    return (
        <section ref={sectionRef} className="w-full bg-[#f8f9fa] py-24 px-8 md:px-16" data-scroll-section>
            <div className="max-w-[1400px] mx-auto w-full">

                {/* Header */}
                <div className="insights-header flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <h2 className="font-['Outfit'] font-bold text-4xl md:text-5xl lg:text-6xl text-[#111618]">
                        What we think
                    </h2>
                    <a href="#insights" className="mt-4 md:mt-0 text-[#3bda5c] font-['Outfit'] font-bold text-xs uppercase tracking-[0.15em] hover:opacity-70 transition-opacity flex items-center gap-2">
                        Explore Our Insights
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                {/* Main Carousel Area */}
                <div ref={carouselRef} className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl group">

                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                        <img
                            src={currentArticle.imageUrl}
                            alt={currentArticle.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>

                    {/* Dark Article Card */}
                    <div
                        ref={cardRef}
                        className="absolute left-0 bottom-0 md:left-8 md:bottom-8 w-full md:w-[450px] lg:w-[500px] bg-[#111618] text-white p-8 md:p-12 z-20 flex flex-col"
                    >
                        <span className="font-['Outfit'] text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
                            {currentArticle.category}
                        </span>

                        <h3 className="font-['Inter'] font-semibold text-xl md:text-2xl lg:text-3xl leading-[1.3] mb-8">
                            {currentArticle.title}
                        </h3>

                        <div className="mb-10 text-gray-400 font-['Inter'] text-sm">
                            <p className="font-bold text-white mb-1">{currentArticle.author}</p>
                            <p>{currentArticle.date}</p>
                        </div>

                        <a
                            href="#read"
                            className="inline-block border border-[#3bda5c]/40 text-[#3bda5c] px-6 py-3 font-['Outfit'] font-bold text-[0.6rem] uppercase tracking-[0.2em] hover:text-[#111618] transition-colors duration-500 relative overflow-hidden group/btn self-start"
                        >
                            {/* Liquid fill animation from left to right */}
                            <span className="absolute inset-0 bg-[#3bda5c] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                            <span className="relative z-10">Read Article</span>
                        </a>
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute right-8 bottom-8 z-30 flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={prevArticle}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextArticle}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <div className="font-['Outfit'] text-white text-xs tracking-wider font-medium min-w-[3rem] text-right">
                            {currentIndex + 1} / {articles.length}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default InsightsSection;
