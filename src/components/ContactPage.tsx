import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { useForm, ValidationError } from '@formspree/react';

const ContactPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const [state, handleSubmit] = useForm('mvzjkryq');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            gsap.fromTo(".contact-reveal",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="bg-[#111618] min-h-screen pt-32 pb-24 text-white font-['Inter']">
            <Helmet>
                <title>Contact Us | Prime Source</title>
                <meta name="description" content="Get in touch with Prime Source to discuss your next project." />
            </Helmet>

            <div className="max-w-[1400px] mx-auto px-8 md:px-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left side: Information */}
                    <div className="contact-reveal flex flex-col justify-center">
                        <h1 className="font-['Outfit'] font-bold text-5xl md:text-7xl tracking-tight mb-8">
                            Let's build <br /> <span className="text-[#3bda5c]">something great.</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-12 max-w-md">
                            Whether you're looking for a technology partner, consulting services, or just want to say hello, we'd love to hear from you.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-auto">
                            <div>
                                <h3 className="font-['Outfit'] font-bold text-xl mb-4">India</h3>
                                <p className="text-gray-400 text-sm mb-2">123 Innovation Drive<br/>Tech Park, Bangalore</p>
                                <a href="tel:+919876543210" className="text-[#3bda5c] hover:opacity-80 transition-opacity">+91 9876543210</a>
                            </div>
                            <div>
                                <h3 className="font-['Outfit'] font-bold text-xl mb-4">United States</h3>
                                <p className="text-gray-400 text-sm mb-2">456 Startup Way<br/>Silicon Valley, CA</p>
                                <a href="tel:+11234567890" className="text-[#3bda5c] hover:opacity-80 transition-opacity">+1 1234567890</a>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <div className="contact-reveal bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
                        {state.succeeded ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-24">
                                <div className="w-20 h-20 bg-[#3bda5c]/20 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-[#3bda5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-['Outfit'] font-bold text-3xl mb-4">Message Sent!</h3>
                                <p className="text-gray-400">We've received your inquiry and will get back to you shortly.</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-8 text-[#3bda5c] hover:underline uppercase text-sm tracking-widest font-bold"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-[#3bda5c] outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-[#3bda5c] outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Company</label>
                                        <input 
                                            type="text" 
                                            name="company"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-[#3bda5c] outline-none transition-colors"
                                            placeholder="Acme Corp"
                                        />
                                        <ValidationError prefix="Company" field="company" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">How can we help?</label>
                                    <textarea 
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white focus:border-[#3bda5c] outline-none transition-colors resize-none"
                                        placeholder="Tell us about your project or inquiry..."
                                    />
                                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={state.submitting}
                                    className="w-full bg-[#3bda5c] text-[#111618] py-4 rounded-xl font-['Outfit'] font-bold uppercase tracking-widest text-xs hover:bg-[#3bda5c]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {state.submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
