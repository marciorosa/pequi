'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DownloadLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  download?: boolean;
}

export default function DownloadLink({ 
  href, 
  children, 
  className = '', 
  'aria-label': ariaLabel,
  download = true
}: DownloadLinkProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    if (!download || !href.startsWith('/downloads/')) {
      // For external links or non-download links, use default behavior
      return;
    }

    e.preventDefault();
    setIsDownloading(true);

    try {
      // Use our secure download API
      const response = await fetch(`/api/download?file=${encodeURIComponent(href.replace('/downloads/', 'downloads/'))}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = href.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback to direct link
      window.open(href, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Link
      href={href}
      className={`${className} ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleDownload}
      aria-label={ariaLabel}
    >
      {isDownloading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Downloading...
        </span>
      ) : (
        children
      )}
    </Link>
  );
}
