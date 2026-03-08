import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TeamSection: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for the background image
            if (bgImageRef.current) {
                gsap.fromTo(bgImageRef.current,
                    { yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }

            // Animate container scale slightly
            if (imageContainerRef.current) {
                gsap.fromTo(imageContainerRef.current,
                    { scale: 0.95, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }

            // Animate text elements
            if (textRef.current && textRef.current.children) {
                gsap.fromTo(textRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 60%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-16 md:py-24" data-scroll-section>
            {/* Split Background Effect: Black top half, White bottom half */}
            <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
                <div className="w-full h-1/2 bg-[#111618]"></div>
                <div className="w-full h-1/2 bg-white"></div>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 w-full">
                <div
                    ref={imageContainerRef}
                    className="relative w-full h-[600px] md:h-[750px] lg:h-[850px] rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    {/* Background Image with Parallax */}
                    <img
                        ref={bgImageRef}
                        // Using a placeholder construction/team image to match the machinery vibe in reference
                        src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
                        alt="Our Engineering Team"
                        className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
                    />

                    {/* Dark Overlay for Text Readable Contrast */}
                    <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

                    {/* Centered Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div ref={textRef} className="text-center flex flex-col items-center">

                            <p className="font-['Courier_New',monospace] text-white tracking-[0.1em] text-sm md:text-base font-bold mb-6 drop-shadow-md">
                                Who we are
                            </p>

                            <h2 className="font-['Outfit'] font-extrabold text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-12 drop-shadow-xl">
                                Meet the<br />team behind<br />our work
                            </h2>

                            <a
                                href="#team"
                                className="bg-[#3bda5c] text-white font-['Outfit'] font-bold text-xs md:text-sm uppercase tracking-[0.15em] px-8 py-4 hover:bg-[#28b546] hover:scale-105 transition-all duration-300 drop-shadow-lg"
                            >
                                See Our Team
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
