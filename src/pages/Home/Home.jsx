import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  FaShieldAlt,
  FaUsers,
  FaCalendarAlt,
  FaHandshake,
  FaMedal,
  FaChevronRight,
  FaArrowRight,
  FaAnchor,
} from 'react-icons/fa';
import ScrollReveal from '../../components/ScrollReveal';
import SectionTitle from '../../components/SectionTitle';
import PageTransition from '../../components/PageTransition';

/* ─── Hero Section ────────────────────────────── */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary-900 via-primary-800 to-[#0a1628]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400/20 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-primary-400/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-accent-300/10 rounded-full blur-[100px]" />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/15">
            <FaAnchor className="text-accent-400 text-sm" />
            <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">Bangladesh National Cadet Corps — Naval Wing</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
        >
          Govt. Bangla College
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-300 to-accent-400">
            Ex Cadet Association
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          United in discipline, bonded by brotherhood — serving the nation with
          pride, honor, and unwavering commitment. Anchored in the spirit of the Naval Wing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/about">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-8 py-3.5 btn-accent text-white font-semibold rounded-xl flex items-center space-x-2 shadow-lg">
              <span>Discover Our Story</span>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
          <Link to="/contact">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3.5 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm shadow-lg">
              Get In Touch
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#ffffff">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    </section>
  );
};

/* ─── Stats Section ───────────────────────────── */
const stats = [
  { number: 500, suffix: '+', label: 'Ex Cadets', icon: FaUsers },
  { number: 40, suffix: '+', label: 'Years of Legacy', icon: FaMedal },
  { number: 100, suffix: '+', label: 'Events Organized', icon: FaCalendarAlt },
  { number: 25, suffix: '+', label: 'Active Batches', icon: FaHandshake },
];

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section className="relative z-20 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-white rounded-2xl p-6 md:p-8 card-shadow text-center border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary-50 to-primary-100 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
                  {inView ? (
                    <CountUp end={stat.number} duration={2.5} suffix={stat.suffix} />
                  ) : (
                    '0'
                  )}
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── About Preview ───────────────────────────── */
const AboutPreview = () => (
  <section className="py-16 md:py-24 pattern-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <ScrollReveal variant="fadeLeft">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop"
                alt="BNCC cadets in formation"
                className="w-full h-80 md:h-105 object-cover img-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-linear-to-br from-primary-600 to-primary-700 rounded-2xl p-6 shadow-2xl hidden md:block ring-1 ring-white/10">
              <p className="text-white text-2xl font-bold">40+</p>
              <p className="text-white/70 text-xs font-medium">Years of Service</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeRight">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-accent-500 mb-3">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Forging Leaders Through{' '}
            <span className="text-primary-600">Discipline & Service</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            The Govt. Bangla College Ex Cadet Association (GBCECA) is a proud fraternity
            of former BNCC cadets from Govt. Bangla College, Mirpur, Dhaka. We carry forward
            the legacy of discipline, leadership, and patriotism instilled during our cadet days.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Bangladesh National Cadet Corps (BNCC) is a para-military youth organization
            that shapes young minds into responsible citizens and future leaders of Bangladesh.
            Our association keeps that spirit alive through community service, social events,
            and brotherly bonding.
          </p>
          <Link to="/about">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 btn-primary text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg"
            >
              <span>Learn More</span>
              <FaChevronRight className="text-xs" />
            </motion.div>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─── Features / Values ───────────────────────── */
const features = [
  {
    icon: FaShieldAlt,
    title: 'Discipline & Honor',
    description: 'Upholding the core values of BNCC — discipline, integrity, and selfless service to the nation.',
  },
  {
    icon: FaUsers,
    title: 'Brotherhood',
    description: 'A lifelong bond that transcends batches and years. Once a cadet, always a cadet.',
  },
  {
    icon: FaMedal,
    title: 'Leadership',
    description: 'Developing leaders who serve in every sphere of national life with distinction.',
  },
  {
    icon: FaHandshake,
    title: 'Community Service',
    description: 'Contributing to society through charitable activities, disaster relief, and social welfare programs.',
  },
];

const FeaturesSection = () => (
  <section className="py-16 md:py-24 bg-primary-900 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-400/10 rounded-full blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <SectionTitle
          subtitle="Our Core Values"
          title="What We Stand For"
          description="The principles that guide our association and unite us as former cadets."
          light
        />
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <ScrollReveal key={i} variant="fadeUp" delay={i * 0.15}>
            <div className="group bg-white/6 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
              <div className="w-14 h-14 rounded-xl bg-accent-400/20 flex items-center justify-center mb-5 group-hover:bg-accent-400/30 transition-colors">
                <feature.icon className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── CTA Section ─────────────────────────────── */
const CTASection = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal variant="zoomIn">
        <div className="relative bg-linear-to-br from-primary-800 via-primary-850 to-primary-900 rounded-3xl overflow-hidden p-12 md:p-16 text-center ring-1 ring-white/10">
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-accent-400/15 rounded-full blur-[100px]" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent-300/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Are You a Former BNCC Cadet of
              <br />
              <span className="text-accent-400">Govt. Bangla College?</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Join our brotherhood. Reconnect with your batch mates, participate in events,
              and contribute to our community. Registration is free for all ex-cadets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 btn-accent text-white font-semibold rounded-xl shadow-lg"
                >
                  Register Now
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm shadow-lg"
                >
                  Contact Us
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ─── Home Page ───────────────────────────────── */
const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <StatsSection />
      <AboutPreview />
      <FeaturesSection />
      <CTASection />
    </PageTransition>
  );
};

export default Home;
