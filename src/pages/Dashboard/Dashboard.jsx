import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaUser,
  FaCalendarAlt,
  FaImages,
  FaEnvelope,
  FaSignOutAlt,
  FaHome,
  FaUserShield,
  FaEdit,
  FaCheck,
  FaTimes,
  FaIdBadge,
  FaPhoneAlt,
  FaGraduationCap
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTransition from '../../components/PageTransition';

const Dashboard = () => {
  const { currentUser, userData, logout } = useAuth();
  const isAdmin = userData?.role === 'admin';
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track editable fields
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    phone: userData?.phone || '',
    batch: userData?.batch || '',
  });

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    try {
      if (formData.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: formData.displayName });
      }
      
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName: formData.displayName,
        phone: formData.phone,
        batch: formData.batch
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      // Optional: Refresh page to get latest AuthContext data or rely on a snapshot listener in AuthContext ideally
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Dashboard Controls */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="flex items-center space-x-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <FaUserShield />
                  <span className="hidden sm:inline">Admin Panel</span>
                </Link>
              )}
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-sm"
              >
                <FaHome />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Basic Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="h-24 bg-linear-to-r from-primary-600 to-primary-800"></div>
                <div className="px-6 pb-6 relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md mx-auto -mt-12 flex items-center justify-center overflow-hidden relative">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary-100 text-primary-700 text-3xl font-bold flex items-center justify-center">
                        {getInitials(currentUser?.displayName)}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center mt-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{currentUser?.displayName || 'User'}</h2>
                    <p className="text-primary-600 text-sm font-medium flex items-center justify-center gap-1 mt-1 capitalize">
                      <FaIdBadge className="text-xs" /> {userData?.role || 'Member'}
                    </p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 overflow-hidden">
                      <FaEnvelope className="w-5 text-gray-400 mr-2 shrink-0" />
                      <span className="truncate">{currentUser?.email}</span>
                    </div>
                    {(userData?.phone || isEditing) && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FaPhoneAlt className="w-5 text-gray-400 mr-2 shrink-0" />
                        <span>{userData?.phone || 'No phone added'}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendarAlt className="w-5 text-gray-400 mr-2 shrink-0" />
                      <span>Joined {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Quick Shortcuts</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Events', path: '/events', icon: FaCalendarAlt, bg: 'bg-green-50', text: 'text-green-600' },
                    { name: 'Gallery', path: '/gallery', icon: FaImages, bg: 'bg-purple-50', text: 'text-purple-600' },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`${link.bg} ${link.text} rounded-xl p-4 flex flex-col items-center justify-center space-y-2 hover:opacity-80 transition-opacity`}
                    >
                      <link.icon size={20} />
                      <span className="text-xs font-semibold">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Detailed Profile Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 gap-4 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaUser className="text-primary-500" /> Account Details
                  </h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-sm flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ 
                            displayName: currentUser?.displayName || '', 
                            phone: userData?.phone || '', 
                            batch: userData?.batch || '' 
                          });
                        }}
                        className="flex-1 sm:flex-none justify-center text-sm flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button 
                        onClick={handleUpdateProfile}
                        disabled={isSaving}
                        className="flex-1 sm:flex-none justify-center text-sm flex items-center gap-2 bg-primary-600 text-white font-medium px-4 py-1.5 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : <><FaCheck /> Save</>}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.displayName}
                          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-800 border border-transparent font-medium">
                          {currentUser?.displayName || 'N/A'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="px-4 py-2.5 bg-gray-100 text-gray-500 rounded-lg border border-transparent cursor-not-allowed">
                        {currentUser?.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-50">
                     <div className="md:col-span-2 mb-1">
                        <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                           <FaGraduationCap className="text-gray-400" /> Association Information
                        </h4>
                     </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passout Batch / Year</label>
                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="e.g. 2015"
                          value={formData.batch}
                          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-800 border border-transparent">
                          {userData?.batch || <span className="text-gray-400 italic">Not specified</span>}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          placeholder="+880..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-800 border border-transparent">
                          {userData?.phone || <span className="text-gray-400 italic">Not specified</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
