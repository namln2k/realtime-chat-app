import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { type AuthState } from '../types';
import apiService from '../services/apiService';

interface AuthAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_ERROR' | 'LOGOUT' | 'REGISTER_START' | 'REGISTER_SUCCESS' | 'REGISTER_ERROR' | 'UPDATE_USER';
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (identifier: string, password: string) => Promise<void>;
  register: (name: string, username: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: { name?: string; avatar?: string }) => Promise<void>;
  logout: () => void;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await apiService.getCurrentUser();
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', payload: null });
      }
    };
    checkAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { user } = await apiService.login(identifier, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const register = async (name: string, username: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const { user } = await apiService.register(name, username, email, password);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const updateProfile = async (data: { name?: string; avatar?: string }) => {
    try {
      const updatedUser = await apiService.updateUser(data);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const logout = () => {
    apiService.logout().catch(console.error);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, updateProfile, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
