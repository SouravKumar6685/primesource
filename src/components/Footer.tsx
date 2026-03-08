import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".footer-column",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(".footer-bottom-bar",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".footer-bottom-bar",
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const serviceCategories = [
        {
            title: "Strategy",
            links: ["Innovation Sprints", "Innovation as a Service", "Product Strategy", "Systems Design", "Customer Experience", "Digital Transformation"]
        },
        {
            title: "Design",
            links: ["User Research & Testing", "UX/UI Design", "Industrial Design", "Brand & Visual Design", "Motion Design", "Video Production"]
        },
        {
            title: "Software",
            links: ["Website Development", "Web App Development", "Mobile App Development", "AI/Machine Learning", "Technology Architecture", "XR Development"]
        },
        {
            title: "Hardware",
            links: ["Product Development", "Autonomous Mobile Robots", "Robotic Systems Integration", "Robotic Software Development", "Manufacturing Automation", "Test Automation"]
        },
        {
            title: "AI/ML",
            links: ["AI Strategy", "Data Engineering", "AI Agent Development", "Generative AI", "Machine Learning", "Computer Vision"]
        }
    ];

    const mainLinks = [
        { name: "Services", id: "services" },
        { name: "Insights", id: "insights" },
        { name: "Work", id: "work" },
        { name: "About", id: "about" },
        { name: "Team", id: "team" },
        { name: "Careers", id: "footer" }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
        <footer ref={footerRef} className="w-full bg-[#111618] text-white pt-24" data-scroll-section>
            <div className="max-w-[1400px] mx-auto px-8 md:px-16">

                {/* Top Categorized Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
                    {serviceCategories.map((category, idx) => (
                        <div key={idx} className="footer-column">
                            <h4 className="font-['Outfit'] font-bold text-lg mb-8 tracking-tight">{category.title}</h4>
                            <ul className="space-y-4">
                                {category.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            to="/#services"
                                            onClick={(e) => handleNavClick(e, 'services')}
                                            className="text-gray-400 font-['Inter'] text-sm hover:text-[#3bda5c] transition-colors duration-300"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Middle Navigation & Socials */}
                <div className="footer-bottom-bar border-t border-gray-800 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                        {mainLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                to={`/#${link.id}`}
                                onClick={(e) => handleNavClick(e, link.id)}
                                className="font-['Outfit'] font-bold text-sm uppercase tracking-[0.15em] hover:text-[#3bda5c] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-8">
                        {["linkedin", "facebook", "twitter", "youtube", "instagram"].map((social, idx) => (
                            <a key={idx} href={`#${social}`} className="text-white hover:text-[#3bda5c] transition-colors">
                                <span className="sr-only">{social}</span>
                                <div className="w-5 h-5 flex items-center justify-center">
                                    {/* Minimal Icons for reference images */}
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        {social === 'linkedin' && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />}
                                        {social === 'facebook' && <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.783h-2.954v-3.429h2.954v-2.527c0-2.925 1.787-4.52 4.398-4.52 1.251 0 2.328.093 2.64.135v3.061l-1.812.001c-1.421 0-1.697.675-1.697 1.667v2.184h3.391l-.441 3.429h-2.95v8.783h6.113c.733 0 1.326-.593 1.326-1.324v-21.351c0-.732-.593-1.325-1.326-1.325z" />}
                                        {social === 'twitter' && <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.246-.612-.056 2.355 1.639 4.414 4.02 4.893-.722.196-1.514.257-2.316.104.643 2.01 2.518 3.473 4.736 3.513-2.112 1.654-4.756 2.391-7.443 2.074 2.239 1.432 4.896 2.268 7.747 2.268 9.38 0 14.735-8.032 14.412-15.119.986-.712 1.841-1.6 2.516-2.613z" />}
                                        {social === 'youtube' && <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />}
                                        {social === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Very Bottom Office Locations Section */}
            <div className="bg-white text-[#111618] py-16">
                <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full lg:w-auto">
                        {["Seattle", "Bangkok", "Mexico", "Costa Rica"].map((city, idx) => (
                            <div key={idx}>
                                <h5 className="font-['Outfit'] font-bold text-sm mb-4">{city}</h5>
                                {city === "Seattle" && (
                                    <a href="tel:4252013713" className="text-[#3bda5c] font-['Inter'] text-xs hover:opacity-70 transition-opacity">
                                        (425) 201-3713
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-[10px] md:text-xs text-gray-400 font-['Inter']">
                        <span>© 2026 Fresh Consulting</span>
                        <Link to="#" className="hover:text-[#3bda5c] transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
