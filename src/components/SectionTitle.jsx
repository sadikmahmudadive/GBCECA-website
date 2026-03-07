import { motion } from 'framer-motion';

const SectionTitle = ({ subtitle, title, description, light = false, center = true }) => {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-14 md:mb-18`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className={`inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4 ${light ? 'text-accent-300' : 'text-accent-500'}`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: false }}
        className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 leading-tight ${light ? 'text-white' : 'text-gray-900'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className={`text-lg leading-relaxed ${light ? 'text-white/80' : 'text-gray-600'}`}
        >
          {description}
        </motion.p>
      )}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: false }}
        className={`mt-6 h-1 w-24 ${center ? 'mx-auto' : ''} rounded-full bg-linear-to-r from-primary-600 via-accent-400 to-accent-500 origin-left`} 
      />
    </div>
  );
};

export default SectionTitle;
