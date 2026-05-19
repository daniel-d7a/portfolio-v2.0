import { useState } from 'react';
import PORTFOLIO_CONFIG from './portfolio.json';
import { HeaderCol, ThemeButton, Footer } from './components/Layout';
import { Hero, Bio, Work } from './components/Sections';

const THEMES = [
  { id: 'theme-1', name: 'THEME ONE', desc: 'Vibrant Orange-Red' },
  { id: 'theme-2', name: 'THEME TWO', desc: 'Charcoal & Lime' },
  { id: 'theme-3', name: 'THEME THREE', desc: 'Ocean Cobalt' },
];

export default function App() {
  const [activeTheme, setActiveTheme] = useState('theme-1');

  return (
    <div className={`theme-${activeTheme === 'theme-1' ? '1' : activeTheme === 'theme-2' ? '2' : '3'} min-h-screen bg-brand-bg text-brand-fg transition-colors duration-500 font-body antialiased selection:bg-brand-fg selection:text-brand-bg`}>
      
      {/* HEADER SECTION */}
      <header className="px-6 md:px-12 py-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-4">
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
          
          {/* Theme switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto border border-brand-border p-1 rounded bg-brand-bg/20 backdrop-blur-sm">
            {THEMES.map((theme) => (
              <ThemeButton
                key={theme.id}
                id={theme.id}
                name={theme.name}
                isActive={activeTheme === theme.id}
                onClick={() => setActiveTheme(theme.id)}
              />
            ))}
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
