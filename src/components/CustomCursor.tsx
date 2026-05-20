import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view'>('default');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { pathname } = useLocation();

  // Track if we are in a manually triggered mode (like 'view' for projects)
  const manualModeRef = useRef<'default' | 'view'>('default');

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Reset cursor on route change
  useEffect(() => {
    manualModeRef.current = 'default';
    setCursorType('default');
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Auto-detection only runs if we aren't in 'view' mode
      if (manualModeRef.current !== 'view') {
        const target = e.target as HTMLElement;
        const isInteractive = !!target.closest('a, button, input, select, textarea, [role="button"]');
        setCursorType(isInteractive ? 'hover' : 'default');
      }
    };

    const handleCursorChange = (e: CustomEvent) => {
      const mode = e.detail as 'default' | 'view';
      manualModeRef.current = mode;
      setCursorType(mode);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('cursorChange', handleCursorChange as EventListener);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursorChange', handleCursorChange as EventListener);
    };
  }, [mouseX, mouseY]);

  const getCursorSize = () => {
    switch (cursorType) {
      case 'view': return 80;
      case 'hover': return 50; // Slightly larger for clarity
      default: return 20;
    }
  };

  const size = getCursorSize();

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: -10,
        top: -10,
      }}
      className="fixed pointer-events-none z-9999 mix-blend-difference hidden md:block"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          x: -(size / 2) + 10,
          y: -(size / 2) + 10,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="bg-white rounded-full flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {cursorType === 'view' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-1 text-black"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">
                View
              </span>
              <ArrowUpRight size={14} strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export const setCursorMode = (mode: 'default' | 'view') => {
  const event = new CustomEvent('cursorChange', { detail: mode });
  window.dispatchEvent(event);
};
