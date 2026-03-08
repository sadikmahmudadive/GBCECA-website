import { useState, useRef } from 'react';
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
  FaGraduationCap,
  FaCamera
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageTransition from '../../components/PageTransition';

const Dashboard = () => {
  const { currentUser, userData, logout } = useAuth();
  const isAdmin = userData?.role === 'admin';
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  
  // Track editable fields
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    phone: userData?.phone || '',
    batch: userData?.batch || '',
  });
  
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(currentUser?.photoURL || null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    try {
      let photoURL = currentUser?.photoURL;

      // Ensure profile image gets uploaded to Cloudinary if changed
      if (profileImageFile) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        
        if (!cloudName || !uploadPreset) {
          toast.error("Cloudinary credentials missing in env!");
          setIsSaving(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', profileImageFile);
        formData.append('upload_preset', uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          photoURL = data.secure_url;
        } else {
          throw new Error('Cloudinary upload failed');
        }
      }

      // Update Auth profile
      if (formData.displayName !== currentUser.displayName || photoURL !== currentUser.photoURL) {
        await updateProfile(currentUser, { displayName: formData.displayName, photoURL });
      }
      
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName: formData.displayName,
        phone: formData.phone,
        batch: formData.batch,
        photoURL: photoURL
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setProfileImageFile(null); // Clear selected file after save
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
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900/50 pb-12 relative">
        {/* Navy Header Background */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-primary-900 rounded-b-[2rem] shadow-lg pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
          
          {/* Header Dashboard Controls */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-between items-center mb-10 gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <FaUser className="text-xl" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">My Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-5 py-2.5 text-sm font-semibold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <FaUserShield />
                  </motion.div>
                  <span className="hidden sm:inline">Admin Panel</span>
                </Link>
              )}
              <Link
                to="/"
                className="px-5 py-2.5 text-sm font-semibold bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2 backdrop-blur-sm"
              >
                <FaHome />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-5 py-2.5 text-sm font-semibold bg-red-500/80 text-white border border-red-500/50 rounded-xl hover:bg-red-500 transition-all flex items-center space-x-2 backdrop-blur-sm shadow-md"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Avatar & Basic Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-4"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 dark:border-slate-700 overflow-hidden relative backdrop-blur-sm">
                <div className="h-32 bg-linear-to-r from-primary-600 via-primary-700 to-primary-900 relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIGQ9Ik0wLDBMMTAwLDEwMEwyMDAsMEwzMDAsMTAwTDQwMCwwTDUwMCwxMDBMNjAwLDBMNzAwLDEwMEw4MDAsMEw5MDAsMTAwTDEwMDAsMEwxMTAwLDEwMEwxMjAwLDBMMTMwMCwxMDBMMTQwMCwwTDE1MDAsMTAwTDE2MDAsMEwxNzAwLDEwMEwxODAwLDBMMTkwMCwxMDBMMjAwMCwwdjIwMEgwWiI+PC9wYXRoPjwvc3ZnPg==')] opacity-30 animate-pulse-slow" />
                </div>
                <div className="px-6 pb-8 relative">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-32 h-32 rounded-full border-[6px] border-white bg-white dark:bg-slate-800 shadow-2xl mx-auto -mt-16 flex items-center justify-center overflow-hidden relative group cursor-pointer"
                    onClick={() => { if(isEditing) fileInputRef.current?.click(); }}
                  >
                    {profileImagePreview ? (
                      <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-primary-100 to-primary-200 text-primary-700 text-4xl font-bold flex items-center justify-center dark:text-primary-200">
                        {getInitials(currentUser?.displayName)}
                      </div>
                    )}
                    {isEditing && (
                      <div 
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FaCamera className="text-white text-2xl" />
                      </div>
                    )}
                  </motion.div>
                  {isEditing && (
                    <div className="text-center mt-3">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full dark:text-primary-300"
                      >
                        Change Photo
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  )}
                  
                  <div className="text-center mt-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">{currentUser?.displayName || 'User'}</h2>
                    <p className="text-primary-600 text-sm font-medium flex items-center justify-center gap-1 mt-1 capitalize dark:text-primary-300">
                      <FaIdBadge className="text-xs" /> {userData?.role || 'Member'}
                    </p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-slate-700">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 overflow-hidden">
                      <FaEnvelope className="w-5 text-gray-400 mr-2 shrink-0" />
                      <span className="truncate">{currentUser?.email}</span>
                    </div>
                    {(userData?.phone || isEditing) && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FaPhoneAlt className="w-5 text-gray-400 mr-2 shrink-0" />
                        <span>{userData?.phone || 'No phone added'}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FaCalendarAlt className="w-5 text-gray-400 mr-2 shrink-0" />
                      <span>Joined {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 dark:border-slate-700 mt-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary-500 rounded-full" /> Quick Shortcuts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Events', path: '/events', icon: FaCalendarAlt, bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' },
                    { name: 'Gallery', path: '/gallery', icon: FaImages, bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:bg-purple-100' },
                  ].map((link) => (
                    <motion.div key={link.path} whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={link.path}
                        className={`${link.bg} ${link.hover} ${link.text} rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 transition-colors shadow-sm`}
                      >
                        <link.icon size={24} />
                        <span className="text-sm font-bold">{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Detailed Profile Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100 dark:border-slate-700 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 dark:border-slate-700 gap-4 pb-4 relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
                    <FaUser className="text-primary-500" /> Account Details
                  </h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-sm flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-semibold px-5 py-2.5 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors w-full sm:w-auto dark:text-primary-300"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ 
                            displayName: currentUser?.displayName || '', 
                            phone: userData?.phone || '', 
                            batch: userData?.batch || '' 
                          });
                          setProfileImagePreview(currentUser?.photoURL || null);
                          setProfileImageFile(null);
                        }}
                        className="flex-1 sm:flex-none justify-center text-sm flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-100 font-semibold px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800/80 hover:bg-gray-200 dark:bg-slate-700 transition-colors"
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button 
                        onClick={handleUpdateProfile}
                        disabled={isSaving}
                        className="flex-1 sm:flex-none justify-center text-sm flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50 shadow-md shadow-primary-600/20"
                      >
                        {isSaving ? 'Saving...' : <><FaCheck /> Save Changes</>}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 ml-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.displayName}
                          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                          className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 dark:text-gray-100 font-medium shadow-sm"
                        />
                      ) : (
                        <div className="px-5 py-3 bg-gray-50/80 rounded-2xl text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 font-medium h-[52px] flex items-center shadow-inner shadow-gray-100/50">
                          {currentUser?.displayName || 'N/A'}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 ml-1">Email Address</label>
                      <div className="px-5 py-3 bg-gray-100/80 text-gray-500 dark:text-gray-400 rounded-2xl border border-gray-200 dark:border-slate-700 cursor-not-allowed h-[52px] flex items-center font-medium shadow-inner shadow-gray-100/50">
                        {currentUser?.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100 dark:border-slate-700 mt-8 relative">
                     <div className="absolute top-0 left-0 w-24 h-[1px] bg-primary-500 -mt-[1px]" />
                     <div className="md:col-span-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-50 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center">
                             <FaGraduationCap className="text-xl" />
                           </div>
                           Association Details
                        </h4>
                     </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 ml-1">Passout Batch / Year</label>
                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="e.g. 2015"
                          value={formData.batch}
                          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                          className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 dark:text-gray-100 font-medium shadow-sm"
                        />
                      ) : (
                        <div className="px-5 py-3 bg-gray-50/80 rounded-2xl text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 h-[52px] flex items-center font-medium shadow-inner shadow-gray-100/50">
                          {userData?.batch || <span className="text-gray-400 italic">Not specified</span>}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 ml-1">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          placeholder="+880..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-800 dark:text-gray-100 font-medium shadow-sm"
                        />
                      ) : (
                        <div className="px-5 py-3 bg-gray-50/80 rounded-2xl text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 h-[52px] flex items-center font-medium shadow-inner shadow-gray-100/50">
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
