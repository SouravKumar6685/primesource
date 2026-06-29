import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        section: "General & Partnership Models",
        number: "1",
        questions: [
            {
                q: 'What exactly is included in your "Sales-as-a-Service" plan?',
                a: "Our Sales-as-a-Service plan includes end-to-end sales representation, outbound lead generation, pipeline management, and closing deals on your behalf. We act as a seamless extension of your internal team to drive revenue growth without the overhead of hiring full-time sales staff."
            },
            {
                q: 'How many leads or meetings can we expect monthly?',
                a: "The number of leads and meetings varies depending on your industry, target market, and the specific outreach strategy we deploy. We prioritize securing high-quality, targeted meetings with decision-makers over sheer volume."
            },
            {
                q: "How does PrimeSource structure its engagements and contracts?",
                a: "We offer flexible engagement models tailored to your needs. This includes project-based fixed-price contracts, time-and-materials for ongoing development, and retainer models for continuous support like our Sales-as-a-Service and Managed IT services."
            },
            {
                q: "Do you work with startups, or strictly enterprise companies?",
                a: "We partner with businesses of all sizes. From startups needing rapid MVP development and scalable infrastructure, to large enterprises requiring complex digital transformation, ERP integrations, and global offshore team building."
            },
            {
                q: "How do you ensure confidentiality and protect our intellectual property?",
                a: "Security and confidentiality are paramount. We strictly adhere to Non-Disclosure Agreements (NDAs), utilize secure infrastructure, implement role-based access control (RBAC), and ensure all code and data rights are fully transferred to you upon project completion."
            }
        ]
    },
    {
        section: "Workforce & Talent Solutions",
        number: "2",
        questions: [
            {
                q: "What is the difference between Staff Augmentation and Offshore Workforce models?",
                a: "Staff Augmentation involves integrating highly skilled professionals into your existing in-house team to bridge specific skill gaps. Our Offshore Workforce solution involves building and managing a dedicated, autonomous team in a lower-cost region, complete with infrastructure and HR management."
            },
            {
                q: "How quickly can you assemble a dedicated offshore development team?",
                a: "Depending on the technology stack and seniority required, we can typically deploy a core team within 2 to 4 weeks. We leverage our vast global talent pool and rigorous vetting process to quickly source top-tier candidates."
            },
            {
                q: "What is your vetting process for engineering and technical talent?",
                a: "Our multi-stage vetting process includes initial behavioral and cultural fit interviews, rigorous technical assessments (coding challenges and system design), and comprehensive background and reference checks. Only the top percentage of applicants make the cut."
            },
            {
                q: "How does your Executive Search process differ from standard recruitment?",
                a: "Our Executive Search (Key Resume) service is a highly targeted approach for C-suite and senior leadership roles. We conduct deep profiling, discreet outreach to passive candidates, and assess strategic vision and leadership capabilities, ensuring perfect alignment with your company's long-term goals."
            }
        ]
    },
    {
        section: "Custom Development & Engineering",
        number: "3",
        questions: [
            {
                q: "Which technology stacks do you specialize in for Web and SaaS development?",
                a: "We are proficient in modern, scalable technologies. For the frontend, we heavily utilize React, Next.js, and Vue.js. On the backend, we work with Node.js, Python, and robust databases like PostgreSQL. We also integrate deeply with platforms like Stripe and Auth0 for SaaS solutions."
            },
            {
                q: "How do you approach legacy system modernization and cloud migration?",
                a: "We start with a comprehensive audit of your existing architecture. We then design a phased migration strategy to transition your applications to cloud-native environments (AWS, Azure, or GCP) with zero downtime, utilizing microservices and containerization to ensure future scalability."
            },
            {
                q: "What AI and Machine Learning capabilities can you integrate?",
                a: "We integrate a wide spectrum of AI solutions, including predictive modeling, natural language processing (NLP), generative AI (LLMs), and computer vision. These can be used to automate workflows, personalize customer experiences, and unlock hidden insights from your data."
            },
            {
                q: "How do you ensure data quality in your Data Engineering pipelines?",
                a: "We build resilient ETL/ELT pipelines using tools like Apache Spark, Kafka, and dbt. We implement automated data validation, anomaly detection, and strict governance policies at every stage of the pipeline to guarantee data accuracy and reliability."
            },
            {
                q: "Do you offer ongoing maintenance and support after a product launch?",
                a: "Absolutely. We offer customized Service Level Agreements (SLAs) that include 24/7 monitoring, performance optimization, security patching, and continuous feature enhancements to ensure your software remains cutting-edge."
            }
        ]
    },
    {
        section: "IT Infrastructure & Security",
        number: "4",
        questions: [
            {
                q: "What types of hardware procurement and setup do you handle?",
                a: "As an end-to-end IT Hardware Solutions provider, we partner with top OEMs (Dell, HP, Lenovo) to procure and integrate everything from high-performance workstations and peripherals to mission-critical enterprise servers and smart conference room AV setups."
            },
            {
                q: "How does your Cyber Security assessment process work?",
                a: "We conduct thorough vulnerability scanning, advanced penetration testing, and architecture reviews. We identify weak points across your network, endpoints, and applications, and provide actionable remediation strategies aligned with Zero Trust principles."
            },
            {
                q: "Can you manage multi-cloud or hybrid cloud environments?",
                a: "Yes. We design and orchestrate complex multi-cloud and hybrid environments using Infrastructure as Code (Terraform) and Kubernetes. This ensures vendor flexibility, high availability, and optimized resource allocation."
            },
            {
                q: "What IoT integration services do you provide?",
                a: "We deploy sensor networks and edge computing solutions for industrial, commercial, and smart building applications. We handle everything from secure device provisioning to streaming real-time telemetry data into your analytics dashboards."
            },
            {
                q: "How long does a typical ERP implementation take?",
                a: "ERP timelines vary significantly based on organizational size, required customizations, and data migration complexity. A typical rollout can take anywhere from 3 to 9 months. We use an agile approach to deliver modular functionality and minimize business disruption."
            }
        ]
    }
];

const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleAccordion = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#111719] text-white pt-32 pb-24 px-8 font-['Inter']">
            <div className="max-w-[800px] mx-auto">
                <div className="mb-12 relative flex flex-col items-center">
                    <div className="w-full flex justify-start mb-8 md:absolute md:top-0 md:left-0 md:mb-0">
                        <Link to="/services" className="text-gray-400 hover:text-white flex items-center gap-2 text-[15px] font-medium transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </Link>
                    </div>

                    <div className="flex flex-col items-center text-center mt-4 md:mt-0">
                        <div className="w-12 h-12 rounded-full bg-[#e6f4ea] flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-[#137333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-[40px] md:text-[48px] font-['Outfit'] font-bold text-white mb-3 leading-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-gray-400 text-[15px] max-w-lg">
                            PrimeSource – Sales-as-a-Service / Business Growth Partnership
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {faqs.map((section, sIdx) => (
                        <div key={sIdx} className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                            <div className="px-8 py-5 bg-[#f8fafc] border-b border-gray-100 flex items-center gap-4">
                                <div className="w-7 h-7 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-sm">
                                    {section.number}
                                </div>
                                <h2 className="text-[17px] font-bold text-[#0f172a]">{section.section}</h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {section.questions.map((item, qIdx) => {
                                    const index = `${sIdx}-${qIdx}`;
                                    const isOpen = openIndex === index;
                                    return (
                                        <div key={qIdx} className="px-8">
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                                            >
                                                <span className={`font-semibold text-[15px] pr-8 transition-colors ${isOpen ? 'text-[#0f172a]' : 'text-[#334155] group-hover:text-[#0f172a]'}`}>
                                                    {item.q}
                                                </span>
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-gray-200 bg-gray-50 rotate-180' : 'border-gray-200 bg-white group-hover:border-gray-300'}`}>
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <p className="text-[#64748b] text-[15px] leading-relaxed">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
