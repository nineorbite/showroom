import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject tenantId if available
api.interceptors.request.use((config) => {
  const tenantId = localStorage.getItem('tenantId');
  if (tenantId) {
    config.params = {
      ...config.params,
      tenantId: tenantId,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const fetchVehicles = (params) => api.get('/inventory/public/vehicles', { params });
export const fetchVehicleById = (id) => api.get(`/inventory/public/vehicles/${id}`);
export const createLead = (data) => api.post('/bot/internal/leads', data);

export default api;
