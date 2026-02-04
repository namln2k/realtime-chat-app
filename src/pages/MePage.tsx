import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function MePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center transform transition-all hover:scale-[1.01] dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="relative group">
            <div className="w-28 h-28 bg-accent rounded-full mx-auto flex items-center justify-center mb-8 shadow-inner ring-4 ring-white dark:ring-gray-700 group-hover:ring-accent transition-all duration-300 dark:bg-accent-dark">
                <span className="text-5xl font-bold text-chat-buttonText uppercase">{user.name.charAt(0)}</span>
            </div>
            <div className="absolute bottom-6 right-1/2 translate-x-12 w-8 h-8 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 dark:text-white font-rubik tracking-tight">Welcome, {user.name}!</h1>
        <p className="text-gray-500 mb-6 dark:text-gray-400 font-medium">{user.email}</p>
        
        <div className="space-y-4 mb-10">
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1 dark:text-gray-500">Username</p>
                <p className="text-gray-700 font-semibold dark:text-gray-200">@{user.username}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1 dark:text-gray-500">User ID</p>
                <p className="text-gray-500 font-mono text-sm dark:text-gray-400 truncate px-2">{user.id}</p>
            </div>
        </div>
        
        <div className="pt-6 border-t border-gray-50 dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all duration-300 hover:shadow-red-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout session
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-4 py-3 text-gray-500 font-semibold hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Back to Chat
          </button>
        </div>
      </div>
    </div>
  );
}
