import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
                  <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      {activeTab === 'events' ? <FaCalendarAlt /> : <FaImages />}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Manage {activeTab}</h3>
                    <p className="text-gray-500 mb-6">Here you can add, edit, or remove {activeTab} items.</p>
                    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2">
                       <FaPlus /> Add New {activeTab === 'events' ? 'Event' : 'Image'}
                    </button>
                    
                    <div className="mt-8 text-left">
                       {data[activeTab].map(item => (
                          <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50">
                             <div>
                                <h4 className="font-medium text-gray-800">{item.title || item.name || 'Untitled'}</h4>
                             </div>
                             <button onClick={() => handleDelete(activeTab, item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                                <FaTrash />
                             </button>
                          </div>
                       ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
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