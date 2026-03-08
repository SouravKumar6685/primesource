import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    category: string;
    title: string;
    description?: string;
    imageUrl: string;
    isFeatured?: boolean;
    slug: string;
}

const projects: Project[] = [
    {
        id: 1,
        slug: "gamifying-ai",
        category: "Featured Projects",
        title: "Gamifying AI",
        description: "We created a first-of-its-kind robotic air hockey table that modernizes a classic arcade game with AI control systems.",
        imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop",
        isFeatured: true
    },
    {
        id: 2,
        slug: "team-nation",
        category: "MOONSHOT SPORTS",
        title: "Team Nation learning platform",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 3,
        slug: "cobot-remote",
        category: "FRESH LABS",
        title: "Cobot Remote",
        imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 4,
        slug: "touchscreen-ui",
        category: "MIDDLEBY",
        title: "Touchscreen UI & Product Unification",
        imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1200&auto=format&fit=crop"
    }
];

const FeaturedWork: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(".work-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Stagger reveal project cards
            gsap.fromTo(".work-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".work-grid-container",
                        start: "top 75%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Custom Cursor Follower Logic
            const cursor = cursorRef.current;
            if (cursor) {
                const onMouseMove = (e: MouseEvent) => {
                    gsap.to(cursor, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.1,
                        ease: "power2.out"
                    });
                };

                window.addEventListener("mousemove", onMouseMove);
                return () => window.removeEventListener("mousemove", onMouseMove);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const featuredProject = projects.find(p => p.isFeatured);
    const secondaryProjects = projects.filter(p => !p.isFeatured);

    return (
        <section ref={sectionRef} className="w-full bg-white text-[#111618] py-24 px-8 md:px-16 relative overflow-hidden" data-scroll-section>

            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-16 h-16 rounded-full bg-[#3bda5c] text-white flex items-center justify-center pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${isHovering ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-50 invisible'}`}
                style={{ position: 'fixed', left: 0, top: 0 }}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>

            <div className="max-w-[1400px] mx-auto w-full">

                {/* Header */}
                <div className="work-header flex justify-between items-end mb-16">
                    <h2 className="font-['Outfit'] font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
                        Featured Work
                    </h2>
                    <Link to="/work" className="text-[#3bda5c] font-['Outfit'] font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-2 hover:opacity-70 transition-opacity">
                        All Work
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                <div className="work-grid-container px-2">
                    {/* Main Hero Card */}
                    {featuredProject && (
                        <Link
                            to={`/work/${featuredProject.slug}`}
                            className="work-card relative w-full mb-16 group block overflow-hidden rounded-3xl cursor-none"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <div className="bg-[#f2f4f5] flex flex-col lg:flex-row items-center min-h-[500px] lg:min-h-[600px]">
                                {/* Left Content */}
                                <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1">
                                    <span className="font-['Courier_New',monospace] text-gray-400 text-sm md:text-base font-bold mb-6 block">
                                        {featuredProject.category}
                                    </span>
                                    <h3 className="font-['Outfit'] font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1] mb-8 tracking-tighter">
                                        {featuredProject.title}
                                    </h3>
                                    <p className="font-['Inter'] text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
                                        {featuredProject.description}
                                    </p>
                                </div>
                                {/* Right Image */}
                                <div className="w-full lg:w-1/2 h-full order-1 lg:order-2 self-stretch overflow-hidden">
                                    <img
                                        src={featuredProject.imageUrl}
                                        alt={featuredProject.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Secondary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {secondaryProjects.map((project) => (
                            <Link
                                to={`/work/${project.slug}`}
                                key={project.id}
                                className="work-card group block cursor-none"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-[#f2f4f5]">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <div className="px-2">
                                    <span className="font-['Courier_New',monospace] text-gray-400 text-xs md:text-sm tracking-widest uppercase mb-3 block font-bold">
                                        {project.category}
                                    </span>
                                    <h4 className="font-['Outfit'] font-bold text-2xl md:text-3xl lg:text-4xl text-[#111618]">
                                        {project.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedWork;
