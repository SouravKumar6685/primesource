import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
    'AWS', 'Azure', 'GCP', 'Microsoft 360', 'Salesforce', 'PySpark', 
    'Snowflake', 'Databricks', 'React', 'Node.js', 'Python', 'Kubernetes'
];

const stats = [
    { label: 'Years of Excellence', value: '3+' },
    { label: 'Projects Delivered', value: '25+' },
    { label: 'Talented Employees', value: '25+' },
    { label: 'Industries Served', value: '12+' },
];

const AboutPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(".hero-text",
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" }
            );

            // Stats Animation
            gsap.fromTo(".stat-card",
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".stats-section",
                        start: "top 80%",
                    }
                }
            );

            // Vision/Mission Animation
            gsap.fromTo(".vision-mission-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".vision-mission-section",
                        start: "top 75%",
                    }
                }
            );

            // What We Do Animation
            gsap.fromTo(".what-we-do-card",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".what-we-do-section",
                        start: "top 80%",
                    }
                }
            );

            // Partners Animation
            gsap.fromTo(".partner-pill",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".partners-section",
                        start: "top 85%",
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#111618] text-white pt-32 pb-24" data-scroll-section>
            <style>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                * {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            {/* Section 1: Hero & Legacy */}
            <section className="min-h-[80vh] flex flex-col justify-center px-8 max-w-[1400px] mx-auto relative mb-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3bda5c]/5 rounded-full blur-[120px] pointer-events-none"></div>
                <h4 className="hero-text text-[#3bda5c] font-['Outfit'] font-bold tracking-[0.2em] uppercase mb-6">Our Legacy</h4>
                <h1 className="hero-text text-5xl md:text-7xl lg:text-[6rem] font-['Outfit'] font-black leading-[1.1] mb-8">
                    3 Years of <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3bda5c] to-[#28b546]">Innovation & Excellence.</span>
                </h1>
                <p className="hero-text text-gray-400 text-lg md:text-2xl font-['Inter'] max-w-3xl leading-relaxed">
                    Since our inception 3 years ago, Primesource has been at the forefront of digital transformation. We build powerful software, modernize infrastructures, and engineer data solutions that drive real business impact.
                </p>
            </section>

            {/* Section 2: Stats */}
            <section className="stats-section px-8 py-24 bg-[#1a2124] mb-24">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="stat-card flex flex-col items-center justify-center p-8 bg-[#111618] border border-white/5 rounded-3xl hover:border-[#3bda5c]/30 transition-colors duration-500">
                                <h3 className="text-5xl md:text-6xl font-['Outfit'] font-black text-[#3bda5c] mb-4">{stat.value}</h3>
                                <p className="text-gray-400 font-['Inter'] text-sm md:text-base uppercase tracking-widest text-center">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Vision & Mission */}
            <section className="vision-mission-section px-8 py-24 max-w-[1400px] mx-auto mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Vision */}
                    <div className="vision-mission-card bg-gradient-to-br from-[#1a2124] to-[#111618] p-12 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>
                        <h2 className="text-4xl font-['Outfit'] font-bold mb-6 text-white">Our Vision</h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-['Inter']">
                            To be the global catalyst for technological advancement, empowering businesses to thrive in a digital-first world through cutting-edge, scalable, and intelligent software solutions. We envision a future where complex problems are solved seamlessly.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="vision-mission-card bg-gradient-to-bl from-[#1a2124] to-[#111618] p-12 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3bda5c]/10 rounded-full blur-[80px] group-hover:bg-[#3bda5c]/20 transition-colors duration-700"></div>
                        <h2 className="text-4xl font-['Outfit'] font-bold mb-6 text-white">Our Mission</h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-['Inter']">
                            We are committed to delivering exceptional engineering quality. Our mission is to partner with forward-thinking enterprises, understand their unique challenges, and construct robust architectures that drive efficiency, growth, and lasting value.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4: What We Do */}
            <section className="what-we-do-section px-8 py-24 bg-[#1a2124] mb-24">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-16 text-center text-white">What We Do</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="what-we-do-card bg-[#111618] p-8 rounded-2xl border border-white/5 hover:border-[#3bda5c]/30 transition-colors duration-300">
                            <div className="w-8 h-1 bg-[#ff9933] mb-6 rounded-full"></div>
                            <h3 className="text-2xl font-['Outfit'] font-bold text-white mb-4">We Bring Customers to You</h3>
                            <p className="text-gray-400 font-['Inter'] leading-relaxed text-sm">
                                Leverage AI-powered lead generation tools and our LinkedIn Super Engine for intelligent targeting that delivers qualified, conversion-ready leads.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="what-we-do-card bg-[#111618] p-8 rounded-2xl border border-white/5 hover:border-[#3bda5c]/30 transition-colors duration-300">
                            <div className="w-8 h-1 bg-[#ff9933] mb-6 rounded-full"></div>
                            <h3 className="text-2xl font-['Outfit'] font-bold text-white mb-4">We Enhance Your Brand</h3>
                            <p className="text-gray-400 font-['Inter'] leading-relaxed text-sm">
                                Optimize company profiles for credibility and visibility, crafting compelling narratives that attract attention in your target markets.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="what-we-do-card bg-[#111618] p-8 rounded-2xl border border-white/5 hover:border-[#3bda5c]/30 transition-colors duration-300">
                            <div className="w-8 h-1 bg-[#ff9933] mb-6 rounded-full"></div>
                            <h3 className="text-2xl font-['Outfit'] font-bold text-white mb-4">We Arrange Key Meetings</h3>
                            <p className="text-gray-400 font-['Inter'] leading-relaxed text-sm">
                                Set up direct interactions with CXOs and decision-makers, building pipelines that lead to faster deal closures.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="what-we-do-card bg-[#111618] p-8 rounded-2xl border border-white/5 hover:border-[#3bda5c]/30 transition-colors duration-300">
                            <div className="w-8 h-1 bg-[#ff9933] mb-6 rounded-full"></div>
                            <h3 className="text-2xl font-['Outfit'] font-bold text-white mb-4">We Use Proven Methods</h3>
                            <p className="text-gray-400 font-['Inter'] leading-relaxed text-sm">
                                Apply research-driven client identification, strategic connect and engage processes, and industry-focused sales intelligence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Technologies & Partners */}
            <section className="partners-section px-8 py-24 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-6">Technologies & Partners</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-['Inter']">
                        We leverage the world's most powerful platforms and modern tech stacks to build enterprise-grade applications.
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {partners.map((partner, idx) => (
                        <div 
                            key={idx} 
                            className="partner-pill px-8 py-4 bg-[#1a2124] border border-white/10 rounded-full hover:bg-white hover:text-[#111618] transition-all duration-300 cursor-default"
                        >
                            <span className="font-['Outfit'] font-bold text-lg">{partner}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
