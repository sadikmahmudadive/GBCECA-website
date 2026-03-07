import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaAnchor } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white overflow-hidden">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center ring-1 ring-white/10"
              >
                <FaAnchor className="text-accent-400 text-lg" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold">GBCECA</h3>
                <p className="text-xs text-white/60">Est. since inception</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Govt. Bangla College Ex Cadet Association — uniting former BNCC cadets
              in service, discipline, and brotherhood.
            </p>
            <div className="flex space-x-2">
              <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-accent-500 transition-all duration-300 text-white/70 hover:text-white">
                <FaFacebookF size={15} />
              </motion.a>
              <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-accent-500 transition-all duration-300 text-white/70 hover:text-white">
                <FaYoutube size={15} />
              </motion.a>
              <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-accent-500 transition-all duration-300 text-white/70 hover:text-white">
                <FaEnvelope size={15} />
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Events', path: '/events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Committee', path: '/committee' },
              ].map((link) => (
                <motion.li key={link.path} whileHover={{ x: 5 }}>
                  <Link to={link.path} className="text-white/60 hover:text-accent-400 transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mr-2 opacity-0 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>

          {/* About BNCC */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">About BNCC</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <motion.li whileHover={{ x: 5 }} className="cursor-default">Bangladesh National Cadet Corps</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-default">Naval Wing — Maritime Excellence</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-default">Discipline, Leadership, Service</motion.li>
              <motion.li whileHover={{ x: 5 }} className="cursor-default">Established: 1979</motion.li>
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start space-x-2.5 text-sm text-white/60">
                <FaMapMarkerAlt className="mt-1 text-accent-400 shrink-0 text-xs" />
                <span>Govt. Bangla College, Mirpur, Dhaka-1216, Bangladesh</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-2.5 text-sm text-white/60">
                <FaPhone className="text-accent-400 shrink-0 text-xs" />
                <span>+880 1XXX-XXXXXX</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-2.5 text-sm text-white/60">
                <FaEnvelope className="text-accent-400 shrink-0 text-xs" />
                <span>info@gbceca.org</span>
              </motion.li>
            </ul>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <ScrollReveal variant="fadeUp" className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} GBCECA. All rights reserved.</p>
          <motion.p whileHover={{ scale: 1.05 }} className="mt-2 sm:mt-0">
            Built with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block text-accent-400">⚓</motion.span> for the Cadet Brotherhood
          </motion.p>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
