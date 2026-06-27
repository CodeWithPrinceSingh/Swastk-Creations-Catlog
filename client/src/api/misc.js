import api from './client.js';

export const fetchTestimonials = () => api.get('/testimonials').then((res) => res.data);

export const submitTestimonial = (payload) =>
  api.post('/testimonials', payload).then((res) => res.data);

export const fetchPendingTestimonials = () =>
  api.get('/testimonials/pending').then((res) => res.data);

export const approveTestimonial = (id) =>
  api.patch(`/testimonials/${id}/approve`).then((res) => res.data);

export const deleteTestimonial = (id) =>
  api.delete(`/testimonials/${id}`).then((res) => res.data);

export const fetchDashboardStats = () => api.get('/admin/dashboard').then((res) => res.data);

export const fetchAllUsers = () => api.get('/admin/users').then((res) => res.data);
