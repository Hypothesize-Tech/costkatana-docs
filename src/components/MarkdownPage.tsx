import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MarkdownContent from './MarkdownContent';
import LoadingSpinner from './LoadingSpinner';
import { loadMarkdown } from '../utils/loadMarkdown';
import type { MarkdownData } from '../utils/loadMarkdown';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Edit, ExternalLink } from 'lucide-react';

interface MarkdownPageProps {
    markdownPath: string;
    title?: string;
    description?: string;
    prevPage?: { path: string; label: string };
    nextPage?: { path: string; label: string };
    editUrl?: string;
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({
    markdownPath,
    title: defaultTitle,
    description: defaultDescription,
    prevPage,
    nextPage,
    editUrl,
}) => {
    const [markdown, setMarkdown] = useState<MarkdownData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadContent = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await loadMarkdown(markdownPath);
                setMarkdown(data);
            } catch (err) {
                setError('Failed to load documentation content');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [markdownPath]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
        );
    }

    const title = markdown?.frontmatter?.title || defaultTitle || 'Documentation';
    const description = markdown?.frontmatter?.description || defaultDescription || '';

    return (
        <>
            <Helmet>
                <title>{title} - Cost Katana Documentation</title>
                {description && <meta name="description" content={description} />}
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>

                {/* Markdown Content */}
                <div className="card p-8 mb-8">
                    <MarkdownContent content={markdown?.content || ''} />
                </div>

                {/* Navigation */}
                {(prevPage || nextPage) && (
                    <div className="flex justify-between items-center mb-8">
                        {prevPage ? (
                            <Link
                                to={prevPage.path}
                                className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                <ChevronLeft size={20} />
                                <span>{prevPage.label}</span>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {nextPage && (
                            <Link
                                to={nextPage.path}
                                className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                <span>{nextPage.label}</span>
                                <ChevronRight size={20} />
                            </Link>
                        )}
                    </div>
                )}

                {/* Edit on GitHub */}
                {editUrl && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Found an issue with this page?
                            </p>
                            <a
                                href={editUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                <Edit size={16} />
                                <span>Edit on GitHub</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default MarkdownPage;
