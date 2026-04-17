/**
 * api.js
 * ──────
 * Centralized API configuration pointing to the production Render backend when deployed,
 * falling back to localhost during Vite development.
 */

// If utilizing Vite, use import.meta.env
// For production, replace the URL with your literal deployed Render URL after connecting GitHub
const baseURL = import.meta.env?.VITE_API_BASE_URL || 'https://eduvion-backend.onrender.com';

export const getBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000'; // Override for local frontend running without VITE_API_BASE_URL
  }
  return baseURL;
};

// Unified fetch wrapper injecting the target base automatically alongside Authorization headers
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${getBaseUrl()}${endpoint}`;
  
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Auto-parse json
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    }
    
    return { ok: response.ok, status: response.status, data: await response.text() };
  } catch (error) {
    console.error(`[API Fetch Error] on ${endpoint}:`, error);
    throw error;
  }
};
