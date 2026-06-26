const fs = require('fs');

const originalContent = fs.readFileSync('src/components/Services.tsx', 'utf-8');

const regex = /export interface ServiceItem \{[\s\S]*?\];/;
const replacement = `export interface ServiceItem {
    title: string;
    icon: React.ReactNode;
    emoji: string;
    description: string;
    subtitle: string;
    whatItDoes: React.ReactNode;
    features: { title: string; description: string; }[];
    impacts: { title: string; icon: string; }[];
}

export const services: ServiceItem[] = [
    {
        title: "AI/ML",
        emoji: "🤖",
        description: "Transform your business with intelligent machine learning models and AI-driven insights.",
        subtitle: "Intelligent Automation & Analytics",
        whatItDoes: "We build advanced artificial intelligence and machine learning solutions tailored to automate complex workflows, predict market trends, and uncover hidden opportunities within your data.",
        features: [
            { title: "Predictive Modeling", description: "Deploy custom models that forecast trends, behaviors, and anomalies to give you a competitive edge." },
            { title: "Generative AI Integration", description: "Incorporate cutting-edge LLMs and generative models into your existing applications to enhance user experiences." }
        ],
        impacts: [
            { title: "Higher Efficiency", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Data-Driven Decisions", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
            { title: "Reduced Costs", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Scalable Solutions", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="22" y="24" width="20" height="16" rx="2" stroke="#999" strokeWidth="1.5" />
                <circle cx="28" cy="30" r="2" fill="#ea2b4f" />
                <circle cx="36" cy="30" r="2" fill="#ea2b4f" />
                <path d="M28 36H36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M32 24V18" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="32" cy="16" r="2" stroke="#999" strokeWidth="1.5" />
                <path d="M22 32H18M46 32H42" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M26 40V44M38 40V44" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Cloud",
        emoji: "☁️",
        description: "Scale effortlessly with secure, highly-available cloud architectures and migrations.",
        subtitle: "Cloud Native & Migration",
        whatItDoes: "We architect, build, and maintain cloud environments on AWS, Azure, and Google Cloud. From seamless migrations to cloud-native application development, we ensure your infrastructure is scalable, secure, and cost-efficient.",
        features: [
            { title: "Seamless Migration", description: "Move your legacy systems to the cloud with zero downtime and improved performance." },
            { title: "Cloud-Native Architecture", description: "Design microservices and serverless applications that inherently leverage cloud scalability." }
        ],
        impacts: [
            { title: "High Availability", icon: "M5 13l4 4L19 7" },
            { title: "Global Scale", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
            { title: "Optimized Spend", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Enhanced Security", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 40H20C15 40 12 36 12 31C12 26 15 23 19 23C21 16 29 14 34 19C38 18 42 21 43 25C47 26 49 30 48 34C48 38 46 40 42 40Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="36" y="24" width="16" height="12" stroke="#ea2b4f" strokeWidth="1.5" />
                <rect x="36" y="16" width="6" height="6" stroke="#999" strokeWidth="1.5" />
                <rect x="44" y="32" width="6" height="6" stroke="#999" strokeWidth="1.5" />
                <path d="M42 22V24M44 30V32" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Data Engineering",
        emoji: "📊",
        description: "Build robust data pipelines that turn raw data into actionable intelligence.",
        subtitle: "ETL & Big Data Processing",
        whatItDoes: "We design and optimize highly scalable data pipelines, data warehouses, and data lakes. Our engineering ensures data flows securely and seamlessly from source to insight, empowering your analytics teams.",
        features: [
            { title: "Real-Time Processing", description: "Streamline data aggregation using Kafka, Spark, and modern real-time tools." },
            { title: "Data Lakehouse Setup", description: "Combine the flexibility of data lakes with the reliability of data warehouses." }
        ],
        impacts: [
            { title: "Unified Data", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" },
            { title: "Data Quality", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Faster Insights", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Scalability", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 26C16 22 32 22 32 26C32 30 16 30 16 26Z" stroke="#999" strokeWidth="1.5" />
                <path d="M16 26V34C16 38 32 38 32 34V26" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M16 34V42C16 46 32 46 32 42V34" stroke="#999" strokeWidth="1.5" />
                <path d="M40 20L48 28L40 36" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M32 28L46 28" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            </svg>
        )
    },
    {
        title: "Web Development",
        emoji: "💻",
        description: "Craft visually stunning and highly responsive web applications that engage your users.",
        subtitle: "Frontend & Fullstack Development",
        whatItDoes: "We build fast, secure, and intuitive web applications using the latest modern frameworks (React, Next.js, Vue). From responsive corporate sites to complex interactive web apps, we deliver pixel-perfect code.",
        features: [
            { title: "Modern Frameworks", description: "We utilize React, Next.js, and TypeScript to ensure scalable and maintainable codebases." },
            { title: "Performance Optimized", description: "Our web apps score incredibly high on Lighthouse for speed, accessibility, and SEO." }
        ],
        impacts: [
            { title: "High Conversion", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Mobile Friendly", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
            { title: "Fast Load Times", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Secure Apps", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 22H48C50 22 52 24 52 26V42C52 44 50 46 48 46H16C14 46 12 44 12 42V26C12 24 14 22 16 22Z" stroke="#999" strokeWidth="1.5" />
                <path d="M12 28H52" stroke="#999" strokeWidth="1.5" />
                <circle cx="18" cy="25" r="1.5" fill="#ea2b4f" />
                <circle cx="23" cy="25" r="1.5" fill="#999" />
                <circle cx="28" cy="25" r="1.5" fill="#999" />
                <path d="M24 38L32 32L40 38" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "ERP",
        emoji: "🏢",
        description: "Streamline your business operations with comprehensive Enterprise Resource Planning solutions.",
        subtitle: "Enterprise Integration",
        whatItDoes: "We implement, customize, and maintain robust ERP systems that centralize data across your organization. Unify your supply chain, finance, HR, and manufacturing processes into a single source of truth.",
        features: [
            { title: "Custom Workflows", description: "Tailored business logic that matches how your enterprise uniquely operates." },
            { title: "Legacy Integration", description: "Seamless connection to existing on-premise solutions and databases." }
        ],
        impacts: [
            { title: "Unified Data", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" },
            { title: "Improved Efficiency", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Better Tracking", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { title: "Cost Reduction", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="26" y="16" width="12" height="12" rx="2" stroke="#ea2b4f" strokeWidth="1.5" />
                <rect x="16" y="36" width="12" height="12" rx="2" stroke="#999" strokeWidth="1.5" />
                <rect x="36" y="36" width="12" height="12" rx="2" stroke="#999" strokeWidth="1.5" />
                <path d="M32 28V32M32 32H22V36M32 32H42V36" stroke="#999" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        title: "SaaS",
        emoji: "🚀",
        description: "End-to-end development of Software as a Service products from MVP to enterprise scale.",
        subtitle: "Product Development",
        whatItDoes: "We help founders and enterprises build subscription-based SaaS platforms. We handle the multi-tenant architecture, billing integration, secure authentication, and scalable backend services.",
        features: [
            { title: "Multi-Tenancy", description: "Secure, scalable architectures designed specifically for multiple clients." },
            { title: "Subscription Billing", description: "Integrated payment gateways, metered billing, and flexible subscription management." }
        ],
        impacts: [
            { title: "Recurring Revenue", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Global Reach", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
            { title: "Rapid Iteration", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
            { title: "High Retention", icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 36H20C15 36 12 32 12 27C12 22 15 19 19 19C21 12 29 10 34 15C38 14 42 17 43 21C47 22 49 26 48 30C48 34 46 36 42 36Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28 36L28 48M36 36L36 48" stroke="#999" strokeWidth="1.5" />
                <path d="M24 48H40" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="32" cy="44" r="2" fill="#ea2b4f" />
            </svg>
        )
    },
    {
        title: "Hardware",
        emoji: "🔌",
        description: "Procurement, provisioning, and maintenance of high-performance enterprise IT hardware.",
        subtitle: "Infrastructure & Devices",
        whatItDoes: "We are an authorized partner for top-tier OEMs, delivering end-to-end hardware solutions. From server racks in your data center to the laptops on your employees' desks, we ensure optimal performance and security.",
        features: [
            { title: "OEM Partnerships", description: "Direct relationships with top manufacturers for the best pricing and support." },
            { title: "Lifecycle Management", description: "From provisioning to secure e-waste recycling, we handle the entire device lifecycle." }
        ],
        impacts: [
            { title: "Reliability", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Optimized Performance", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Secure Deployment", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            { title: "Reduced TCO", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="24" height="24" rx="2" stroke="#999" strokeWidth="1.5" />
                <rect x="25" y="25" width="14" height="14" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M20 28H16M20 36H16M44 28H48M44 36H48" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 20V16M36 20V16M28 44V48M36 44V48" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Workforce Solutions",
        emoji: "👥",
        description: "Empower your teams with the right talent and organizational strategies.",
        subtitle: "Staff Augmentation",
        whatItDoes: "We help you scale your engineering and IT teams quickly. Whether you need specialized contractors for a short-term project or full-time hires to grow your core team, our talent network delivers.",
        features: [
            { title: "Vetted Engineering Talent", description: "We rigorously test candidates to ensure they meet your high technical standards." },
            { title: "Flexible Engagement", description: "Choose from contract, contract-to-hire, or direct placement models." }
        ],
        impacts: [
            { title: "Speed to Hire", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Scalability", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
            { title: "Specialized Skills", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
            { title: "Reduced Overhead", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="22" r="6" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M20 42C20 35 25 32 32 32C39 32 44 35 44 42" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="20" cy="26" r="4" stroke="#999" strokeWidth="1.5" />
                <path d="M12 40C12 35.5 15 33.5 19 33.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="44" cy="26" r="4" stroke="#999" strokeWidth="1.5" />
                <path d="M52 40C52 35.5 49 33.5 45 33.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Offshore Workforce Solutions",
        emoji: "🌍",
        description: "Access a global talent pool to accelerate development while optimizing costs.",
        subtitle: "Global Engineering Centers",
        whatItDoes: "We build and manage high-performing offshore development centers. You get the benefit of lower operational costs without sacrificing quality, thanks to our rigorous oversight and established processes.",
        features: [
            { title: "Follow-The-Sun Development", description: "24/7 continuous development cycles across multiple time zones." },
            { title: "Managed Offices", description: "We handle the real estate, HR, and legal compliance so you can focus on building." }
        ],
        impacts: [
            { title: "Cost Efficiency", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Rapid Scaling", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Global Talent Pool", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
            { title: "Round-the-clock Delivery", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="14" stroke="#999" strokeWidth="1.5" />
                <path d="M18 32H46M22 24H42M22 40H42" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M38 18C44 22 46 28 43 36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            </svg>
        )
    },
    {
        title: "Cyber Security",
        emoji: "🛡️",
        description: "Protect your critical assets and data from evolving digital threats.",
        subtitle: "Enterprise Threat Defense",
        whatItDoes: "We provide comprehensive security assessments, penetration testing, and continuous monitoring to safeguard your organization. Stay ahead of threats with proactive vulnerability management.",
        features: [
            { title: "Zero Trust Architecture", description: "Implementation of secure identity and access management solutions." },
            { title: "Incident Response", description: "Rapid detection and mitigation strategies for active security breaches." }
        ],
        impacts: [
            { title: "Data Protection", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            { title: "Regulatory Compliance", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Risk Mitigation", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Business Continuity", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 16L44 20V30C44 38 32 46 32 46C32 46 20 38 20 30V20L32 16Z" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="32" cy="30" r="4" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M30 36C30 32 34 32 34 36V40H30V36Z" stroke="#ea2b4f" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        title: "IoT",
        emoji: "📡",
        description: "Connect devices to collect real-time data and drive automated decision-making.",
        subtitle: "Connected Devices Integration",
        whatItDoes: "We design and deploy Internet of Things ecosystems that bridge the physical and digital worlds. Collect telemetrics, monitor industrial assets, and automate environmental controls seamlessly.",
        features: [
            { title: "Sensor Networks", description: "Deployment and integration of advanced sensor arrays for granular data collection." },
            { title: "Edge Computing", description: "Process data at the source for real-time responsiveness and reduced bandwidth usage." }
        ],
        impacts: [
            { title: "Real-Time Monitoring", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
            { title: "Predictive Maintenance", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Operational Efficiency", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Data Insights", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="32" y="18" width="16" height="12" stroke="#999" strokeWidth="1.5" />
                <rect x="18" y="22" width="6" height="10" stroke="#999" strokeWidth="1.5" />
                <path d="M18 20H24V22H18V20ZM18 32H24V34H18V32Z" fill="#999" />
                <path d="M24 28H32M32 28V30M32 28V26" stroke="#999" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M30 40C32.5 38 37.5 38 40 40" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M27 44C31 41 39 41 43 44" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M34 36C34.5 35 35.5 35 36 36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Data Analytics",
        emoji: "📈",
        description: "Translate complex datasets into clear, actionable business insights.",
        subtitle: "Business Intelligence",
        whatItDoes: "We build intuitive dashboards and reports using tools like Power BI, Tableau, and custom web interfaces. Transform your raw data into visual narratives that drive strategic decision-making.",
        features: [
            { title: "Custom Dashboards", description: "Interactive visualizations tailored to the KPIs that matter most to your business." },
            { title: "Advanced Reporting", description: "Automated, scheduled reports delivered straight to stakeholders." }
        ],
        impacts: [
            { title: "Better Decisions", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Clear Visibility", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
            { title: "Growth Tracking", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { title: "Competitive Edge", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 44H48" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 16V44" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="20" y="32" width="6" height="12" fill="#ea2b4f" />
                <rect x="30" y="24" width="6" height="20" fill="#999" />
                <rect x="40" y="16" width="6" height="28" fill="#999" />
                <path d="M23 28L33 20L43 12" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: "RFP Response",
        emoji: "📝",
        description: "Win more business with expertly crafted Request For Proposal responses.",
        subtitle: "Proposal Management",
        whatItDoes: "We manage the end-to-end RFP response process. Our technical writers and solution architects work with your team to produce compelling, compliant, and highly competitive proposals.",
        features: [
            { title: "Technical Writing", description: "Clear, concise, and persuasive articulation of your value proposition." },
            { title: "Compliance Review", description: "Meticulous adherence to all procurement requirements and formatting constraints." }
        ],
        impacts: [
            { title: "Higher Win Rates", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
            { title: "Time Savings", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Professional Polish", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Scalable Growth", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 16H36L44 24V48H20V16Z" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M36 16V24H44" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M26 32H38M26 38H34" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        title: "Providing Key Resume",
        emoji: "📄",
        description: "Identify and present top-tier executive and technical candidates.",
        subtitle: "Executive Search & Screening",
        whatItDoes: "We source the market's top talent and provide you with comprehensive candidate profiles. We go beyond the resume, evaluating technical acumen and cultural fit before introducing them to your team.",
        features: [
            { title: "Deep Profiling", description: "Extensive background checks and technical assessments." },
            { title: "Market Intelligence", description: "Insights into compensation trends and talent availability in your sector." }
        ],
        impacts: [
            { title: "Quality Hires", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Faster Placements", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Cultural Fit", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { title: "Leadership Excellence", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" }
        ],
        icon: (
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="18" y="12" width="28" height="40" rx="2" stroke="#999" strokeWidth="1.5" />
                <circle cx="32" cy="24" r="5" stroke="#ea2b4f" strokeWidth="1.5" />
                <path d="M24 36C24 32 28 30 32 30C36 30 40 32 40 36" stroke="#ea2b4f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M24 42H40M24 46H34" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    }
];`;

const newContent = originalContent.replace(regex, replacement);
fs.writeFileSync('src/components/Services.tsx', newContent);
console.log('Successfully updated src/components/Services.tsx');
