import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import PORTFOLIO_CONFIG from '../portfolio.json';
import { useTheme } from './ThemeContext';


interface HeaderColProps {
  label?: string;
  value: React.ReactNode;
  subValue?: string;
  href?: string;
  layoutId?: string;
}

export function HeaderCol({ label, value, subValue, href, layoutId }: HeaderColProps) {
  const content = (
    <div>
      {label &&
        <span className="block font-bold tracking-wider text-xs mb-1 opacity-70">{label}</span>
      }
      <div className="text-sm font-medium tracking-tight uppercase">
        {layoutId ? (
          value ? (
            <motion.div 
              layoutId={layoutId} 
              className="inline-block"
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mix-blend-difference text-white">
                {value}
              </span>
            </motion.div>
          ) : null
        ) : (
          value
        )}
      </div>
      {subValue && <span className="block text-xs uppercase opacity-70 mt-0.5">{subValue}</span>}
    </div>
  );
  return (
    <div className="text-left font-display flex items-start">
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 60,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [250, 0]);
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);

  const { isLight } = useTheme()

  return (
    <footer className="fixed bottom-0 left-0 w-full h-[50vh] bg-brand-fg text-brand-bg transition-colors duration-500 overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 pointer-events-none">
      {/* Background Vertical Stripes */}
      <div className={`absolute inset-0 flex pointer-events-none z-0 ${!isLight && "opacity-80"}`}>
        {STRIPE_OPACITIES.map((stripe, idx) => (
          <div
            key={idx}
            className={`flex-1 h-full ${!isLight ? stripe.dark : stripe.light}`}
          />
        ))}
      </div>

      {/* BIG NAME (SLIDING UP) - Now grows to take middle space */}
      <div className="w-full flex flex-col justify-center grow overflow-hidden leading-none relative z-0 pb-4">
        <motion.h1
          style={{ y, opacity }}
          className="text-[12vw] sm:text-[10vw] lg:text-[14vw] font-display font-black tracking-tighter whitespace-nowrap leading-[0.75] select-none text-brand-fg text-center"
        >
          {PORTFOLIO_CONFIG.profile.firstName} {PORTFOLIO_CONFIG.profile.lastName} <span className="text-brand-tertiary">.</span>
        </motion.h1>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/20 text-[10px] md:text-xs font-mono opacity-80 relative z-10 text-brand-fg pointer-events-auto mb-10">
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

export function ContactSection() {
  return (
    <section className="w-full py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display font-bold mb-4 tracking-tighter leading-tight text-brand-fg">
            Let's build something great together.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Column 1: WhatsApp Contact */}
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-bold tracking-widest opacity-50 uppercase font-mono">Contact Me</span>
            <a
              href={`https://wa.me/${PORTFOLIO_CONFIG.profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-fg group relative inline-flex items-baseline text-2xl lg:text-3xl font-display font-black tracking-tight hover:opacity-85 transition-opacity pb-1"
            >
              <span className="relative">
                Get In Touch.
                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-fg origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-2xl ml-2">
                <ArrowUpRight size={24} />
              </span>
            </a>
            <p className="text-xs opacity-60 max-w-[200px] leading-relaxed">
              Available for new projects. Let's chat on WhatsApp.
            </p>
          </div>

          {/* Column 2: Empty/Middle Space */}
          <div className="hidden md:block"></div>

          {/* Column 3: Socials */}
          <div className="flex flex-col md:items-end gap-6">
            <span className="text-xs font-bold tracking-widest opacity-50 uppercase font-mono">Socials</span>
            <div className="flex flex-col md:items-end gap-3">
              {PORTFOLIO_CONFIG.profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-display font-bold hover:text-brand-tertiary transition-colors flex items-center gap-2 group"
                >
                  {social.name}
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BottomBlur() {
  const layers = [
    { blur: 0.234375, start: 0.0, m1: 12.5, m2: 25.0, end: 37.5 },
    { blur: 0.46875, start: 12.5, m1: 25.0, m2: 37.5, end: 50.0 },
    { blur: 0.9375, start: 25.0, m1: 37.5, m2: 50.0, end: 62.5 },
    { blur: 1.875, start: 37.5, m1: 50.0, m2: 62.5, end: 75.0 },
    { blur: 3.75, start: 50.0, m1: 62.5, m2: 75.0, end: 87.5 },
    { blur: 7.5, start: 62.5, m1: 75.0, m2: 87.5, end: 100.0 },
    { blur: 15, start: 75.0, m1: 87.5, m2: 100.0, end: 112.5 },
    { blur: 30, start: 87.5, m1: 100.0, m2: 112.5, end: 125.0 },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-36 pointer-events-none z-100"
      aria-hidden="true"
    >
      {layers.map((layer, idx) => (
        <div
          key={idx}
          className="absolute inset-0"
          style={{
            zIndex: idx + 1,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: `linear-gradient(to bottom, rgba(0,0,0,0) ${layer.start}%, rgba(0,0,0,1) ${layer.m1}%, rgba(0,0,0,1) ${layer.m2}%, rgba(0,0,0,0) ${layer.end}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,0) ${layer.start}%, rgba(0,0,0,1) ${layer.m1}%, rgba(0,0,0,1) ${layer.m2}%, rgba(0,0,0,0) ${layer.end}%)`,
          }}
        />
      ))}
    </div>
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
