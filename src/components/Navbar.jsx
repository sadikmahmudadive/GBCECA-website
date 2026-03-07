import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaAnchor } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Committee', path: '/committee' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const isHome = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'glass shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-11 h-11 rounded-xl bg-linear-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:shadow-primary-400/50"
            >
              <FaAnchor className="text-white text-base" />
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1 
                whileHover={{ scale: 1.05, originX: 0 }}
                className={`text-lg font-bold tracking-tight transition-colors ${
                  scrolled || !isHome ? 'text-primary-800' : 'text-white'
                }`}
              >
                GBCECA
              </motion.h1>
              <p className={`text-xs transition-colors ${
                scrolled || !isHome ? 'text-gray-500' : 'text-white/70'
              }`}>
                Ex Cadet Association
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 block ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                          : scrolled || !isHome
                          ? 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
            ))}
            {currentUser ? (
              <div className="flex items-center space-x-2 ml-3">
                <Link to="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 text-sm font-medium btn-accent text-white rounded-lg shadow-md"
                  >
                    Dashboard
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-5 py-2.5 text-sm font-medium border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"       
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-6 py-2.5 text-sm font-semibold btn-accent text-white rounded-lg inline-block shadow-md"
                >
                  Login
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-primary-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {currentUser ? (
                <>
                  <Link to="/dashboard" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-sm font-medium text-accent-500 hover:bg-accent-50">
                    Dashboard
                  </Link>
                  <button onClick={() => { closeMenu(); logout(); }} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu} className="block px-4 py-3 rounded-lg text-sm font-medium bg-accent-400 text-white text-center mt-2">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
