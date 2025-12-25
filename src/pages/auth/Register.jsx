import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-text-secondary text-sm">
          Start your crypto journey with confidence
        </p>
      </div>

      {/* form */}
      <form className="space-y-4">
        <div>
          <label className="text-sm text-text-muted">Username</label>
          <input
            type="text"
            placeholder="username"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted">Password</label>
          <input
            type="password"
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
            placeholder="Enter referral code"
            className="mt-1 w-full rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary hover:bg-brand-hover transition-colors py-3 rounded-xl font-medium"
        >
          Create account
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
