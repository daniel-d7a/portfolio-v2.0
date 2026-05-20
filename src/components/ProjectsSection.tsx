import PORTFOLIO_CONFIG from '../portfolio.json';
import { VelocityMarquee } from './VelocityMarquee';

interface ProjectItemProps {
    id: string;
    name: string;
    tags: string[];
}

export function ProjectItem({ id, name, tags, }: ProjectItemProps) {
    return (
        <div
            className="group relative border-b border-brand-border py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all duration-500 hover:pl-4"
        >
            {/* <div
        className="absolute inset-0 bg-brand-fg/5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out -z-10 rounded-lg"
      /> */}

            <div className="flex items-center gap-6 md:gap-12">
                <span className="text-xs md:text-sm font-body tracking-widest opacity-60">
                    {id}
                </span>
                <h3 className="text-3xl md:text-6xl font-display font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {name}
                </h3>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
                <div className="flex gap-2">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-brand-border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                </span>
            </div>
        </div>
    );
}

export function Projects() {
    return (
        <section className="py-24 md:py-36 w-full">
            <VelocityMarquee text="PROJECTS" baseSpeed={0.05} />

            <div className="px-6 md:px-12 max-w-6xl mx-auto mt-16 md:mt-24">
                <div className="flex flex-col">
                    {PORTFOLIO_CONFIG.projects.map((proj) => (
                        <ProjectItem
                            key={proj.id}
                            id={proj.id}
                            name={proj.name}
                            tags={proj.tags}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}