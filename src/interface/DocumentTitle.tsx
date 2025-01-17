import { useEffect } from 'react';

const siteName = 'WoWAnalyzer';

interface DocumentTitleProps {
  title?: string;
}

const DocumentTitle = ({ title }: DocumentTitleProps) => {
  useEffect(() => {
    document.title = title ? `${title} - ${siteName}` : siteName;
  }, [title]);
  return null;
};

export default DocumentTitle;
