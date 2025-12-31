import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '@api/axios';
import { useAuth } from '@context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    referredBy: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user]);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.username || !form.email || !form.password) {
      setError('All required fields must be filled');
      return;
    }

    try {
      const res = await api.post('/auth/register', form);

      login(res.data.user, res.data.token);

      navigate('/verify-email', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="text-sm text-text-muted">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-text-muted">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
            />

            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary transition"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="referredBy" className="text-sm text-text-muted">
            Referral Code <span className="text-text-disabled">(optional)</span>
          </label>
          <input
            id="referredBy"
            name="referredBy"
            autoComplete="off"
            type="text"
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
