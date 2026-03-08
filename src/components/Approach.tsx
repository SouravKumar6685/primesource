import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// A reusable 3D tech shape component
const TechShape: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const innerRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

    // Slowly rotate the meshes for a continuous ambient effect
    useFrame((_, delta) => {
        if (innerRef.current) {
            innerRef.current.rotation.x += delta * 0.2;
            innerRef.current.rotation.y += delta * 0.3;
        }
        if (outerRef.current) {
            outerRef.current.rotation.x -= delta * 0.1;
            outerRef.current.rotation.y -= delta * 0.15;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Inner dense shape */}
            <mesh ref={innerRef}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <meshStandardMaterial
                    color="#111618"
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>

            {/* Outer wireframe shell */}
            <mesh ref={outerRef} scale={1.5}>
                <icosahedronGeometry args={[1, 2]} />
                <meshStandardMaterial
                    color="#3bda5c"
                    wireframe
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Glowing accents */}
            <pointLight position={[0, 0, 0]} intensity={2} color="#3bda5c" distance={5} />
        </group>
    );
};

const Approach: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate text content from the right/bottom
            gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Animate 3D canvas container from the left
            gsap.fromTo(canvasContainerRef.current,
                { x: -50, opacity: 0, scale: 0.9 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen bg-[#111618] text-white flex items-center justify-center overflow-hidden py-24"
            data-scroll-section
        >
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-16">

                {/* Left Side: 3D interactive element */}
                <div ref={canvasContainerRef} className="w-full lg:w-1/2 relative flex justify-center items-center h-[500px]">
                    <div className="absolute inset-0 z-10">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                            <Environment preset="city" />

                            <PresentationControls
                                global={false} // Only active within the canvas
                                cursor={true}
                                snap={true} // Snap back to center
                                speed={1.5}
                                zoom={1}
                                rotation={[0, 0, 0]}
                                polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits
                                azimuth={[-Math.PI / 4, Math.PI / 4]} // Horizontal limits
                            >
                                <Float
                                    speed={2} // Animation speed
                                    rotationIntensity={1} // XYZ rotation intensity
                                    floatIntensity={1.5} // Up/down float intensity
                                    floatingRange={[-0.2, 0.2]} // Range of y-axis values
                                >
                                    <TechShape />
                                </Float>
                            </PresentationControls>

                            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#3bda5c" />
                        </Canvas>
                    </div>
                    {/* Decorative background glow behind the 3D object */}
                    <div className="absolute inset-0 bg-[#3bda5c]/5 blur-[100px] rounded-full z-0 transform scale-75"></div>
                </div>

                {/* Right Side: Text & Button */}
                <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right relative z-20">
                    <h2 className="font-['Inter'] font-light text-[2.5rem] md:text-[3.5rem] leading-[1.3] tracking-tight mb-12 max-w-2xl text-gray-200">
                        Our approach is part creative, part technical, and part business.
                    </h2>

                    <a
                        href="#services"
                        className="inline-block border border-[#3bda5c] text-[#3bda5c] px-10 py-4 font-['Outfit'] font-bold text-xs uppercase tracking-[0.2em] hover:text-[#111618] transition-colors duration-500 relative overflow-hidden group"
                    >
                        {/* Liquid fill animation from left to right */}
                        <span className="absolute inset-0 bg-[#3bda5c] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                        <span className="relative z-10">Services</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Approach;
