import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111618] flex items-center justify-center">
                <div className="text-[#3bda5c] font-['Outfit'] font-bold">Authenticating...</div>
            </div>
        );
    }

    if (session) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#111618] flex items-center justify-center px-8">
            <div className="max-w-md w-full p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                <div className="text-center mb-10">
                    <h1 className="font-['Outfit'] font-bold text-2xl text-white mb-2">Restricted Access</h1>
                    <p className="text-gray-500 font-['Inter'] text-xs uppercase tracking-widest">Administrative Login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Email</label>
                        <input
                            type="email"
                            autoFocus
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-[#3bda5c] outline-none transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Access Key</label>
                        <input
                            type="password"
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-[#3bda5c] outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs font-['Inter']">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#3bda5c] text-[#111618] py-4 rounded-xl font-['Outfit'] font-bold uppercase tracking-widest text-xs hover:bg-[#3bda5c]/90 transition-colors"
                    >
                        Enter Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthGuard;
