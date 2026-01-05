const LegalSidebar = ({ sections }) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-4 text-sm">
      <p className="font-semibold text-text-primary mb-4">On this page</p>

      {sections.map(section => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="block text-text-secondary hover:text-brand-primary transition-colors"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
};

export default LegalSidebar;
