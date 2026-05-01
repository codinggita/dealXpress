import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Shield, Bell, Settings, LogOut, Loader2, X, Lock, Camera } from 'lucide-react';
import { updateProfile, updatePassword, logout, reset } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/common/SEO';
import FileUpload from '../components/common/FileUpload';
import { clearOnLogout } from '../utils/storage';
import { trackEvent } from '../utils/analytics';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [settings, setSettings] = useState({
    twoFactor: false,
    emailNotif: true,
    pushNotif: true
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  const [avatarFile, setAvatarFile] = useState(null);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    clearOnLogout(); // Clears localStorage + sessionStorage
    trackEvent('logout', 'Auth');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleAvatarUpload = () => {
    if (!avatarFile) return toast.error('Please select an image first');
    // In a real app, upload avatarFile to backend/cloudinary here
    toast.success('Profile photo updated!');
    setShowAvatarUpload(false);
    trackEvent('avatar_upload', 'Account');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(editData));
    setIsEditModalOpen(false);
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    dispatch(updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }));
    setIsPasswordModalOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password changed successfully');
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated');
  };

  const Switch = ({ active, onToggle }) => (
    <button 
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <motion.div 
        animate={{ x: active ? 22 : 2 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 transition-colors duration-300">
      <SEO 
        title="Account Settings" 
        description="Manage your profile, security preferences, and notification settings on DealXpress." 
      />
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">Account Settings</h1>
        <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-12 left-8 w-24 h-24 rounded-3xl border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-lg group cursor-pointer" onClick={() => setShowAvatarUpload(true)}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="avatar" className="w-full h-full" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="pt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">{user?.name || 'John Doe'}</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{user?.email || 'john@example.com'}</p>
            </div>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            Security & Privacy
          </h3>
          <div className="space-y-4">
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
            >
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Change Password</span>
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-50 dark:border-gray-800">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Notifications</span>
              <Switch 
                active={settings.emailNotif} 
                onToggle={() => toggleSetting('emailNotif')} 
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-50 dark:border-gray-800">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Push Notifications</span>
              <Switch 
                active={settings.pushNotif} 
                onToggle={() => toggleSetting('pushNotif')} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout from all devices
        </button>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Edit Profile</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-8">Update your personal identification.</p>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 transition-all font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 transition-all font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Change Password</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-8">Secure your account with a new password.</p>
              
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 transition-all font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 transition-all font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 transition-all font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Update Password'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Avatar Upload Modal */}
      <AnimatePresence>
        {showAvatarUpload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarUpload(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800"
            >
              <button
                onClick={() => setShowAvatarUpload(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                Upload Photo
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-8">
                Choose a profile picture. Max 5MB, PNG/JPG/WebP.
              </p>

              <FileUpload
                onFileSelect={setAvatarFile}
                currentImage={null}
              />

              <button
                onClick={handleAvatarUpload}
                disabled={!avatarFile}
                className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Photo
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Account;

