export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  techStack: string[];
  role: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  content: string;
};

export const projects: Project[] = [
  {
    id: "0",
    slug: "speedometx",
    title: "SPEEDOMETX ⚡",
    shortDescription: "A brutally fast, high-precision edge network telemetry dashboard with fluid Framer Motion kinematics.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    role: "Full-stack Engineer",
    image: "/projects/speedometx.png",
    githubUrl: "https://github.com/anmolmalhan/Speedometx",
    liveUrl: "https://speedometx.vercel.app/",
    featured: true,
    content: "Engineered from the ground up to bypass standard browser telemetry bottlenecks, SPEEDOMETX utilizes a high-concurrency upload engine pooling multithreaded HTTP workers to saturate modern TCP stacks. Paired with a dark, immersive interface, it accurately logs latency jitter natively to edge nodes without yielding to micro-stutters—making it an aggressively premium network assessment tool."
  },
  {
    id: "1",
    slug: "motion-commerce",
    title: "Motion Commerce",
    shortDescription: "A high-performance e-commerce storefront with GSAP interactions built into every product state.",
    techStack: ["Next.js", "GSAP", "Tailwind CSS", "Zustand"],
    role: "Front-end Engineer",
    image: "/projects/commerce.jpg",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
    featured: true,
    content: "Developed a premium commerce experience focusing on micro-interactions..."
  },
  {
    id: "2",
    slug: "terminal-dashboard",
    title: "Terminal Dashboard",
    shortDescription: "An analytics dashboard featuring real-time data flow with a command-line aesthetic.",
    techStack: ["React", "TypeScript", "D3.js", "WebSocket"],
    role: "Full-stack Developer",
    image: "/projects/dashboard.jpg",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
    featured: true,
    content: "Designed to handle high frequency websocket data while keeping rendering optimized..."
  },
  {
    id: "3",
    slug: "open-source-ui",
    title: "Vite Component Library",
    shortDescription: "A lightweight, accessible component library that emphasizes code-splitting and small bundle sizes.",
    techStack: ["Vite", "React", "Radix UI", "Tailwind"],
    role: "Creator",
    image: "/projects/ui-lib.jpg",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
    featured: true,
    content: "Open sourced an internal design system..."
  }
];
