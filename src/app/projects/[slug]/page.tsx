import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Code, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-20 flex-1 page-reveal">
      <Link href="/projects" className="inline-flex items-center gap-2 text-[var(--syntax-comment)] hover:text-foreground mb-12 font-mono text-sm transition-colors cursor-pointer group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        <span>cd ..</span>
      </Link>

      <div className="mb-12" style={{ viewTransitionName: `project-${project.slug}` } as React.CSSProperties}>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {project.role}
          </span>
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-surface text-[var(--syntax-green)] border border-surface-hover">
              {tech}
            </span>
          ))}
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ viewTransitionName: `title-${project.slug}` } as React.CSSProperties}>
          {project.title}
        </h1>
        <p className="text-xl text-[var(--syntax-comment)] max-w-2xl mb-8">
          {project.shortDescription}
        </p>

        <div className="flex gap-4 mb-12">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-accent text-background px-6 py-3 rounded-md font-medium hover:bg-accent/90 transition-colors flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Live Site
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-surface-hover hover:bg-surface px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
            <Code className="w-4 h-4" /> Source
          </a>
        </div>
      </div>

      <div className="w-full aspect-video bg-surface overflow-hidden rounded-xl relative border border-surface mb-16" 
           style={{ viewTransitionName: `image-${project.slug}` } as React.CSSProperties}>
        <div className="w-full h-full flex items-center justify-center font-mono text-[var(--syntax-comment)] bg-surface-hover/50">
           Hero Image Placeholder: {project.image}
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-p:text-[var(--syntax-comment)] prose-headings:text-foreground">
        <h2>Case Study</h2>
        <p>{project.content}</p>
        <p>This section would contain multiple descriptive paragraphs, highlighting the engineering process, the motion implementation, and the problems solved. We are using a scroll-reveal utility for entering these blocks.</p>
        
        <h3>Technical Implementation</h3>
        <p>For the motion, we utilized GSAP ScrollTrigger to coordinate sequence timings effectively. Performance was measured, rendering bottlenecks were optimized, and Core Web Vitals targets were met.</p>
      </div>
    </div>
  );
}
