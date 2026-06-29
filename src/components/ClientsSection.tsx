import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Using precise placeholder SVGs/Images for the logos shown in the reference
const clients = [
    {
        name: 'UFT AI',
        logoUrl: 'https://unitedforcetech.com/assets/Logo_2-lpCSpyZ-.jpeg'
    },
    {
        name: 'Penny Coin',
        logoUrl: 'https://plain-apac-prod-public.komododecks.com/202606/29/VgDfxcoyg4MrGHKAFS1s/image.png'
    },
    {
        name: 'Inncent IQ',
        logoUrl: 'https://plain-apac-prod-public.komododecks.com/202606/29/pVIVguOlU1wHmGdmNdM7/image.png'
    },
    {
        name: 'Synerax',
        logoUrl: 'https://plain-apac-prod-public.komododecks.com/202606/29/JTtmP4G0SJN9OUpBKnCg/image.png'
    },
    {
        name: 'Lenstar',
        // Using a similar shield placeholder as seen in the image
        logoUrl: 'https://plain-apac-prod-public.komododecks.com/202606/29/3i6o34vSE0FeM7zo7G6v/image.png'
    },
    {
        name: 'Lumina Workforce',
        logoUrl: 'https://plain-apac-prod-public.komododecks.com/202606/29/EmDTBtAQoLw8Lh0D4Zjj/image.png'
    }
];


const ClientsSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the main paragraph text
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Stagger animate the client logos
            if (gridRef.current && gridRef.current.children) {
                gsap.fromTo(gridRef.current.children,
                    { opacity: 0, scale: 0.9, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1, // cascade effect
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full bg-white text-[#111] py-24 md:py-32 px-8 overflow-hidden"
            data-scroll-section
        >
            <div className="max-w-[1400px] mx-auto w-full">

                {/* Intro Text */}
                <div className="max-w-4xl mb-24 md:mb-32">
                    <p
                        ref={textRef}
                        className="font-['Inter'] font-light text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] leading-[1.3] text-gray-800"
                    >
                        Collaboration is critical for shared success. It's our<br className="hidden md:block" />
                        guiding principle and standard in serving<br className="hidden md:block" />
                        some of the world's leading companies.
                    </p>
                </div>

                {/* Clients Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 md:gap-y-24 items-center justify-items-center opacity-80"
                >
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="w-full flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            <img
                                src={client.logoUrl}
                                alt={`${client.name} logo`}
                                className="max-w-[120px] md:max-w-[150px] lg:max-w-[180px] max-h-[50px] md:max-h-[60px] lg:max-h-[70px] w-auto h-auto object-contain"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ClientsSection;
