import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@api/axios';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    referredBy: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // handle form change
  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.username || !form.email || !form.password) {
      setError('All required fields must be filled');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/auth/register', form);

      // save auth data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // redirect to verify email
      navigate('/verify-email');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-text-secondary text-sm">
          Start your crypto journey with confidence
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-text-muted">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Create a strong password"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted">
            Referral Code <span className="text-text-disabled">(optional)</span>
          </label>
          <input
            type="text"
            name="referredBy"
            value={form.referredBy}
            onChange={handleChange}
            placeholder="Enter referral code"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-primary hover:bg-brand-hover transition-colors py-3 rounded-xl font-medium disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      {/* footer */}
      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-primary hover:text-brand-hover">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
