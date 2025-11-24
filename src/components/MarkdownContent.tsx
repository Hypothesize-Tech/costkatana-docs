import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import {
    Copy,
    Check,
    CheckCircle2,
    BarChart3,
    TrendingUp,
    Zap,
    AlertTriangle,
    AlertCircle,
    Circle,
    PartyPopper,
    Bot,
    Sparkles,
    Target,
    Rocket,
    DollarSign,
    Trophy,
    Settings,
    Wrench,
    Building,
    Shield,
    Palette,
    Cloud,
    Monitor,
    Lightbulb,
    Link,
    Phone,
    GraduationCap,
    Heart,
    X,
    Microscope,
    Wind,
    FileText,
    Eye,
    Music,
    Image,
    Film,
    Laptop,
    Star,
    Clipboard,
    Calculator,
    TrendingDown,
    Brain,
    Smartphone,
    Mail,
    MessageCircle,
    Book,
    Bug,
    Lock,
    Package,
    Globe,
    RefreshCw,
    PlayCircle,
    Navigation,
    Bell
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

// Function to slugify text for IDs
const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const idCountsRef = React.useRef<Record<string, number>>({});

    // Reset ID counts when content changes
    React.useEffect(() => {
        idCountsRef.current = {};
    }, [content]);

    const copyToClipboard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            toast.success('Code copied to clipboard!');
            setTimeout(() => setCopiedCode(null), 2000);
        } catch {
            toast.error('Failed to copy code');
        }
    };

    // Function to remove emojis (must match TableOfContents exactly)
    const removeEmojis = (text: string): string => {
        return text
            .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Emoticons & Symbols
            .replace(/[\u{2600}-\u{26FF}]/gu, '') // Misc symbols
            .replace(/[\u{2700}-\u{27BF}]/gu, '') // Dingbats
            .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
            .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport & Map
            .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
            .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols
            .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // Variation Selectors
            .trim();
    };

    // Function to generate unique ID from heading text (React nodes)
    // Must match the logic in TableOfContents extractHeadings exactly
    const generateHeadingId = (children: React.ReactNode): string => {
        // Extract text from React nodes
        const extractText = (node: React.ReactNode): string => {
            if (typeof node === 'string') return node;
            if (typeof node === 'number') return String(node);
            if (Array.isArray(node)) return node.map(extractText).join('');
            if (React.isValidElement(node) && node.props?.children) {
                return extractText(node.props.children);
            }
            return '';
        };

        const textContent = extractText(children);
        // Remove markdown formatting (must match TableOfContents order)
        let cleanText = textContent
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/\*(.+?)\*/g, '$1')
            .replace(/\[(.+?)\]\(.+?\)/g, '$1')
            .replace(/`(.+?)`/g, '$1')
            .trim();

        // Remove emojis using the same function as TableOfContents
        cleanText = removeEmojis(cleanText);

        let baseId = slugify(cleanText);
        if (!baseId) {
            baseId = `heading-${Object.keys(idCountsRef.current).length + 1}`;
        }

        // Ensure unique IDs
        if (idCountsRef.current[baseId]) {
            idCountsRef.current[baseId]++;
            baseId = `${baseId}-${idCountsRef.current[baseId]}`;
        } else {
            idCountsRef.current[baseId] = 1;
        }

        return baseId;
    };

    // Emoji to icon mapping
    const emojiToIcon: Record<string, React.ComponentType<any>> = {
        '✅': CheckCircle2,
        '❌': X,
        '⚠️': AlertTriangle,
        '🚨': AlertCircle,
        '🔴': Circle,
        '📊': BarChart3,
        '📈': TrendingUp,
        '📉': TrendingDown,
        '⚡': Zap,
        '🎯': Target,
        '🔧': Wrench,
        '📝': FileText,
        '💻': Laptop,
        '🚀': Rocket,
        '💡': Lightbulb,
        '🤖': Bot,
        '🔮': Sparkles,
        '🎨': Palette,
        '🏆': Trophy,
        '💰': DollarSign,
        '🔒': Lock,
        '☁️': Cloud,
        '✖️': X,
        '🌪️': Wind,
        '🖼️': Image,
        '🎬': Film,
        '🎵': Music,
        '👁️': Eye,
        '🧮': Calculator,
        '🔬': Microscope,
        '📋': Clipboard,
        '🎉': PartyPopper,
        '❤️': Heart,
        '🖥️': Monitor,
        '🛠️': Settings,
        '⚙️': Settings,
        '🛡️': Shield,
        '🔗': Link,
        '📞': Phone,
        '🎓': GraduationCap,
        '🏢': Building,
        '⭐': Star,
        '🧠': Brain,
        '📱': Smartphone,
        '📧': Mail,
        '💬': MessageCircle,
        '📚': Book,
        '🐛': Bug,
        '📦': Package,
        '🌐': Globe,
        '🔄': RefreshCw,
        '🎭': PlayCircle,
        '🦙': Navigation,
        '🐍': Bug,
        '✨': Sparkles,
        '🎊': PartyPopper,
        '🔔': Bell,
    };

    // Function to replace emojis in text with icon components
    const replaceEmojisWithIcons = (text: string): React.ReactNode => {
        const emojiRegex = /(✅|❌|⚠️|🚨|🔴|📊|📈|📉|⚡|🎯|🔧|📝|💻|🚀|💡|🤖|🔮|🎨|🏆|💰|🔒|☁️|✖️|🌪️|🖼️|🎬|🎵|👁️|🧮|🔬|📋|🎉|❤️|🖥️|🛠️|⚙️|🛡️|🔗|📞|🎓|🏢|⭐|🧠|📱|📧|💬|📚|🐛|📦|🌐|🔄|🎭|🦙|🐍|✨|🎊|🔔)/g;
        const parts = text.split(emojiRegex);

        return parts.map((part, index) => {
            const IconComponent = emojiToIcon[part];
            if (IconComponent) {
                return (
                    <IconComponent
                        key={index}
                        size={18}
                        className="inline-block mx-0.5 align-middle"
                    />
                );
            }
            return part;
        });
    };

    // Recursive function to process all children including nested elements
    const processChildrenRecursively = (children: any): any => {
        return React.Children.map(children, (child: any) => {
            // If it's a string, replace emojis
            if (typeof child === 'string') {
                return replaceEmojisWithIcons(child);
            }

            // If it's a React element with children, process recursively
            if (React.isValidElement(child)) {
                const props = child.props as any;
                if (props && props.children) {
                    return React.cloneElement(
                        child,
                        props,
                        processChildrenRecursively(props.children)
                    );
                }
            }

            // Return other elements as-is
            return child;
        });
    };

    // Function to extract text content from React children recursively
    const extractTextContent = (node: any): string => {
        if (typeof node === 'string') {
            return node;
        }
        if (typeof node === 'number') {
            return String(node);
        }
        if (Array.isArray(node)) {
            return node.map(extractTextContent).join('');
        }
        if (React.isValidElement(node)) {
            const props = node.props as any;
            if (props?.children) {
                return extractTextContent(props.children);
            }
            if (props?.className && props.className.includes('hljs')) {
                // For syntax-highlighted code, try to get the raw text
                return extractTextContent(props.children);
            }
        }
        return '';
    };

    // Component for code blocks with copy button
    const CodeBlock: React.FC<{ children?: any;[key: string]: any }> = ({ children, ...props }) => {
        const preRef = React.useRef<HTMLPreElement>(null);
        const [codeContent, setCodeContent] = React.useState('');

        // Extract code content on mount and when children change
        React.useEffect(() => {
            let extracted = '';

            // Try multiple extraction strategies
            if (React.isValidElement(children)) {
                const codeElement = children as React.ReactElement<any>;
                // Strategy 1: Direct children prop (most common case)
                if (codeElement.props?.children) {
                    extracted = extractTextContent(codeElement.props.children);
                }
                // Strategy 2: If no children, try to extract from element itself
                if (!extracted && codeElement.props) {
                    extracted = extractTextContent(codeElement);
                }
            } else if (Array.isArray(children)) {
                // Handle array of children
                extracted = extractTextContent(children);
            } else if (typeof children === 'string') {
                extracted = children;
            } else if (children != null) {
                // Fallback: try to extract from any structure
                extracted = extractTextContent(children);
            }

            // Clean up the code content
            extracted = extracted.trim();

            // If extraction failed, try to get from DOM as fallback
            if (!extracted && preRef.current) {
                const text = preRef.current.textContent || preRef.current.innerText || '';
                extracted = text.trim();
            }

            setCodeContent(extracted);
        }, [children]);

        return (
            <div className="relative group my-4">
                <pre
                    ref={preRef}
                    className="bg-gray-900 dark:bg-black text-gray-100 rounded-xl p-4 overflow-x-auto border border-primary-500/20 shadow-lg"
                    {...props}
                >
                    {children}
                </pre>
                {codeContent && (
                    <button
                        onClick={() => copyToClipboard(codeContent)}
                        className="btn absolute top-2 right-2 p-2 bg-primary-600/80 hover:bg-primary-600 dark:bg-primary-500/80 dark:hover:bg-primary-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                        title="Copy code"
                        aria-label="Copy code to clipboard"
                    >
                        {copiedCode === codeContent ? (
                            <Check size={16} className="text-white" />
                        ) : (
                            <Copy size={16} className="text-white" />
                        )}
                    </button>
                )}
            </div>
        );
    };

    // Custom components for markdown rendering
    const components = {
        // Code blocks with copy button and green accent
        pre: CodeBlock,

        // Inline code with green accent
        code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
                return (
                    <code className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50 px-2 py-1 rounded text-sm font-mono" {...props}>
                        {children}
                    </code>
                );
            }
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },

        // Tables with green accents
        table: ({ children, ...props }: any) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-primary-200/30 dark:border-primary-700/30 shadow-lg">
                <table className="w-full border-collapse" {...props}>
                    {children}
                </table>
            </div>
        ),

        thead: ({ children, ...props }: any) => (
            <thead className="bg-gradient-primary/10 dark:bg-gradient-primary/20" {...props}>
                {children}
            </thead>
        ),

        th: ({ children, ...props }: any) => (
            <th className="text-left p-3 font-display font-semibold border border-primary-200/30 dark:border-primary-700/30 text-primary-700 dark:text-primary-300" {...props}>
                {processChildrenRecursively(children)}
            </th>
        ),

        td: ({ children, ...props }: any) => (
            <td className="p-3 border border-primary-200/30 dark:border-primary-700/30 text-light-text-secondary dark:text-dark-text-secondary" {...props}>
                {processChildrenRecursively(children)}
            </td>
        ),

        // Blockquotes with green accent
        blockquote: ({ children, ...props }: any) => (
            <blockquote className="border-l-4 border-primary-500 dark:border-primary-400 bg-gradient-light-panel dark:bg-gradient-dark-panel glass border border-primary-200/30 dark:border-primary-700/30 p-4 my-4 rounded-r-lg shadow-sm" {...props}>
                {processChildrenRecursively(children)}
            </blockquote>
        ),

        // Links with green accent
        a: ({ href, children, ...props }: any) => {
            const isExternal = href?.startsWith('http');
            return (
                <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold hover:underline transition-colors duration-200"
                    {...props}
                >
                    {processChildrenRecursively(children)}
                </a>
            );
        },

        // Lists
        ul: ({ children, ...props }: any) => (
            <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
                {children}
            </ul>
        ),

        ol: ({ children, ...props }: any) => (
            <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
                {children}
            </ol>
        ),

        li: ({ children, ...props }: any) => (
            <li className="text-light-text-secondary dark:text-dark-text-secondary" {...props}>
                {processChildrenRecursively(children)}
            </li>
        ),

        // Headings with green gradient and IDs for TOC
        h1: ({ children, ...props }: any) => {
            const id = generateHeadingId(children);
            return (
                <h1
                    id={id}
                    className="text-4xl font-display font-bold mb-6 gradient-text scroll-mt-24"
                    {...props}
                >
                    {processChildrenRecursively(children)}
                </h1>
            );
        },

        h2: ({ children, ...props }: any) => {
            const id = generateHeadingId(children);
            return (
                <h2
                    id={id}
                    className="text-3xl font-display font-semibold mt-8 mb-4 gradient-text border-b border-primary-200/30 dark:border-primary-700/30 pb-2 scroll-mt-24"
                    {...props}
                >
                    {processChildrenRecursively(children)}
                </h2>
            );
        },

        h3: ({ children, ...props }: any) => {
            const id = generateHeadingId(children);
            return (
                <h3
                    id={id}
                    className="text-2xl font-display font-semibold mt-6 mb-3 gradient-text scroll-mt-24"
                    {...props}
                >
                    {processChildrenRecursively(children)}
                </h3>
            );
        },

        h4: ({ children, ...props }: any) => {
            const id = generateHeadingId(children);
            return (
                <h4
                    id={id}
                    className="text-xl font-display font-medium mt-4 mb-2 text-primary-600 dark:text-primary-400 scroll-mt-24"
                    {...props}
                >
                    {processChildrenRecursively(children)}
                </h4>
            );
        },

        // Paragraphs
        p: ({ children, ...props }: any) => (
            <p className="mb-4 leading-relaxed text-light-text-secondary dark:text-dark-text-secondary" {...props}>
                {processChildrenRecursively(children)}
            </p>
        ),

        // Horizontal rules with green accent
        hr: ({ ...props }: any) => (
            <hr className="my-8 border-primary-200/50 dark:border-primary-700/50" {...props} />
        ),

        // Images
        img: ({ src, alt, ...props }: any) => {
            const handleError = (e: any) => {
                console.error('Image failed to load:', src);
                e.target.style.display = 'none';
            };

            const handleLoad = () => {
                console.log('Image loaded successfully:', src);
            };

            return (
                <div className="my-6 text-center">
                    <img
                        src={src}
                        alt={alt}
                        className="rounded-lg shadow-lg max-w-full h-auto mx-auto block"
                        style={{ maxHeight: '600px', width: 'auto' }}
                        loading="lazy"
                        onError={handleError}
                        onLoad={handleLoad}
                        {...props}
                    />
                    {alt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                            {alt}
                        </p>
                    )}
                </div>
            );
        },
    };

    return (
        <div className={`doc-content ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownContent;
