import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 dark:bg-gray-800/80 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-[1400px] h-full mx-auto px-6 flex justify-between items-center">
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
            <>
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/me')}>
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 dark:text-white leading-none mb-1">{user.name}</p>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest leading-none">Online</p>
                </div>
                <div className="relative">
                    <img src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name} alt={user.username} className="w-11 h-11 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-accent transition-all dark:ring-gray-700" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors dark:text-gray-400 dark:hover:text-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
