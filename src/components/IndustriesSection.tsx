import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Industry {
    category: string;
    clients: string[][]; // Array of lines, each line is an array of client names
}

const industries: Industry[] = [
    {
        category: "Technology",
        clients: [
            ["FACEBOOK", "MICROSOFT", "T-MOBILE"],
            ["GOOGLE"]
        ]
    },
    {
        category: "Consumer",
        clients: [
            ["POINT DEFIANCE ZOO", "NIKE", "MOD PIZZA"],
            ["CONTINENTAL MILLS"]
        ]
    },
    {
        category: "SaaS",
        clients: [
            ["PAYSCALE"],
            ["EPIQ"]
        ]
    },
    {
        category: "Industrial",
        clients: [
            ["UNITED RENTALS", "MILLER", "IKONIX"],
            ["HYPERSCIENCES"]
        ]
    },
    {
        category: "Workforce",
        clients: [
            ["ADECCO", "RANDSTAD", "MANPOWER"],
            ["EQUITY LABS"]
        ]
    },
    {
        category: "Professional Services",
        clients: [
            ["MOSS ADAMS"],
            ["PLAYNETWORK"]
        ]
    }
];

const IndustriesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(".industries-header",
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

            // Stagger animate industry items
            gsap.fromTo(".industry-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".industry-grid",
                        start: "top 75%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="w-full bg-white text-[#111618] py-24 px-8 md:px-16" data-scroll-section>
            <div className="max-w-[1400px] mx-auto w-full">

                {/* Header */}
                <div className="industries-header flex justify-between items-center mb-16 md:mb-24">
                    <h2 className="font-['Outfit'] font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
                        Industries we work with
                    </h2>

                    {/* Navigation controls */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={scrollLeft}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#111618] transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#111618] transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Industry Grid/Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="industry-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 md:gap-y-32"
                >
                    {industries.map((industry, index) => (
                        <div key={index} className="industry-item flex flex-col group cursor-default">
                            {/* Category Title */}
                            <h3 className="font-['Outfit'] text-4xl lg:text-[2.8rem] text-gray-800 mb-8 transition-colors duration-300 group-hover:text-[#111618]">
                                {industry.category}
                            </h3>

                            {/* Client List */}
                            <div className="flex flex-col gap-2">
                                {industry.clients.map((line, lIdx) => (
                                    <div key={lIdx} className="flex flex-wrap items-center gap-x-2 text-[0.7rem] md:text-xs tracking-[0.15em] font-['Outfit'] text-gray-500 font-medium">
                                        {line.map((client, cIdx) => (
                                            <React.Fragment key={cIdx}>
                                                <span className="hover:text-gray-900 transition-colors uppercase">{client}</span>
                                                {cIdx < line.length - 1 && <span className="text-gray-300 mx-1">|</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default IndustriesSection;
