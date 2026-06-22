import api from './client.js';

export const fetchStoreInfo = () => api.get('/store').then((res) => res.data);
