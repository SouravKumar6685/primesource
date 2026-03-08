import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Using precise placeholder SVGs/Images for the logos shown in the reference
const clients = [
    {
        name: 'CBRE',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/CBRE_Group_logo.svg/2560px-CBRE_Group_logo.svg.png'
    },
    {
        name: 'Facebook',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png'
    },
    {
        name: 'Google',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'
    },
    {
        name: 'Microsoft',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png'
    },
    {
        name: 'MOD',
        // Using a similar shield placeholder as seen in the image
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/mod-pizza-1.svg'
    },
    {
        name: 'RM Sotheby\'s',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/RM_Sotheby%27s_logo.svg/2560px-RM_Sotheby%27s_logo.svg.png'
    },
    {
        name: 'NEC',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/NEC_logo.svg/2560px-NEC_logo.svg.png'
    },
    {
        name: 'Nike',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png'
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
                        toggleActions: "play reverse play reverse"
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
                            toggleActions: "play reverse play reverse"
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
                        guiding principle and standard in serving the world's<br className="hidden md:block" />
                        greatest companies.
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
