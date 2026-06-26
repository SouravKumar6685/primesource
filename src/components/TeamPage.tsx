import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const teamMembers = [
    { name: 'Suraj Singh', role: 'Executive Leadership', color: 'from-blue-100 to-indigo-50', iconColor: 'text-indigo-600', initial: 'SS' },
    { name: 'Sourav Kumar Singh', role: 'Technical Leadership', color: 'from-emerald-100 to-teal-50', iconColor: 'text-teal-600', initial: 'SK' },
    { name: 'Kushal Singh', role: 'Operations', color: 'from-orange-100 to-amber-50', iconColor: 'text-orange-600', initial: 'KS' },
    { name: 'Ravi Kumar', role: 'Engineering', color: 'from-rose-100 to-pink-50', iconColor: 'text-rose-600', initial: 'RK' },
    { name: 'Nehal Kumar Singh', role: 'Product Management', color: 'from-purple-100 to-fuchsia-50', iconColor: 'text-fuchsia-600', initial: 'NK' }
];

const TeamPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            gsap.fromTo(".page-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            gsap.fromTo(".team-card",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.4
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#FFFFFF] text-gray-900 pt-32 pb-24 px-8" data-scroll-section>
            <style>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                * {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                /* Inverse nav for light page */
                nav {
                    mix-blend-mode: exclusion !important;
                }
            `}</style>
            
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-24 page-title">
                    <h1 className="text-5xl md:text-7xl font-['Outfit'] font-black mb-6 tracking-tight text-gray-900">
                        Meet Our Team
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-['Inter'] leading-relaxed">
                        The brilliant minds behind our innovative solutions. We bring together diverse expertise to solve complex challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="team-card group relative flex flex-col items-center bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-500"
                        >
                            {/* Card Shadow/Glow Effect */}
                            <div className="absolute inset-0 bg-gray-50 rounded-3xl -z-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500 border border-gray-100"></div>
                            
                            {/* Avatar Circle */}
                            <div className={`w-32 h-32 rounded-full mb-8 relative flex items-center justify-center bg-gradient-to-br ${member.color} shadow-inner overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                                <span className={`font-['Outfit'] text-4xl font-black ${member.iconColor} opacity-70`}>
                                    {member.initial}
                                </span>
                            </div>

                            {/* Info */}
                            <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                                {member.name}
                            </h3>
                            <div className="px-4 py-1.5 rounded-full bg-gray-100 mb-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                                    {member.role}
                                </p>
                            </div>

                            {/* Socials / Links (mock) */}
                            <div className="flex gap-4 mt-auto">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#0077b5] hover:bg-blue-50 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
