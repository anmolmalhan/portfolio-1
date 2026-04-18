import { projects } from "@/data/projects";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 py-20 flex-1 page-reveal">
      <div className="mb-12 border-b border-surface pb-6">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <FolderGit2 className="text-accent w-8 h-8" />
          Projects
        </h1>
        <p className="text-[var(--syntax-comment)] max-w-2xl text-lg">
          A collection of interfaces and applications I've built. Focusing on performance, 
          interaction design, and clean code architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            href={`/projects/${project.slug}`}
            className="group flex flex-col md:flex-row gap-8 items-center bg-surface/20 border border-transparent hover:border-surface p-6 rounded-2xl transition-colors cursor-pointer"
            style={{ viewTransitionName: `project-${project.slug}` } as React.CSSProperties}
          >
            <div className="w-full md:w-1/2 aspect-video bg-surface overflow-hidden rounded-xl relative border border-surface group-hover:border-accent/40 transition-colors"
                 style={{ viewTransitionName: `image-${project.slug}` } as React.CSSProperties}>
               <div className="w-full h-full flex items-center justify-center font-mono text-[var(--syntax-comment)] bg-surface-hover/50">
                 Loading: {project.image}
               </div>
            </div>
            <div className="w-full md:w-1/2 py-4">
              <div className="flex gap-2 mb-4 flex-wrap">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-background border border-surface text-[var(--syntax-green)]">
                    {tech}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors" 
                  style={{ viewTransitionName: `title-${project.slug}` } as React.CSSProperties}>
                {project.title}
              </h2>
              <p className="text-[var(--syntax-comment)] mb-6 text-lg">{project.shortDescription}</p>
              <div className="font-mono text-sm text-accent flex items-center gap-2">
                <span>View Case Study</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
