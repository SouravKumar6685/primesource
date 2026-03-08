import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Services from './Services';
import Approach from './Approach';
import Capabilities from './Capabilities';
import TeamSection from './TeamSection';
import ClientsSection from './ClientsSection';
import InsightsSection from './InsightsSection';
import IndustriesSection from './IndustriesSection';
import FeaturedWork from './FeaturedWork';
import ContactCTA from './ContactCTA';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial video entrance animation
            gsap.fromTo(videoRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
            );

            // Text animation with ScrollTrigger for Hero text enter & enterBack
            gsap.fromTo(textRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 100%",   // Start when text top hits bottom of screen
                        end: "bottom 15%",   // End when text bottom is 15% from top of screen
                        toggleActions: "play reverse play reverse",
                    }
                }
            );

            // About section reveal animation
            gsap.fromTo(".about-text",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-text",
                        start: "top 85%", // Trigger right before it enters fully
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            gsap.fromTo(".about-cta",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-text", // Use the text as the trigger for smoother timing
                        start: "top 80%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main data-scroll-container className="bg-[#111618]">
            <section id="top" className="relative w-full h-screen overflow-hidden flex items-end pb-24 px-8 md:px-16" data-scroll-section>

                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark Overlay */}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        // Using a royalty-free abstract tech video as a placeholder
                        src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-space-in-a-timeline-41182-large.mp4"
                    />
                </div>

                {/* Hero Content */}
                <div ref={textRef} className="relative z-20 w-full max-w-5xl" data-scroll data-scroll-speed="1.5">
                    <h1 className="text-white font-['Outfit'] font-bold text-6xl md:text-8xl leading-[1.1] tracking-tight">
                        Innovation <br /> as a Service
                    </h1>
                    <div className="mt-8 flex items-center gap-6">
                        <button className="text-white font-['Inter'] uppercase text-sm tracking-wider font-semibold hover:opacity-70 transition-opacity flex items-center gap-2">
                            View Services
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>

            </section>

            {/* About / Intro Section (Second Page) */}
            <section id="about" className="w-full min-h-screen bg-white text-[#333333] flex items-center justify-center px-8 md:px-24" data-scroll-section>
                <div className="max-w-4xl mx-auto w-full">
                    {/* Main Intro Text */}
                    <p className="about-text font-['Inter'] font-light text-[2rem] md:text-[2.6rem] leading-[1.4] tracking-tight mb-16">
                        Prime Source is an IT and Consulting services firm.
                        We design and build digital and physical products, systems, teams,
                        and experiences that accelerate your roadmap.
                    </p>

                    {/* Green Call to Action Link */}
                    <div className="about-cta flex items-center">
                        <a href="#contact" className="text-[#3bda5c] font-['Outfit'] font-bold text-xs uppercase tracking-[0.15em] hover:text-[#28b546] transition-colors flex items-center gap-2">
                            Let's build the future together, with intent
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Carousel Section */}
            <div id="services">
                <Services />
            </div>

            {/* Approach Section */}
            <Approach />

            {/* Capabilities Tag Cloud */}
            <Capabilities />

            {/* Team Introduction Section */}
            <TeamSection />

            {/* Clients Grid Section */}
            <ClientsSection />

            {/* Insights Carousel Section ("What we think") */}
            <div id="insights">
                <InsightsSection />
            </div>

            {/* Industries Section */}
            <div id="industries">
                <IndustriesSection />
            </div>

            {/* Featured Work Section */}
            <div id="work">
                <FeaturedWork />
            </div>

            {/* Contact CTA Section (11th Page) */}
            <div id="contact">
                <ContactCTA />
            </div>

            {/* Footer Section */}
            <Footer />

        </main>
    );
};

export default Home;
