import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, AlertCircle } from 'lucide-react';
import MarkdownContent from './MarkdownContent';
import LoadingSpinner from './LoadingSpinner';
import { useMarkdownContent } from '../hooks/useMarkdownContent';

interface NavigationLink {
    path: string;
    label: string;
}

interface DocumentationPageProps {
    title: string;
    description?: string;
    fallbackContent?: string;
    prevPage?: NavigationLink;
    nextPage?: NavigationLink;
}

const DocumentationPage: React.FC<DocumentationPageProps> = ({
    title,
    description,
    fallbackContent,
    prevPage,
    nextPage,
}) => {
    const location = useLocation();
    const { content, loading, error } = useMarkdownContent(location.pathname, fallbackContent);

    if (loading) {
        return <LoadingSpinner />;
    }

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
                {error && !content ? (
                    <div className="card glass rounded-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center glass border border-warning-200/30 dark:border-warning-700/30 bg-gradient-warning/10">
                                <AlertCircle className="text-warning-600 dark:text-warning-400" size={40} />
                            </div>
                        </div>

                        <h1 className="text-3xl font-display font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">{title}</h1>
                        {description && (
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">{description}</p>
                        )}

                        <div className="rounded-xl p-6 max-w-md mx-auto glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel">
                            <FileText className="text-light-text-muted dark:text-dark-text-muted mb-3 mx-auto" size={24} />
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                {error}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="card glass rounded-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl p-8 mb-8">
                            <MarkdownContent content={content} />
                        </div>

                        {(prevPage || nextPage) && (
                            <div className="flex justify-between mb-8">
                                {prevPage ? (
                                    <Link
                                        to={prevPage.path}
                                        className="card-hover flex items-center space-x-2 px-4 py-2 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                                    >
                                        <ChevronLeft size={20} />
                                        <span className="font-semibold">{prevPage.label}</span>
                                    </Link>
                                ) : (
                                    <div />
                                )}

                                {nextPage && (
                                    <Link
                                        to={nextPage.path}
                                        className="card-hover flex items-center space-x-2 px-4 py-2 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                                    >
                                        <span className="font-semibold">{nextPage.label}</span>
                                        <ChevronRight size={20} />
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </>
    );
};

export default DocumentationPage;
