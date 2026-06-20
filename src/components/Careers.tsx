import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Career } from '../lib/api';
import SEO from './SEO';

const ITEMS_PER_PAGE = 10;

const Careers: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const data = await api.careers.getAll();
                const activePostings = (data || []).filter(c => c.is_active);
                setCareers(activePostings);
            } catch (error) {
                console.error("Error fetching careers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCareers();
    }, []);

    const totalPages = Math.ceil(careers.length / ITEMS_PER_PAGE);
    const paginatedCareers = careers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-12 h-12 border-4 border-[#3bda5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-[#FAFAFA] text-black min-h-screen">
            <SEO
                title="Careers"
                description="Join Prime Source. Explore open roles in engineering, cloud, AI, and more. Build systems that accelerate the future."
            />

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">

                {/* Hero Header */}
                <div className="mb-16">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3bda5c] font-bold mb-4">
                        We're Hiring
                    </p>
                    <h1 className="font-['Outfit'] font-black text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                        Join the<br />Team.
                    </h1>
                    <p className="font-['Inter'] text-gray-500 max-w-lg text-lg leading-relaxed">
                        We're always looking for talented individuals passionate about building the future — with purpose, precision, and real impact.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between border-t border-b border-gray-200 py-5 mb-12">
                    <span className="font-['Inter'] text-sm text-gray-500">
                        Showing <strong className="text-black">{paginatedCareers.length}</strong> of <strong className="text-black">{careers.length}</strong> open roles
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#3bda5c] font-bold">
                        Now Hiring
                    </span>
                </div>

                {/* Cards Grid */}
                {careers.length === 0 ? (
                    <div className="text-center py-32 border border-dashed border-gray-200 rounded-xl bg-white">
                        <p className="text-gray-400 font-['Inter']">No open roles right now. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {paginatedCareers.map((career) => (
                            <Link
                                key={career.id}
                                to={`/careers/${career.id}`}
                                className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-[#3bda5c] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="bg-gray-100 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                            {career.department}
                                        </span>
                                        <span className="bg-gray-100 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                            {career.type}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="font-['Outfit'] font-bold text-2xl tracking-tight mb-3 group-hover:text-[#3bda5c] transition-colors leading-snug">
                                        {career.title}
                                    </h2>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-['Inter']">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {career.location}
                                    </div>
                                </div>

                                {/* CTA Arrow */}
                                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#3bda5c] transition-colors">
                                        View Role
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#3bda5c] transition-colors flex items-center justify-center">
                                        <svg className="w-4 h-4 -rotate-45 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-16">
                        <button
                            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            disabled={currentPage === 1}
                            className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-['Outfit'] font-bold uppercase tracking-wider disabled:opacity-30 hover:border-black transition-colors"
                        >
                            ← Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className={`w-10 h-10 rounded-full text-sm font-['Outfit'] font-bold transition-all ${currentPage === page
                                        ? 'bg-black text-white'
                                        : 'border border-gray-200 text-gray-600 hover:border-black'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            disabled={currentPage === totalPages}
                            className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-['Outfit'] font-bold uppercase tracking-wider disabled:opacity-30 hover:border-black transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Careers;
