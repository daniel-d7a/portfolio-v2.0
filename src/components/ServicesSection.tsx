import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PORTFOLIO_CONFIG from '../portfolio.json';
import { VelocityMarquee } from './VelocityMarquee';

const detailsContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3 },
            staggerChildren: 0.08,
            delayChildren: 0.05,
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2 },
            staggerChildren: 0.05,
            staggerDirection: -1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2 }
    }
};

const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06
        }
    }
};

const tagVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};


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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
            className="group relative border-b border-brand-border py-8 md:py-12 cursor-pointer transition-colors duration-500 hover:bg-brand-fg/1"
        >
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-12 gap-8 items-start">
                    {/* Number */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.4 : 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originX: 0, originY: 0 }}
                        className="col-span-2 text-5xl md:text-7xl font-display font-bold text-brand-fg/30 transition-colors duration-300 group-hover:text-brand-fg/50 pt-2"
                    >
                        {id}<span className="text-brand-tertiary">.</span>
                    </motion.div>

                    {/* Image (Middle column) */}
                    <div className="col-span-5 relative">
                        <AnimatePresence initial={false}>
                            {isHovered && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, scale: 0.95 }}
                                    animate={{ height: 260, opacity: 1, scale: 1 }}
                                    exit={{ height: 0, opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                    <div className="col-span-5 pt-2">
                        <AnimatePresence mode="wait">
                            {!isHovered ? (
                                <motion.h3
                                    key="title"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-2xl md:text-3xl font-display font-medium text-brand-fg/75 group-hover:text-brand-fg transition-colors duration-300"
                                >
                                    {name}
                                </motion.h3>
                            ) : (
                                <motion.div
                                    key="details"
                                    variants={detailsContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col justify-start overflow-hidden"
                                >
                                    <motion.h3
                                        variants={itemVariants}
                                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-brand-fg"
                                    >
                                        {name}
                                    </motion.h3>
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-base md:text-lg text-brand-muted font-light leading-relaxed mt-6 max-w-md"
                                    >
                                        {description}
                                    </motion.p>
                                    <motion.div
                                        variants={itemVariants}
                                        className="mt-8"
                                    >
                                        <motion.div
                                            variants={tagContainerVariants}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {tags.map((tag, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    variants={tagVariants}
                                                    className="text-[10px] md:text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-border text-brand-fg/80 bg-brand-bg/50"
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            animate={{ scale: isHovered ? 1.15 : 1 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            style={{ originX: 0, originY: 0.5 }}
                            className="text-3xl font-display font-bold text-brand-fg/30"
                        >
                            {id}<span className="text-brand-tertiary">.</span>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {!isHovered ? (
                                <motion.h3
                                    key="mobile-title"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-lg font-display font-medium text-brand-fg/75 text-right grow pl-4"
                                >
                                    {name}
                                </motion.h3>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence initial={false}>
                        {isHovered && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <motion.div
                                    variants={detailsContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col gap-4 pt-2 pb-4"
                                >
                                    <motion.h3
                                        variants={itemVariants}
                                        className="text-2xl font-display font-bold text-brand-fg"
                                    >
                                        {name}
                                    </motion.h3>
                                    <motion.div
                                        variants={itemVariants}
                                        className="w-full h-50 rounded-xl overflow-hidden border border-brand-border"
                                    >
                                        <img
                                            src={image}
                                            alt={name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <p className="text-sm text-brand-muted font-light leading-relaxed">
                                        {description}
                                    </p>
                                    <motion.div
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            variants={tagContainerVariants}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {tags.map((tag, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    variants={tagVariants}
                                                    className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-brand-border text-brand-fg/80"
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
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
