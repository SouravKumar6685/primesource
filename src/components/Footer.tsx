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
                                            className="relative group inline-block text-gray-400 font-['Inter'] text-sm hover:text-[#3bda5c] transition-colors duration-300 pb-1"
                                        >
                                            {link}
                                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#3bda5c] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
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


                </div>
            </div>

            {/* Very Bottom Office Locations Section */}
            <div className="bg-white text-[#111618] py-16">
                <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full lg:w-auto">
                        {["India", "United States"].map((city, idx) => (
                            <div key={idx}>
                                <h5 className="font-['Outfit'] font-bold text-sm mb-4">{city}</h5>
                                {city === "India" && (
                                    <a href="tel:4252013713" className="text-[#3bda5c] font-['Inter'] text-xs hover:opacity-70 transition-opacity">
                                        +91 9876543210
                                    </a>
                                )}
                                {city === "United States" && (
                                    <a href="tel:4252013713" className="text-[#3bda5c] font-['Inter'] text-xs hover:opacity-70 transition-opacity">
                                        +1 1234567890
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
