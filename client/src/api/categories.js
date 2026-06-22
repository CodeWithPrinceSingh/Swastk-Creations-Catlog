import api from './client.js';

export const fetchCategories = () => api.get('/categories').then((res) => res.data);

export const fetchCategoryBySlug = (slug) =>
  api.get(`/categories/${slug}`).then((res) => res.data);

export const createCategory = (payload) =>
  api.post('/categories', payload).then((res) => res.data);

export const deleteCategory = (id) =>
  api.delete(`/categories/${id}`).then((res) => res.data);
