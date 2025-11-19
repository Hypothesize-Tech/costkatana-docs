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
    TrendingDown
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
        '🔒': Shield,
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
    };

    // Function to replace emojis in text with icon components
    const replaceEmojisWithIcons = (text: string): React.ReactNode => {
        const emojiRegex = /(✅|❌|⚠️|🚨|🔴|📊|📈|📉|⚡|🎯|🔧|📝|💻|🚀|💡|🤖|🔮|🎨|🏆|💰|🔒|☁️|✖️|🌪️|🖼️|🎬|🎵|👁️|🧮|🔬|📋|🎉|❤️|🖥️|🛠️|⚙️|🛡️|🔗|📞|🎓|🏢|⭐)/g;
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

    // Custom components for markdown rendering
    const components = {
        // Code blocks with copy button
        pre: ({ children, ...props }: any) => {
            const codeContent = children?.props?.children?.toString() || '';

            return (
                <div className="relative group my-4">
                    <pre className="bg-gray-900 dark:bg-black text-gray-100 rounded-lg p-4 overflow-x-auto" {...props}>
                        {children}
                    </pre>
                    <button
                        onClick={() => copyToClipboard(codeContent)}
                        className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy code"
                    >
                        {copiedCode === codeContent ? (
                            <Check size={16} className="text-green-400" />
                        ) : (
                            <Copy size={16} className="text-gray-400" />
                        )}
                    </button>
                </div>
            );
        },

        // Inline code
        code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
                return (
                    <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-mono" {...props}>
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

        // Tables
        table: ({ children, ...props }: any) => (
            <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse" {...props}>
                    {children}
                </table>
            </div>
        ),

        thead: ({ children, ...props }: any) => (
            <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
                {children}
            </thead>
        ),

        th: ({ children, ...props }: any) => (
            <th className="text-left p-3 font-semibold border border-gray-200 dark:border-gray-700" {...props}>
                {children}
            </th>
        ),

        td: ({ children, ...props }: any) => (
            <td className="p-3 border border-gray-200 dark:border-gray-700" {...props}>
                {children}
            </td>
        ),

        // Blockquotes
        blockquote: ({ children, ...props }: any) => {
            const processedChildren = React.Children.map(children, (child: any) =>
                typeof child === 'string' ? replaceEmojisWithIcons(child) : child
            );
            return (
                <blockquote className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 p-4 my-4 rounded-r-lg" {...props}>
                    {processedChildren}
                </blockquote>
            );
        },

        // Links
        a: ({ href, children, ...props }: any) => {
            const isExternal = href?.startsWith('http');
            return (
                <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                    {...props}
                >
                    {children}
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

        li: ({ children, ...props }: any) => {
            // Process text content to replace emojis
            const processChildren = (child: any): any => {
                if (typeof child === 'string') {
                    return replaceEmojisWithIcons(child);
                }
                return child;
            };

            const processedChildren = React.Children.map(children, processChildren);

            return (
                <li className="text-gray-600 dark:text-gray-300" {...props}>
                    {processedChildren}
                </li>
            );
        },

        // Headings
        h1: ({ children, ...props }: any) => {
            const processedChildren = React.Children.map(children, (child: any) =>
                typeof child === 'string' ? replaceEmojisWithIcons(child) : child
            );
            return (
                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white" {...props}>
                    {processedChildren}
                </h1>
            );
        },

        h2: ({ children, ...props }: any) => {
            const processedChildren = React.Children.map(children, (child: any) =>
                typeof child === 'string' ? replaceEmojisWithIcons(child) : child
            );
            return (
                <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2" {...props}>
                    {processedChildren}
                </h2>
            );
        },

        h3: ({ children, ...props }: any) => {
            const processedChildren = React.Children.map(children, (child: any) =>
                typeof child === 'string' ? replaceEmojisWithIcons(child) : child
            );
            return (
                <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props}>
                    {processedChildren}
                </h3>
            );
        },

        h4: ({ children, ...props }: any) => {
            const processedChildren = React.Children.map(children, (child: any) =>
                typeof child === 'string' ? replaceEmojisWithIcons(child) : child
            );
            return (
                <h4 className="text-xl font-medium mt-4 mb-2 text-gray-700 dark:text-gray-200" {...props}>
                    {processedChildren}
                </h4>
            );
        },

        // Paragraphs
        p: ({ children, ...props }: any) => {
            const processedChildren = React.Children.map(children, (child: any) =>
                typeof child === 'string' ? replaceEmojisWithIcons(child) : child
            );
            return (
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300" {...props}>
                    {processedChildren}
                </p>
            );
        },

        // Horizontal rules
        hr: ({ ...props }: any) => (
            <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
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
