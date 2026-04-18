"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".page-reveal", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        clearProps: "all"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}
