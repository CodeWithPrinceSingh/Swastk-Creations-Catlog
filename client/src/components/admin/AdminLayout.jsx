import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Users, MessageSquare, ArrowLeft } from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[220px_1fr] gap-10">
      <aside>
        <NavLink to="/" className="flex items-center gap-2 text-sm text-inkmuted hover:text-rose-600 mb-6">
          <ArrowLeft size={14} /> Back to store
        </NavLink>
        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 text-sm font-medium px-3.5 py-2.5 rounded-md transition-colors ${
                  isActive ? 'bg-rose-600 text-white' : 'text-ink hover:bg-blush'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
