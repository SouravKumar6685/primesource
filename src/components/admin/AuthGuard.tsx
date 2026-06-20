import React, { useState } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // For absolute simplicity as requested for a local/internal admin panel
    // Hardcoded for now, but can be moved to env later
    const ADMIN_PASSWORD = 'admin';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthorized(true);
        } else {
            setError('Invalid credentials');
            setPassword('');
        }
    };

    if (isAuthorized) {
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
                        <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Access Key</label>
                        <input
                            type="password"
                            autoFocus
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
