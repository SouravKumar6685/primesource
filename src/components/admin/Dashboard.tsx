import React, { useState } from 'react';
import BlogManager from './BlogManager';
import CaseStudyManager from './CaseStudyManager';
import CareerManager from './CareerManager';
import InsightsManager from './InsightsManager';
import FeaturedWorkManager from './FeaturedWorkManager';
import { supabase } from '../../lib/supabase';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'blogs' | 'case_studies' | 'careers' | 'insights' | 'featured_work'>('blogs');

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#0a0a0a] text-white">
            <div className="max-w-[1400px] mx-auto px-8 md:px-16">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="font-['Outfit'] font-bold text-4xl mb-2">Admin Dashboard</h1>
                        <p className="text-gray-500 font-['Inter'] text-sm uppercase tracking-widest">Content Management System</p>
                    </div>

                    <nav className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('blogs')}
                            className={`px-6 py-2 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'blogs' ? 'bg-[#3bda5c] text-[#111618]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Blogs
                        </button>
                        <button
                            onClick={() => setActiveTab('case_studies')}
                            className={`px-6 py-2 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'case_studies' ? 'bg-[#3bda5c] text-[#111618]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Case Studies
                        </button>
                        <button
                            onClick={() => setActiveTab('careers')}
                            className={`px-4 py-2 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'careers' ? 'bg-[#3bda5c] text-[#111618]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Careers
                        </button>
                        <button
                            onClick={() => setActiveTab('insights')}
                            className={`px-4 py-2 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'insights' ? 'bg-[#3bda5c] text-[#111618]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            What We Think
                        </button>
                        <button
                            onClick={() => setActiveTab('featured_work')}
                            className={`px-4 py-2 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'featured_work' ? 'bg-[#3bda5c] text-[#111618]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Featured Work
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 rounded-full font-['Outfit'] font-bold text-xs uppercase tracking-widest transition-all bg-red-500/10 text-red-400 hover:bg-red-500/20 ml-4"
                        >
                            Logout
                        </button>
                    </nav>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {activeTab === 'blogs' && <BlogManager />}
                    {activeTab === 'case_studies' && <CaseStudyManager />}
                    {activeTab === 'careers' && <CareerManager />}
                    {activeTab === 'insights' && <InsightsManager />}
                    {activeTab === 'featured_work' && <FeaturedWorkManager />}
                </div>

            </div>
        </main>
    );
};

export default Dashboard;
