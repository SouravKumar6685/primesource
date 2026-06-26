import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { FeaturedWorkProject } from '../../lib/api';

const FeaturedWorkManager: React.FC = () => {
    const [projects, setProjects] = useState<FeaturedWorkProject[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState<FeaturedWorkProject>({
        category: '',
        title: '',
        description: '',
        image_url: '',
        is_featured: false,
        slug: '',
        content: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await api.featuredWork.getAll();
            setProjects(data || []);
        } catch (error) {
            console.error("Failed to load featured work", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleEdit = (project: FeaturedWorkProject) => {
        setFormData(project);
        setEditingId(project.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setFormData({
            category: '',
            title: '',
            description: '',
            image_url: '',
            is_featured: false,
            slug: '',
            content: ''
        });
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await api.featuredWork.delete(id);
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project", error);
            alert("Delete failed.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.featuredWork.save(formData);
            handleCancel();
            fetchProjects();
        } catch (error) {
            console.error("Failed to save project", error);
            alert("Save failed.");
        }
    };

    return (
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/5">
            <h2 className="font-['Outfit'] font-bold text-2xl mb-8 flex items-center justify-between">
                <span>{editingId ? 'Edit Featured Work' : 'Create New Featured Work'}</span>
                {editingId && (
                    <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-white transition-colors">
                        Cancel Edit âœ•
                    </button>
                )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Title</label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. Gamifying AI"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Slug</label>
                        <input
                            required
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. gamifying-ai"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Category / Client</label>
                        <input
                            required
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. MIDDLEBY"
                        />
                    </div>
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
                </div>

                <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                        placeholder="Brief description for the project..."
                    />
                </div>

                {/* Content */}
                <div className="space-y-4 pt-4 border-t border-white/10 mt-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#3bda5c] font-bold">Main Project Details</label>
                        <div className="text-xs text-gray-400 bg-black/50 px-3 py-1 rounded">
                            ðŸ’¡ Tip: Use <code className="text-white">#</code> for H1, <code className="text-white">##</code> for H2. Wrap words in <code className="text-white">*</code> to make them <strong className="text-white">bold</strong>.
                        </div>
                    </div>
                    <textarea
                        name="content"
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full bg-[#111618] border border-white/10 rounded-lg p-4 h-64 focus:border-[#3bda5c] outline-none resize-y leading-relaxed text-white"
                        placeholder={`# Project Overview\n\nSome introductory text that is *very important*.\n\n## The Challenge\nMore details...`}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="is_featured"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded-sm bg-[#111618] border-white/10 text-[#3bda5c] focus:ring-[#3bda5c]"
                    />
                    <label htmlFor="is_featured" className="text-sm font-['Inter'] text-gray-300">
                        Is Featured (Shows up as the main hero card)
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#3bda5c] text-[#111618] font-['Outfit'] font-bold text-sm tracking-widest uppercase py-4 rounded-sm hover:bg-[#28b546] transition-colors"
                >
                    {editingId ? 'Update Featured Work' : 'Publish Featured Work'}
                </button>
            </form>

            {/* List */}
            <div className="mt-16">
                <h3 className="font-['Outfit'] font-bold text-xl mb-6">Existing Featured Work ({projects.length})</h3>
                {isLoading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-[#111618] border border-white/5 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-bold text-lg">{project.title}</h4>
                                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${project.is_featured ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                                            {project.is_featured ? 'Featured' : 'Standard'}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm font-['Inter']">{project.category} â€¢ {project.slug}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEdit(project)} className="px-4 py-2 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(project.id!)} className="px-4 py-2 border border-red-500/20 text-red-400 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-red-500/10 transition-colors">
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

export default FeaturedWorkManager;
