import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type AuthState } from '../types';

interface AuthAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_ERROR' | 'LOGOUT' | 'REGISTER_START' | 'REGISTER_SUCCESS' | 'REGISTER_ERROR';
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
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
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.login(email, password);
      // dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
      console.log('Login:', email, password);
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: (error as Error).message });
    }
  };

  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.register(username, email, password);
      // dispatch({ type: 'REGISTER_SUCCESS', payload: response.user });
      console.log('Register:', username, email, password);
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: (error as Error).message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    // TODO: Clear local storage, etc.
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, dispatch }}>
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
