import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaAnchor, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        if (form.password.length < 6) {
          toast.error('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        await signup(form.email, form.password, form.name);
        toast.success('Account created successfully!');
      } else {
        await login(form.email, form.password);
        toast.success('Welcome back!');
      }
      navigate('/dashboard');
    } catch (err) {
      const code = err.code;
      if (code === 'auth/user-not-found') toast.error('No account found with this email.');
      else if (code === 'auth/wrong-password') toast.error('Incorrect password.');
      else if (code === 'auth/email-already-in-use') toast.error('Email already in use.');
      else if (code === 'auth/invalid-email') toast.error('Invalid email address.');
      else toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome!');
      navigate('/dashboard');
    } catch {
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-900 via-primary-800 to-[#0a1628] relative items-center justify-center p-14 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent-400/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-20 right-20 w-md h-md bg-primary-400/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaAnchor className="text-accent-400 text-7xl mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to GBCECA</h2>
            <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
              Govt. Bangla College Ex Cadet Association — where discipline meets brotherhood.
              Sign in to access your member portal.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center space-x-3 text-sm text-white/60"
          >
            <span className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">Discipline</span>
            <span className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">Leadership</span>
            <span className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">Service</span>
          </motion.div>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50 dark:bg-slate-900/50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <FaAnchor className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">GBCECA</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {isRegister
              ? 'Join the ex-cadet brotherhood today.'
              : 'Sign in to access your member dashboard.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 dark:text-gray-50"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 dark:text-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 dark:text-gray-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 btn-primary text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
            </motion.button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 border border-gray-300 dark:border-slate-600 rounded-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-center space-x-3 hover:border-gray-400 transition-all bg-white dark:bg-slate-800 shadow-sm"
          >
            <FaGoogle className="text-red-500 text-lg" />
            <span>Google</span>
          </motion.button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setForm({ name: '', email: '', password: '' });
              }}
              className="text-primary-600 font-semibold hover:underline"
            >
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>

          <Link
            to="/"
            className="block text-center text-sm text-gray-400 mt-4 hover:text-primary-600 transition-colors"
          >
            &larr; Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
