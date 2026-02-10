import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { useAuth } from './context/AuthContext';
import { ChatPage } from './pages/ChatPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MePage } from './pages/MePage';
import { AdminPage } from './pages/AdminPage';
import { ConfigPage } from './pages/ConfigPage';
import { UserRole } from './types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user.roles.includes(requiredRole as UserRole)) {
    // If user is admin but route requires 'user', they might not have 'user' role explicitly but admin usually implies user
    // However, if route requires 'admin' and user doesn't have it, redirect them away
    if (requiredRole === 'admin' && !user.roles.includes(UserRole.ADMIN)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/me" 
        element={
          <ProtectedRoute>
            <MePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/config" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ConfigPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <ChatProvider>
              <ChatPage />
            </ChatProvider>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
