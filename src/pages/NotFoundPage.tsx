import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 relative overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5 dark:from-primary-500/10 dark:to-primary-600/10" />

            {/* Decorative circles */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
                {/* 404 with gradient */}
                <h1 className="text-8xl sm:text-9xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 animate-fade-in">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-secondary-800 dark:text-dark-text-primary mb-4">
                    Page Not Found
                </h2>

                <p className="text-secondary-600 dark:text-dark-text-secondary mb-10 text-center max-w-md mx-auto leading-relaxed">
                    The page you're looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 text-center"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/getting-started/introduction"
                        className="px-8 py-3 bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-dark-text-primary font-medium rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-300 text-center border border-secondary-200 dark:border-secondary-700"
                    >
                        Documentation
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
