import matter from 'gray-matter';

export interface MarkdownData {
  content: string;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export const loadMarkdown = async (path: string): Promise<MarkdownData> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${response.statusText}`);
    }
    
    const text = await response.text();
    const { data, content } = matter(text);
    
    return {
      content,
      frontmatter: data,
    };
  } catch (error) {
    console.error(`Error loading markdown from ${path}:`, error);
    // Return default content if file doesn't exist
    return {
      content: '# Page Not Found\n\nThe documentation page you are looking for does not exist yet.',
      frontmatter: {
        title: 'Page Not Found',
        description: 'Documentation page not found',
      },
    };
  }
};

// Preload common markdown files
export const preloadMarkdownFiles = () => {
  const files = [
    '/content/getting-started/introduction.md',
    '/content/getting-started/quick-start.md',
    '/content/getting-started/installation.md',
    '/content/integrations/README.md',
    '/content/features/README.md',
    '/content/api/README.md',
    '/content/faq.md',
  ];
  
  files.forEach(file => {
    // Preload by creating a link element
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = file;
    document.head.appendChild(link);
  });
};
