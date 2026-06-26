import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { Insight } from '../../lib/api';

const InsightsManager: React.FC = () => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState<Insight>({
        category: '',
        title: '',
        author: '',
        date: '',
        image_url: '',
        slug: '',
        content: ''
    });

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        try {
            const data = await api.insights.getAll();
            setInsights(data || []);
        } catch (error) {
            console.error("Failed to load insights", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (insight: Insight) => {
        setFormData(insight);
        setEditingId(insight.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setFormData({
            category: '',
            title: '',
            author: '',
            date: '',
            image_url: '',
            slug: '',
            content: ''
        });
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this insight?")) return;
        try {
            await api.insights.delete(id);
            fetchInsights();
        } catch (error) {
            console.error("Failed to delete insight", error);
            alert("Delete failed.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.insights.save(formData);
            handleCancel();
            fetchInsights();
        } catch (error) {
            console.error("Failed to save insight", error);
            alert("Save failed.");
        }
    };

    return (
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/5">
            <h2 className="font-['Outfit'] font-bold text-2xl mb-8 flex items-center justify-between">
                <span>{editingId ? 'Edit Insight' : 'Create New Insight'}</span>
                {editingId && (
                    <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-white transition-colors">
                        Cancel Edit âœ•
                    </button>
                )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Category</label>
                        <input
                            required
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. ARTICLE, INSIGHT"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Title</label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. The Future of AI"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Author</label>
                        <input
                            required
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. By John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Date</label>
                        <input
                            required
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. March 12, 2026"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
                        <input
                            required
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">URL Slug</label>
                        <input
                            required
                            name="slug"
                            value={formData.slug || ''}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. future-of-ai"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 pt-4 border-t border-white/10 mt-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#3bda5c] font-bold">Main Article Content</label>
                        <div className="text-xs text-gray-400 bg-black/50 px-3 py-1 rounded">
                            ðŸ’¡ Tip: Use <code className="text-white">#</code> for H1, <code className="text-white">##</code> for H2. Wrap words in <code className="text-white">*</code> to make them <strong className="text-white">bold</strong>.
                        </div>
                    </div>
                    <textarea
                        required
                        name="content"
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full bg-[#111618] border border-white/10 rounded-lg p-4 h-64 focus:border-[#3bda5c] outline-none resize-y leading-relaxed text-white"
                        placeholder={`# A Major Heading\n\nSome introductory text that is *very important*.\n\n## A Sub-heading\nMore details...`}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#3bda5c] text-[#111618] font-['Outfit'] font-bold text-sm tracking-widest uppercase py-4 rounded-sm hover:bg-[#28b546] transition-colors"
                >
                    {editingId ? 'Update Insight' : 'Publish Insight'}
                </button>
            </form>

            {/* List */}
            <div className="mt-16">
                <h3 className="font-['Outfit'] font-bold text-xl mb-6">Existing Insights ({insights.length})</h3>
                {isLoading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {insights.map((insight) => (
                            <div key={insight.id} className="bg-[#111618] border border-white/5 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-bold text-lg">{insight.title}</h4>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest bg-gray-500/10 text-gray-400">
                                            {insight.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm font-['Inter']">{insight.author} â€¢ {insight.date}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEdit(insight)} className="px-4 py-2 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(insight.id!)} className="px-4 py-2 border border-red-500/20 text-red-400 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-red-500/10 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsightsManager;
