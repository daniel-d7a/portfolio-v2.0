import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer, HeaderCol, ThemeToggle, ContactSection } from './components/Layout';
import PORTFOLIO_CONFIG from './portfolio.json';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { Hero } from './components/HeroSection';
import { Bio } from './components/BioSection';
import { Projects } from './components/ProjectsSection';
import { Services } from './components/ServicesSection';
import { ProjectDetail } from './components/ProjectDetail';
import { SmoothScroll, useLenis } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Hero />
      <Bio />
      <Projects />
      <Services />
      <ContactSection />
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { isLight, toggleTheme } = useTheme();
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-body antialiased selection:bg-brand-fg selection:text-brand-bg">
        <div className="relative z-10 bg-brand-bg text-brand-fg transition-colors duration-500 min-h-screen shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
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
                <ThemeToggle isLight={isLight} toggle={toggleTheme} />
              </div>
            </div>
          </header>

          <main className="grow">
            <AnimatedRoutes />
          </main>
        </div>
        <div ref={footerRef} className="h-[50vh] pointer-events-none" />
        <Footer scrollTarget={footerRef} />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CustomCursor />
        <AppContent />
      </SmoothScroll>
    </ThemeProvider>
  );
}
