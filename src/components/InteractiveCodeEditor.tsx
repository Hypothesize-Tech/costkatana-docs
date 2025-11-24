import React, { useState, useRef, useEffect } from 'react';
import { Play, Copy, Check, RotateCcw, AlertCircle, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface InteractiveCodeEditorProps {
    code: string;
    language?: string;
    title?: string;
    description?: string;
    onRun?: (code: string) => Promise<string>;
    editable?: boolean;
    height?: string;
    dependencies?: string[];
    template?: 'vanilla' | 'react' | 'vue' | 'angular' | 'node';
}

const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
    code: initialCode,
    language = 'javascript',
    title,
    description,
    onRun,
    editable = true,
    height = '300px',
    dependencies = [],
    template = 'vanilla',
}) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);
    const [useSandbox, setUseSandbox] = useState(true);
    const [sandboxUrl, setSandboxUrl] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Reset code to initial
    const handleReset = () => {
        setCode(initialCode);
        setOutput('');
    };

    // Copy code to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            toast.success('Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy code');
        }
    };

    // Run code
    const handleRun = async () => {
        if (!onRun) {
            // Default execution for JavaScript
            if (language === 'javascript' || language === 'typescript') {
                try {
                    setIsRunning(true);
                    setOutput('Running...\n');

                    // Create a safe execution context
                    const result = await executeJavaScript(code);
                    setOutput(result);
                } catch (error: any) {
                    setOutput(`Error: ${error.message}`);
                } finally {
                    setIsRunning(false);
                }
            } else {
                toast.error('Code execution not supported for this language');
            }
        } else {
            try {
                setIsRunning(true);
                setOutput('Running...\n');
                const result = await onRun(code);
                setOutput(result);
            } catch (error: any) {
                setOutput(`Error: ${error.message}`);
            } finally {
                setIsRunning(false);
            }
        }
    };

    // Generate CodeSandbox embed URL using their simpler embed method
    const generateSandboxUrl = async (codeToRun: string): Promise<string> => {
        try {
            // Determine file name based on language
            let fileName = 'index.js';
            if (language === 'typescript') fileName = 'index.ts';
            else if (language === 'python') fileName = 'main.py';
            else if (language === 'html') fileName = 'index.html';
            else if (language === 'css') fileName = 'styles.css';

            const files: Record<string, { content: string }> = {
                [fileName]: { content: codeToRun },
            };

            // Add package.json for Node.js/JavaScript projects
            if (template === 'node' || (language === 'javascript' && dependencies.length > 0)) {
                files['package.json'] = {
                    content: JSON.stringify({
                        name: 'costkatana-example',
                        version: '1.0.0',
                        dependencies: dependencies.reduce((acc, dep) => {
                            const [name, version] = dep.includes('@') ? dep.split('@') : [dep, 'latest'];
                            acc[name] = version || 'latest';
                            return acc;
                        }, {} as Record<string, string>),
                    }, null, 2),
                };
            }

            // Use CodeSandbox's define API (no auth required for public sandboxes)
            const sandboxDefinition = {
                files,
                template: template === 'node' ? 'node' : 'vanilla',
            };

            // Encode the sandbox definition
            const encoded = btoa(JSON.stringify(sandboxDefinition))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            // Use CodeSandbox's embed URL with the encoded definition
            return `https://codesandbox.io/embed/${encoded}?fontsize=14&hidenavigation=1&theme=dark&view=editor&module=${fileName}`;
        } catch (error) {
            console.error('Failed to create sandbox:', error);
            // Fallback to StackBlitz
            return generateStackBlitzUrl(codeToRun);
        }
    };

    // Generate StackBlitz embed URL (fallback) - using their simpler method
    const generateStackBlitzUrl = (codeToRun: string): string => {
        // Use StackBlitz's webcontainer embed which works better
        const files: Record<string, string> = {};

        let fileName = 'index.js';
        if (language === 'typescript') fileName = 'index.ts';
        else if (language === 'html') fileName = 'index.html';

        files[fileName] = codeToRun;

        if (dependencies.length > 0) {
            files['package.json'] = JSON.stringify({
                dependencies: dependencies.reduce((acc, dep) => {
                    const [name, version] = dep.includes('@') ? dep.split('@') : [dep, 'latest'];
                    acc[name] = version || 'latest';
                    return acc;
                }, {} as Record<string, string>),
            }, null, 2);
        }

        // Use StackBlitz's webcontainer format (better for embeds)
        const projectData = {
            files,
            title: title || 'Cost Katana Example',
            description: description || '',
            template: template === 'node' ? 'node' : 'javascript',
            settings: {
                compile: {
                    clearConsole: false,
                },
            },
        };

        // Encode project data for StackBlitz
        const encoded = btoa(JSON.stringify(projectData))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // Use StackBlitz's simpler embed URL that doesn't require auth
        return `https://stackblitz.com/fork/web-platform?embed=1&file=${fileName}&hideExplorer=1&hideNavigation=1&theme=dark&view=editor&ctl=1`;
    };

    // Safe JavaScript execution (fallback)
    const executeJavaScript = async (code: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                // For security, we'll use an iframe-based sandbox
                // This is a fallback if sandbox embedding fails
                resolve('Code execution preview:\n\n' + code + '\n\n(Opening in sandbox...)');
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                reject(new Error(errorMessage));
            }
        });
    };

    // Open in CodeSandbox
    const openInSandbox = async () => {
        setIsRunning(true);
        try {
            const url = await generateSandboxUrl(code);
            setSandboxUrl(url);
            setUseSandbox(true);
            toast.success('Code sandbox loaded!');
        } catch (error) {
            toast.error('Failed to create sandbox. Trying alternative...');
            // Fallback to StackBlitz
            const fallbackUrl = generateStackBlitzUrl(code);
            setSandboxUrl(fallbackUrl);
            setUseSandbox(true);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="my-6 rounded-xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg overflow-hidden">
            {/* Header */}
            {(title || description) && (
                <div className="px-4 py-3 border-b border-primary-200/30 dark:border-primary-700/30">
                    {title && (
                        <h4 className="text-lg font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                            {title}
                        </h4>
                    )}
                    {description && (
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Code Editor */}
            <div className="relative">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-black border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
                    <div className="flex items-center gap-2">
                        {editable && (
                            <button
                                onClick={handleReset}
                                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                                title="Reset code"
                            >
                                <RotateCcw size={14} />
                            </button>
                        )}
                        <button
                            onClick={handleCopy}
                            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                            title="Copy code"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                        <button
                            onClick={openInSandbox}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white text-sm font-medium transition-colors flex items-center gap-1.5"
                            title="Open in CodeSandbox"
                        >
                            <ExternalLink size={14} />
                            Run in Sandbox
                        </button>
                        {onRun && (
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-3 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                            >
                                <Play size={14} />
                                {isRunning ? 'Running...' : 'Run Locally'}
                            </button>
                        )}
                    </div>
                </div>

                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => editable && setCode(e.target.value)}
                    readOnly={!editable}
                    className={`w-full p-4 font-mono text-sm bg-gray-900 dark:bg-black text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 ${!editable ? 'cursor-default' : ''
                        }`}
                    style={{ height, minHeight: '200px' }}
                    spellCheck={false}
                />
            </div>

            {/* Output */}
            {output && (
                <div className="border-t border-primary-200/30 dark:border-primary-700/30 bg-gray-950 dark:bg-gray-900">
                    <div className="px-4 py-2 bg-gray-900 dark:bg-black border-b border-gray-700">
                        <span className="text-xs font-mono text-gray-400 uppercase">Output</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-100 whitespace-pre-wrap overflow-x-auto max-h-64 overflow-y-auto">
                        {output}
                    </pre>
                </div>
            )}

            {/* Sandbox Embed */}
            {useSandbox && sandboxUrl && (
                <div className="border-t border-primary-200/30 dark:border-primary-700/30">
                    <div className="px-4 py-2 bg-gray-900 dark:bg-black border-b border-gray-700 flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-400 uppercase">Live Sandbox</span>
                        <button
                            onClick={() => {
                                setUseSandbox(false);
                                setSandboxUrl('');
                            }}
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Close
                        </button>
                    </div>
                    <div className="relative" style={{ height: '500px' }}>
                        <iframe
                            ref={iframeRef}
                            src={sandboxUrl}
                            className="w-full h-full border-0"
                            title="Code Sandbox"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
                        />
                    </div>
                </div>
            )}

            {/* Security Notice */}
            {onRun && (
                <div className="px-4 py-2 bg-yellow-500/10 border-t border-yellow-500/20">
                    <div className="flex items-start gap-2 text-xs text-yellow-600 dark:text-yellow-400">
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                        <p>
                            Code execution is for demonstration purposes. Sandbox runs in an isolated environment via CodeSandbox.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveCodeEditor;

