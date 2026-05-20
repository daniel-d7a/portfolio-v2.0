import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue
} from 'framer-motion';

interface VelocityMarqueeProps {
  text: string;
  baseSpeed?: number;
}

export function VelocityMarquee({ text, baseSpeed = 0.05 }: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Custom wrap function to cycle between offsets
  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  // 8 identical items means each occupies exactly 12.5% of the total container width.
  // We wrap between -12.5% and 0% for seamless looping.
  const x = useTransform(baseX, (v) => `${wrap(-12.5, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // Base speed moving left (negative)
    let moveBy = -baseSpeed;

    // Scroll velocity influence
    const velocityFactor = smoothVelocity.get() * 0.0005;

    // Add scroll velocity to movement
    // Scrolling down (positive velocity) -> speeds up left (negative movement)
    // Scrolling up (negative velocity) -> speeds up right (positive movement)
    moveBy -= velocityFactor;

    // Apply delta frame time correction
    const currentX = baseX.get();
    baseX.set(currentX + moveBy * (delta / 16));
  });

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-12 md:py-20 border-y border-brand-border bg-brand-bg transition-colors duration-500 select-none">
      <motion.div
        style={{ x }}
        className="inline-flex items-center gap-12 md:gap-20 pr-12 md:pr-20 text-[10vw] font-display font-black uppercase tracking-tighter leading-none text-brand-fg"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-20 shrink-0">
            <span>{text}</span>
            <span className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-brand-tertiary shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
