import PORTFOLIO_CONFIG from '../portfolio.json';


export function Bio() {
  return (
    <section id="bio" className="bg-brand-bg border-t border-b border-brand-border py-24 md:py-36 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] max-w-6xl mb-24 md:mb-36">
          {PORTFOLIO_CONFIG.bio.highlight}
        </h2>

        <div className="flex flex-col gap-16 md:gap-24 pt-16 md:pt-24 border-t border-brand-border">
          {/* Intro Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex items-start justify-between font-medium text-lg md:text-xl">
              <div className="w-24 md:w-32 h-px bg-brand-fg/30 mt-3 md:mt-4"></div>
              <div className="tracking-tight">Intro</div>
            </div>
            <div className="text-xl md:text-xl font-light leading-snug opacity-90">
              {PORTFOLIO_CONFIG.bio.intro}
            </div>
          </div>

          {/* Work Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex items-start justify-between font-medium text-lg md:text-xl">
              <div className="font-body tracking-tight opacity-90">(02 - 04)</div>
              <div className="tracking-tight">Work</div>
            </div>
            <div className="text-xl md:text-xl font-light leading-snug opacity-90">
              {PORTFOLIO_CONFIG.bio.work}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}