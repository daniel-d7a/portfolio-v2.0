import { motion } from 'framer-motion';
import PORTFOLIO_CONFIG from '../portfolio.json';
import Grainient from "@/components/Grainient";

export function Hero({ isScrolled }: { isScrolled: boolean }) {
    return (
        <section className="w-full relative h-[90vh] flex flex-col justify-between overflow-hidden px-6 md:px-12 py-16 md:py-24">


            <div className="max-w-6xl mx-auto w-full flex flex-col justify-between grow relative z-10 pointer-events-none">
                <div className="w-full pointer-events-auto">
                    {!isScrolled && (
                        <motion.h1
                            layoutId="main-name"
                            className="text-[12vw] sm:text-[14vw] font-body font-black tracking-tighter leading-[0.85] select-none text-white inline-block"
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="mix-blend-difference">
                                <div className="block">{PORTFOLIO_CONFIG.profile.firstName}</div>
                                <div className="block mt-4 md:mt-8">{PORTFOLIO_CONFIG.profile.lastName}</div>
                            </span>
                        </motion.h1>
                    )}
                </div>

                <div className="flex items-center justify-between mt-12 md:mt-24 border-t border-brand-border pt-6 pointer-events-auto">
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
                        Designed for Impact &bull; Built with AI
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <Grainient
                    color1="#fefefe"
                    color2="#000000"
                    color3="#7a7a7a"
                    timeSpeed={1}
                    colorBalance={0}
                    warpStrength={3}
                    warpFrequency={4}
                    warpSpeed={1}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.05}
                    rotationAmount={500}
                    noiseScale={0}
                    grainAmount={0.05}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.5}
                />
            </div>
        </section>
    );
}