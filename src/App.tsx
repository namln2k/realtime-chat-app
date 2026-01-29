import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { useAuth } from './context/AuthContext';
import { ChatPage } from './pages/ChatPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  // TODO: Implement routing (use react-router-dom)
  // For now, this is a simple structure. Install react-router-dom:
  // npm install react-router-dom
  
  if (!user) {
    return <LoginPage />;
  }

  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
