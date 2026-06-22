import api from './client.js';

export const fetchProducts = (params = {}) =>
  api.get('/products', { params }).then((res) => res.data);

export const fetchFeaturedProducts = () =>
  api.get('/products/featured').then((res) => res.data);

export const fetchProductBySlug = (slug) =>
  api.get(`/products/${slug}`).then((res) => res.data);

export const createProduct = (payload) =>
  api.post('/products', payload).then((res) => res.data);

export const updateProduct = (id, payload) =>
  api.put(`/products/${id}`, payload).then((res) => res.data);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`).then((res) => res.data);
