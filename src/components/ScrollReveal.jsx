import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

const ScrollReveal = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.2,
  className = '',
  once = false,
}) => {
  const [ref, inView] = useInView({ triggerOnce: once, threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant] || variants.fadeUp}
      transition={{ 
        type: 'spring',
        stiffness: 70,
        damping: 15,
        mass: 1,
        bounce: 0.2,
        delay, 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
