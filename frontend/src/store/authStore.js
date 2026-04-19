import { create } from 'zustand';
import { toast } from 'react-toastify';
import { apiFetch } from '../services/api';

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
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const result = response.data;
      
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
      const response = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      const result = response.data;
      
      if (result.status === 'success') {
        get().setAuth(result.data.user, result.token);
        toast.success('Account created successfully!');
        return true;
      } else {
        set({ error: result.message, loading: false });
        toast.error(result.message || 'Registration failed.');
        return false;
      }
    } catch (err) {
      set({ error: 'Connection to server failed', loading: false });
      toast.error('Connection to server failed. Please try again.');
      return false;
    }
  },

  apiGoogleLogin: async (credential) => {
    set({ loading: true, error: null });
    try {
      const response = await apiFetch('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      });
      const result = response.data;
      
      if (result.status === 'success') {
        get().setAuth(result.data.user, result.token);
        toast.success('Successfully logged in with Google!');
        return true;
      } else {
        set({ error: result.message, loading: false });
        toast.error(result.message || 'Google login failed.');
        return false;
      }
    } catch (err) {
      set({ error: 'Connection to server failed', loading: false });
      toast.error('Connection to server failed.');
      return false;
    }
  },

  apiLinkedinLogin: async (code) => {
    set({ loading: true, error: null });
    try {
      const response = await apiFetch('/api/auth/linkedin', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      const result = response.data;
      
      if (result.status === 'success') {
        get().setAuth(result.data.user, result.token);
        toast.success('Successfully logged in with LinkedIn!');
        return true;
      } else {
        // Specifically look for LinkedIn missing credentials error
        if (result.message && result.message.includes('not configured')) {
            toast.error('LinkedIn Auth is not configured. Please add keys to .env server file.');
        } else {
            toast.error(result.message || 'LinkedIn login failed.');
        }
        set({ error: result.message, loading: false });
        return false;
      }
    } catch (err) {
      set({ error: 'Connection to server failed', loading: false });
      toast.error('Connection to server failed.');
      return false;
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      const response = await apiFetch('/api/auth/me');
      const result = response.data;

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
    try {
      const response = await apiFetch('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      const result = response.data;

      if (result.status === 'success') {
        set({ user: result.data.user });
        toast.success('Profile updated successfully!');
        return true;
      }
      toast.error(result.message || 'Failed to update profile.');
      return false;
    } catch (err) {
      toast.error('Failed to update profile due to network error.');
      return false;
    }
  },

  logout: () => {
    get().clearAuth();
    toast.info('Logged out securely.');
  },
}));
