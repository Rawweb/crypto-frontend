import { useState, useEffect } from 'react';
import Reveal from '@components/motion/Reveal';

const ContactForm = () => {
  const [status, setStatus] = useState('idle');
  // idle | loading | success | error

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (status !== 'success') return;

    const timer = setTimeout(() => {
      setStatus('idle');
    }, 5000);

    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // simulate network delay
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <section className="container mt-32 max-w-3xl">
      <Reveal>
        <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-10">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* name */}
            <div>
              <label className="text-sm text-text-muted">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isDisabled}
                className="mt-2 w-full bg-bg-main border-bg-elevated rounded-xl px-4 py-3 outline-none border  focus:border-brand-primary disabled:opacity-60"
              />
            </div>

            {/* email */}
            <div>
              <label className="text-sm text-text-muted">Email address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={isDisabled}
                className="mt-2 w-full bg-bg-main border-bg-elevated rounded-xl px-4 py-3 outline-none border focus:border-brand-primary disabled:opacity-60"
              />
            </div>

            {/* subject */}
            <div>
              <label className="text-sm text-text-muted">Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                disabled={isDisabled}
                className="mt-2 w-full bg-bg-main border-bg-elevated rounded-xl px-4 py-3 outline-none border  focus:border-brand-primary disabled:opacity-60"
              >
                <option value="">Select a subject</option>
                <option>General question</option>
                <option>Account support</option>
                <option>Transactions & withdrawals</option>
                <option>Security concern</option>
                <option>Other</option>
              </select>
            </div>

            {/* message */}
            <div>
              <label className="text-sm text-text-muted">Message</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                disabled={isDisabled}
                className="mt-2 w-full bg-bg-main border-bg-elevated rounded-xl px-4 py-3 outline-none border  focus:border-brand-primary resize-none disabled:opacity-60"
              />
            </div>

            {/* feedback */}
            {status === 'success' && (
              <div className="text-status-success text-sm animate-fade-in">
                Your message has been sent. We’ll get back to you shortly.
              </div>
            )}

            {status === 'error' && (
              <p className="text-status-danger text-sm">
                Please fill in all required fields.
              </p>
            )}

            {/* submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full mt-4 py-4 rounded-full font-medium transition-all
              ${
                status === 'success'
                  ? 'bg-status-success text-white cursor-not-allowed'
                  : 'bg-brand-primary hover:bg-brand-hover'
              }
              ${status === 'loading' ? 'opacity-80 cursor-wait' : ''}
            `}
            >
              {status === 'loading'
                ? 'Sending...'
                : status === 'success'
                ? 'Message sent'
                : 'Send message'}
            </button>
          </form>

          {/* response expectation */}
          <p className="mt-6 text-sm text-text-muted text-center">
            We typically respond within 24 hours.
          </p>

          {/* security note */}
          <p className="mt-2 text-xs text-text-muted text-center">
            Never share your password, private keys, or recovery phrases.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactForm;
