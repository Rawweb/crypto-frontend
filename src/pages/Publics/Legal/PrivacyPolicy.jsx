import LegalLayout from '@pages/Publics/legal/LegalLayout';
import LegalSidebar from '@pages/Publics/legal/LegalSidebar';

const sections = [
  { id: 'collection', label: 'Information we collect' },
  { id: 'usage', label: 'How we use data' },
  { id: 'security', label: 'Data security' },
  { id: 'sharing', label: 'Information sharing' },
  { id: 'responsibility', label: 'User responsibility' },
  { id: 'updates', label: 'Policy updates' },
];

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Transparency on how your information is handled and protected."
      sidebar={<LegalSidebar sections={sections} />}
    >
      <section id="collection" className="scroll-offset">
        <h2 className="text-2xl font-semibold mb-4">Information we collect</h2>
        <p>
          We collect information you provide when creating an account, including
          your email address and account credentials. Transaction-related data
          may also be recorded to operate the platform securely.
        </p>
      </section>

      <section id="usage">
        <h2 className="text-2xl font-semibold mb-4">
          How we use your information
        </h2>
        <p>
          Information is used to provide platform services, process
          transactions, maintain security, and improve the overall user
          experience.
        </p>
      </section>

      <section id="security">
        <h2 className="text-2xl font-semibold mb-4">Data security</h2>
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
          <p>
            Sensitive data is encrypted and access is restricted. We implement
            layered security controls to reduce unauthorized access and misuse.
          </p>
        </div>
      </section>

      <section id="sharing">
        <h2 className="text-2xl font-semibold mb-4">Sharing of information</h2>
        <p>
          We do not sell personal data. Information may only be shared when
          required for platform functionality or legal compliance.
        </p>
      </section>

      <section id="responsibility">
        <h2 className="text-2xl font-semibold mb-4">Your responsibility</h2>
        <p>
          You are responsible for safeguarding your login credentials and
          ensuring no unauthorized access occurs.
        </p>
      </section>

      <section id="updates">
        <h2 className="text-2xl font-semibold mb-4">Updates to this policy</h2>
        <p>
          This policy may be updated periodically. Changes will be reflected on
          this page.
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
