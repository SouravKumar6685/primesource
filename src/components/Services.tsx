import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface ServiceItem {
    title: string;
    icon: React.ReactNode;
}

export const services: ServiceItem[] = [
    {
        title: "AI/ML",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="22" y="24" width="20" height="16" rx="2" stroke="#999" strokeWidth="1.5" />
                <circle cx="28" cy="30" r="2" fill="#ea2b4f" />
                <circle cx="36" cy="30" r="2" fill="#ea2b4f" />
                <path d="M28 36H36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M32 24V18" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="32" cy="16" r="2" stroke="#999" strokeWidth="1.5" />
                <path d="M22 32H18M46 32H42" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M26 40V44M38 40V44" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Cloud",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 40H20C15 40 12 36 12 31C12 26 15 23 19 23C21 16 29 14 34 19C38 18 42 21 43 25C47 26 49 30 48 34C48 38 46 40 42 40Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="36" y="24" width="16" height="12" stroke="#ea2b4f" strokeWidth="1.5" />
                <rect x="36" y="16" width="6" height="6" stroke="#999" strokeWidth="1.5" />
                <rect x="44" y="32" width="6" height="6" stroke="#999" strokeWidth="1.5" />
                <path d="M42 22V24M44 30V32" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Data Engineering",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 26C16 22 32 22 32 26C32 30 16 30 16 26Z" stroke="#999" strokeWidth="1.5" />
                <path d="M16 26V34C16 38 32 38 32 34V26" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M16 34V42C16 46 32 46 32 42V34" stroke="#999" strokeWidth="1.5" />
                <path d="M40 20L48 28L40 36" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M32 28L46 28" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            </svg>
        )
    },
    {
        title: "Web Development",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 22H48C50 22 52 24 52 26V42C52 44 50 46 48 46H16C14 46 12 44 12 42V26C12 24 14 22 16 22Z" stroke="#999" strokeWidth="1.5" />
                <path d="M12 28H52" stroke="#999" strokeWidth="1.5" />
                <circle cx="18" cy="25" r="1.5" fill="#ea2b4f" />
                <circle cx="23" cy="25" r="1.5" fill="#999" />
                <circle cx="28" cy="25" r="1.5" fill="#999" />
                <path d="M24 38L32 32L40 38" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "ERP",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="26" y="16" width="12" height="12" rx="2" stroke="#ea2b4f" strokeWidth="1.5" />
                <rect x="16" y="36" width="12" height="12" rx="2" stroke="#999" strokeWidth="1.5" />
                <rect x="36" y="36" width="12" height="12" rx="2" stroke="#999" strokeWidth="1.5" />
                <path d="M32 28V32M32 32H22V36M32 32H42V36" stroke="#999" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        title: "SaaS",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 36H20C15 36 12 32 12 27C12 22 15 19 19 19C21 12 29 10 34 15C38 14 42 17 43 21C47 22 49 26 48 30C48 34 46 36 42 36Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28 36L28 48M36 36L36 48" stroke="#999" strokeWidth="1.5" />
                <path d="M24 48H40" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="32" cy="44" r="2" fill="#ea2b4f" />
            </svg>
        )
    },
    {
        title: "Hardware",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="24" height="24" rx="2" stroke="#999" strokeWidth="1.5" />
                <rect x="25" y="25" width="14" height="14" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M20 28H16M20 36H16M44 28H48M44 36H48" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 20V16M36 20V16M28 44V48M36 44V48" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Workforce Solutions",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="22" r="6" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M20 42C20 35 25 32 32 32C39 32 44 35 44 42" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="20" cy="26" r="4" stroke="#999" strokeWidth="1.5" />
                <path d="M12 40C12 35.5 15 33.5 19 33.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="44" cy="26" r="4" stroke="#999" strokeWidth="1.5" />
                <path d="M52 40C52 35.5 49 33.5 45 33.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Offshore Workforce Solutions",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="14" stroke="#999" strokeWidth="1.5" />
                <path d="M18 32H46M22 24H42M22 40H42" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M38 18C44 22 46 28 43 36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            </svg>
        )
    },
    {
        title: "Cyber Security",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 16L44 20V30C44 38 32 46 32 46C32 46 20 38 20 30V20L32 16Z" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="32" cy="30" r="4" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M30 36C30 32 34 32 34 36V40H30V36Z" stroke="#ea2b4f" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        title: "IoT",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="32" y="18" width="16" height="12" stroke="#999" strokeWidth="1.5" />
                <rect x="18" y="22" width="6" height="10" stroke="#999" strokeWidth="1.5" />
                <path d="M18 20H24V22H18V20ZM18 32H24V34H18V32Z" fill="#999" />
                <path d="M24 28H32M32 28V30M32 28V26" stroke="#999" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M30 40C32.5 38 37.5 38 40 40" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M27 44C31 41 39 41 43 44" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M34 36C34.5 35 35.5 35 36 36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Data Analytics",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 44H48" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 16V44" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="20" y="32" width="6" height="12" fill="#ea2b4f" />
                <rect x="30" y="24" width="6" height="20" fill="#999" />
                <rect x="40" y="16" width="6" height="28" fill="#999" />
                <path d="M23 28L33 20L43 12" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "RFP Response",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 16H36L44 24V48H20V16Z" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M36 16V24H44" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M26 32H38M26 38H34" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Providing Key Resume",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="18" y="12" width="28" height="40" rx="2" stroke="#999" strokeWidth="1.5" />
                <circle cx="32" cy="24" r="5" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M24 36C24 32 28 30 32 30C36 30 40 32 40 36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M24 42H40M24 46H34" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    }
];

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade up the title and controls
            gsap.fromTo(".services-header",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Fade up the service cards
            gsap.fromTo(".service-card",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section ref={containerRef} className="w-full bg-white py-24 text-[#333333] border-t border-gray-100" data-scroll-section>
            <div className="max-w-[1400px] mx-auto px-8 relative">
                <div className="services-header flex items-center justify-between mb-16">
                    <h2 className="text-4xl font-['Outfit'] font-bold">Our Capabilities</h2>

                    {/* Controls */}
                    <div className="flex gap-4">
                        <button
                            onClick={scrollLeft}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Previous"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Next"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrolling Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="service-card snap-start flex-shrink-0 w-48 flex flex-col items-center justify-center gap-6 p-6 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer group"
                        >
                            <div className="transition-transform duration-300 group-hover:-translate-y-2">
                                {service.icon}
                            </div>
                            <h3 className="text-center font-['Inter'] font-medium text-[13px] text-gray-700 uppercase tracking-wide">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
