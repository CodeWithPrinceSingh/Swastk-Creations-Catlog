import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../api/misc.js';
import Loader from '../../components/common/Loader.jsx';

export default function AdminCustomersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers()
      .then((res) => setUsers(res.users))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading customers..." />;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Customers</h1>

      <div className="bg-white border border-rose-100 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-rose-100 text-left text-inkmuted text-xs">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-rose-50 last:border-0">
                <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                <td className="px-5 py-3 text-inkmuted">{u.email}</td>
                <td className="px-5 py-3 capitalize text-inkmuted">{u.role}</td>
                <td className="px-5 py-3 text-inkmuted">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
