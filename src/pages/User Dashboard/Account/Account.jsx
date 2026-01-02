import { useNavigate } from 'react-router-dom';
import { FiUser, FiShield, FiChevronRight } from 'react-icons/fi';

const accountItems = [
  {
    title: 'Profile',
    description: 'Personal details, email, and referrals',
    icon: FiUser,
    path: '/account/profile',
  },
  {
    title: 'Security',
    description: 'Password, sessions, and account protection',
    icon: FiShield,
    path: '/account/settings',
  },
];

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Account settings
        </h1>
        <p className="text-sm text-text-muted max-w-xl">
          Manage your personal information and security preferences.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {accountItems.map(({ title, description, icon: Icon, path }) => (
          <button
            key={title}
            onClick={() => navigate(path)}
            className="
              group relative overflow-hidden
              flex items-center gap-5
              p-6 rounded-2xl
              bg-bg-surface border border-bg-elevated
              transition-all duration-200
              hover:bg-bg-elevated hover:border-brand-primary/40
              hover:shadow-lg hover:-translate-y-px
              text-left
            "
          >
            <div
              className="
                flex items-center justify-center
                size-11 rounded-xl
                bg-brand-primary/10 text-brand-primary
                transition group-hover:bg-brand-primary group-hover:text-black
              "
            >
              <Icon className="size-5" />
            </div>

            <div className="flex-1">
              <p className="text-base font-medium">{title}</p>
              <p className="text-sm text-text-muted mt-1">{description}</p>
            </div>

            <FiChevronRight className="size-5 text-text-muted transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Account;
