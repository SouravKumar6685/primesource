import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete
            });
          }
        }
      });

      if (textRef.current) {
        tl.fromTo(textRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: "power2.out" },
          0.2
        );
      }

      if (barsRef.current) {
        const bars = barsRef.current.children;
        tl.fromTo(bars,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.1 },
          0.5
        );

        gsap.to(bars, {
          scaleY: 2,
          yoyo: true,
          repeat: -1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power1.inOut",
          transformOrigin: "bottom center"
        });
      }

      if (loadingTextRef.current) {
        tl.fromTo(loadingTextRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          0.8
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111618] text-white font-['Outfit']"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 ref={textRef} className="text-4xl md:text-5xl font-bold tracking-tight lowercase">
          prime source
        </h1>

        <div ref={barsRef} className="flex gap-1.5 items-end justify-center h-4 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-3 bg-white flex-shrink-0"
            />
          ))}
        </div>

        <p ref={loadingTextRef} className="text-[10px] uppercase tracking-[0.3em] mt-2 text-white/80 font-['Inter']">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
