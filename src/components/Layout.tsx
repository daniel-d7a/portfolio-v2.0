import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import PORTFOLIO_CONFIG from '../portfolio.json';
import { useTheme } from './ThemeContext';

// ==========================================
// 🧩 HEADER & LAYOUT COMPONENTS
// ==========================================

interface HeaderColProps {
  label: string;
  value: string;
  subValue?: string;
  href?: string;
}

export function HeaderCol({ label, value, subValue, href }: HeaderColProps) {
  const content = (
    <>
      <span className="block font-bold tracking-wider text-xs mb-1 opacity-70">{label}</span>
      <span className="block text-sm font-medium tracking-tight uppercase">{value}</span>
      {subValue && <span className="block text-xs uppercase opacity-70 mt-0.5">{subValue}</span>}
    </>
  );
  return (
    <div className="text-left font-display">
      {href ? (
        <a href={href} className="hover:opacity-80 transition-opacity">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

export function ThemeToggle({ isLight, toggle }: { isLight: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative p-2 rounded-full hover:bg-brand-fg/10 transition-colors focus:outline-none cursor-pointer"
      aria-label="Toggle theme"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLight ? 'light' : 'dark'}
            initial={{ filter: 'blur(8px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            exit={{ filter: 'blur(8px)', opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {isLight ? (
              <Sun size={20} strokeWidth={2.5} />
            ) : (
              <Moon size={20} strokeWidth={2.5} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
}

export function Footer({ scrollTarget }: { scrollTarget: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: scrollTarget || undefined,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const { isLight } = useTheme()

  return (
    <footer className="fixed bottom-0 left-0 w-full h-screen bg-brand-fg text-brand-bg transition-colors duration-500 overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 pointer-events-none">
      {/* Background Vertical Stripes */}
      <div className={`absolute inset-0 flex pointer-events-none z-0 ${!isLight && "opacity-80"}`}>
        {STRIPE_OPACITIES.map((stripe, idx) => (
          <div
            key={idx}
            className={`flex-1 h-full ${!isLight ? stripe.dark : stripe.light}`}
          />
        ))}
      </div>

      {/* Slogan & Action */}
      <div className="w-full flex flex-col items-center justify-center grow text-center relative z-10 pointer-events-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tight leading-tight text-brand-fg">
          Let's build something great together.
        </h2>
        <a
          href={`mailto:${PORTFOLIO_CONFIG.profile.email}`}
          className="text-brand-fg group relative inline-flex items-baseline text-3xl lg:text-4xl font-display font-black tracking-tight hover:opacity-85 transition-opacity z-10 pb-1"
        >
          <span className="relative">
            Get In Touch.
            <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-fg origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 text-3xl lg:text-4xl font-light ml-3 select-none">
            <ArrowUpRight />
          </span>
        </a>
      </div>

      {/* BIG NAME (SLIDING UP) */}
      <div className="w-full flex justify-center overflow-hidden leading-none relative z-0 pb-4">
        <motion.h1
          style={{ y, opacity }}
          className="text-[12vw] sm:text-[10vw] lg:text-[14vw] font-display font-black tracking-tighter whitespace-nowrap leading-[0.75] select-none text-brand-fg"
        >
          {PORTFOLIO_CONFIG.profile.firstName} {PORTFOLIO_CONFIG.profile.lastName} <span className="text-brand-tertiary">.</span>

        </motion.h1>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/20 text-[10px] md:text-xs font-mono opacity-80 relative z-10 text-brand-fg pointer-events-auto">
        <div>
          &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.profile.firstName} {PORTFOLIO_CONFIG.profile.lastName}
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:opacity-70 transition-opacity">Portfolio</a>
          <a href={`mailto:${PORTFOLIO_CONFIG.profile.email}`} className="hover:opacity-70 transition-opacity">Email</a>
        </div>
      </div>
    </footer>
  );
}

const STRIPE_OPACITIES = [
  { dark: 'bg-brand-bg/90', light: 'bg-white/25' },
  { dark: 'bg-brand-bg/80', light: 'bg-white/45' },
  { dark: 'bg-brand-bg/65', light: 'bg-white/65' },
  { dark: 'bg-brand-bg/45', light: 'bg-white/80' },
  { dark: 'bg-brand-bg/25', light: 'bg-white/90' },
  { dark: 'bg-brand-bg/45', light: 'bg-white/80' },
  { dark: 'bg-brand-bg/65', light: 'bg-white/65' },
  { dark: 'bg-brand-bg/80', light: 'bg-white/45' },
  { dark: 'bg-brand-bg/90', light: 'bg-white/25' },
];
