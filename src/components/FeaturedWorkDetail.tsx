import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { FeaturedWorkProject } from '../lib/api';
import SEO from './SEO';

const FeaturedWorkDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<FeaturedWorkProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!slug) return;
            try {
                const data = await api.featuredWork.getBySlug(slug);
                setProject(data);
            } catch (error) {
                console.error("Error fetching project detail:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;

            let parsedLine = line;
            let isH1 = false;
            let isH2 = false;
            let isH3 = false;

            if (parsedLine.startsWith('### ')) {
                isH3 = true;
                parsedLine = parsedLine.substring(4);
            } else if (parsedLine.startsWith('## ')) {
                isH2 = true;
                parsedLine = parsedLine.substring(3);
            } else if (parsedLine.startsWith('# ')) {
                isH1 = true;
                parsedLine = parsedLine.substring(2);
            }

            const parts = parsedLine.split('*');
            const elements = parts.map((part, index) => {
                if (index % 2 === 1) { 
                    return <strong key={index} className="text-black font-semibold">{part}</strong>;
                }
                return part;
            });

            if (isH1) return <h1 key={i} className="font-['Outfit'] font-black text-4xl md:text-5xl mt-16 mb-8 uppercase tracking-tighter leading-none">{elements}</h1>;
            if (isH2) return <h2 key={i} className="font-['Outfit'] font-bold text-2xl md:text-3xl mt-12 mb-6 tracking-tight">{elements}</h2>;
            if (isH3) return <h3 key={i} className="font-['Outfit'] font-bold text-xl md:text-2xl mt-8 mb-4 tracking-tight">{elements}</h3>;

            return <p key={i} className="mb-6 leading-relaxed text-gray-800 text-[1.1rem] md:text-[1.2rem]">{elements}</p>;
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-[#111618]">
                <div className="w-12 h-12 border-4 border-[#3bda5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#111618] px-8">
                <h1 className="font-['Outfit'] font-bold text-4xl mb-8 text-center tracking-tighter">Project Not Found</h1>
                <Link to="/work" className="text-[#3bda5c] font-['Inter'] font-semibold text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Return to Work â†—
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-[#111618] font-['Inter'] flex flex-col lg:flex-row border-t border-gray-100">
            <SEO
                title={project.title}
                description={project.description || ''}
                image={project.image_url}
            />
            {/* LEFT SIDEBAR - Sticky (Desktop) */}
            <div className="lg:w-[45%] lg:h-screen lg:sticky lg:top-0 lg:border-r border-gray-200 flex">
                <div className="flex-1 p-6 md:p-12 lg:p-16 pt-24 md:pt-32 lg:pt-32 flex flex-col justify-center h-full overflow-hidden bg-[#f2f4f5] relative">

                    <div className="flex justify-between items-start mb-12 lg:mb-0 lg:absolute lg:top-24 lg:left-16 lg:right-16 z-30">
                        <Link to="/work" className="font-semibold text-sm hover:opacity-60 transition-opacity text-gray-500">â†  Back to All Work</Link>
                    </div>

                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center -mt-10">
                        <div className="absolute z-10 w-[80%] lg:w-[85%] shadow-2xl rounded-sm overflow-hidden">
                            <img src={project.image_url} alt={project.title} className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className="font-['Outfit'] font-bold text-xs tracking-[0.15em] uppercase text-gray-500 mt-8 lg:absolute lg:bottom-12 lg:left-16 z-30 flex items-center gap-4">
                        <span className="text-[#3bda5c]">{project.category}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANE - Scrollable Content */}
            <div className="lg:w-[55%] min-h-screen px-6 py-8 md:px-16 md:py-16 pt-24 md:pt-32 lg:pt-32 xl:px-24">
                <article className="max-w-3xl mx-auto xl:mx-0">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="bg-[#3bda5c]/10 text-[#3bda5c] px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm">
                            {project.category}
                        </span>
                    </div>

                    <h1 className="font-['Outfit'] font-black text-4xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tighter mb-8 uppercase break-words">
                        {project.title}
                    </h1>

                    {project.description && (
                        <p className="font-['Inter'] text-gray-500 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl">
                            {project.description}
                        </p>
                    )}

                    <div className="font-['Inter']">
                        {project.content ? renderMarkdown(project.content) : (
                            <div className="p-8 border border-gray-200 rounded-sm text-center text-gray-500">
                                <p>Detailed case study coming soon.</p>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </main>
    );
};

export default FeaturedWorkDetail;
