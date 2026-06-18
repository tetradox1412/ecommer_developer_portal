import { create } from 'zustand';
import type { JwtUser } from '../types';

interface AuthState {
  user: JwtUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: JwtUser | null) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

function decodeJwt(token: string): JwtUser | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    if (parsed && typeof parsed === 'object' && 'sub' in parsed && 'email' in parsed) {
      return parsed as JwtUser;
    }
  } catch (e) {
    console.error('Failed to decode JWT:', e);
  }
  return null;
}

const getInitialUser = (): JwtUser | null => {
  const token = localStorage.getItem('jwt');
  if (!token) return null;
  return decodeJwt(token);
};

const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: !!user, error: null }),
  setToken: (token) => {
    localStorage.setItem('jwt', token);
    const user = decodeJwt(token);
    set({ user, isAuthenticated: !!user, error: null });
  },
  logout: () => {
    localStorage.removeItem('jwt');
    set({ user: null, isAuthenticated: false, error: null });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
