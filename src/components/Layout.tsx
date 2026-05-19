import PORTFOLIO_CONFIG from '../portfolio.json';

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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
