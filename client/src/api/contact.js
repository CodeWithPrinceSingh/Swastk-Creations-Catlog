import api from './client.js';

export const submitContactForm = (payload) =>
  api.post('/contact', payload).then((res) => res.data);

export const fetchContactMessages = () => api.get('/contact').then((res) => res.data);

export const markMessageRead = (id) =>
  api.put(`/contact/${id}/read`).then((res) => res.data);

export const deleteContactMessage = (id) =>
  api.delete(`/contact/${id}`).then((res) => res.data);
