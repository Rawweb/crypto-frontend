import LegalLayout from '@pages/Publics/legal/LegalLayout';
import LegalSidebar from '@pages/Publics/legal/LegalSidebar';

const sections = [
  { id: 'acceptance', label: 'Acceptance of terms' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'usage', label: 'Account usage' },
  { id: 'risk', label: 'Risk disclosure' },
  { id: 'prohibited', label: 'Prohibited activities' },
  { id: 'liability', label: 'Limitation of liability' },
];

const TermsOfService = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Conditions and rules governing the use of the platform."
      sidebar={<LegalSidebar sections={sections} />}
    >
      <section id="acceptance" className="scroll-offset">
        <h2 className="text-2xl font-semibold mb-4">
          Acceptance of terms
        </h2>
        <p>
          By using this platform, you agree to comply with these Terms of Service.
        </p>
      </section>

      <section id="eligibility">
        <h2 className="text-2xl font-semibold mb-4">
          Eligibility
        </h2>
        <p>
          You are responsible for ensuring that use of the platform complies
          with laws applicable in your jurisdiction.
        </p>
      </section>

      <section id="usage">
        <h2 className="text-2xl font-semibold mb-4">
          Account usage
        </h2>
        <p>
          You are responsible for all activities performed through your account.
        </p>
      </section>

      <section id="risk">
        <h2 className="text-2xl font-semibold mb-4">
          Risk disclosure
        </h2>
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
          <p>
            Cryptocurrency transactions carry inherent risks, including market
            volatility and potential loss of funds.
          </p>
        </div>
      </section>

      <section id="prohibited">
        <h2 className="text-2xl font-semibold mb-4">
          Prohibited activities
        </h2>
        <p>
          Misuse of the platform, unauthorized access, or illegal activity is
          strictly prohibited.
        </p>
      </section>

      <section id="liability">
        <h2 className="text-2xl font-semibold mb-4">
          Limitation of liability
        </h2>
        <p>
          The platform is provided as-is. We are not responsible for losses
          resulting from market conditions or user error.
        </p>
      </section>
    </LegalLayout>
  );
};

export default TermsOfService;
