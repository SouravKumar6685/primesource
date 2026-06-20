import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import type { Career } from '../../lib/api';

const CareerManager: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState<Career>({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        is_active: true
    });

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const data = await api.careers.getAll();
            setCareers(data || []);
        } catch (error) {
            console.error("Failed to load careers", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleEdit = (career: Career) => {
        setFormData(career);
        setEditingId(career.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            department: '',
            location: '',
            type: 'Full-time',
            description: '',
            is_active: true
        });
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this job posting?")) return;
        try {
            await api.careers.delete(id);
            fetchCareers();
        } catch (error) {
            console.error("Failed to delete career", error);
            alert("Delete failed.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.careers.save(formData);
            handleCancel();
            fetchCareers();
        } catch (error) {
            console.error("Failed to save career", error);
            alert("Save failed.");
        }
    };

    return (
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/5">
            <h2 className="font-['Outfit'] font-bold text-2xl mb-8 flex items-center justify-between">
                <span>{editingId ? 'Edit Job Posting' : 'Create New Job Posting'}</span>
                {editingId && (
                    <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-white transition-colors">
                        Cancel Edit ✕
                    </button>
                )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Job Title</label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. Senior Backend Engineer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Department</label>
                        <input
                            required
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. Software Engineering"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Location</label>
                        <input
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                            placeholder="e.g. Remote, US"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Employment Type</label>
                        <select
                            required
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c]"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Job Description (Markdown)</label>
                    <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={10}
                        className="w-full bg-[#111618] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#3bda5c] font-mono text-sm leading-relaxed"
                        placeholder="Write the job description, requirements, etc..."
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded-sm bg-[#111618] border-white/10 text-[#3bda5c] focus:ring-[#3bda5c]"
                    />
                    <label htmlFor="is_active" className="text-sm font-['Inter'] text-gray-300">
                        Active (Visible on public careers page)
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#3bda5c] text-[#111618] font-['Outfit'] font-bold text-sm tracking-widest uppercase py-4 rounded-sm hover:bg-[#28b546] transition-colors"
                >
                    {editingId ? 'Update Job Posting' : 'Publish Job Posting'}
                </button>
            </form>

            {/* List Active Postings */}
            <div className="mt-16">
                <h3 className="font-['Outfit'] font-bold text-xl mb-6">Existing Job Postings ({careers.length})</h3>
                {isLoading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {careers.map((career) => (
                            <div key={career.id} className="bg-[#111618] border border-white/5 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-bold text-lg">{career.title}</h4>
                                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${career.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                            {career.is_active ? 'Active' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm font-['Inter']">{career.department} • {career.location} • {career.type}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEdit(career)} className="px-4 py-2 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(career.id!)} className="px-4 py-2 border border-red-500/20 text-red-400 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-red-500/10 transition-colors">
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

export default CareerManager;
