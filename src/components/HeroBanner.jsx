import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroBanner = ({ title, subtitle, bgClass = 'bg-primary-800' }) => {
  return (
    <section className={`relative ${bgClass} overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-400/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary-400/8 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,26,46,0.3)_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex items-center justify-center space-x-3 text-sm">
            <Link to="/" className="text-white/60 hover:text-accent-400 transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-accent-400 font-medium">{title}</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroBanner;
