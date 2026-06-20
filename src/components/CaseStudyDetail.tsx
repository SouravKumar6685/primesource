import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { CaseStudy } from '../lib/api';
import SEO from './SEO';

const CaseStudyDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [cs, setCS] = useState<CaseStudy | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCS = async () => {
            if (!slug) return;
            try {
                const data = await api.caseStudies.getBySlug(slug);
                setCS(data);
            } catch (error) {
                console.error("Error fetching case study detail:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCS();
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
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] text-black">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!cs) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] text-black px-8">
                <h1 className="font-['Outfit'] font-bold text-4xl mb-8 text-center tracking-tighter">Case Study Not Found</h1>
                <Link to="/case-studies" className="text-black font-['Inter'] font-semibold text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Return to Work ↗
                </Link>
            </div>
        );
    }

    const services = cs.services || 'Design & Engineering';
    const client = cs.client || 'Client';
    const year = cs.year || '2024';

    const renderLeftImages = () => {
        const hasLeft1 = !!cs.left_image_1;
        const hasLeft2 = !!cs.left_image_2;
        const hasLeft3 = !!cs.left_image_3;
        const layout = cs.hero_layout || 'offset-grid';

        if (!hasLeft1 && !hasLeft2 && !hasLeft3) {
            return (
                <div className="aspect-[4/5] md:aspect-square lg:aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl border border-gray-200">
                    <img
                        src={cs.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000'}
                        alt={cs.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            );
        }

        switch (layout) {
            case 'single-center':
                return (
                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center -mt-10">
                        {hasLeft2 && (
                            <div className="w-[80%] shadow-2xl">
                                <img src={cs.left_image_2} alt="Center Large" className="w-full h-auto object-cover rounded-sm" />
                            </div>
                        )}
                    </div>
                );
            case 'split-vertical':
                return (
                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] flex gap-4 items-center justify-center -mt-10">
                        {hasLeft1 && (
                            <div className="w-1/2 h-[80%] shadow-xl">
                                <img src={cs.left_image_1} alt="Left Split" className="w-full h-full object-cover rounded-sm" />
                            </div>
                        )}
                        {hasLeft2 && (
                            <div className="w-1/2 h-[80%] shadow-xl">
                                <img src={cs.left_image_2} alt="Right Split" className="w-full h-full object-cover rounded-sm" />
                            </div>
                        )}
                    </div>
                );
            case 'masonry':
                return (
                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] flex gap-4 items-center justify-center -mt-10">
                        {hasLeft1 && (
                            <div className="w-1/2 h-[90%] shadow-xl relative overflow-hidden rounded-sm">
                                <img src={cs.left_image_1} alt="Masonry Tall" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="w-1/2 h-[90%] flex flex-col gap-4">
                            {hasLeft2 && (
                                <div className="h-1/2 w-full shadow-lg relative overflow-hidden rounded-sm">
                                    <img src={cs.left_image_2} alt="Masonry Top" className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                            )}
                            {hasLeft3 && (
                                <div className="h-1/2 w-full shadow-lg relative overflow-hidden rounded-sm">
                                    <img src={cs.left_image_3} alt="Masonry Bottom" className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'full-bleed':
                return (
                    <div className="absolute inset-0 w-full h-full z-0">
                        {hasLeft2 && (
                            <img src={cs.left_image_2} alt="Full Bleed" className="w-full h-full object-cover opacity-90" />
                        )}
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
                    </div>
                );
            case 'staircase':
                return (
                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] -mt-10">
                        {hasLeft1 && (
                            <div className="absolute top-[10%] left-[5%] w-[45%] shadow-xl">
                                <img src={cs.left_image_1} alt="Staircase 1" className="w-full h-auto object-cover rounded-sm" />
                            </div>
                        )}
                        {hasLeft2 && (
                            <div className="absolute top-[35%] left-[25%] w-[45%] shadow-2xl z-10">
                                <img src={cs.left_image_2} alt="Staircase 2" className="w-full h-auto object-cover rounded-sm" />
                            </div>
                        )}
                        {hasLeft3 && (
                            <div className="absolute top-[60%] left-[45%] w-[45%] shadow-xl z-20">
                                <img src={cs.left_image_3} alt="Staircase 3" className="w-full h-auto object-cover rounded-sm" />
                            </div>
                        )}
                    </div>
                );
            case 'offset-grid':
            default:
                return (
                    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center -mt-10">
                        {/* Center Big Image (Image 2) */}
                        {hasLeft2 && (
                            <div className="absolute z-10 w-[60%] lg:w-[65%] shadow-2xl">
                                <img src={cs.left_image_2} alt="Center Large" className="w-full h-auto object-cover" />
                            </div>
                        )}
                        {/* Left Medium Image (Image 1) */}
                        {hasLeft1 && (
                            <div className="absolute z-0 left-0 top-[10%] w-[35%] lg:w-[40%] shadow-xl opacity-90 mix-blend-multiply">
                                <img src={cs.left_image_1} alt="Side Medium 1" className="w-full h-auto object-cover grayscale-[20%]" />
                            </div>
                        )}
                        {/* Right Medium Image (Image 3) */}
                        {hasLeft3 && (
                            <div className="absolute z-20 right-0 bottom-[10%] w-[35%] lg:w-[40%] shadow-2xl border-4 border-[#FAFAFA]">
                                <img src={cs.left_image_3} alt="Side Medium 2" className="w-full h-auto object-cover" />
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-black font-['Inter'] flex flex-col lg:flex-row border-t border-[#FAFAFA]">
            <SEO
                title={cs.title}
                description={cs.content.replace(/[#*`_~>\[\]]/g, '').substring(0, 160) + '...'}
                image={cs.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000'}
            />
            {/* LEFT SIDEBAR - Sticky (Desktop) */}
            <div className="lg:w-[45%] lg:h-screen lg:sticky lg:top-0 lg:border-r border-gray-200 flex">
                <div className="flex-1 p-6 md:p-12 lg:p-16 pt-24 md:pt-32 lg:pt-32 flex flex-col justify-center h-full overflow-hidden bg-white/50 backdrop-blur-sm relative">

                    <div className="flex justify-between items-start mb-12 lg:mb-0 lg:absolute lg:top-24 lg:left-16 lg:right-16 z-30">
                        <div className="text-xs font-bold font-mono tracking-widest">{cs.id ? String(cs.id).padStart(2, '0') : '01'}</div>
                        <Link to="/case-studies" className="lg:hidden font-semibold text-sm hover:opacity-60 transition-opacity">Close</Link>
                    </div>

                    {renderLeftImages()}

                    <div className="font-['Outfit'] font-bold text-xs tracking-[0.15em] uppercase text-gray-800 mt-8 lg:absolute lg:bottom-12 lg:left-16 z-30">
                        {client} <span className="opacity-50">({year})</span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANE - Scrollable Content */}
            <div className="lg:w-[55%] min-h-screen px-6 py-8 md:px-16 md:py-16 pt-24 md:pt-32 lg:pt-32 xl:px-24">

                {/* Article Header */}
                <article className="max-w-3xl mx-auto xl:mx-0">

                    <div className="flex items-center gap-4 mb-8">
                        <span className="bg-[#EBE2FF] text-[#6B31F7] px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm">
                            CASE STUDY
                        </span>
                        <span className="font-mono text-[10px] md:text-sm font-semibold uppercase tracking-widest">
                            {year}
                        </span>
                    </div>

                    <h1 className="font-['Outfit'] font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tighter mb-16 uppercase break-words">
                        {cs.title}
                    </h1>

                    <div className="font-['Inter']">
                        {renderMarkdown(cs.content)}
                    </div>

                    {/* Dynamic Right Images List */}
                    {cs.right_images && cs.right_images.length > 0 && (
                        <div className="mt-24">
                            {cs.right_layout === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                    {cs.right_images.map((img, idx) => (
                                        <div key={idx} className="flex flex-col">
                                            <div className="aspect-square w-full mb-4 md:mb-6 overflow-hidden bg-gray-100 rounded-sm">
                                                <img src={img.url} alt={`Article visual ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-black">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div className="font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-black leading-relaxed">
                                                    {img.caption}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-24 md:space-y-36">
                                    {cs.right_images.map((img, idx) => {
                                        let alignmentClass = "";
                                        let widthClass = "";

                                        if (cs.right_layout === 'stacked-full') {
                                            alignmentClass = "self-center";
                                            widthClass = "w-full";
                                        } else if (cs.right_layout === 'stacked-center') {
                                            alignmentClass = "self-center";
                                            widthClass = "w-[85%] md:w-[70%]";
                                        } else { // default 'zigzag'
                                            if (idx % 3 === 0) {
                                                alignmentClass = "self-start";
                                                widthClass = "w-[90%] md:w-[75%]";
                                            } else if (idx % 3 === 1) {
                                                alignmentClass = "self-end";
                                                widthClass = "w-[80%] md:w-[60%]";
                                            } else {
                                                alignmentClass = "self-center";
                                                widthClass = "w-[85%] md:w-[70%]";
                                            }
                                        }

                                        return (
                                            <div key={idx} className={`flex flex-col ${alignmentClass} ${widthClass}`}>
                                                <img src={img.url} alt={`Article visual ${idx + 1}`} className="w-full h-auto object-cover mb-4 md:mb-6 rounded-sm shadow-sm" />
                                                <div className="flex gap-4 md:gap-8 items-start mt-2">
                                                    <div className="font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-black">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </div>
                                                    <div className="font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-black max-w-xs md:max-w-sm leading-relaxed">
                                                        {img.caption}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Meta Footer */}
                    <div className="mt-32 pt-12 border-t border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-widest flex justify-between items-center">
                        <div>Client: {client}</div>
                        <div>Services: {services}</div>
                    </div>
                </article>
            </div>

        </main>
    );
};

export default CaseStudyDetail;
