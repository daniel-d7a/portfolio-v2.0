import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import PORTFOLIO_CONFIG from '../portfolio.json';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PORTFOLIO_CONFIG.projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-bg text-brand-fg"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <Link
          to="/"
          viewTransition
          className="inline-flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          BACK TO HOME
        </Link>

        <header className="mb-16 md:mb-24">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
                <span className="text-xs md:text-sm font-body tracking-widest opacity-60">
                    {project.id}
                </span>
                <div className="flex gap-2">
                    {project.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-brand-border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.9] mb-8">
              {project.name}<span className="text-brand-tertiary">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted max-w-3xl leading-relaxed font-light">
              {project.description}
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20"
        >
          <div className="md:col-span-7">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-brand-fg/5 border border-brand-border mb-12">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="prose prose-invert max-w-none">
                <p className="text-lg md:text-xl leading-relaxed opacity-80 whitespace-pre-wrap">
                    {project.content}
                </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-12 space-y-12">
                <div className="p-8 rounded-2xl border border-brand-border bg-brand-fg/5 backdrop-blur-sm">
                    <h3 className="font-display font-bold text-lg mb-6 tracking-tight">PROJECT DETAILS</h3>
                    <dl className="space-y-6">
                        <div>
                            <dt className="text-xs opacity-50 font-bold tracking-widest uppercase mb-1">Services</dt>
                            <dd className="text-sm font-medium">{project.tags.join(', ')}</dd>
                        </div>
                        <div>
                            <dt className="text-xs opacity-50 font-bold tracking-widest uppercase mb-1">Year</dt>
                            <dd className="text-sm font-medium">2024</dd>
                        </div>
                        <div>
                            <dt className="text-xs opacity-50 font-bold tracking-widest uppercase mb-1">Client</dt>
                            <dd className="text-sm font-medium">{project.name} Inc.</dd>
                        </div>
                    </dl>
                    <button className="w-full mt-10 py-4 px-6 bg-brand-fg text-brand-bg font-display font-bold text-sm tracking-widest uppercase rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                        Live Preview <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-sm opacity-60 italic">"Working with Eyad was a game-changer for our platform. The attention to detail and technical expertise is unmatched."</p>
                    <span className="text-xs font-bold tracking-widest">— CLIENT FEEDBACK</span>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
