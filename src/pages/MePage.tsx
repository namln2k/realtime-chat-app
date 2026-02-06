import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import cloudinaryService from '../services/cloudinaryService';
import { Loading } from '../components/common/Loading';
import { Header } from '../components/common/Header';

export function MePage() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateName = async () => {
    if (!newName.trim() || newName === user?.name) {
      setIsEditingName(false);
      setNewName(user?.name || '');
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({ name: newName });
      setIsEditingName(false);
    } catch (error) {
      alert('Failed to update name');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUpdating(true);
    try {
      const imageUrl = await cloudinaryService.uploadImage(file);
      await updateProfile({ avatar: imageUrl });
    } catch (error) {
      alert('Failed to update avatar');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {isUpdating && <Loading fullScreen message="Updating profile..." />}
      <Header />
      
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Profile Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div 
                className="w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-inner ring-4 ring-white dark:ring-gray-700 transition-all duration-300 dark:bg-accent-dark overflow-hidden group cursor-pointer"
                onClick={handleAvatarChange}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl font-bold text-chat-buttonText uppercase">{user.name.charAt(0)}</span>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept="image/*"
                id="avatar-upload"
                name="avatar"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditingName ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-accent focus:outline-none dark:bg-gray-700 dark:text-white dark:border-accent-dark text-2xl font-bold mb-3"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()}
                    id="name-edit-header"
                    name="name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateName}
                      disabled={isUpdating}
                      className="px-6 py-2 bg-accent text-chat-buttonText rounded-lg font-bold hover:bg-chat-buttonText hover:text-accent transition-colors"
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewName(user.name);
                      }}
                      className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white font-rubik tracking-tight">
                      {user.name}
                    </h1>
                    <button 
                      onClick={() => {
                        setNewName(user.name);
                        setIsEditingName(true);
                      }}
                      className="p-2 text-gray-400 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">@{user.username}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white font-rubik mb-6">Account Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">User Email</p>
              <p className="pt-4 text-gray-700 dark:text-gray-200 font-mono text-sm truncate">{user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Display name</p>
              <div className="flex-1 text-center md:text-left">
              {isEditingName ? (
                <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-accent focus:outline-none dark:bg-gray-700 dark:text-white dark:border-accent-dark font-bold mb-3"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()}
                    id="name-edit-account"
                    name="name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateName}
                      disabled={isUpdating}
                      className="px-6 py-2 bg-accent text-chat-buttonText rounded-lg font-bold hover:bg-chat-buttonText hover:text-accent transition-colors"
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewName(user.name);
                      }}
                      className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group pt-4">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <h1 className="text-gray-700 dark:text-gray-200 font-mono text-sm truncate">
                      {user.name}
                    </h1>
                    <button 
                      onClick={() => {
                        setNewName(user.name);
                        setIsEditingName(true);
                      }}
                      className="text-gray-400 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex-1 py-4 bg-accent text-chat-buttonText rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Back to Chat
          </button>
          <button 
            onClick={handleLogout}
            className="flex-1 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all duration-300 hover:shadow-red-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout session
          </button>
        </div>
      </div>
    </div>
  );
}
