import { useEffect, useState } from 'react';
import { Footer, HeaderCol, ThemeToggle } from './components/Layout';
import { Bio, Hero, Work } from './components/Sections';
import PORTFOLIO_CONFIG from './portfolio.json';

export default function App() {
  const [isLight, setIsLight] = useState(false);

  // Sync with system preference on first load if no user choice
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!isDark) setIsLight(true);
  }, []);

  // Update root element classes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove( 'light');
    if (isLight) root.classList.add('light');
  }, [isLight]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-fg transition-colors duration-500 font-body antialiased selection:bg-brand-fg selection:text-brand-bg">
      
      {/* HEADER SECTION */}
      <header className="px-6 md:px-12 py-8 border-b border-brand-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-16">
            <HeaderCol label="NAME" value={PORTFOLIO_CONFIG.profile.logo} />
            <HeaderCol label="ROLE" value={PORTFOLIO_CONFIG.profile.role} />
            <HeaderCol 
              label="CONTACT" 
              value={PORTFOLIO_CONFIG.profile.email} 
              subValue={PORTFOLIO_CONFIG.profile.phone}
              href={`mailto:${PORTFOLIO_CONFIG.profile.email}`}
            />
          </div>
          
          <div className="flex items-center gap-4 self-start md:self-auto">

            {/* Light/Dark Toggle */}
            <ThemeToggle isLight={isLight} toggle={() => setIsLight(!isLight)} />
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Bio />
        <Work />
      </main>

      <Footer />
    </div>
  );
}
