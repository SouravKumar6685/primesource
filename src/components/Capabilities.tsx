import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allCapabilities = [
    "3D Modeling & Animation", "AI Agent Development", "AI Software Development", "AI Strategy", "AI/Machine Learning",
    "AR Development", "Android Development", "Angular Apps", "Application Design", "Autonomous Mobile Robots",
    "Brand & Visual Design", "Brand Strategy", "Cloud Architecture", "Commercials", "Competitive Analysis",
    "Computer Vision", "Content Management Systems (CMS)", "Custom Robotics", "Custom Software Development",
    "Customer Experience", "Customer Experience Research", "Dashboard Design", "Data & Analytics", "Data Engineering",
    "Design Thinking Strategy", "Dev-Ops", "Digital Transformation", "Documentary Short Films", "Educational Videos",
    "Electrical Engineering", "Enterprise Systems", "Explainer Videos", "Firmware Engineering", "Generative AI",
    "Hybrid Mobile Apps", "Industrial Design", "Innovation Sprints", "Innovation Strategy", "Innovation as a Service",
    "IoT Product Development", "LabVIEW Services", "Machine Learning", "Manufacturing Automation", "Mechanical Engineering",
    "Media Assets", "Microservices", "Mobile App Development", "Mobile Strategy", "Motion Design", "Product Design",
    "Product Development", "Product Innovation Consulting", "Product Strategy", "Progressive Web Apps", "RF Engineering",
    "Rapid Prototyping", "React Apps", "Research & Development", "Robotic Software Development", "Robotic Systems Integration",
    "Robotics Engineering", "Software Architecture", "Strategy Leadership Summits", "Systems Design", "Technology Architecture",
    "Test Automation", "UI Animations", "UX Audits", "UX/UI Design", "Usability Testing", "User Research & Testing",
    "VR Development", "Video Production", "Visual Effects (VFX)", "Web App Development", "Website Design", "Website Development",
    "WordPress Development", "XR Development", "iOS Development"
];

// Mapping of categories to the capabilities that belong to them
const categoryMap: { [key: string]: string[] } = {
    "STRATEGY": [
        "Brand Strategy", "Competitive Analysis", "Customer Experience", "Customer Experience Research",
        "Data & Analytics", "Design Thinking Strategy", "Digital Transformation", "Innovation Sprints",
        "Innovation Strategy", "Innovation as a Service", "Mobile Strategy", "Product Innovation Consulting",
        "Product Strategy", "Strategy Leadership Summits", "Technology Architecture"
    ],
    "DESIGN": [
        "3D Modeling & Animation", "Application Design", "Brand & Visual Design", "Dashboard Design",
        "Industrial Design", "Motion Design", "Product Design", "Systems Design", "UI Animations",
        "UX Audits", "UX/UI Design", "Usability Testing", "User Research & Testing", "Website Design"
    ],
    "SOFTWARE": [
        "AI Agent Development", "AI Software Development", "Android Development", "Angular Apps",
        "Cloud Architecture", "Content Management Systems (CMS)", "Custom Software Development",
        "Dev-Ops", "Enterprise Systems", "Hybrid Mobile Apps", "Microservices", "Mobile App Development",
        "Progressive Web Apps", "React Apps", "Robotic Software Development", "Software Architecture",
        "Test Automation", "Web App Development", "Website Development", "WordPress Development", "iOS Development"
    ],
    "HARDWARE": [
        "Autonomous Mobile Robots", "Custom Robotics", "Electrical Engineering", "Firmware Engineering",
        "IoT Product Development", "LabVIEW Services", "Manufacturing Automation", "Mechanical Engineering",
        "RF Engineering", "Rapid Prototyping", "Robotic Systems Integration", "Robotics Engineering"
    ],
    "AI/ML": [
        "AI Agent Development", "AI Software Development", "AI Strategy", "AI/Machine Learning",
        "Computer Vision", "Data & Analytics", "Data Engineering", "Generative AI", "Machine Learning"
    ]
};

const categories = Object.keys(categoryMap);

const Capabilities: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("STRATEGY");
    const containerRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.capabilities-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            gsap.fromTo(listRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Check if a capability is in the active category
    const isActive = (cap: string) => categoryMap[activeCategory].includes(cap);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen bg-[#111618] text-white py-32 px-8 overflow-hidden"
            data-scroll-section
        >
            <div className="max-w-[1400px] mx-auto w-full">

                <div className="capabilities-header mb-16 md:mb-24 px-4 md:px-8">
                    <h2 className="font-['Outfit'] font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 text-white text-left">
                        Holistic, integrated capabilities
                    </h2>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-8 md:gap-12 border-b border-gray-800 pb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-['Outfit'] font-bold text-sm uppercase tracking-[0.15em] pb-4 relative transition-colors duration-300 ${activeCategory === cat ? 'text-white' : 'text-gray-600 hover:text-gray-400'
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Capabilities Grid/Cloud */}
                <div
                    ref={listRef}
                    className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-10 px-4 md:px-8"
                >
                    {allCapabilities.map((cap, idx) => {
                        const active = isActive(cap);
                        return (
                            <div
                                key={idx}
                                className={`font-['Inter'] text-xs md:text-sm py-1 px-2 transition-all duration-500 will-change-transform ${active
                                    ? 'text-white font-semibold transform md:scale-105'
                                    : 'text-gray-700 font-normal transform scale-100'
                                    }`}
                            >
                                {cap}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Capabilities;
