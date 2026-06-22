import { useState, useEffect } from 'react';

const blankForm = {
  name: '',
  category: '',
  price: '',
  compareAtPrice: '',
  stock: '',
  description: '',
  images: '',
  sizes: '',
  colors: '',
  isNew: true,
};

export default function ProductForm({ initial, categories, onSubmit, submitting }) {
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || '',
        category: initial.category || '',
        price: initial.price ?? '',
        compareAtPrice: initial.compareAtPrice ?? '',
        stock: initial.stock ?? '',
        description: initial.description || '',
        images: (initial.images || []).join(', '),
        sizes: (initial.sizes || []).join(', '),
        colors: (initial.colors || []).join(', '),
        isNew: initial.isNew ?? true,
      });
    } else {
      setForm(blankForm);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      stock: Number(form.stock) || 0,
      description: form.description,
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
      isNew: form.isNew,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Product Name" name="name" value={form.name} onChange={handleChange} required />

      <label className="block">
        <span className="text-xs font-medium text-inkmuted mb-1.5 block">Category</span>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-3 gap-3">
        <Field label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} required />
        <Field label="Compare At (₹)" name="compareAtPrice" type="number" value={form.compareAtPrice} onChange={handleChange} />
        <Field label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required />
      </div>

      <Field
        label="Image URLs (comma separated)"
        name="images"
        value={form.images}
        onChange={handleChange}
        placeholder="https://...jpg, https://...jpg"
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Sizes (comma separated)"
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="S, M, L, XL"
        />
        <Field
          label="Colors (comma separated)"
          name="colors"
          value={form.colors}
          onChange={handleChange}
          placeholder="Rose Pink, Maroon"
        />
      </div>
      <p className="text-xs text-inkmuted -mt-2">Leave blank if this product doesn't have size/color options (e.g. jewellery, makeup kits).</p>

      <label className="block">
        <span className="text-xs font-medium text-inkmuted mb-1.5 block">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
        />
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} className="accent-rose-600" />
        <span className="text-sm text-ink">Mark as new arrival</span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md disabled:opacity-60"
      >
        {submitting ? 'SAVING...' : initial ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
      </button>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-inkmuted mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
      />
    </label>
  );
}
