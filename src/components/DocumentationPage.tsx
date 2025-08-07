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
                    <div className="card p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                <AlertCircle className="text-orange-600 dark:text-orange-400" size={40} />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">{title}</h1>
                        {description && (
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
                        )}

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                            <FileText className="text-gray-400 mb-3 mx-auto" size={24} />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {error}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="card p-8 mb-8">
                            <MarkdownContent content={content} />
                        </div>

                        {(prevPage || nextPage) && (
                            <div className="flex justify-between mb-8">
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
                    </>
                )}
            </motion.div>
        </>
    );
};

export default DocumentationPage;
