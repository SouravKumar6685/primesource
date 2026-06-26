import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { CaseStudy } from '../../lib/api';

const LAYOUT_OPTIONS = [
    { value: 'offset-grid', label: 'Offset Grid (3-Image Default)' },
    { value: 'single-center', label: 'Single Center (Large)' },
    { value: 'split-vertical', label: 'Split Vertical (2 Equal)' },
    { value: 'masonry', label: 'Masonry (1 Tall, 2 Stacked)' },
    { value: 'full-bleed', label: 'Full Bleed Overlay (1 Image)' },
    { value: 'staircase', label: 'Staircase Diagonal (3-Image)' }
];

const RIGHT_LAYOUT_OPTIONS = [
    { value: 'zigzag', label: 'Zigzag (Staggered left/right)' },
    { value: 'grid', label: 'Adaptive Grid (2 Columns)' },
    { value: 'stacked-center', label: 'Stacked Center (Medium Width)' },
    { value: 'stacked-full', label: 'Stacked Full (Full Width)' }
];

const CaseStudyManager: React.FC = () => {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [editingCS, setEditingCS] = useState<CaseStudy | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const fetchCaseStudies = async () => {
        try {
            const data = await api.caseStudies.getAll();
            setCaseStudies(data);
        } catch (error) {
            console.error("Error fetching case studies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCS) return;

        try {
            await api.caseStudies.save(editingCS);
            setMessage('Case Study saved successfully!');
            setEditingCS(null);
            fetchCaseStudies();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error saving case study');
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this case study?')) return;
        try {
            await api.caseStudies.delete(id);
            fetchCaseStudies();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddRightImage = () => {
        if (!editingCS) return;
        const currentImages = editingCS.right_images || [];
        setEditingCS({
            ...editingCS,
            right_images: [...currentImages, { url: '', caption: '' }]
        });
    };

    const handleUpdateRightImage = (index: number, field: 'url' | 'caption', value: string) => {
        if (!editingCS) return;
        const currentImages = [...(editingCS.right_images || [])];
        currentImages[index] = { ...currentImages[index], [field]: value };
        setEditingCS({ ...editingCS, right_images: currentImages });
    };

    const handleRemoveRightImage = (index: number) => {
        if (!editingCS) return;
        const currentImages = [...(editingCS.right_images || [])];
        currentImages.splice(index, 1);
        setEditingCS({ ...editingCS, right_images: currentImages });
    }

    if (isLoading) return <div className="text-white">Loading Manager...</div>;

    return (
        <div className="text-white p-8 bg-[#111618] rounded-2xl border border-white/5">
            <h2 className="text-3xl font-bold mb-8">Manage Case Studies</h2>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-[#3bda5c]/20 text-[#3bda5c]'}`}>
                    {message}
                </div>
            )}

            <button
                onClick={() => setEditingCS({ title: '', content: '', client: '', services: '', year: new Date().getFullYear().toString(), slug: '', image_url: '', left_image_1: '', left_image_2: '', left_image_3: '', hero_layout: 'offset-grid', right_layout: 'zigzag', right_images: [] })}
                className="mb-8 bg-[#3bda5c] text-[#111618] px-6 py-2 rounded-full font-bold hover:bg-[#3bda5c]/90 transition-colors"
            >
                Create New Case Study
            </button>

            {editingCS && (
                <form onSubmit={handleSave} className="mb-12 p-8 bg-white/5 rounded-2xl space-y-8 border border-white/10">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <h3 className="text-2xl font-bold">{editingCS.id ? 'Edit' : 'Create'} Case Study</h3>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h4 className="text-[#3bda5c] font-bold text-sm tracking-widest uppercase">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Title</label>
                                <input
                                    className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 focus:border-[#3bda5c] outline-none"
                                    value={editingCS.title}
                                    onChange={e => setEditingCS({ ...editingCS, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Slug (url path)</label>
                                <input
                                    className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 focus:border-[#3bda5c] outline-none"
                                    value={editingCS.slug}
                                    onChange={e => setEditingCS({ ...editingCS, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Client Name</label>
                                <input
                                    className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 focus:border-[#3bda5c] outline-none"
                                    value={editingCS.client || ''}
                                    onChange={e => setEditingCS({ ...editingCS, client: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Services Provided</label>
                                <input
                                    className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 focus:border-[#3bda5c] outline-none"
                                    placeholder="e.g. UX Design, Web Development"
                                    value={editingCS.services || ''}
                                    onChange={e => setEditingCS({ ...editingCS, services: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Year</label>
                                <input
                                    className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 focus:border-[#3bda5c] outline-none"
                                    placeholder="e.g. 2024"
                                    value={editingCS.year || ''}
                                    onChange={e => setEditingCS({ ...editingCS, year: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[#3bda5c] font-bold text-sm tracking-widest uppercase">Case Study Content</h4>
                            <div className="text-xs text-gray-400 bg-black/50 px-3 py-1 rounded">
                                ðŸ’¡ Tip: Use <code className="text-white">#</code> for H1, <code className="text-white">##</code> for H2. Wrap words in <code className="text-white">*</code> to make them <strong className="text-white">bold</strong>.
                            </div>
                        </div>
                        <textarea
                            className="w-full bg-[#111618] border border-white/10 rounded-lg p-4 h-64 focus:border-[#3bda5c] outline-none resize-y leading-relaxed"
                            value={editingCS.content}
                            onChange={e => setEditingCS({ ...editingCS, content: e.target.value })}
                            required
                            placeholder={`# Design Phase\n\nExplain the process here...`}
                        />
                    </div>

                    {/* Left Pane Images */}
                    <div className="space-y-6 pt-4 border-t border-white/10">
                        <h4 className="text-[#3bda5c] font-bold text-sm tracking-widest uppercase">Left Sidebar Display Images</h4>
                        <div className="space-y-4 mb-6">
                            <p className="text-xs text-gray-400">Choose how the left side hero images are displayed and provide the necessary images.</p>
                            <label className="text-xs text-gray-400 uppercase tracking-widest">Layout Style</label>
                            <select
                                className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 focus:border-[#3bda5c] outline-none appearance-none"
                                value={editingCS.hero_layout || 'offset-grid'}
                                onChange={e => setEditingCS({ ...editingCS, hero_layout: e.target.value })}
                            >
                                {LAYOUT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2 p-4 bg-[#111618] border border-white/5 rounded-xl">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Top Image (Small)</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-[#3bda5c] outline-none" placeholder="Image URL..." value={editingCS.left_image_1 || ''} onChange={e => setEditingCS({ ...editingCS, left_image_1: e.target.value })} />
                            </div>
                            <div className="space-y-2 p-4 bg-[#111618] border border-white/5 border-l-[#3bda5c]/50 rounded-xl">
                                <label className="text-xs text-white uppercase tracking-widest">Center Image (Main)</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-[#3bda5c] outline-none" placeholder="Image URL..." value={editingCS.left_image_2 || ''} onChange={e => setEditingCS({ ...editingCS, left_image_2: e.target.value })} />
                            </div>
                            <div className="space-y-2 p-4 bg-[#111618] border border-white/5 rounded-xl">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Bottom Image (Small)</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-[#3bda5c] outline-none" placeholder="Image URL..." value={editingCS.left_image_3 || ''} onChange={e => setEditingCS({ ...editingCS, left_image_3: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Right Pane Dynamic Images */}
                    <div className="space-y-6 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="text-[#3bda5c] font-bold text-sm tracking-widest uppercase">Article Inline Images (Right Side)</h4>
                                <p className="text-xs text-gray-400 mt-1">Add endless images that flow underneath the main text, with captions.</p>
                            </div>
                            <button type="button" onClick={handleAddRightImage} className="text-xs font-bold uppercase tracking-widest text-[#111618] bg-[#3bda5c] px-4 py-2 rounded-lg hover:bg-[#3bda5c]/90 transition-colors">
                                + Add Image
                            </button>
                        </div>

                        <div className="space-y-4 mb-6 p-4 bg-black/20 rounded-xl border border-white/5">
                            <label className="text-xs text-gray-400 uppercase tracking-widest">Global Layout Style</label>
                            <select
                                className="w-full bg-[#111618] border border-white/10 rounded-lg p-3 text-sm focus:border-[#3bda5c] outline-none appearance-none"
                                value={editingCS.right_layout || 'zigzag'}
                                onChange={e => setEditingCS({ ...editingCS, right_layout: e.target.value })}
                            >
                                {RIGHT_LAYOUT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            {(!editingCS.right_images || editingCS.right_images.length === 0) && (
                                <div className="text-center p-8 bg-[#111618] rounded-xl border border-dashed border-white/10 text-gray-500 text-sm">
                                    No inline images added yet. Click "+ Add Image" to start building the layout.
                                </div>
                            )}

                            {editingCS.right_images?.map((img, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 bg-[#111618] rounded-xl border border-white/5">
                                    <div className="font-mono text-[#3bda5c] font-bold text-xs pt-3 w-6">{String(index + 1).padStart(2, '0')}</div>
                                    <div className="flex-1 space-y-3">
                                        <input
                                            className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-[#3bda5c] outline-none"
                                            placeholder="Image URL..."
                                            value={img.url}
                                            onChange={e => handleUpdateRightImage(index, 'url', e.target.value)}
                                        />
                                        <input
                                            className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-[#3bda5c] outline-none text-gray-300 font-mono tracking-wide"
                                            placeholder="CAPTION TEXT..."
                                            value={img.caption}
                                            onChange={e => handleUpdateRightImage(index, 'caption', e.target.value)}
                                        />
                                    </div>
                                    <button type="button" onClick={() => handleRemoveRightImage(index)} className="p-2 text-gray-500 hover:text-red-500 transition-colors mt-1" title="Remove Image">
                                        âœ•
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-8 border-t border-white/10">
                        <button type="submit" className="bg-[#3bda5c] text-[#111618] px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(59,218,92,0.3)] hover:shadow-[0_0_30px_rgba(59,218,92,0.5)] transition-all">Save & Publish</button>
                        <button type="button" onClick={() => setEditingCS(null)} className="text-gray-400 hover:text-white px-8 py-3 font-semibold">Cancel</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {caseStudies.map(cs => (
                    <div key={cs.id} className="flex justify-between items-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-[#3bda5c]/30 transition-colors group">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">{cs.client || 'Client'}</span>
                                <span className="text-xs text-gray-500 font-mono">{cs.year || ''}</span>
                            </div>
                            <h4 className="font-bold text-xl group-hover:text-[#3bda5c] transition-colors">{cs.title}</h4>
                            <p className="text-xs text-gray-500 mt-2 font-mono">/{cs.slug}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setEditingCS(cs)} className="text-xs font-bold uppercase tracking-widest text-[#3bda5c] border border-[#3bda5c]/30 px-4 py-2 rounded-full hover:bg-[#3bda5c] hover:text-[#111618] transition-all">Edit</button>
                            <button onClick={() => handleDelete(cs.id!)} className="text-xs font-bold uppercase tracking-widest text-red-500 border border-red-500/30 px-4 py-2 rounded-full hover:bg-red-500/10 transition-colors">Delete</button>
                        </div>
                    </div>
                ))}

                {caseStudies.length === 0 && !isLoading && (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl text-gray-500 font-mono text-sm">
                        No case studies found. Time to add some great work.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseStudyManager;
