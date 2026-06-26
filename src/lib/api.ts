import { supabase } from './supabase';

export interface Blog {
    id?: number;
    title: string;
    content: string;
    author?: string;
    date_posted?: string;
    image_url?: string;
    category?: string;
    slug: string;
    left_image_1?: string;
    left_image_2?: string;
    left_image_3?: string;
    hero_layout?: string;
    right_layout?: string;
    right_images?: { url: string; caption: string }[];
}

export interface Career {
    id?: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    is_active?: boolean;
    created_at?: string;
}

export interface Insight {
    id?: string;
    category: string;
    title: string;
    author: string;
    date: string;
    image_url: string;
    content?: string;
    slug?: string;
    created_at?: string;
}

export interface FeaturedWorkProject {
    id?: string;
    category: string;
    title: string;
    description?: string | null;
    image_url: string;
    is_featured: boolean;
    slug: string;
    content?: string;
    created_at?: string;
}

export interface CaseStudy {
    id?: number;
    title: string;
    content: string;
    client?: string;
    services?: string;
    year?: string;
    image_url?: string;
    slug: string;
    left_image_1?: string;
    left_image_2?: string;
    left_image_3?: string;
    hero_layout?: string;
    right_layout?: string;
    right_images?: { url: string; caption: string }[];
}

export const api = {
    blogs: {
        async getAll(): Promise<Blog[]> {
            const { data, error } = await supabase.from('blogs').select('*').order('id', { ascending: false });
            if (error) throw new Error(error.message);
            return data as Blog[];
        },
        async getBySlug(slug: string): Promise<Blog | null> {
            const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
            if (error) {
                if (error.code === 'PGRST116') return null; // Not found
                throw new Error(error.message);
            }
            return data as Blog;
        },
        async save(blog: Blog): Promise<Blog> {
            // Remove id if it's undefined to let Supabase generate it
            const payload = { ...blog };
            if (!payload.id) delete payload.id;
            
            if (blog.id) {
                const { data, error } = await supabase.from('blogs').update(payload).eq('id', blog.id).select().single();
                if (error) throw new Error(error.message);
                return data as Blog;
            } else {
                const { data, error } = await supabase.from('blogs').insert(payload).select().single();
                if (error) throw new Error(error.message);
                return data as Blog;
            }
        },
        async delete(id: number): Promise<void> {
            const { error } = await supabase.from('blogs').delete().eq('id', id);
            if (error) throw new Error(error.message);
        }
    },
    caseStudies: {
        async getAll(): Promise<CaseStudy[]> {
            const { data, error } = await supabase.from('case_studies').select('*').order('id', { ascending: false });
            if (error) throw new Error(error.message);
            return data as CaseStudy[];
        },
        async getBySlug(slug: string): Promise<CaseStudy | null> {
            const { data, error } = await supabase.from('case_studies').select('*').eq('slug', slug).single();
            if (error) {
                if (error.code === 'PGRST116') return null;
                throw new Error(error.message);
            }
            return data as CaseStudy;
        },
        async save(cs: CaseStudy): Promise<CaseStudy> {
            const payload = { ...cs };
            if (!payload.id) delete payload.id;

            if (cs.id) {
                const { data, error } = await supabase.from('case_studies').update(payload).eq('id', cs.id).select().single();
                if (error) throw new Error(error.message);
                return data as CaseStudy;
            } else {
                const { data, error } = await supabase.from('case_studies').insert(payload).select().single();
                if (error) throw new Error(error.message);
                return data as CaseStudy;
            }
        },
        async delete(id: number): Promise<void> {
            const { error } = await supabase.from('case_studies').delete().eq('id', id);
            if (error) throw new Error(error.message);
        }
    },
    careers: {
        async getAll(): Promise<Career[]> {
            const { data, error } = await supabase.from('careers').select('*').order('id', { ascending: false });
            if (error) throw new Error(error.message);
            return data as Career[];
        },
        async getById(id: number): Promise<Career | null> {
            const { data, error } = await supabase.from('careers').select('*').eq('id', id).single();
            if (error) {
                if (error.code === 'PGRST116') return null;
                throw new Error(error.message);
            }
            return data as Career;
        },
        async save(career: Career): Promise<Career> {
            const payload = { ...career };
            if (!payload.id) delete payload.id;

            if (career.id) {
                const { data, error } = await supabase.from('careers').update(payload).eq('id', career.id).select().single();
                if (error) throw new Error(error.message);
                return data as Career;
            } else {
                const { data, error } = await supabase.from('careers').insert(payload).select().single();
                if (error) throw new Error(error.message);
                return data as Career;
            }
        },
        async delete(id: number): Promise<void> {
            const { error } = await supabase.from('careers').delete().eq('id', id);
            if (error) throw new Error(error.message);
        }
    },
    insights: {
        async getAll(): Promise<Insight[]> {
            const { data, error } = await supabase.from('insights').select('*').order('created_at', { ascending: false });
            if (error) throw new Error(error.message);
            return data as Insight[];
        },
        async getBySlug(slug: string): Promise<Insight | null> {
            const { data, error } = await supabase.from('insights').select('*').eq('slug', slug).single();
            if (error) {
                if (error.code === 'PGRST116') return null;
                throw new Error(error.message);
            }
            return data as Insight;
        },
        async getById(id: string): Promise<Insight | null> {
            const { data, error } = await supabase.from('insights').select('*').eq('id', id).single();
            if (error) {
                if (error.code === 'PGRST116' || error.code === '22P02') return null;
                throw new Error(error.message);
            }
            return data as Insight;
        },
        async save(insight: Insight): Promise<Insight> {
            const payload = { ...insight };
            if (!payload.id) delete payload.id;

            if (insight.id) {
                const { data, error } = await supabase.from('insights').update(payload).eq('id', insight.id).select().single();
                if (error) throw new Error(error.message);
                return data as Insight;
            } else {
                const { data, error } = await supabase.from('insights').insert(payload).select().single();
                if (error) throw new Error(error.message);
                return data as Insight;
            }
        },
        async delete(id: string): Promise<void> {
            const { error } = await supabase.from('insights').delete().eq('id', id);
            if (error) throw new Error(error.message);
        }
    },
    featuredWork: {
        async getAll(): Promise<FeaturedWorkProject[]> {
            const { data, error } = await supabase.from('featured_work').select('*').order('created_at', { ascending: false });
            if (error) throw new Error(error.message);
            return data as FeaturedWorkProject[];
        },
        async getBySlug(slug: string): Promise<FeaturedWorkProject | null> {
            const { data, error } = await supabase.from('featured_work').select('*').eq('slug', slug).single();
            if (error) {
                if (error.code === 'PGRST116') return null;
                throw new Error(error.message);
            }
            return data as FeaturedWorkProject;
        },
        async save(fw: FeaturedWorkProject): Promise<FeaturedWorkProject> {
            const payload = { ...fw };
            if (!payload.id) delete payload.id;

            if (fw.id) {
                const { data, error } = await supabase.from('featured_work').update(payload).eq('id', fw.id).select().single();
                if (error) throw new Error(error.message);
                return data as FeaturedWorkProject;
            } else {
                const { data, error } = await supabase.from('featured_work').insert(payload).select().single();
                if (error) throw new Error(error.message);
                return data as FeaturedWorkProject;
            }
        },
        async delete(id: string): Promise<void> {
            const { error } = await supabase.from('featured_work').delete().eq('id', id);
            if (error) throw new Error(error.message);
        }
    }
};
