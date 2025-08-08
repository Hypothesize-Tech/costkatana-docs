import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
                >
                    Go to Home
                </Link>
                <Link
                    to="/getting-started/introduction"
                    className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 text-center"
                >
                    Documentation
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
