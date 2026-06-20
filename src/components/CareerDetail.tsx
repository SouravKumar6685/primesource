import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Career } from '../lib/api';
import SEO from './SEO';

const CareerDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [career, setCareer] = useState<Career | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formState, setFormState] = useState({
        name: '', email: '', phone: '', coverLetter: '', resume: null as File | null
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCareer = async () => {
            if (!id) return;
            try {
                const data = await api.careers.getById(parseInt(id));
                setCareer(data);
            } catch (error) {
                console.error("Error fetching career:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCareer();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormState({ ...formState, resume: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate form submission delay (connect to real email service if needed)
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitting(false);
        setSubmitted(true);
    };

    const renderDescription = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            if (line.startsWith('### ')) return <h3 key={i} className="font-['Outfit'] font-bold text-lg mt-6 mb-2">{line.substring(4)}</h3>;
            if (line.startsWith('## ')) return <h2 key={i} className="font-['Outfit'] font-bold text-xl mt-8 mb-3">{line.substring(3)}</h2>;
            if (line.startsWith('- ')) return <li key={i} className="ml-5 list-disc mb-1.5 text-gray-600">{line.substring(2)}</li>;
            // Bold **text**
            const parts = line.split(/\*\*(.*?)\*\*/g);
            return (
                <p key={i} className="mb-2 leading-relaxed text-gray-600">
                    {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-black font-semibold">{part}</strong> : part)}
                </p>
            );
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-12 h-12 border-4 border-[#3bda5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!career) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#FAFAFA] text-black gap-4">
                <h1 className="font-['Outfit'] font-bold text-3xl">Role not found</h1>
                <Link to="/careers" className="text-[#3bda5c] font-bold hover:underline">← Back to Careers</Link>
            </div>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-[#FAFAFA] text-black min-h-screen">
            <SEO title={career.title} description={`${career.department} · ${career.location} · ${career.type} — Apply now at Prime Source.`} />

            <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-16">

                {/* Back Link */}
                <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    All Roles
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Left — Job Info */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-10 pb-10 border-b border-gray-200">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <span className="bg-[#3bda5c]/10 text-[#3bda5c] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    {career.department}
                                </span>
                                <span className="bg-gray-100 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    {career.type}
                                </span>
                            </div>
                            <h1 className="font-['Outfit'] font-black text-4xl md:text-5xl tracking-tighter leading-tight mb-4">
                                {career.title}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 font-['Inter'] text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {career.location}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="font-['Inter'] text-[15px] leading-relaxed">
                            {renderDescription(career.description)}
                        </div>
                    </div>

                    {/* Right — Apply Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 sticky top-32">
                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h3 className="font-['Outfit'] font-bold text-xl mb-2">Application Sent!</h3>
                                    <p className="text-gray-500 text-sm font-['Inter']">Thanks for applying. We'll be in touch within 5 business days.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-['Outfit'] font-bold text-xl mb-6">Apply for this Role</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Full Name *</label>
                                            <input
                                                required
                                                name="name"
                                                value={formState.name}
                                                onChange={handleInputChange}
                                                placeholder="Jane Smith"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-[#3bda5c] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Email Address *</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleInputChange}
                                                placeholder="jane@example.com"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-[#3bda5c] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formState.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-[#3bda5c] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Resume / CV *</label>
                                            <label className="flex items-center gap-3 w-full bg-gray-50 border border-gray-200 border-dashed rounded-lg px-4 py-3 text-sm text-gray-400 hover:border-[#3bda5c] transition-colors cursor-pointer">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                <span className="truncate">{formState.resume ? formState.resume.name : 'Upload PDF or DOC'}</span>
                                                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
                                            </label>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Cover Letter</label>
                                            <textarea
                                                name="coverLetter"
                                                value={formState.coverLetter}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Tell us why you're a great fit..."
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-[#3bda5c] transition-colors resize-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-black text-white font-['Outfit'] font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-[#3bda5c] hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {submitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Submitting...
                                                </>
                                            ) : 'Submit Application'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CareerDetail;
