import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Blog as BlogType } from '../lib/api';
import SEO from './SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await api.blogs.getAll();
                setBlogs(data || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            gsap.fromTo(".blog-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".blog-grid",
                        start: "top 80%"
                    }
                }
            );
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-[#FAFAFA] text-black">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-[#FAFAFA] text-black min-h-screen" data-scroll-section>
            <SEO
                title="Insights & Perspectives"
                description="Read our latest thoughts on technology, design, and business strategy."
            />
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">

                {/* Header Container */}
                <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-8">
                    <h1 className="font-['Outfit'] font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase leading-none">
                        Insights & <br /> Perspectives
                    </h1>
                    <span className="hidden md:inline-block font-mono text-sm font-bold uppercase tracking-widest text-[#6B31F7] bg-[#EBE2FF] px-4 py-2 rounded-sm">
                        All Articles ({blogs.length})
                    </span>
                </div>

                {/* Blog Grid */}
                <div className="blog-grid flex flex-wrap -mx-4">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-12">
                            <Link to={`/blog/${blog.slug}`} className="blog-card block group cursor-pointer">

                                {/* Image Container */}
                                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative bg-gray-100 shadow-sm border border-gray-100">
                                    <img
                                        src={blog.left_image_2 || blog.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Hover Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

                                    {/* Hover Text Content (Bottom Left) */}
                                    <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col justify-end items-start opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                                        <span className="text-white/80 font-['Inter'] font-semibold text-xs tracking-wide uppercase mb-1">
                                            {blog.category || 'INSPIRE'}
                                        </span>
                                        <h3 className="text-white font-['Inter'] font-medium text-xl md:text-2xl leading-tight line-clamp-2">
                                            {blog.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Metadata Below Image (Avatar + Author Only) */}
                                <div className="flex items-center gap-3 px-1 mt-3">
                                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author || 'Admin')}&background=333&color=fff&size=64`}
                                            alt={blog.author || 'Admin'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-['Inter'] font-semibold text-[14px] text-gray-900 leading-none">
                                        {blog.author || 'Admin'}
                                    </span>

                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-gray-300 rounded-2xl bg-white">
                        <p className="text-gray-500 font-['Inter'] font-semibold">No articles found. Add some from the admin panel!</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Blog;
