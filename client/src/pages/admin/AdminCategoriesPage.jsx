import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { fetchCategories, createCategory, deleteCategory } from '../../api/categories.js';
import Modal from '../../components/common/Modal.jsx';
import Loader from '../../components/common/Loader.jsx';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', image: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => fetchCategories().then((res) => setCategories(res.categories));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createCategory(form);
      setForm({ name: '', image: '' });
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    await deleteCategory(cat.id);
    load();
  };

  if (loading) return <Loader label="Loading categories..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-ink">Categories</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-md"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-rose-100 rounded-xl p-4 text-center">
            <img src={cat.image} alt={cat.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
            <p className="text-sm font-medium text-ink">{cat.name}</p>
            <button
              onClick={() => handleDelete(cat)}
              className="text-xs text-rose-600 flex items-center gap-1 justify-center mt-2 mx-auto hover:underline"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Category">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-inkmuted mb-1.5 block">Category Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-inkmuted mb-1.5 block">Image URL</span>
            <input
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
            />
          </label>
          {error && <p className="text-sm text-rose-600 bg-rose-50 rounded-md px-3 py-2">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md disabled:opacity-60"
          >
            {submitting ? 'SAVING...' : 'CREATE CATEGORY'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
