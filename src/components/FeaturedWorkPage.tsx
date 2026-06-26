import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { FeaturedWorkProject } from '../lib/api';
import SEO from './SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWorkPage: React.FC = () => {
    const [projects, setProjects] = useState<FeaturedWorkProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.featuredWork.getAll();
                setProjects(data || []);
            } catch (error) {
                console.error("Error fetching featured work:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            gsap.fromTo(".work-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".work-grid",
                        start: "top 80%"
                    }
                }
            );
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-white text-[#111618]">
                <div className="w-12 h-12 border-4 border-[#3bda5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-white text-[#111618] min-h-screen" data-scroll-section>
            <SEO
                title="Our Work | Featured Projects"
                description="Explore our portfolio of featured case studies and projects."
            />
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">

                {/* Header Container */}
                <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-8">
                    <h1 className="font-['Outfit'] font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase leading-none">
                        Our <br /> Work
                    </h1>
                    <span className="hidden md:inline-block font-mono text-sm font-bold uppercase tracking-widest text-[#3bda5c] bg-[#3bda5c]/10 px-4 py-2 rounded-sm">
                        All Projects ({projects.length})
                    </span>
                </div>

                {/* Work Grid */}
                <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {projects.map((project) => (
                        <Link
                            to={`/work/${project.slug || project.id}`}
                            key={project.id}
                            className="work-card group block"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-[#f2f4f5]">
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>
                            <div>
                                <span className="font-['Courier_New',monospace] text-gray-500 font-bold text-sm block mb-4 uppercase tracking-widest">
                                    {project.category}
                                </span>
                                <h3 className="font-['Outfit'] font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-tighter mb-4 group-hover:text-[#3bda5c] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="font-['Inter'] text-gray-600 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-gray-300 rounded-2xl bg-[#f2f4f5]">
                        <p className="text-gray-500 font-['Inter'] font-semibold">No featured work found. Add some from the admin panel!</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default FeaturedWorkPage;
