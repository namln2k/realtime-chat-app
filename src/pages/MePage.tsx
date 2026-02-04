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
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1>Welcome, {user.name}!</h1>
      <p style={{ color: '#666' }}>Email: {user.email}</p>
      <p style={{ color: '#666' }}>ID: {user.name}</p>
      
      <div style={{ marginTop: '40px' }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
