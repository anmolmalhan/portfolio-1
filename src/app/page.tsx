"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      const lines = gsap.utils.toArray(".hero-line span");
      gsap.set(lines, { yPercent: 120 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });

      // 2. Horizontal Scroll Section
      const horizontalSection = horizontalRef.current;
      if (horizontalSection) {
        const pinWrap = horizontalSection.querySelector(".pin-wrap");
        if (pinWrap) {
          const pinWrapWidth = (pinWrap as HTMLElement).scrollWidth;
          const horizontalScrollLength = pinWrapWidth - window.innerWidth;
          
          gsap.to(pinWrap, {
            x: -horizontalScrollLength,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              pin: true,
              scrub: 1,
              end: () => `+=${pinWrapWidth}`
            }
          });
        }
      }

      // 3. Code Philosophy Block Stagger
      gsap.from(".code-line", {
        scrollTrigger: {
          trigger: ".code-section",
          start: "top 75%",
        },
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      // 4. Giant Footer Parallax
      gsap.from(".footer-giant-text", {
        scrollTrigger: {
          trigger: "footer",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        },
        y: -100,
        opacity: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative flex flex-col bg-background text-foreground">
      
      {/* --- HERO SECTION --- */}
      <section className="h-screen w-full flex flex-col justify-end pb-12 px-6 md:px-12 relative overflow-hidden">
        {/* Abstract code/terminal background glow */}
        <div className="absolute top-1/4 right-[10%] w-[40vw] h-[40vw] bg-[var(--syntax-blue)] rounded-full blur-[150px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-[30vw] h-[30vw] bg-[var(--syntax-magenta)] rounded-full blur-[150px] opacity-10 pointer-events-none" />
        
        <div className="z-10 w-full pt-32">
          <div className="flex justify-between items-end mb-8 md:mb-16 border-b border-foreground/20 pb-6 w-full">
            <div className="font-mono text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--syntax-green)] rounded-full animate-pulse" />
              Execution Layer
            </div>
            <div className="font-mono text-xs md:text-sm text-[var(--syntax-comment)] hidden sm:block">
              [ Next.js / React / TypeScript ]
            </div>
          </div>

          <div className="flex flex-col text-giant font-bold tracking-tighter">
            <div className="reveal-wrapper hero-line"><span className="block">THINK</span></div>
            <div className="flex items-center gap-8 md:gap-16">
              <div className="reveal-wrapper hero-line"><span className="block italic font-serif opacity-80">&</span></div>
              <div className="reveal-wrapper hero-line"><span className="block ml-[5vw]">CODE</span></div>
            </div>
            <div className="reveal-wrapper hero-line"><span className="block text-[var(--syntax-blue)]">SCALE</span></div>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY / CODE SECTION --- */}
      <section className="min-h-screen w-full flex flex-col md:flex-row items-center border-t border-foreground/10 code-section">
        <div className="w-full md:w-1/2 p-12 md:p-24 bg-surface h-full flex flex-col justify-center">
          <ArrowDownRight className="w-16 h-16 mb-12 text-foreground" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter leading-none">
            It's never<br />just a<br />website.
          </h2>
          <p className="text-xl md:text-2xl text-[var(--syntax-comment)] max-w-md !leading-snug">
            Every detail matters. We craft digital experiences. Your design. Our obsession. Your brand. Our playground.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-24 bg-background h-full flex flex-col justify-center text-xl md:text-2xl font-mono leading-relaxed">
          <div className="code-line text-[var(--syntax-comment)] mb-4">{"// Our Approach"}</div>
          <div className="code-line flex"><span className="text-[var(--syntax-magenta)] mr-4">const</span> studio <span className="text-[var(--syntax-magenta)] mx-4">=</span> {"{"}</div>
          <div className="code-line pl-8 text-[var(--syntax-blue)]">obsession: <span className="text-[var(--syntax-green)]">"Performance"</span>,</div>
          <div className="code-line pl-8 text-[var(--syntax-blue)]">focus: <span className="text-[var(--syntax-green)]">"Interaction Design"</span>,</div>
          <div className="code-line pl-8 text-[var(--syntax-blue)]">typesafe: <span className="text-[var(--syntax-amber)]">true</span></div>
          <div className="code-line">{"};"}</div>
        </div>
      </section>

      {/* --- SELECTED WORKS (HORIZONTAL SCROLL) --- */}
      <section ref={horizontalRef} className="h-screen w-full bg-foreground text-background overflow-hidden flex items-center relative">
        <div className="pin-wrap flex h-[80vh] items-center px-12 gap-16 md:gap-32 w-max">
          
          <div className="w-[80vw] md:w-[60vw] shrink-0">
            <div className="text-huge font-bold leading-none uppercase">
              Selected<br/>Projects
            </div>
            <div className="h-px w-full bg-background/20 mt-12 mb-8" />
            <div className="font-mono text-sm uppercase opacity-50 flex items-center gap-4">
              Scroll to explore <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {projects.filter(p => p.featured).map((project, i) => (
            <div key={project.id} className="w-[80vw] md:w-[60vw] shrink-0 h-full flex flex-col justify-center group cursor-pointer relative">
               <div className="flex font-mono text-sm opacity-50 mb-6 gap-6">
                 <span>{String(i + 1).padStart(2, '0')}</span>
                 <span>[ {project.techStack.slice(0,2).join(" / ")} ]</span>
               </div>
               
               <Link href={`/projects/${project.slug}`} className="w-full aspect-video bg-background/5 relative overflow-hidden rounded-none flex items-center justify-center">
                 {/* Decorative image border effect */}
                 <div className="absolute inset-0 border border-background/20 group-hover:border-[var(--syntax-blue)] transition-colors duration-700 z-10 pointer-events-none" />
                 
                 {/* Simulated image load */}
                 <div className="font-mono opacity-20 text-xl group-hover:scale-110 transition-transform duration-1000 ease-out">{project.image}</div>
               </Link>
               
               <h3 className="text-4xl md:text-6xl font-bold mt-8 uppercase tracking-tighter group-hover:text-[var(--syntax-blue)] transition-colors duration-500">
                 {project.title}
               </h3>
            </div>
          ))}

          {/* Spacer block at the end */}
          <div className="w-[20vw] shrink-0" />
        </div>
      </section>

      {/* --- MASSIVE FOOTER --- */}
      <footer className="h-screen w-full flex flex-col justify-end bg-background relative overflow-hidden border-t border-foreground/10 pb-12 px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--syntax-blue)]/5 to-transparent pointer-events-none" />
        
        <div className="w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <h2 className="text-huge font-bold leading-none tracking-tighter footer-giant-text">
              LET'S WORK<br />TOGETHER
            </h2>
            <Link href="/contact" className="px-8 py-4 bg-foreground text-background font-mono text-sm uppercase rounded-full hover:scale-105 hover:bg-[var(--syntax-blue)] transition-all duration-300">
              [ Execute Contact ]
            </Link>
          </div>
          
          <div className="w-full h-px bg-foreground/20 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-xs text-[var(--syntax-comment)] uppercase gap-4">
            <div>© {new Date().getFullYear()} Studio Dev Motion. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-foreground transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
