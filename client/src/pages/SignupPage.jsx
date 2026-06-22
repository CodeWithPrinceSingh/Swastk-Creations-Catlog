import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/auth/AuthLayout.jsx';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Could not create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join us and start planning your dream day"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-rose-600 font-medium hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <Field
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          minLength={6}
        />

        {error && <p className="text-sm text-rose-600 bg-rose-50 rounded-md px-3 py-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md disabled:opacity-60"
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>
      </form>
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
