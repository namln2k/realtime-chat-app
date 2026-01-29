import { useAuth } from '../../context/AuthContext';
import '../../styles/Header.css';

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // TODO: Navigate to login page
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="app-title">ChatApp</h1>
        </div>
        <div className="header-right">
          {user && (
            <>
              <span className="user-name">{user.username}</span>
              <img src={user.avatar || '/default-avatar.png'} alt={user.username} className="user-avatar" />
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
