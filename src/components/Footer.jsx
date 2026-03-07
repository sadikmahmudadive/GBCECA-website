import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaAnchor } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center ring-1 ring-white/10">
                <FaAnchor className="text-accent-400 text-lg" />
              </div>
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
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-accent-500 transition-all duration-300 text-white/70 hover:text-white hover:-translate-y-0.5">
                <FaFacebookF size={15} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-accent-500 transition-all duration-300 text-white/70 hover:text-white hover:-translate-y-0.5">
                <FaYoutube size={15} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-accent-500 transition-all duration-300 text-white/70 hover:text-white hover:-translate-y-0.5">
                <FaEnvelope size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Events', path: '/events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Committee', path: '/committee' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/60 hover:text-accent-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About BNCC */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">About BNCC</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Bangladesh National Cadet Corps</li>
              <li>Naval Wing — Maritime Excellence</li>
              <li>Discipline, Leadership, Service</li>
              <li>Established: 1979</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5 text-sm text-white/60">
                <FaMapMarkerAlt className="mt-1 text-accent-400 shrink-0 text-xs" />
                <span>Govt. Bangla College, Mirpur, Dhaka-1216, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm text-white/60">
                <FaPhone className="text-accent-400 shrink-0 text-xs" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm text-white/60">
                <FaEnvelope className="text-accent-400 shrink-0 text-xs" />
                <span>info@gbceca.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} GBCECA. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Built with <span className="text-accent-400">⚓</span> for the Cadet Brotherhood
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
