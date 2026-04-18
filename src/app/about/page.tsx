import { User, Layers, Hammer, Zap, GitCommit } from "lucide-react";

export default function AboutPage() {
  const steps = [
    { icon: Layers, title: "Plan", desc: "Architecture, component trees, and data flow modeling.", color: "text-[var(--syntax-blue)]" },
    { icon: Hammer, title: "Build", desc: "Writing clean, modular Next.js & React code.", color: "text-[var(--syntax-amber)]" },
    { icon: Zap, title: "Style", desc: "Rapid UI development and scalable styling with Tailwind CSS.", color: "text-[var(--syntax-magenta)]" },
    { icon: GitCommit, title: "Type", desc: "Enforcing resilient, type-safe codebases with TypeScript.", color: "text-[var(--syntax-green)]" }
  ];

  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-20 flex-1 page-reveal">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <User className="text-accent w-8 h-8" />
          About / Process
        </h1>
        <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
          {"// Introduction"}
        </div>
        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          I'm a front-end developer heavily focused on modern web engineering and building pixel-perfect UIs. 
          My goal is to construct interfaces that are not only visually immaculate but also fundamentally robust 
          and performant under the hood.
        </p>
        <p className="text-lg text-foreground/80 leading-relaxed">
          I deeply specialize in the React ecosystem, Next.js, TypeScript, and Tailwind CSS. From mapping complex state to rapidly styling components, I believe in writing clean, type-safe code that delivers exceptional user experiences.
        </p>
      </div>

      <div>
        <div className="font-mono text-sm text-[var(--syntax-comment)] mb-6">
          {"/* Development Pipeline */"}
        </div>
        
        <div className="relative border-l border-surface ml-4 md:ml-0 md:pl-0 md:border-none space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative pl-8 md:pl-0">
                <div className="md:hidden absolute top-0 -left-[17px] w-8 h-8 rounded-full bg-surface border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                
                <div className="hidden md:flex mb-6 items-center w-full">
                  <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs">{i + 1}</span>
                  </div>
                  <div className="h-px bg-surface flex-1 ml-4" />
                </div>

                <Icon className={`w-8 h-8 mb-4 ${step.color}`} />
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-[var(--syntax-comment)] text-sm">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
