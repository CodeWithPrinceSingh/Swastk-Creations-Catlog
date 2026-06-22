import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/auth/AuthLayout.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' && redirect === '/' ? '/admin' : redirect);
    } catch (err) {
      setError(err.message || 'Could not sign in. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your bridal journey"
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="text-rose-600 font-medium hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <Field label="Password" type="password" name="password" value={form.password} onChange={handleChange} />

        {error && <p className="text-sm text-rose-600 bg-rose-50 rounded-md px-3 py-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md disabled:opacity-60"
        >
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </button>
      </form>

      <p className="text-xs text-inkmuted mt-5 text-center">
        Admin demo: admin@bridestore.com / Admin@123
      </p>
    </AuthLayout>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-inkmuted mb-1.5 block">{label}</span>
      <input
        {...props}
        required
        className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
      />
    </label>
  );
}
