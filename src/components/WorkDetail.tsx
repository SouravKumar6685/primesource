import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';

const WorkDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);

        gsap.fromTo(".detail-content",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, [slug]);

    return (
        <div className="min-h-screen bg-[#111618] text-white pt-32 px-8 md:px-16 leading-relaxed">
            <div className="max-w-4xl mx-auto detail-content">
                <Link to="/" className="text-[#3bda5c] font-['Outfit'] font-bold text-xs uppercase tracking-widest mb-12 inline-block hover:opacity-70 transition-opacity">
                    ← Back to Home
                </Link>
                <h1 className="font-['Outfit'] font-bold text-5xl md:text-7xl mb-8 capitalize">
                    {slug?.replace(/-/g, ' ')}
                </h1>
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 bg-gray-800">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                        Project Image / Content for {slug}
                    </div>
                </div>
                <p className="font-['Inter'] text-lg md:text-xl text-gray-400 max-w-2xl">
                    Detailed showcase for this project will be here. Prime Source delivered high-end
                    solutions for {slug?.replace(/-/g, ' ')}, ensuring technical excellence and
                    innovation at every step.
                </p>
            </div>
        </div>
    );
};

export default WorkDetail;
