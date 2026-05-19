import PORTFOLIO_CONFIG from '../portfolio.json';

// ==========================================
// 🧩 SECTION COMPONENTS
// ==========================================

export function Hero() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto relative min-h-[70vh] flex flex-col justify-between">
      <div className="w-full animate-fade-in-up">
        <h1 className="text-[12vw] sm:text-[14vw] font-display font-extrabold tracking-tighter leading-[0.85] select-none text-brand-fg">
          <div className="block">{PORTFOLIO_CONFIG.profile.firstName}</div>
          <div className="block mt-4 md:mt-8">{PORTFOLIO_CONFIG.profile.lastName}</div>
        </h1>
      </div>

      <div className="flex items-center justify-between mt-12 md:mt-24 border-t border-brand-border pt-6">
        <a 
          href="#bio" 
          className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase hover:opacity-85 transition-opacity group"
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
          SCROLL TO EXPLORE
        </a>
        <span className="text-[10px] md:text-xs tracking-widest font-mono opacity-50 uppercase">
          Designed for Impact &bull; Built with Tailwind v4
        </span>
      </div>
    </section>
  );
}

export function Bio() {
  return (
    <section id="bio" className="bg-brand-bg border-t border-b border-brand-border py-24 md:py-36 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] max-w-6xl mb-24 md:mb-36">
          {PORTFOLIO_CONFIG.bio.highlight}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 border-t border-brand-border">
          <div className="lg:col-span-4 flex items-center lg:items-start gap-4">
            <span className="text-xs font-mono tracking-widest opacity-60">
              (02 - 04)
            </span>
            <span className="text-xs uppercase font-bold tracking-widest">
              ABOUT &amp; CAPABILITIES
            </span>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 text-base md:text-lg leading-relaxed font-body">
            <div className="space-y-4">
              <span className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Intro</span>
              <p className="opacity-90">{PORTFOLIO_CONFIG.bio.intro}</p>
            </div>
            <div className="space-y-4">
              <span className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Work</span>
              <p className="opacity-90">{PORTFOLIO_CONFIG.bio.work}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectItemProps {
  id: string;
  name: string;
  tags: string[];
  year: string;
}

export function ProjectItem({ id, name, tags, year }: ProjectItemProps) {
  return (
    <div
      className="group relative border-b border-brand-border py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all duration-500 hover:pl-4"
    >
      <div 
        className="absolute inset-0 bg-brand-fg/5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out -z-10 rounded-lg"
      />

      <div className="flex items-center gap-6 md:gap-12">
        <span className="text-xs md:text-sm font-mono tracking-widest opacity-60">
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
        <span className="text-xs md:text-sm font-mono opacity-60">
          {year}
        </span>
        <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
      <div className="mb-16 flex items-baseline justify-between border-b border-brand-border pb-6">
        <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight">
          Selected Work
        </h2>
        <span className="text-xs font-mono opacity-65">
          ({PORTFOLIO_CONFIG.projects.length} CASE STUDIES)
        </span>
      </div>

      <div className="flex flex-col">
        {PORTFOLIO_CONFIG.projects.map((proj) => (
          <ProjectItem
            key={proj.id}
            id={proj.id}
            name={proj.name}
            tags={proj.tags}
            year={proj.year}
          />
        ))}
      </div>
    </section>
  );
}
