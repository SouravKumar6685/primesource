// Updated at 2026-03-10
const API_BASE_URL = 'http://localhost:8000/api/v1';

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
            const response = await fetch(`${API_BASE_URL}/blogs/`);
            if (!response.ok) throw new Error('Failed to fetch blogs');
            return response.json();
        },
        async getBySlug(slug: string): Promise<Blog | null> {
            const response = await fetch(`${API_BASE_URL}/blogs/`);
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const blogs: Blog[] = await response.json();
            return blogs.find((b: Blog) => b.slug === slug) || null;
        },
        async save(blog: Blog): Promise<Blog> {
            const method = blog.id ? 'PUT' : 'POST';
            const url = blog.id ? `${API_BASE_URL}/blogs/${blog.id}` : `${API_BASE_URL}/blogs/`;
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blog)
            });
            if (!response.ok) throw new Error('Failed to save blog');
            return response.json();
        },
        async delete(id: number): Promise<void> {
            const response = await fetch(`${API_BASE_URL}/blogs/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete blog');
        }
    },
    caseStudies: {
        async getAll(): Promise<CaseStudy[]> {
            const response = await fetch(`${API_BASE_URL}/case-studies/`);
            if (!response.ok) throw new Error('Failed to fetch case studies');
            return response.json();
        },
        async getBySlug(slug: string): Promise<CaseStudy | null> {
            const response = await fetch(`${API_BASE_URL}/case-studies/by-slug/${slug}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('Failed to fetch case study');
            }
            return response.json();
        },
        async save(cs: CaseStudy): Promise<CaseStudy> {
            const method = cs.id ? 'PUT' : 'POST';
            const url = cs.id ? `${API_BASE_URL}/case-studies/${cs.id}` : `${API_BASE_URL}/case-studies/`;
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cs)
            });
            if (!response.ok) throw new Error('Failed to save case study');
            return response.json();
        },
        async delete(id: number): Promise<void> {
            const response = await fetch(`${API_BASE_URL}/case-studies/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete case study');
        }
    },
    careers: {
        async getAll(): Promise<Career[]> {
            const response = await fetch(`${API_BASE_URL}/careers/`);
            if (!response.ok) throw new Error('Failed to fetch careers');
            return response.json();
        },
        async getById(id: number): Promise<Career | null> {
            const response = await fetch(`${API_BASE_URL}/careers/${id}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('Failed to fetch career');
            }
            return response.json();
        },
        async save(career: Career): Promise<Career> {
            const method = career.id ? 'PUT' : 'POST';
            const url = career.id ? `${API_BASE_URL}/careers/${career.id}` : `${API_BASE_URL}/careers/`;
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(career)
            });
            if (!response.ok) throw new Error('Failed to save career');
            return response.json();
        },
        async delete(id: number): Promise<void> {
            const response = await fetch(`${API_BASE_URL}/careers/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete career');
        }
    }
};
