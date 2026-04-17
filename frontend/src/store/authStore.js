import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  // Synchronous local state setters
  setAuth: (userData, token) => {
    localStorage.setItem('token', token);
    set({ user: userData, token, isAuthenticated: true, loading: false, error: null });
  },

  clearAuth: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false, loading: false, error: null });
  },

  // Async API actions
  apiLogin: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        get().setAuth(result.data.user, result.token);
        return true;
      } else {
        set({ error: result.message, loading: false });
        return false;
      }
    } catch (err) {
      set({ error: 'Connection to server failed', loading: false });
      return false;
    }
  },

  apiRegister: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        get().setAuth(result.data.user, result.token);
        return true;
      } else {
        set({ error: result.message, loading: false });
        return false;
      }
    } catch (err) {
      set({ error: 'Connection to server failed', loading: false });
      return false;
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (result.status === 'success') {
        set({ user: result.data.user, isAuthenticated: true, loading: false });
      } else {
        get().clearAuth();
      }
    } catch (err) {
      set({ loading: false });
    }
  },

  updateUserProfile: async (data) => {
    const token = get().token;
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.status === 'success') {
        set({ user: result.data.user });
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },

  logout: () => {
    get().clearAuth();
  },
}));
