import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { services } from './Services';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(".page-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            gsap.fromTo(".service-card-item",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#111618] text-white pt-32 pb-24 px-8" data-scroll-section>
            <style>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                * {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-20 page-title">
                    <h1 className="text-5xl md:text-6xl font-['Outfit'] font-bold mb-6">Our Services</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-['Inter']">
                        Comprehensive solutions tailored to elevate your business. Discover how our expertise can drive your success forward.
                    </p>
                </div>

                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedService(service)}
                            className="service-card-item group relative flex flex-col items-start gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ea2b4f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                                {React.cloneElement(service.icon as React.ReactElement<any>, {
                                    className: "w-16 h-16 [&>path]:stroke-white [&>rect]:stroke-white [&>circle]:stroke-white",
                                    fill: "none"
                                })}
                            </div>

                            <div className="relative z-10 w-full">
                                <h3 className="font-['Outfit'] font-semibold text-xl mb-3 text-white group-hover:text-[#ea2b4f] transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <div className="h-[2px] w-12 bg-[#ea2b4f] mb-4 transform origin-left transition-all duration-300 group-hover:w-full" />
                                <p className="text-sm text-gray-400 font-['Inter'] leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="absolute top-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <svg className="w-6 h-6 text-[#ea2b4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <button 
                        onClick={() => navigate('/faq')}
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full px-8 py-4 font-semibold font-['Inter'] transition-all duration-300 flex items-center gap-3 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#ea2b4f]/20 flex items-center justify-center group-hover:bg-[#ea2b4f]/30 transition-colors">
                            <svg className="w-4 h-4 text-[#ea2b4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        Frequently Asked Questions
                    </button>
                </div>
            </div>

            {/* Slide-in Drawer Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${selectedService ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setSelectedService(null)}
            />

            {/* Slide-in Drawer */}
            <div
                data-lenis-prevent
                className={`fixed top-0 right-0 h-full w-full md:w-[40%] bg-[#111618] border-l border-white/10 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${selectedService ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
            >
                {selectedService && (
                    <div className="flex flex-col h-full text-white">
                        {/* Drawer Header */}
                        <div className="flex items-start justify-between p-8 border-b border-white/10">
                            <div className="flex items-center gap-4">

                                <div>
                                    <h2 className="text-2xl font-bold text-white font-['Outfit']">{selectedService.title}</h2>
                                    <p className="text-sm text-gray-400 mt-1">{selectedService.subtitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedService(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="p-8 flex-1 flex flex-col gap-8">
                            {/* What it does */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">What It Does</h3>
                                <p className="text-gray-400 text-[15px] leading-relaxed">
                                    {selectedService.whatItDoes}
                                </p>
                            </div>

                            {/* Features */}
                            {selectedService.features.map((feature, idx) => (
                                <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        {/* <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xl">

                                        </div> */}
                                        <h4 className="font-bold text-white">{feature.title}</h4>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}

                            {/* Business Impact */}
                            <div className="mt-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Business Impact</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {selectedService.impacts.map((impact, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
                                            <svg className="w-5 h-5 text-[#ea2b4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={impact.icon} />
                                            </svg>
                                            <span className="text-xs font-semibold text-white">{impact.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer Actions */}
                        <div className="p-8 border-t border-white/10 flex gap-4">
                            <button className="flex-1 bg-[#ea2b4f] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#c22040] transition-colors">
                                Request Demo
                            </button>
                            <button className="flex-1 bg-transparent text-white border border-white/20 py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                                Talk to Sales
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;
