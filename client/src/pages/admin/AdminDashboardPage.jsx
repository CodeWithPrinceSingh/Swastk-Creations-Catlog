import { useEffect, useState } from 'react';
import { Package, Tags, Users, AlertTriangle, XCircle } from 'lucide-react';
import { fetchDashboardStats } from '../../api/misc.js';
import Loader from '../../components/common/Loader.jsx';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading dashboard..." />;
  if (!data) return null;

  const { stats, lowStock, productsByCategory } = data;

  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package },
    { label: 'Total Categories', value: stats.totalCategories, icon: Tags },
    { label: 'Customers', value: stats.totalCustomers, icon: Users },
    { label: 'Out of Stock', value: stats.outOfStock, icon: XCircle },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border border-rose-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-inkmuted">{label}</span>
              <Icon size={16} className="text-rose-500" />
            </div>
            <p className="font-display text-2xl text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-rose-100 rounded-xl p-5">
          <h2 className="font-semibold text-sm text-ink mb-4">Products by Category</h2>
          {productsByCategory.length === 0 ? (
            <p className="text-sm text-inkmuted">No categories yet.</p>
          ) : (
            <div className="space-y-3">
              {productsByCategory.map((c) => (
                <div key={c.id} className="flex justify-between text-sm">
                  <span className="text-ink">{c.name}</span>
                  <span className="font-medium text-inkmuted">{c.count} product(s)</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-rose-100 rounded-xl p-5">
          <h2 className="font-semibold text-sm text-ink mb-4 flex items-center gap-2">
            <AlertTriangle size={15} className="text-rose-500" /> Low Stock Alert
          </h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-inkmuted">All products are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <span className="text-ink">{p.name}</span>
                  <span className="font-medium text-rose-600">{p.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
