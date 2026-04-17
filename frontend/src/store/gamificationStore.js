import { create } from 'zustand';
import { apiFetch } from '../services/api';

export const useGamificationStore = create((set) => ({
  stats: {
    totalPoints: 0,
    streak: 0,
    badges: [],
    level: 1,
    progressPercent: 0,
  },
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiFetch('/api/gamification/user-stats', { method: 'GET' });
      if (response.ok) {
        set({ stats: response.data.data, loading: false });
      } else {
        set({ error: 'Failed to fetch gamification stats', loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  logEvent: async (eventType, eventData = {}) => {
    try {
      const response = await apiFetch('/api/gamification/event', {
        method: 'POST',
        body: JSON.stringify({ eventType, eventData }),
      });
      if (response.ok) {
        // Automatically refetch stats if the event was successful causing a point increase
        set((state) => ({ 
          stats: {
            ...state.stats,
            totalPoints: response.data.data.pointsAwarded ? state.stats.totalPoints + response.data.data.pointsAwarded : state.stats.totalPoints
          }
        }));
        // Re-sync full profile
        const fullResponse = await apiFetch('/api/gamification/user-stats', { method: 'GET' });
        if (fullResponse.ok) set({ stats: fullResponse.data.data });
      }
    } catch (err) {
      console.error('Gamification tracking failed silently:', err);
    }
  }
}));
