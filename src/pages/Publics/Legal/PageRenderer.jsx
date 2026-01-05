import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@api/axios';
import LegalLayout from './LegalLayout';
import LegalSidebar from './LegalSidebar';

const extractSections = content => {
  const regex = /<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/g;
  const sections = [];
  let match;

  while ((match = regex.exec(content))) {
    sections.push({
      id: match[1],
      label: match[2],
    });
  }

  return sections;
};

const PageRenderer = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    api.get(`/pages/${slug}`).then(res => {
      setPage(res.data);
      setSections(extractSections(res.data.content));
    });
  }, [slug]);

  if (!page) return null;

  return (
    <LegalLayout
      title={page.title}
      subtitle=""
      sidebar={<LegalSidebar sections={sections} />}
    >
      <div
        className="space-y-16"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </LegalLayout>
  );
};

export default PageRenderer;
