import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '@api/axios';
import { useAuth } from '@context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user]);

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      // persist token
      localStorage.setItem('token', res.data.token);

      // update auth context
      login(res.data.user);

      if (!res.data.user.isVerified) {
        navigate('/verify-email', { replace: true });
      } else if (res.data.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-text-secondary text-sm">Sign in to continue</p>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm text-text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              className="w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 pr-12 focus:outline-none focus:border-brand-primary"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-primary hover:bg-brand-hover transition-colors py-3 rounded-xl font-medium disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Don’t have an account?{' '}
        <Link to="/register" className="text-brand-primary">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
