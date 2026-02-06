import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 dark:bg-gray-800/80 dark:border-gray-700 transition-all duration-300">
      <div className="h-full mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform dark:bg-accent-dark">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-chat-buttonText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
             </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white font-rubik tracking-tight">Chatify</h1>
        </div>
        
        <div className="flex items-center gap-6">
          {user && (
            <div className="relative" ref={menuRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1.5 rounded-2xl transition-colors" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 dark:text-white leading-none">{user.name}</p>
                </div>
                <div className="relative">
                    <img src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name} alt={user.username} className="w-11 h-11 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-accent transition-all dark:ring-gray-700" />
                </div>
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[60]">
                  <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">@{user.username}</p>
                  </div>
                  
                  <button 
                    onClick={() => { navigate('/me'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Settings
                  </button>

                  {user.roles.includes(UserRole.ADMIN) && (
                    <button 
                      onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Admin Panel
                    </button>
                  )}

                  <div className="h-px bg-gray-50 dark:bg-gray-700 my-1"></div>

                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-500 hover:text-red-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout session
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
