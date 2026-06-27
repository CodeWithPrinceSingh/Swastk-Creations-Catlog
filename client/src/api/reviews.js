import api from './client.js';

export const fetchReviews = (productId) =>
  api.get('/reviews', { params: { productId } }).then((res) => res.data);

export const submitReview = (payload) =>
  api.post('/reviews', payload).then((res) => res.data);

export const deleteReview = (id) =>
  api.delete(`/reviews/${id}`).then((res) => res.data);
