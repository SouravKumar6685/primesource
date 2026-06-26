import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Services', id: '/services', isRoute: true, openInNewTab: true },
        { name: 'Insights', id: 'insights' },
        { name: 'Resources', id: 'insights', hasDropdown: true },
        { name: 'Industries', id: 'industries' },
        { name: 'Team', id: '/team', isRoute: true },
        { name: 'About', id: '/about', isRoute: true },
        { name: 'Careers', id: '/careers', isRoute: true }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string, isRoute?: boolean) => {
        if (isRoute) {
            setIsMobileMenuOpen(false);
            return; // let standard link navigation happen
        }
        e.preventDefault();
        setIsMobileMenuOpen(false);
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
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-4 md:py-6 flex items-center justify-between text-white font-['Inter'] ${isMobileMenuOpen ? '' : 'mix-blend-difference'}`}>
                {/* Logo container with hover reveal */}
                <Link
                    to="/"
                    className="group flex items-center cursor-pointer overflow-hidden pb-1"
                    onClick={(e) => {
                        if (location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIsMobileMenuOpen(false);
                        }
                    }}
                >
                    {/* Prime Source Logo */}
                    <img
                        src="/logo.png"
                        alt="Prime Source"
                        className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 object-contain brightness-0 invert"
                    />

                    <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap overflow-hidden ml-0 group-hover:ml-3 font-['Outfit'] font-extrabold text-[20px] md:text-[28px] tracking-[-0.04em] leading-none mb-0.5">
                        Prime Source
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold tracking-wide text-white">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            {link.isRoute ? (
                                <Link
                                    to={link.id}
                                    target={link.openInNewTab ? "_blank" : undefined}
                                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                    className="hover:text-gray-300 transition-colors uppercase py-2 block"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className="hover:text-gray-300 transition-colors uppercase py-2"
                                >
                                    {link.name}
                                </a>
                            )}

                            {/* Resources Dropdown */}
                            {link.name === 'Resources' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[#111618] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="py-2">
                                        <Link
                                            to="/blog"
                                            className="block w-full text-left px-6 py-3 hover:bg-white/5 transition-colors uppercase text-[11px] tracking-widest text-gray-300 hover:text-white"
                                        >
                                            Blog
                                        </Link>
                                        <Link
                                            to="/case-studies"
                                            className="block w-full text-left px-6 py-3 hover:bg-white/5 transition-colors uppercase text-[11px] tracking-widest text-gray-300 hover:text-white"
                                        >
                                            Case Studies
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Contact Button */}
                    <Link
                        to="/contact"
                        className="ml-4 uppercase text-[11px] font-bold tracking-[0.15em] border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className="lg:hidden text-white p-2 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="w-6 h-5 flex flex-col justify-between items-end">
                        <span className={`w-full h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                        <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 w-full' : 'w-4/5'}`}></span>
                        <span className={`w-full h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                    </div>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#111618] flex flex-col pt-24 px-6 pb-10 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6 text-xl font-['Outfit'] font-bold uppercase tracking-widest">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.isRoute ? (
                                        <Link
                                            to={link.id}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="hover:text-[#3bda5c] transition-colors block"
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            href={`#${link.id}`}
                                            onClick={(e) => handleNavClick(e, link.id)}
                                            className="hover:text-[#3bda5c] transition-colors block"
                                        >
                                            {link.name}
                                        </a>
                                    )}

                                    {/* Mobile Resources Sub-menu */}
                                    {link.name === 'Resources' && (
                                        <div className="flex flex-col gap-4 mt-4 ml-6 border-l-2 border-[#3bda5c]/30 pl-4">
                                            <Link
                                                to="/blog"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-sm text-gray-400 hover:text-white transition-colors block"
                                            >
                                                Blog
                                            </Link>
                                            <Link
                                                to="/case-studies"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-sm text-gray-400 hover:text-white transition-colors block"
                                            >
                                                Case Studies
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <Link
                                    to="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-center bg-[#3bda5c] text-black py-4 block hover:bg-[#3bda5c]/80 transition-colors"
                                >
                                    CONTACT US
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
