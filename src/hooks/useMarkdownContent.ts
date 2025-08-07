import { useState, useEffect } from 'react';

interface MarkdownContent {
  content: string;
  loading: boolean;
  error: string | null;
}

// Map of routes to their corresponding markdown files
const contentMap: { [key: string]: string } = {
  // Getting Started
  '/getting-started/introduction': '/getting-started/introduction.md',
  '/getting-started/quick-start': '/getting-started/quick-start.md',
  '/getting-started/installation': '/getting-started/installation.md',
  
  // Features
  '/features': '/features/README.md',
  '/features/dashboard': '/features/dashboard.md',
  
  // Integrations
  '/integrations': '/integrations/README.md',
  '/integrations/nodejs': '/integrations/frameworks/nodejs.md',
  '/integrations/python': '/integrations/frameworks/python.md',
  '/integrations/chatgpt': '/integrations/chatgpt/README.md',
  
  // API
  '/api': '/api/README.md',
  
  // Support
  '/faq': '/faq.md',
  '/support': '/support.md',
};

export function useMarkdownContent(path: string, fallbackContent?: string): MarkdownContent {
  const [content, setContent] = useState<string>(fallbackContent || '');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);

      const markdownPath = contentMap[path];
      
      if (!markdownPath) {
        // If no mapped file, use fallback content
        if (fallbackContent) {
          setContent(fallbackContent);
        } else {
          setError('Documentation file not found');
        }
        setLoading(false);
        return;
      }

      try {
        // Try to load the markdown file from public directory
        const response = await fetch(markdownPath);
        
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          // If file doesn't exist, use fallback
          if (fallbackContent) {
            setContent(fallbackContent);
          } else {
            setError('Documentation is being prepared');
          }
        }
      } catch (err) {
        console.error(`Error loading markdown from ${markdownPath}:`, err);
        if (fallbackContent) {
          setContent(fallbackContent);
        } else {
          setError('Failed to load documentation');
        }
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [path, fallbackContent]);

  return { content, loading, error };
}
