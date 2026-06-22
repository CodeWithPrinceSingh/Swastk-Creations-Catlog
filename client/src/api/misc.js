import api from './client.js';

export const fetchTestimonials = () => api.get('/testimonials').then((res) => res.data);

export const fetchDashboardStats = () => api.get('/admin/dashboard').then((res) => res.data);

export const fetchAllUsers = () => api.get('/admin/users').then((res) => res.data);
