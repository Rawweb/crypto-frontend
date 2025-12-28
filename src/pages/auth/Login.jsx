import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@api/axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (!res.data.user.isVerified) {
        navigate('/verify-email');
      } else if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
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

      {/* error */}
      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm text-text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
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
