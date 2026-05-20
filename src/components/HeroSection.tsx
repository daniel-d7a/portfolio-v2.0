import { motion } from 'framer-motion';
import PORTFOLIO_CONFIG from '../portfolio.json';
import { useTheme } from "./ThemeContext";

const HERO_STRIPES = [
    { light: 'bg-brand-fg/50', dark: 'bg-white/15' },
    { light: 'bg-brand-fg/40', dark: 'bg-white/25' },
    { light: 'bg-brand-fg/35', dark: 'bg-white/35' },
    { light: 'bg-brand-fg/25', dark: 'bg-white/40' },
    { light: 'bg-brand-fg/15', dark: 'bg-white/50' },
    { light: 'bg-brand-fg/25', dark: 'bg-white/40' },
    { light: 'bg-brand-fg/35', dark: 'bg-white/35' },
    { light: 'bg-brand-fg/40', dark: 'bg-white/25' },
    { light: 'bg-brand-fg/50', dark: 'bg-white/15' },
];

function HeroStripes() {
    const { isLight } = useTheme();

    return (
        <div
            className="absolute right-0 top-0 -translate-y-1/2 w-[60vw] h-[70vh] flex pointer-events-none z-  0"
            style={{
                maskImage: 'radial-gradient(circle, black 10%, transparent 50%)',
                WebkitMaskImage: 'radial-gradient(circle, black 10%, transparent 50%)'
            }}
        >
            {HERO_STRIPES.map((stripe, idx) => (
                <div
                    key={idx}
                    className={`flex-1 h-full transition-colors duration-500 ${!isLight ? stripe.dark : stripe.light}`}
                />
            ))}
        </div>
    );
}

export function Hero({ isScrolled }: { isScrolled: boolean }) {
    return (
        <section className="w-full relative h-[90vh] flex flex-col justify-between overflow-hidden px-6 md:px-12 py-16 md:py-24">
            {/* TODO: make it similar to the inspo from formance.framer.website */}
            {/* <HeroStripes /> */}

            <div className="max-w-6xl mx-auto w-full flex flex-col justify-between grow relative z-10">
                <div className="w-full">
                    {!isScrolled && (
                        <motion.h1 
                            layoutId="main-name"
                            className="text-[12vw] sm:text-[14vw] font-body font-black tracking-tighter leading-[0.85] select-none text-brand-fg inline-block"
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >                            <div className="block">{PORTFOLIO_CONFIG.profile.firstName}</div>
                            <div className="block mt-4 md:mt-8">{PORTFOLIO_CONFIG.profile.lastName}</div>
                        </motion.h1>
                    )}
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
            </div>
        </section>
    );
}