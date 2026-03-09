import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactCTA: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading and Button Fade-in
            gsap.fromTo(".cta-content",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Images staggered reveal
            if (imagesRef.current) {
                gsap.fromTo(imagesRef.current.children,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: imagesRef.current,
                            start: "top 85%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const bottomImages = [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop", // Planning/Stickers
        "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1200&auto=format&fit=crop", // Hands/Drawing
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop", // Code/Screen
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"  // Hardware/Machinery
    ];

    return (
        <section ref={sectionRef} className="w-full bg-white text-[#111618] pt-32 pb-0" data-scroll-section>
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 text-center mb-32">
                <div className="cta-content flex flex-col items-center">
                    <h2 ref={headingRef} className="font-['Outfit'] font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-12">
                        Have a project?
                    </h2>

                    <a
                        href="mailto:hello@primesource.com"
                        className="group relative px-10 py-4 border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#3bda5c]"
                    >
                        <span className="relative z-10 font-['Outfit'] font-bold text-[#3bda5c] text-sm uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white">
                            Contact Us
                        </span>
                        <div className="absolute inset-0 bg-[#3bda5c] transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                    </a>
                </div>
            </div>

            {/* Bottom Images Grid with Split Background */}
            <div className="w-full" style={{ background: 'linear-gradient(to bottom, #ffffff 50%, #111618 50%)' }}>
                <div className="max-w-[1400px] mx-auto px-8 md:px-16">
                    <div ref={imagesRef} className="grid grid-cols-2 lg:grid-cols-4 w-full h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden">
                        {bottomImages.map((src, index) => (
                            <div key={index} className="relative group overflow-hidden h-full">
                                <img
                                    src={src}
                                    alt={`Work aspect ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
