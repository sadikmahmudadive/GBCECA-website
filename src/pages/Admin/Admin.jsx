import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaUsers,
  FaCalendarAlt,
  FaImages,
  FaEnvelope,
  FaUserShield,
  FaHome,
  FaTrash,
  FaPencilAlt,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [stats, setStats] = useState({ users: 0, events: 0, gallery: 0, messages: 0 });
  const [data, setData] = useState({ users: [], events: [], gallery: [], messages: [] });
  const [loading, setLoading] = useState(true);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'events' or 'gallery'
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'image', // for gallery
    category: 'events', // for gallery
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const collections = ['users', 'events', 'gallery', 'messages'];
      const results = await Promise.all(collections.map(c => getDocs(collection(db, c))));
      
      const newData = {};
      const newStats = {};
      
      collections.forEach((col, idx) => {
        newData[col] = results[idx].docs.map(d => ({ id: d.id, ...d.data() }));
        newStats[col] = results[idx].size;
      });
      
      setData(newData);
      setStats(newStats);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (collectionName, id) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      setData(prev => ({
        ...prev,
        [collectionName]: prev[collectionName].filter(item => item.id !== id)
      }));
      setStats(prev => ({ ...prev, [collectionName]: prev[collectionName] - 1 }));
      toast.success(`${collectionName} item deleted`);
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setData(prev => ({
        ...prev,
        users: prev.users.map(u => u.id === userId ? { ...u, role: newRole } : u)
      }));
      toast.success('User role updated');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData({
        title: item.title || item.name || '',
        description: item.description || '',
        date: item.date || '',
        time: item.time || '',
        location: item.location || '',
        type: item.type || 'image',
        category: item.category || 'events',
      });
      setImagePreview(item.imageUrl || item.url || '');
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'image',
        category: 'events',
      });
      setImagePreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return toast.error('Title is required');
    
    setIsSubmitting(true);
    try {
      let finalImageUrl = imagePreview;

      // 1. Upload to Cloudinary if new file selected
      if (imageFile) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
          toast.error("Cloudinary config missing.");
          setIsSubmitting(false);
          return;
        }

        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        uploadData.append('upload_preset', uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: uploadData
        });

        if (!res.ok) throw new Error('Failed to upload image');
        const resData = await res.json();
        finalImageUrl = resData.secure_url;
      }

      // 2. Prepare Data to Save
      const saveData = {
        title: formData.title,
        updatedAt: serverTimestamp(),
      };
      
      if (modalType === 'events') {
         saveData.description = formData.description;
         saveData.date = formData.date;
         saveData.time = formData.time;
         saveData.location = formData.location;
         saveData.imageUrl = finalImageUrl;
      } else { // gallery
         saveData.category = formData.category;
         saveData.type = formData.type;
         saveData.url = finalImageUrl; // using url for gallery
      }

      // 3. Save to Firestore
      if (editingItem) {
        await updateDoc(doc(db, modalType, editingItem.id), saveData);
        toast.success(`${modalType.slice(0, -1)} updated successfully!`);
        setData(prev => ({
          ...prev,
          [modalType]: prev[modalType].map(item => item.id === editingItem.id ? { ...item, ...saveData, id: editingItem.id } : item)
        }));
      } else {
        saveData.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, modalType), saveData);
        toast.success(`${modalType.slice(0, -1)} added successfully!`);
        setData(prev => ({
          ...prev,
          [modalType]: [{ ...saveData, id: docRef.id }, ...prev[modalType]]
        }));
        setStats(prev => ({ ...prev, [modalType]: prev[modalType] + 1 }));
      }

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaHome },
    { id: 'users', label: 'Manage Users', icon: FaUsers },
    { id: 'events', label: 'Manage Events', icon: FaCalendarAlt },
    { id: 'gallery', label: 'Manage Gallery', icon: FaImages },
    { id: 'messages', label: 'Messages', icon: FaEnvelope },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '260px' : '0px' }}
        className="fixed md:sticky top-0 left-0 h-screen bg-primary-900 text-white shadow-xl z-50 overflow-hidden flex flex-col shrink-0"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <Link to="/" className="text-xl font-bold text-accent-400 whitespace-nowrap">Admin Panel</Link>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id ? 'bg-accent-500/20 text-accent-400' : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="text-lg shrink-0" />
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-white/10 shrink-0">
          <Link to="/dashboard" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors mb-2">
            <FaUserShield className="text-lg" />
            <span>Dashboard</span>
          </Link>
          <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
            <FaSignOutAlt className="text-lg" />
            <span>Log Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="bg-white items-center h-16 px-4 md:px-8 border-b border-gray-200 flex justify-between shrink-0 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FaBars />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          </div>
          <Link to="/" className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
            Back to Site
          </Link>
        </header>

        <div className="p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Users" value={stats.users} icon={<FaUsers />} color="bg-blue-500" />
                    <StatCard title="Events" value={stats.events} icon={<FaCalendarAlt />} color="bg-primary-500" />
                    <StatCard title="Gallery Items" value={stats.gallery} icon={<FaImages />} color="bg-purple-500" />
                    <StatCard title="Messages" value={stats.messages} icon={<FaEnvelope />} color="bg-orange-500" />
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                          <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {data.users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50/50">
                              <td className="p-4 font-medium text-gray-900">{user.name || user.displayName}</td>
                              <td className="p-4 text-gray-500">{user.email}</td>
                              <td className="p-4">
                                <select 
                                  value={user.role || 'user'} 
                                  onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-primary-500"
                                >
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="p-4">
                                <button onClick={() => handleDelete('users', user.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {data.users.length === 0 && (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'messages' && (
                  <div className="space-y-4">
                    {data.messages.map(msg => (
                      <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{msg.name} <span className="text-gray-400 font-normal text-sm ml-2">{msg.email}</span></h4>
                          <p className="text-gray-700 mt-2">{msg.message}</p>
                          <p className="text-xs text-gray-400 mt-3">{msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleString() : 'No date'}</p>
                        </div>
                        <button onClick={() => handleDelete('messages', msg.id)} className="shrink-0 h-10 w-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    {data.messages.length === 0 && (
                      <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">No messages found.</div>
                    )}
                  </div>
                )}

                {(activeTab === 'events' || activeTab === 'gallery') && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h3>
                        <p className="text-gray-500 text-sm">Create and manage {activeTab}.</p>
                      </div>
                      <button 
                        onClick={() => openModal(activeTab)}
                        className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2 shadow-md shadow-primary-500/20"
                      >
                         <FaPlus /> Add New
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {data[activeTab].map(item => (
                          <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col">
                             <div className="aspect-video bg-gray-100 relative overflow-hidden shrink-0">
                                {(item.imageUrl || item.url) ? (
                                   <img src={item.imageUrl || item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                   <div className="w-full h-full flex items-center justify-center text-gray-400">
                                     <FaImages className="text-4xl" />
                                   </div>
                                )}
                             </div>
                             <div className="p-5 relative flex-1 flex flex-col">
                                <div className="absolute top-0 right-4 -mt-5 flex space-x-2">
                                  <button onClick={() => openModal(activeTab, item)} className="p-2.5 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-transform hover:-translate-y-1">
                                    <FaPencilAlt size={12} />
                                  </button>
                                  <button onClick={() => handleDelete(activeTab, item.id)} className="p-2.5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-transform hover:-translate-y-1">
                                    <FaTrash size={12} />
                                  </button>
                                </div>
                                <h4 className="font-bold text-gray-900 pr-16 line-clamp-1 mb-2">{item.title || item.name || 'Untitled'}</h4>
                                {activeTab === 'events' ? (
                                   <div className="text-sm text-gray-500 space-y-1.5 mt-auto">
                                      <p className="flex items-center gap-2"><FaCalendarAlt className="text-primary-500 shrink-0"/> <span className="truncate">{item.date || 'No date'} {item.time ? `- ${item.time}` : ''}</span></p>
                                   </div>
                                ) : (
                                   <div className="mt-auto">
                                     <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold uppercase tracking-wider">{item.category || 'general'}</span>
                                   </div>
                                )}
                             </div>
                          </div>
                       ))}
                    </div>
                    {data[activeTab].length === 0 && (
                      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-500 flex flex-col items-center">
                        <FaImages className="text-4xl text-gray-300 mb-3" />
                        <p>No items found. Click 'Add New' to create one.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Reusable Modal for Events & Gallery */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900 capitalize">
                  {editingItem ? `Edit ${modalType.slice(0,-1)}` : `New ${modalType.slice(0,-1)}`}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleModalSubmit} className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder={`Enter ${modalType.slice(0,-1)} title`}
                    />
                  </div>

                  {modalType === 'events' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">Time</label>
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                          placeholder="Event location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                        <textarea
                          rows="3"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                          placeholder="Event description..."
                        ></textarea>
                      </div>
                    </>
                  )}

                  {modalType === 'gallery' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      >
                        <option value="events">Events</option>
                        <option value="campus">Campus</option>
                        <option value="alumni">Alumni</option>
                        <option value="general">General</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Image</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-primary-500 transition-colors relative overflow-hidden group"
                    >
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-black/5" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-medium flex items-center gap-2"><FaPencilAlt /> Change Image</p>
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-gray-500">
                          <FaImages className="text-3xl mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium">Click to upload image</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
                    ) : 'Save Data'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className={`w-14 h-14 rounded-xl ${color} text-white flex items-center justify-center text-2xl shadow-sm`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

export default Admin;