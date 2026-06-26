import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Insight } from '../lib/api';
import SEO from './SEO';

const InsightDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [insight, setInsight] = useState<Insight | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInsight = async () => {
            if (!slug) return;
            try {
                // If the user uses the ID as the slug, getBySlug might fail if it expects a string slug. 
                // We'll try getBySlug, and if we add a getById later we could fallback.
                let data = await api.insights.getBySlug(slug);
                if (!data) {
                    data = await api.insights.getById(slug);
                }
                setInsight(data);
            } catch (error) {
                console.error("Error fetching insight detail:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInsight();
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

            // Bold parsing: replace *word* with <strong>word</strong>
            const parts = parsedLine.split('*');
            const elements = parts.map((part, index) => {
                if (index % 2 === 1) { // It's bold
                    return <strong key={index} className="text-white font-semibold">{part}</strong>;
                }
                return part;
            });

            if (isH1) return <h1 key={i} className="font-['Outfit'] font-black text-4xl md:text-5xl mt-16 mb-8 uppercase tracking-tighter leading-none text-white">{elements}</h1>;
            if (isH2) return <h2 key={i} className="font-['Outfit'] font-bold text-2xl md:text-3xl mt-12 mb-6 tracking-tight text-white">{elements}</h2>;
            if (isH3) return <h3 key={i} className="font-['Outfit'] font-bold text-xl md:text-2xl mt-8 mb-4 tracking-tight text-white">{elements}</h3>;

            return <p key={i} className="mb-6 leading-relaxed text-gray-300 text-[1.1rem] md:text-[1.2rem]">{elements}</p>;
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
                <div className="w-12 h-12 border-4 border-[#3bda5c] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!insight) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-8">
                <h1 className="font-['Outfit'] font-bold text-4xl mb-8 text-center tracking-tighter">Insight Not Found</h1>
                <Link to="/insights" className="text-[#3bda5c] font-['Inter'] font-semibold text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Return to Insights &rarr;
                </Link>
            </div>
        );
    }

    const categoryName = insight.category || 'INSIGHT';

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-['Inter'] flex flex-col lg:flex-row border-t border-white/5">
            <SEO
                title={insight.title}
                description={insight.content ? insight.content.replace(/[#*`_~>\[\]]/g, '').substring(0, 160) + '...' : insight.title}
                image={insight.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000'}
            />
            {/* LEFT SIDEBAR - Sticky (Desktop) */}
            <div className="lg:w-[45%] lg:h-screen lg:sticky lg:top-0 lg:border-r border-white/10 flex">
                <div className="flex-1 p-6 md:p-12 lg:p-16 pt-24 md:pt-32 lg:pt-32 flex flex-col justify-center h-full overflow-hidden bg-[#111618] relative">

                    <div className="flex justify-between items-start mb-12 lg:mb-0 lg:absolute lg:top-24 lg:left-16 lg:right-16 z-30">
                        <Link to="/insights" className="font-semibold text-sm hover:opacity-60 transition-opacity text-gray-400">&larr; Back to Insights</Link>
                    </div>

                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center -mt-10">
                        <div className="absolute z-10 w-[80%] lg:w-[85%] shadow-2xl rounded-sm overflow-hidden">
                            <img src={insight.image_url} alt={insight.title} className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className="font-['Outfit'] font-bold text-xs tracking-[0.15em] uppercase text-gray-400 mt-8 lg:absolute lg:bottom-12 lg:left-16 z-30 flex items-center gap-4">
                        <span className="text-[#3bda5c]">{categoryName}</span>
                        <span>&bull;</span>
                        <span>{insight.date}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANE - Scrollable Content */}
            <div className="lg:w-[55%] min-h-screen px-6 py-8 md:px-16 md:py-16 pt-24 md:pt-32 lg:pt-32 xl:px-24">
                <article className="max-w-3xl mx-auto xl:mx-0">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="bg-[#3bda5c]/10 text-[#3bda5c] px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm">
                            {categoryName}
                        </span>
                        <span className="font-mono text-[10px] md:text-sm font-semibold uppercase tracking-widest text-gray-400">
                            ( {insight.date} )
                        </span>
                    </div>

                    <h1 className="font-['Outfit'] font-black text-4xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tighter mb-16 uppercase break-words text-white">
                        {insight.title}
                    </h1>

                    <div className="font-['Inter']">
                        {insight.content ? renderMarkdown(insight.content) : (
                            <div className="p-8 border border-white/10 rounded-sm text-center text-gray-400">
                                <p>Content coming soon.</p>
                            </div>
                        )}
                    </div>

                    {/* Meta Footer */}
                    <div className="mt-32 pt-12 border-t border-white/10 text-sm font-semibold text-gray-500 uppercase tracking-widest flex justify-between items-center">
                        <div>Written by {insight.author || 'Admin'}</div>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default InsightDetail;
