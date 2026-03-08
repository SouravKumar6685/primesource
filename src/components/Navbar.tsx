import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navLinks = [
        { name: 'Services', id: 'services' },
        { name: 'Insights', id: 'insights' },
        { name: 'Industries', id: 'industries' },
        { name: 'Work', id: 'work' },
        { name: 'About', id: 'about' },
        { name: 'Careers', id: 'footer' }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${id}`);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-40 px-8 py-6 flex items-center justify-between text-white font-['Inter'] mix-blend-difference">
            {/* Logo container with hover reveal */}
            <Link
                to="/"
                className="group flex items-center cursor-pointer overflow-hidden pb-1"
                onClick={(e) => {
                    if (location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
            >
                {/* Prime Source Exact Logo SVG representation */}
                <svg
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    className="w-10 h-10 flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                >
                    <path d="M25.5,58.8 c4.4-6.8,11.5-11.4,19.8-13.6c-4.1-1.2-8.6-0.8-13,1.4C25.3,50,22.1,54.7,25.5,58.8z" />
                    <path d="M28.4,45.3c11.9,1.1,23.1,8.5,28.6,19.3c1.7,3.5,2.6,7.5,2.3,11.5c18.5-4.8,30-22.1,25.6-39 C80.1,20.2,63.1,10,48,15.7c-8.9,3.4-16,10.6-19.4,20c-0.6,1.4-1.3,4.6-1.5,5.8c-0.2,0.8,0.7,2.2,2.7,2.7 c3,0.8,15.9,4.4,21.6,6c-9.1,0.6-20.2-2.1-27-6.2c-3.1-1.9-4.3-5-3.3-8.8c3.9-14.7,16-25,29.9-25.2C69.6,9.8,85.2,24,88.7,42.5 c2.4,13.2-1.9,26-11.2,34.8C65.5,88.4,49.2,88.3,37.3,77c-2.8-2.7-4.8-6.1-5.7-9.4C30.7,63.6,28.6,56.9,28.4,45.3z" />
                    <path d="M12.9,64.6c6.4,0,13.2,0,21.5,0c-1.3,3.7-2.3,6.8-2.6,8.2c-0.7,4.4-1.7,7.1-5,10c-3,2.6-6.6,4-10.4,4 c-1.5,0-2.8-0.2-3.8-0.6c-2.4-0.9-4-3-4.5-5.9c-0.1-0.7-0.1-2.4,0.1-3.6C9.1,72.4,10.8,68.6,12.9,64.6z" />
                </svg>

                <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap overflow-hidden ml-0 group-hover:ml-3 font-['Outfit'] font-extrabold text-[28px] tracking-[-0.04em] leading-none mb-0.5">
                    Prime Source
                </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold tracking-wide">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={`#${link.id}`}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className="hover:text-gray-300 transition-colors uppercase"
                    >
                        {link.name}
                    </a>
                ))}

                {/* Contact Button */}
                <button
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="ml-4 uppercase text-[11px] font-bold tracking-[0.15em] border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                    Contact Us
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
