import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { useLocation } from 'react-router-dom';
import { useReading } from '../contexts/ReadingContext';
import StepByStepGuide from './StepByStepGuide';
import VideoTutorial from './VideoTutorial';
import SmartCodeCopy from './SmartCodeCopy';
import APITester from './APITester';
import SDKGenerator from './SDKGenerator';
import IntegrationWizard from './IntegrationWizard';
import APIExplorer from './APIExplorer';
import VersionComparison from './VersionComparison';
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

// Helper to parse JSON with better error handling
const safeJsonParse = (str: string): unknown => {
    try {
        // Remove control characters that break JSON parsing
        const cleaned = str
            // eslint-disable-next-line no-control-regex
            .replace(/[\x00-\x1f\x7f]/g, '') // Remove control characters
            .replace(/\\n/g, '\n')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\`/g, '`');
        return JSON.parse(cleaned);
    } catch (e) {
        console.error('JSON parse error:', e, 'String:', str);
        return null;
    }
};

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

// Blinking cursor component for terminal
const BlinkingCursor: React.FC = () => (
    <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse" style={{ animation: 'blink 1s step-end infinite' }}>
        <style>{`
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `}</style>
    </span>
);

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const idCountsRef = useRef<Record<string, number>>({});
    const { settings } = useReading();
    const location = useLocation();

    // Reset ID counts when content changes
    useEffect(() => {
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

    // Emoji to icon mapping - using typeof to properly type Lucide icons
    const emojiToIcon: Record<string, typeof Zap> = {
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
    const processChildrenRecursively = (children: React.ReactNode): React.ReactNode => {
        return React.Children.map(children, (child) => {
            // If it's a string, replace emojis
            if (typeof child === 'string') {
                return replaceEmojisWithIcons(child);
            }

            // If it's a React element with children, process recursively
            if (React.isValidElement(child)) {
                const props = child.props as { children?: React.ReactNode };
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
    const extractTextContent = (node: React.ReactNode): string => {
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
            const props = node.props as { children?: React.ReactNode; className?: string };
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

    // Detect language from code element className
    const detectLanguage = (children: React.ReactNode): string => {
        if (React.isValidElement(children)) {
            const codeElement = children as React.ReactElement<{ className?: string }>;
            const className = codeElement.props?.className || '';
            const match = className.match(/language-(\w+)/);
            if (match) return match[1];
        }
        return 'bash';
    };

    // Component for code blocks with MacBook-style terminal
    const CodeBlock: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => {
        const preRef = useRef<HTMLPreElement>(null);
        const [codeContent, setCodeContent] = useState('');
        const language = detectLanguage(children);
        const isTerminal = ['bash', 'sh', 'shell', 'zsh', 'terminal'].includes(language);

        // Extract code content on mount and when children change
        useEffect(() => {
            let extracted = '';

            // Try multiple extraction strategies
            if (React.isValidElement(children)) {
                const codeElement = children as React.ReactElement<{ children?: React.ReactNode }>;
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

        // Format terminal content with prompt and cursor
        const formatTerminalContent = (code: string): React.ReactNode => {
            const lines = code.split('\n');
            return lines.map((line, index) => {
                const isLastLine = index === lines.length - 1;
                const trimmedLine = line.trim();

                // Check if line starts with a command (not a comment or output)
                const isCommand = trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('//');

                return (
                    <div key={index} className="flex items-start">
                        {isCommand && (
                            <span className="text-blue-400 mr-2 select-none flex-shrink-0">
                                <span className="text-green-400">user@costkatana</span>
                                <span className="text-gray-400">:</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-gray-400">$</span>
                            </span>
                        )}
                        <span className={isCommand ? 'text-green-400' : 'text-gray-400'}>
                            {line}
                            {isLastLine && isCommand && <BlinkingCursor />}
                        </span>
                    </div>
                );
            });
        };

        // MacBook-style terminal for bash/shell commands
        if (isTerminal) {
            return (
                <div className="relative group my-4 overflow-hidden bg-gray-900 rounded-xl border border-primary-500/20 shadow-2xl">
                    {/* Terminal header with traffic lights */}
                    <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                        <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg hover:bg-red-400 transition-colors"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg hover:bg-green-400 transition-colors"></div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="font-mono text-xs text-gray-400">user@costkatana: ~</span>
                            {codeContent && (
                                <button
                                    onClick={() => copyToClipboard(codeContent)}
                                    className="p-1.5 rounded-md hover:bg-gray-700 transition-colors group/btn"
                                    title="Copy commands"
                                >
                                    {copiedCode === codeContent ? (
                                        <Check size={16} className="text-primary-400" />
                                    ) : (
                                        <Copy size={16} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Terminal content */}
                    <div className="p-4 font-mono text-sm leading-relaxed bg-black min-h-[60px] overflow-x-auto">
                        <pre ref={preRef} className="whitespace-pre-wrap hidden" {...props}>
                            {children}
                        </pre>
                        <div className="terminal-output">
                            {formatTerminalContent(codeContent)}
                        </div>
                    </div>
                    {/* Terminal glow effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent animate-pulse via-primary-500/3"></div>
                        <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent via-primary-500/50"></div>
                    </div>
                </div>
            );
        }

        // Regular code block for other languages
        return (
            <div className="relative group my-4 overflow-hidden bg-gray-900 rounded-xl border border-primary-500/20 shadow-2xl">
                {/* Code block header with traffic lights */}
                <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <span className="font-mono text-xs text-gray-400 capitalize">{language}</span>
                        {codeContent && (
                            <button
                                onClick={() => copyToClipboard(codeContent)}
                                className="p-1.5 rounded-md hover:bg-gray-700 transition-colors group/btn"
                                title="Copy code"
                            >
                                {copiedCode === codeContent ? (
                                    <Check size={16} className="text-primary-400" />
                                ) : (
                                    <Copy size={16} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
                {/* Code content */}
                <pre
                    ref={preRef}
                    className="p-4 overflow-x-auto text-gray-100 bg-black"
                    {...props}
                >
                    {children}
                </pre>
            </div>
        );
    };

    // Custom components for markdown rendering
    const components = {
        // Code blocks with copy button and green accent
        pre: CodeBlock,

        // Inline code with green accent
        code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
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
        table: ({ children, ...props }: { children?: React.ReactNode }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-primary-200/30 dark:border-primary-700/30 shadow-lg">
                <table className="w-full border-collapse" {...props}>
                    {children}
                </table>
            </div>
        ),

        thead: ({ children, ...props }: { children?: React.ReactNode }) => (
            <thead className="bg-gradient-primary/10 dark:bg-gradient-primary/20" {...props}>
                {children}
            </thead>
        ),

        th: ({ children, ...props }: { children?: React.ReactNode }) => (
            <th className="text-left p-3 font-display font-semibold border border-primary-200/30 dark:border-primary-700/30 text-primary-700 dark:text-primary-300" {...props}>
                {processChildrenRecursively(children)}
            </th>
        ),

        td: ({ children, ...props }: { children?: React.ReactNode }) => (
            <td className="p-3 border border-primary-200/30 dark:border-primary-700/30 text-light-text-secondary dark:text-dark-text-secondary" {...props}>
                {processChildrenRecursively(children)}
            </td>
        ),

        // Blockquotes with green accent
        blockquote: ({ children, ...props }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-4 border-primary-500 dark:border-primary-400 bg-gradient-light-panel dark:bg-gradient-dark-panel glass border border-primary-200/30 dark:border-primary-700/30 p-4 my-4 rounded-r-lg shadow-sm" {...props}>
                {processChildrenRecursively(children)}
            </blockquote>
        ),

        // Links with green accent
        a: ({ href, children, ...props }: { href?: string; children?: React.ReactNode }) => {
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
        ul: ({ children, ...props }: { children?: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
                {children}
            </ul>
        ),

        ol: ({ children, ...props }: { children?: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
                {children}
            </ol>
        ),

        li: ({ children, ...props }: { children?: React.ReactNode }) => (
            <li className="text-light-text-secondary dark:text-dark-text-secondary" {...props}>
                {processChildrenRecursively(children)}
            </li>
        ),

        // Headings with green gradient and IDs for TOC
        h1: ({ children, ...props }: { children?: React.ReactNode }) => {
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

        h2: ({ children, ...props }: { children?: React.ReactNode }) => {
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

        h3: ({ children, ...props }: { children?: React.ReactNode }) => {
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

        h4: ({ children, ...props }: { children?: React.ReactNode }) => {
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
        p: ({ children, ...props }: { children?: React.ReactNode }) => (
            <p className="mb-4 leading-relaxed text-light-text-secondary dark:text-dark-text-secondary" {...props}>
                {processChildrenRecursively(children)}
            </p>
        ),

        // Horizontal rules with green accent
        hr: ({ ...props }) => (
            <hr className="my-8 border-primary-200/50 dark:border-primary-700/50" {...props} />
        ),

        // Lazy-loaded Images with Intersection Observer
        img: (props: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string; alt?: string }) => {
            // Create a proper component for lazy loading
            const LazyImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { src?: string; alt?: string }> = ({ src, alt, ...imgProps }) => {
                const imgRef = useRef<HTMLImageElement>(null);
                const [isLoaded, setIsLoaded] = useState(false);
                const [isInView, setIsInView] = useState(false);
                const [hasError, setHasError] = useState(false);

                useEffect(() => {
                    const imgElement = imgRef.current;
                    if (!imgElement) return;

                    // Create Intersection Observer for lazy loading
                    const observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    setIsInView(true);
                                    observer.disconnect();
                                }
                            });
                        },
                        {
                            rootMargin: '50px', // Start loading 50px before image enters viewport
                        }
                    );

                    observer.observe(imgElement);

                    return () => {
                        observer.disconnect();
                    };
                }, []);

                const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    console.error('Image failed to load:', src);
                    setHasError(true);
                    const target = e.target as HTMLImageElement;
                    if (target) {
                        target.style.display = 'none';
                    }
                };

                const handleLoad = () => {
                    setIsLoaded(true);
                };

                return (
                    <div className="my-6 text-center">
                        {!hasError && (
                            <img
                                ref={imgRef}
                                src={isInView ? src : undefined}
                                alt={alt || ''}
                                loading="lazy"
                                onLoad={handleLoad}
                                onError={handleError}
                                className={`max-w-full h-auto rounded-xl shadow-lg transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    minHeight: isLoaded ? 'auto' : '200px',
                                }}
                                {...imgProps}
                            />
                        )}
                        {!isInView && !hasError && (
                            <div
                                className="inline-block w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
                                aria-hidden="true"
                            />
                        )}
                        {alt && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                                {alt}
                            </p>
                        )}
                    </div>
                );
            };

            return <LazyImage {...props} />;
        },
    };

    // Apply reading settings to content
    const getFontSizeClass = () => {
        switch (settings.fontSize) {
            case 'small': return 'text-sm';
            case 'large': return 'text-lg';
            case 'xlarge': return 'text-xl';
            default: return 'text-base';
        }
    };

    const getFontFamilyClass = () => {
        switch (settings.fontFamily) {
            case 'serif': return 'font-serif';
            case 'mono': return 'font-mono';
            default: return 'font-body';
        }
    };

    const getLineSpacingClass = () => {
        switch (settings.lineSpacing) {
            case 'tight': return 'leading-tight';
            case 'relaxed': return 'leading-relaxed';
            default: return 'leading-normal';
        }
    };

    // Process content to extract and render interactive components
    const processInteractiveComponents = (markdownContent: string): React.ReactNode => {
        // Check if content contains interactive component markers
        const hasSteps = /```steps:/.test(markdownContent);
        const hasSmartCode = /```smart:/.test(markdownContent);
        const hasVideo = /```video:/.test(markdownContent);
        const hasAPI = /```api:/.test(markdownContent);
        const hasSDKGenerator = /```sdk-generator/.test(markdownContent);
        const hasIntegrationWizard = /```integration-wizard/.test(markdownContent);
        const hasAPIExplorer = /```api-explorer/.test(markdownContent);
        const hasVersionComparison = /```version-comparison/.test(markdownContent);

        if (!hasSteps && !hasSmartCode && !hasVideo && !hasAPI && !hasSDKGenerator && !hasIntegrationWizard && !hasAPIExplorer && !hasVersionComparison) {
            // No interactive components, render normally
            return (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={components}
                >
                    {markdownContent}
                </ReactMarkdown>
            );
        }

        // Split content and process interactive components
        const parts: React.ReactNode[] = [];
        let processedContent = markdownContent;
        let keyCounter = 0;

        // Convert interactive code blocks to smart code blocks
        // ```interactive:language:title becomes ```smart:language with context
        processedContent = processedContent.replace(
            /```interactive:(\w+)(?::([^\n]+?))?\n([\s\S]*?)```/g,
            (_match, language, title, code) => {
                // Convert to smart code format
                const cleanCode = code.trim()
                    .replace(/\\`/g, '`')
                    .replace(/\\n/g, '\n')
                    .replace(/\\'/g, "'")
                    .replace(/\\"/g, '"');

                // Create context with imports based on language
                let imports: string[] = [];
                if (language === 'javascript' || language === 'typescript') {
                    imports = ['import { ai, OPENAI } from \'cost-katana\';'];
                } else if (language === 'python') {
                    imports = ['from cost_katana import ai, openai'];
                }

                const contextStr = JSON.stringify({
                    imports: imports,
                    dependencies: ['cost-katana'],
                    description: title ? title.trim() : 'Interactive code example'
                });

                // Return as smart code block
                return `\`\`\`smart:${language}:${contextStr}\n${cleanCode}\n\`\`\``;
            }
        );

        // Process SmartCodeCopy: ```smart:language:context
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)smart:(\w+)(?::([^\n]+?))?\n([\s\S]*?)(?:```|\\`\\`\\`)/g,
            (_match, language, contextStr, code) => {
                const componentKey = `smart-${keyCounter++}`;
                let context;
                try {
                    if (contextStr) {
                        // Clean up escaped characters in JSON string
                        const cleanContextStr = contextStr
                            .replace(/\\"/g, '"')
                            .replace(/\\'/g, "'")
                            .replace(/\\\\/g, '\\');
                        context = safeJsonParse(cleanContextStr) as Record<string, unknown> | undefined;
                    }
                } catch {
                    context = undefined;
                }
                // Clean up escaped backticks and other escape sequences in code
                const cleanCode = code.trim()
                    .replace(/\\`/g, '`')
                    .replace(/\\n/g, '\n')
                    .replace(/\\'/g, "'")
                    .replace(/\\"/g, '"');

                parts.push(
                    <SmartCodeCopy
                        key={componentKey}
                        code={cleanCode}
                        language={language || 'javascript'}
                        context={context}
                    />
                );
                return `__SMART_COMPONENT_${componentKey}__`;
            }
        );

        // Process StepByStepGuide: ```steps:title\n{...json...}
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)steps:([^\n]+?)\n([\s\S]*?)(?:```|\\`\\`\\`)/g,
            (match, title, stepsContent) => {
                const componentKey = `steps-${keyCounter++}`;
                const steps = safeJsonParse(stepsContent.trim());
                if (steps && Array.isArray(steps)) {
                    parts.push(
                        <StepByStepGuide
                            key={componentKey}
                            title={title.trim()}
                            steps={steps}
                        />
                    );
                    return `__STEPS_COMPONENT_${componentKey}__`;
                } else {
                    console.error('Failed to parse steps JSON or not an array');
                    // If JSON parsing fails, keep original markdown
                    return match;
                }
            }
        );

        // Process VideoTutorial: ```video:url:title:description
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)video:([^\n:]+):([^\n:]*):([^\n]*)\n(?:```|\\`\\`\\`)/g,
            (_match, videoUrl, videoTitle, videoDescription) => {
                const componentKey = `video-${keyCounter++}`;
                parts.push(
                    <VideoTutorial
                        key={componentKey}
                        videoUrl={videoUrl.trim()}
                        title={videoTitle || undefined}
                        description={videoDescription || undefined}
                    />
                );
                return `__VIDEO_COMPONENT_${componentKey}__`;
            }
        );

        // Process APITester: ```api:method:path:description:headers:body:response
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)api:([A-Z]+):([^\n:]+):([^\n:]*):([^\n:]*):([^\n:]*):([^\n]*)\n(?:```|\\`\\`\\`)/g,
            (_match, method, path, description, headersStr, bodyStr, responseStr) => {
                const componentKey = `api-${keyCounter++}`;
                let headers, body, exampleResponse;
                try {
                    headers = headersStr ? safeJsonParse(headersStr) as Record<string, string> | undefined : undefined;
                    body = bodyStr ? safeJsonParse(bodyStr) as Record<string, unknown> | undefined : undefined;
                    exampleResponse = responseStr ? safeJsonParse(responseStr) as Record<string, unknown> | undefined : undefined;
                } catch (e) {
                    console.error('Failed to parse API tester JSON:', e);
                }

                parts.push(
                    <APITester
                        key={componentKey}
                        endpoint={{
                            method: method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
                            path: path.trim(),
                            description: description || undefined,
                            headers: headers,
                            body: body,
                            exampleResponse: exampleResponse,
                        }}
                        title={`${method} ${path}`}
                        description={description || undefined}
                    />
                );
                return `__API_COMPONENT_${componentKey}__`;
            }
        );

        // Process SDKGenerator: ```sdk-generator
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)sdk-generator\n(?:```|\\`\\`\\`)/g,
            () => {
                const componentKey = `sdk-generator-${keyCounter++}`;
                parts.push(
                    <SDKGenerator key={componentKey} />
                );
                return `__SDK_GENERATOR_COMPONENT_${componentKey}__`;
            }
        );

        // Process IntegrationWizard: ```integration-wizard
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)integration-wizard\n(?:```|\\`\\`\\`)/g,
            () => {
                const componentKey = `integration-wizard-${keyCounter++}`;
                parts.push(
                    <IntegrationWizard key={componentKey} />
                );
                return `__INTEGRATION_WIZARD_COMPONENT_${componentKey}__`;
            }
        );

        // Process APIExplorer: ```api-explorer
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)api-explorer\n(?:```|\\`\\`\\`)/g,
            () => {
                const componentKey = `api-explorer-${keyCounter++}`;
                parts.push(
                    <APIExplorer key={componentKey} />
                );
                return `__API_EXPLORER_COMPONENT_${componentKey}__`;
            }
        );

        // Process VersionComparison: ```version-comparison:pageId
        processedContent = processedContent.replace(
            /(?:```|\\`\\`\\`)version-comparison(?::([^\n]+?))?\n(?:```|\\`\\`\\`)/g,
            (_match, customPageId) => {
                const componentKey = `version-comparison-${keyCounter++}`;
                const pageId = customPageId?.trim() || location.pathname.replace(/\//g, '-').replace(/^-/, '') || 'default';
                parts.push(
                    <VersionComparison
                        key={componentKey}
                        pageId={pageId}
                        currentContent={content}
                    />
                );
                return `__VERSION_COMPARISON_COMPONENT_${componentKey}__`;
            }
        );

        // Create a map of component markers to components for easier lookup
        const componentMap = new Map<string, React.ReactNode>();
        parts.forEach((part) => {
            if (part && typeof part === 'object' && 'key' in part) {
                const key = String((part as { key: string }).key);
                // Create marker string that matches what we generated
                // Handle different component key formats
                if (key.includes('integration-wizard')) {
                    const keyMatch = key.match(/integration-wizard-(\d+)/);
                    if (keyMatch) {
                        const marker = `__INTEGRATION_WIZARD_COMPONENT_integration-wizard-${keyMatch[1]}__`;
                        componentMap.set(marker, part);
                    }
                } else if (key.includes('sdk-generator')) {
                    const keyMatch = key.match(/sdk-generator-(\d+)/);
                    if (keyMatch) {
                        const marker = `__SDK_GENERATOR_COMPONENT_sdk-generator-${keyMatch[1]}__`;
                        componentMap.set(marker, part);
                    }
                } else if (key.includes('api-explorer')) {
                    const keyMatch = key.match(/api-explorer-(\d+)/);
                    if (keyMatch) {
                        const marker = `__API_EXPLORER_COMPONENT_api-explorer-${keyMatch[1]}__`;
                        componentMap.set(marker, part);
                    }
                } else if (key.includes('version-comparison')) {
                    const keyMatch = key.match(/version-comparison-(\d+)/);
                    if (keyMatch) {
                        const marker = `__VERSION_COMPARISON_COMPONENT_version-comparison-${keyMatch[1]}__`;
                        componentMap.set(marker, part);
                    }
                } else {
                    // Handle other components (smart, steps, video, api)
                    const keyMatch = key.match(/(\w+)-(\d+)/);
                    if (keyMatch) {
                        const [, componentType, componentIndex] = keyMatch;
                        const marker = `__${componentType.toUpperCase()}_COMPONENT_${componentType}-${componentIndex}__`;
                        componentMap.set(marker, part);
                    }
                }
            }
        });

        // Split by component markers and render
        const sections = processedContent.split(/(__\w+_COMPONENT_[\w-]+-\d+__|__\w+_GENERATOR_COMPONENT_[\w-]+-\d+__|__\w+_WIZARD_COMPONENT_[\w-]+-\d+__|__\w+_EXPLORER_COMPONENT_[\w-]+-\d+__|__\w+_COMPARISON_COMPONENT_[\w-]+-\d+__)/);
        const finalParts: React.ReactNode[] = [];
        let partIndex = 0;

        sections.forEach((section) => {
            if (section.match(/^__(?:\w+_)?(?:COMPONENT|GENERATOR|WIZARD|EXPLORER|COMPARISON)_[\w-]+-\d+__$/)) {
                // This is a component marker, find the corresponding component
                const component = componentMap.get(section);
                if (component) {
                    finalParts.push(component);
                } else {
                    // Component not found - this shouldn't happen, but handle gracefully
                    console.warn('Component not found for marker:', section, 'Available markers:', Array.from(componentMap.keys()));
                }
            } else if (section.trim()) {
                // Regular markdown content
                finalParts.push(
                    <ReactMarkdown
                        key={`md-section-${partIndex++}`}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        components={components}
                    >
                        {section}
                    </ReactMarkdown>
                );
            }
        });

        return <>{finalParts}</>;
    };

    return (
        <div className={`doc-content ${getFontSizeClass()} ${getFontFamilyClass()} ${getLineSpacingClass()} ${className}`}>
            {processInteractiveComponents(content)}
        </div>
    );
};

export default MarkdownContent;
