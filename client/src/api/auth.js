import api from './client.js';

export const signupRequest = (payload) =>
  api.post('/auth/signup', payload).then((res) => res.data);

export const loginRequest = (payload) =>
  api.post('/auth/login', payload).then((res) => res.data);

export const fetchMe = () => api.get('/auth/me').then((res) => res.data);
