import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ServiceItem {
    title: string;
    icon: React.ReactNode;
}

const services: ServiceItem[] = [
    {
        title: "Replatforming",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="20" width="32" height="20" stroke="#999" strokeWidth="1.5" />
                <path d="M28 40V46M24 46H32" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 36C22 30 25 24 32 20C40 18 48 22 48 30C52 32 54 36 50 40H22Z" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 30L30 24L36 30M30 24V34" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "DevOps",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="22" width="28" height="18" stroke="#999" strokeWidth="1.5" />
                <rect x="16" y="24" width="24" height="14" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M28 40V46M24 46H32" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="42" cy="20" r="6" stroke="#999" strokeWidth="1.5" fill="white" />
                <path d="M42 22C40.5 22 39 23 39 24.5M42 16C40.5 16 39 17 39 18.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M23 32L19 28L23 24M33 32L37 28L33 24M29 24L27 32" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "Containerisation",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="22" y="28" width="20" height="14" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M25 31V39M29 31V39M33 31V39M37 31V39" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 28L32 20L42 28" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="32" cy="18" r="2" stroke="#999" strokeWidth="1.5" />
                <path d="M32 16V10M32 10C34 10 36 12 36 14" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Agile",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="30" r="10" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M32 26V30H36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 16C23 16 18 22 18 29.5C18 36 22 41 28 43" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
                <path d="M36 17C42 19 46 25 45 32C44 38 39 43 32 44" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 16L34 12M30 16L34 20" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 44H44L40 40" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "Cloud Native",
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
        title: "Micro Services",
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="30" r="14" stroke="#ea2b4f" strokeWidth="1.5" />
                <circle cx="38" cy="18" r="4" stroke="#999" strokeWidth="1.5" />
                <circle cx="46" cy="28" r="5" stroke="#999" strokeWidth="1.5" />
                <circle cx="44" cy="40" r="3" stroke="#999" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="3" stroke="#999" strokeWidth="1.5" />
                <circle cx="18" cy="32" r="2" stroke="#999" strokeWidth="1.5" />
                <circle cx="34" cy="34" r="6" stroke="#999" strokeWidth="1.5" />
                <path d="M22 22L35 19M40 21L44 24M45 33L44 37M37 39L32 42M20 32L28 34M23 21L30 30M36 21L34 28M42 29L39 31" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
        )
    },
    {
        title: "Internet of Things",
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
        title: "Artificial Intelligence",
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
