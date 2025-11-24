import React, { useState, useEffect } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeContext {
    imports?: string[];
    setup?: string;
    dependencies?: string[];
    description?: string;
}

interface SmartCodeCopyProps {
    code: string;
    language?: string;
    context?: CodeContext;
    showContext?: boolean;
    className?: string;
}

const SmartCodeCopy: React.FC<SmartCodeCopyProps> = ({
    code,
    language = 'javascript',
    context,
    className = '',
}) => {
    const [copied, setCopied] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    // Check if language is bash/shell
    const isTerminal = language === 'bash' || language === 'sh' || language === 'shell' || language === 'zsh';

    // Blinking cursor animation for terminal
    useEffect(() => {
        if (isTerminal) {
            const interval = setInterval(() => {
                setCursorVisible(prev => !prev);
            }, 530);
            return () => clearInterval(interval);
        }
    }, [isTerminal]);

    // Generate full code with imports and context
    const generateFullCode = (): string => {
        let fullCode = '';

        // For terminal/bash, return raw code without prompt (for copying)
        if (isTerminal) {
            return code; // Return raw code without prompt for copying
        }

        // Add dependencies comment if available
        if (context?.dependencies && context.dependencies.length > 0) {
            fullCode += `// Install dependencies:\n`;
            if (language === 'javascript' || language === 'typescript') {
                fullCode += `// npm install ${context.dependencies.join(' ')}\n\n`;
            } else if (language === 'python') {
                fullCode += `// pip install ${context.dependencies.join(' ')}\n\n`;
            }
        }

        // Add description if available
        if (context?.description) {
            fullCode += `// ${context.description}\n\n`;
        }

        // Add imports
        if (context?.imports && context.imports.length > 0) {
            context.imports.forEach((imp) => {
                fullCode += `${imp}\n`;
            });
            fullCode += '\n';
        }

        // Add setup code if available
        if (context?.setup) {
            fullCode += `${context.setup}\n\n`;
        }

        // Add main code
        fullCode += code;

        return fullCode;
    };

    // Generate code for display (with terminal prompt)
    const generateDisplayCode = (): string => {
        if (isTerminal) {
            const lines = code.split('\n');
            const prompt = 'user@cost-katana:~/project$ ';
            return lines
                .filter(line => line.trim() || line === '') // Keep empty lines for spacing
                .map(line => line.trim() ? `${prompt}${line}` : '')
                .join('\n');
        }
        return generateFullCode();
    };

    // Render terminal code with styled prompt
    const renderTerminalCode = () => {
        const lines = code.split('\n');
        const prompt = 'user@cost-katana:~/project$ ';
        let promptShown = false;
        // Find last non-empty line index
        let lastLineIndex = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].trim()) {
                lastLineIndex = i;
                break;
            }
        }

        return (
            <div style={{
                background: '#000000',
                padding: '1rem 1.25rem',
                paddingTop: '0.75rem',
                paddingRight: '1rem',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Courier New", monospace',
                fontSize: '0.875rem',
                lineHeight: '1.8',
                color: '#ffffff',
                display: 'block',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {lines.map((line, index) => {
                    const isEmpty = !line.trim();
                    const isLastLine = index === lastLineIndex;

                    if (isEmpty) {
                        return <div key={index} style={{ height: '1.2em' }}></div>;
                    }

                    // Show prompt only on the first non-empty line
                    const showPrompt = !promptShown;
                    if (showPrompt) {
                        promptShown = true;
                    }

                    return (
                        <div key={index} style={{ display: 'block', lineHeight: '1.8' }}>
                            {showPrompt ? (
                                <span>
                                    <span style={{ color: '#00ff00', whiteSpace: 'nowrap' }}>{prompt}</span>
                                    <span style={{ color: '#ffffff' }}>
                                        {line}
                                        {isLastLine && (
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: '8px',
                                                    height: '16px',
                                                    backgroundColor: '#00ff00',
                                                    opacity: cursorVisible ? 1 : 0,
                                                    transition: 'opacity 0.5s',
                                                    verticalAlign: 'middle',
                                                    marginLeft: '2px',
                                                }}
                                            />
                                        )}
                                    </span>
                                </span>
                            ) : (
                                <span style={{ color: '#ffffff', paddingLeft: `${prompt.length * 0.6}ch`, display: 'block' }}>
                                    {line}
                                    {isLastLine && (
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '16px',
                                                backgroundColor: '#00ff00',
                                                opacity: cursorVisible ? 1 : 0,
                                                transition: 'opacity 0.5s',
                                                verticalAlign: 'middle',
                                                marginLeft: '2px',
                                            }}
                                        />
                                    )}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // Detect dark mode
    React.useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    const handleCopy = async () => {
        try {
            const codeToCopy = generateFullCode();
            await navigator.clipboard.writeText(codeToCopy);
            setCopied(true);
            toast.success('Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy code');
        }
    };

    const handleDownload = () => {
        const fullCode = generateFullCode();
        const blob = new Blob([fullCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code.${getFileExtension(language)}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Code downloaded!');
    };

    const getFileExtension = (lang: string): string => {
        const extensions: Record<string, string> = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            java: 'java',
            cpp: 'cpp',
            c: 'c',
            html: 'html',
            css: 'css',
            json: 'json',
        };
        return extensions[lang] || 'txt';
    };

    // Always show full code with context
    const displayCode = generateDisplayCode();

    if (isTerminal) {
        return (
            <div className={`relative group my-4 ${className}`}>
                {/* Terminal Window */}
                <div className="relative overflow-hidden rounded-lg border border-gray-800 shadow-2xl" style={{ background: '#000000', display: 'block', width: '100%' }}>
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1"></div>
                        <div className="w-12"></div>
                    </div>

                    {/* Terminal Content */}
                    <div className="relative" style={{ background: '#000000' }}>
                        {renderTerminalCode()}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-14 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-green-600/90 hover:bg-green-600 rounded transition-colors shadow-lg backdrop-blur-sm"
                            title="Copy code"
                        >
                            {copied ? (
                                <Check size={16} className="text-white" />
                            ) : (
                                <Copy size={16} className="text-white" />
                            )}
                        </button>

                        <button
                            onClick={handleDownload}
                            className="p-2 bg-gray-700/90 hover:bg-gray-600 rounded transition-colors shadow-lg backdrop-blur-sm"
                            title="Download code"
                        >
                            <Download size={16} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Add CSS for blinking animation */}
                <style>{`
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `}</style>
            </div>
        );
    }

    // Regular code block (non-terminal)
    return (
        <div className={`relative group my-4 ${className}`}>
            {/* Code Block */}
            <div className="relative card overflow-hidden">
                <div className="rounded-xl overflow-hidden border border-primary-500/20">
                    <SyntaxHighlighter
                        language={language}
                        style={isDark ? oneDark : oneLight}
                        customStyle={{
                            margin: 0,
                            padding: '1rem',
                            background: isDark ? 'linear-gradient(180deg, #1a1a1a, #0C1012)' : 'linear-gradient(180deg, #f1f5f9, #ffffff)',
                            borderRadius: '0.75rem',
                            border: 'none',
                        }}
                        codeTagProps={{
                            style: {
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.875rem',
                                lineHeight: '1.6',
                            }
                        }}
                    >
                        {displayCode}
                    </SyntaxHighlighter>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-primary-500/90 hover:bg-primary-500 dark:bg-primary-500/80 dark:hover:bg-primary-500 rounded-lg transition-colors shadow-lg z-10 backdrop-blur-sm"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check size={16} className="text-white" />
                        ) : (
                            <Copy size={16} className="text-white" />
                        )}
                    </button>

                    <button
                        onClick={handleDownload}
                        className="p-2 bg-gray-700/90 hover:bg-gray-700 dark:bg-gray-600/80 dark:hover:bg-gray-600 rounded-lg transition-colors shadow-lg z-10 backdrop-blur-sm"
                        title="Download code"
                    >
                        <Download size={16} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartCodeCopy;

