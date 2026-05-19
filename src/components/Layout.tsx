import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import PORTFOLIO_CONFIG from '../portfolio.json';

// ==========================================
// 🧩 HEADER & LAYOUT COMPONENTS
// ==========================================

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

interface ThemeButtonProps {
  id: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export function ThemeButton({ name, isActive, onClick }: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-bold tracking-widest px-3 py-1.5 rounded transition-all duration-300 ${
        isActive
          ? 'bg-brand-fg text-brand-bg shadow-lg scale-105'
          : 'text-brand-fg opacity-65 hover:opacity-100 hover:scale-102'
      }`}
    >
      {name}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-brand-border bg-brand-bg/50 backdrop-blur-sm transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs md:text-sm font-mono opacity-60">
          &copy; {new Date().getFullYear()} {PORTFOLIO_CONFIG.profile.logo} All Rights Reserved.
        </div>
        
        <a
          href={`mailto:${PORTFOLIO_CONFIG.profile.email}`}
          className="group text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-80"
        >
          LET'S WORK TOGETHER 
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </footer>
  );
}
