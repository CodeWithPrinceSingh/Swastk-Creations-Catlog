import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../api/products.js';
import { fetchCategories } from '../../api/categories.js';
import Modal from '../../components/common/Modal.jsx';
import ProductForm from '../../components/admin/ProductForm.jsx';
import Loader from '../../components/common/Loader.jsx';
import { formatPrice } from '../../utils/format.js';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    fetchProducts({ pageSize: 100 }).then((res) => setProducts(res.products));
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProducts({ pageSize: 100 }), fetchCategories()])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.products);
        setCategories(catRes.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || '—';

  const openCreate = () => {
    setEditing(null);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError(null);
    try {
      if (editing) {
        await updateProduct(editing.id, payload);
      } else {
        await createProduct(payload);
      }
      setModalOpen(false);
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await deleteProduct(product.id);
    loadProducts();
  };

  if (loading) return <Loader label="Loading products..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-ink">Products</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-md"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white border border-rose-100 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-rose-100 text-left text-inkmuted text-xs">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">SKU</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-rose-50 last:border-0">
                <td className="px-5 py-3 flex items-center gap-3">
                  <img src={p.images?.[0]} alt="" className="w-10 h-12 rounded object-cover bg-blush" />
                  <span className="font-medium text-ink">{p.name}</span>
                </td>
                <td className="px-5 py-3 text-xs text-inkmuted font-mono">{p.sku || '—'}</td>
                <td className="px-5 py-3 text-inkmuted">{categoryName(p.category)}</td>
                <td className="px-5 py-3 text-ink">{formatPrice(p.price)}</td>
                <td className="px-5 py-3">
                  <span className={p.stock <= 5 ? 'text-rose-600 font-medium' : 'text-inkmuted'}>{p.stock}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => openEdit(p)} aria-label="Edit" className="text-inkmuted hover:text-rose-600 mr-3">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(p)} aria-label="Delete" className="text-inkmuted hover:text-rose-600">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Product' : 'Add Product'}>
        {error && <p className="text-sm text-rose-600 bg-rose-50 rounded-md px-3 py-2 mb-4">{error}</p>}
        <ProductForm initial={editing} categories={categories} onSubmit={handleSubmit} submitting={submitting} />
      </Modal>
    </div>
  );
}
