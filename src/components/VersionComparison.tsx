import React, { useState } from 'react';
import { GitBranch, GitCompare, History, FileDiff, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Version {
    id: string;
    version: string;
    date: string;
    author?: string;
    changes?: string;
}

interface VersionComparisonProps {
    pageId: string;
    currentContent: string;
    versions?: Version[];
    onVersionSelect?: (versionId: string) => void;
    className?: string;
}

type ViewMode = 'side-by-side' | 'unified';

const VersionComparison: React.FC<VersionComparisonProps> = ({
    pageId,
    currentContent,
    versions = [],
    onVersionSelect,
    className = ''
}) => {
    const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
    const [isOpen, setIsOpen] = useState(false);
    const [versionContent, setVersionContent] = useState<string>('');

    // Mock version data if not provided
    const availableVersions: Version[] = versions.length > 0 ? versions : [
        { id: 'v1', version: '1.0.0', date: '2024-01-15', author: 'Team', changes: 'Initial version' },
        { id: 'v2', version: '1.1.0', date: '2024-02-20', author: 'Team', changes: 'Added new features' },
        { id: 'v3', version: '1.2.0', date: '2024-03-10', author: 'Team', changes: 'Performance improvements' },
    ];

    const handleVersionSelect = async (versionId: string) => {
        setSelectedVersion(versionId);
        setIsOpen(true);

        // In a real implementation, fetch version content from API
        // For now, we'll generate a mock diff
        const version = availableVersions.find(v => v.id === versionId);
        if (version) {
            // Simulate fetching version content
            setVersionContent(generateMockVersionContent(currentContent, version.version));
            onVersionSelect?.(versionId);
        }
    };

    const generateMockVersionContent = (current: string, version: string): string => {
        // Simple mock: remove some lines to simulate changes
        const lines = current.split('\n');
        if (version === '1.0.0') {
            return lines.slice(0, Math.floor(lines.length * 0.7)).join('\n');
        }
        return current;
    };

    const generateDiff = (oldContent: string, newContent: string): Array<{
        type: 'added' | 'removed' | 'unchanged';
        line: string;
        oldLineNumber?: number;
        newLineNumber?: number;
    }> => {
        const oldLines = oldContent.split('\n');
        const newLines = newContent.split('\n');
        const diff: Array<{
            type: 'added' | 'removed' | 'unchanged';
            line: string;
            oldLineNumber?: number;
            newLineNumber?: number;
        }> = [];

        let oldIndex = 0;
        let newIndex = 0;
        let oldLineNum = 1;
        let newLineNum = 1;

        while (oldIndex < oldLines.length || newIndex < newLines.length) {
            if (oldIndex >= oldLines.length) {
                // Only new lines remain
                diff.push({
                    type: 'added',
                    line: newLines[newIndex],
                    newLineNumber: newLineNum++
                });
                newIndex++;
            } else if (newIndex >= newLines.length) {
                // Only old lines remain
                diff.push({
                    type: 'removed',
                    line: oldLines[oldIndex],
                    oldLineNumber: oldLineNum++
                });
                oldIndex++;
            } else if (oldLines[oldIndex] === newLines[newIndex]) {
                // Lines match
                diff.push({
                    type: 'unchanged',
                    line: oldLines[oldIndex],
                    oldLineNumber: oldLineNum++,
                    newLineNumber: newLineNum++
                });
                oldIndex++;
                newIndex++;
            } else {
                // Lines differ - simplified diff algorithm
                const oldLine = oldLines[oldIndex];
                const newLine = newLines[newIndex];

                // Check if this is a modification or just different content
                if (oldLine.trim() && newLine.trim()) {
                    diff.push({
                        type: 'removed',
                        line: oldLine,
                        oldLineNumber: oldLineNum++
                    });
                    diff.push({
                        type: 'added',
                        line: newLine,
                        newLineNumber: newLineNum++
                    });
                } else if (oldLine.trim()) {
                    diff.push({
                        type: 'removed',
                        line: oldLine,
                        oldLineNumber: oldLineNum++
                    });
                } else {
                    diff.push({
                        type: 'added',
                        line: newLine,
                        newLineNumber: newLineNum++
                    });
                }
                oldIndex++;
                newIndex++;
            }
        }

        return diff;
    };

    const diff = selectedVersion && versionContent
        ? generateDiff(versionContent, currentContent)
        : [];

    const renderSideBySide = () => {
        const oldLines: Array<{ line: string; number: number; type: 'removed' | 'unchanged' }> = [];
        const newLines: Array<{ line: string; number: number; type: 'added' | 'unchanged' }> = [];

        diff.forEach(item => {
            if (item.type === 'removed' || item.type === 'unchanged') {
                oldLines.push({
                    line: item.line,
                    number: item.oldLineNumber || 0,
                    type: item.type === 'removed' ? 'removed' : 'unchanged'
                });
            }
            if (item.type === 'added' || item.type === 'unchanged') {
                newLines.push({
                    line: item.line,
                    number: item.newLineNumber || 0,
                    type: item.type === 'added' ? 'added' : 'unchanged'
                });
            }
        });

        return (
            <div className="grid grid-cols-2 gap-0 border border-primary-200/30 dark:border-primary-700/30 rounded-lg overflow-hidden">
                {/* Old Version */}
                <div className="bg-red-500/5 dark:bg-red-500/10 border-r border-primary-200/30 dark:border-primary-700/30">
                    <div className="sticky top-0 bg-red-500/10 dark:bg-red-500/20 px-4 py-2 border-b border-primary-200/30 dark:border-primary-700/30">
                        <div className="flex items-center gap-2">
                            <FileDiff className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Version {availableVersions.find(v => v.id === selectedVersion)?.version || 'Old'}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-[500px]">
                        {oldLines.map((item, index) => (
                            <div
                                key={index}
                                className={`px-4 py-1 font-mono text-sm ${item.type === 'removed'
                                        ? 'bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through'
                                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                                    }`}
                            >
                                <span className="inline-block w-12 text-right mr-4 text-light-text-muted dark:text-dark-text-muted">
                                    {item.number || ''}
                                </span>
                                <span>{item.line || ' '}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Version */}
                <div className="bg-green-500/5 dark:bg-green-500/10">
                    <div className="sticky top-0 bg-green-500/10 dark:bg-green-500/20 px-4 py-2 border-b border-primary-200/30 dark:border-primary-700/30">
                        <div className="flex items-center gap-2">
                            <FileDiff className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Current Version
                            </span>
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-[500px]">
                        {newLines.map((item, index) => (
                            <div
                                key={index}
                                className={`px-4 py-1 font-mono text-sm ${item.type === 'added'
                                        ? 'bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300'
                                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                                    }`}
                            >
                                <span className="inline-block w-12 text-right mr-4 text-light-text-muted dark:text-dark-text-muted">
                                    {item.number || ''}
                                </span>
                                <span>{item.line || ' '}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderUnified = () => {
        return (
            <div className="border border-primary-200/30 dark:border-primary-700/30 rounded-lg overflow-hidden">
                <div className="sticky top-0 bg-primary-500/10 dark:bg-primary-500/20 px-4 py-2 border-b border-primary-200/30 dark:border-primary-700/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <GitCompare className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Unified Diff View
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-light-text-muted dark:text-dark-text-muted">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-red-500 rounded" />
                                Removed
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-green-500 rounded" />
                                Added
                            </span>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[500px] bg-light-bg-100 dark:bg-dark-bg-200">
                    {diff.map((item, index) => (
                        <div
                            key={index}
                            className={`px-4 py-1 font-mono text-sm border-l-4 ${item.type === 'removed'
                                    ? 'bg-red-500/10 dark:bg-red-500/20 border-red-500 text-red-700 dark:text-red-300'
                                    : item.type === 'added'
                                        ? 'bg-green-500/10 dark:bg-green-500/20 border-green-500 text-green-700 dark:text-green-300'
                                        : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary'
                                }`}
                        >
                            <span className="inline-block w-16 text-right mr-4 text-light-text-muted dark:text-dark-text-muted">
                                {item.type === 'removed' ? `-${item.oldLineNumber || ''}` :
                                    item.type === 'added' ? `+${item.newLineNumber || ''}` :
                                        ` ${item.oldLineNumber || item.newLineNumber || ''}`}
                            </span>
                            <span className={item.type === 'removed' ? 'line-through' : ''}>
                                {item.line || ' '}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={`my-8 ${className}`}>
            {/* Version Selector */}
            <div className="mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                        bg-gradient-light-panel dark:bg-gradient-dark-panel
                        border border-primary-200/30 dark:border-primary-700/30
                        hover:border-primary-500/50 transition-all duration-200"
                >
                    <div className="flex items-center gap-3">
                        <History className="w-5 h-5 text-primary-500" />
                        <div className="text-left">
                            <div className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Version Comparison
                            </div>
                            <div className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                {selectedVersion
                                    ? `Comparing with ${availableVersions.find(v => v.id === selectedVersion)?.version}`
                                    : 'Select a version to compare'}
                            </div>
                        </div>
                    </div>
                    <ChevronDown
                        className={`w-5 h-5 text-light-text-muted dark:text-dark-text-muted transition-transform ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 rounded-xl border border-primary-200/30 dark:border-primary-700/30
                                bg-gradient-light-panel dark:bg-gradient-dark-panel overflow-hidden"
                        >
                            <div className="p-2">
                                {availableVersions.map((version) => (
                                    <button
                                        key={version.id}
                                        onClick={() => handleVersionSelect(version.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selectedVersion === version.id
                                                ? 'bg-primary-500/20 dark:bg-primary-500/30 border border-primary-500/50'
                                                : 'hover:bg-primary-500/10 dark:hover:bg-primary-500/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <GitBranch className="w-4 h-4 text-primary-500" />
                                                    <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                        {version.version}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">
                                                    {version.date} {version.author && `• ${version.author}`}
                                                </div>
                                                {version.changes && (
                                                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                                                        {version.changes}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Diff View */}
            {selectedVersion && (
                <div className="mt-4">
                    {/* View Mode Toggle */}
                    <div className="flex items-center justify-end gap-2 mb-4">
                        <button
                            onClick={() => setViewMode('side-by-side')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'side-by-side'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-light-bg-200 dark:bg-dark-bg-300 text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10'
                                }`}
                        >
                            Side by Side
                        </button>
                        <button
                            onClick={() => setViewMode('unified')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'unified'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-light-bg-200 dark:bg-dark-bg-300 text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10'
                                }`}
                        >
                            Unified
                        </button>
                    </div>

                    {/* Diff Content */}
                    {viewMode === 'side-by-side' ? renderSideBySide() : renderUnified()}
                </div>
            )}
        </div>
    );
};

export default VersionComparison;

