import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PORTFOLIO_CONFIG from '../portfolio.json';
import { VelocityMarquee } from './VelocityMarquee';

interface ServiceItemProps {
    id: string;
    name: string;
    description: string;
    image: string;
    tags: string[];
}

export function ServiceItem({ id, name, description, image, tags }: ServiceItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
            className="group relative border-b border-brand-border py-8 md:py-12 cursor-pointer transition-colors duration-500 hover:bg-brand-fg/1"
        >
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-12 gap-8 items-start">
                    {/* Number */}
                    <div className="col-span-2 text-5xl md:text-7xl font-display font-bold text-brand-fg/30 transition-colors duration-300 group-hover:text-brand-fg/50 pt-2">
                        {id}<span className="text-brand-tertiary">.</span>
                    </div>

                    {/* Image (Middle column) */}
                    <div className="col-span-5 relative">
                        <AnimatePresence initial={false}>
                            {isHovered && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, scale: 0.95 }}
                                    animate={{ height: 260, opacity: 1, scale: 1 }}
                                    exit={{ height: 0, opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full rounded-2xl overflow-hidden shadow-lg border border-brand-border"
                                >
                                    <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-65 object-cover"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Details (Right column) */}
                    <div className="col-span-5 flex flex-col justify-start pt-2">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-brand-fg transition-all duration-300">
                            {name}
                        </h3>

                        <AnimatePresence initial={false}>
                            {isHovered && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-base md:text-lg text-brand-muted font-light leading-relaxed mt-6 max-w-md">
                                        {description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-8">
                                        {tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[10px] md:text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-border text-brand-fg/80 bg-brand-bg/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-display font-bold text-brand-fg/30">
                            {id}<span className="text-brand-tertiary">.</span>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-brand-fg text-right grow pl-4">
                            {name}
                        </h3>
                    </div>

                    <AnimatePresence initial={false}>
                        {isHovered && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden flex flex-col gap-4"
                            >
                                <div className="w-full h-50 rounded-xl overflow-hidden border border-brand-border">
                                    <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-sm text-brand-muted font-light leading-relaxed">
                                    {description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-brand-border text-brand-fg/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

export function Services() {
    return (
        <section className="py-24 md:py-36 w-full">
            <VelocityMarquee text="SERVICES" baseSpeed={0.05} />

            <div className="w-full mt-16 md:mt-24 border-t border-brand-border">
                <div className="flex flex-col">
                    {PORTFOLIO_CONFIG.services.map((service) => (
                        <ServiceItem
                            key={service.id}
                            id={service.id}
                            name={service.name}
                            description={service.description}
                            image={service.image}
                            tags={service.tags}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
