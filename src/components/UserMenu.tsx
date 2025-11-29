import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ExternalLink, ChevronDown, LogIn, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCommunity } from '../contexts/CommunityContext';
import { AuthPrompt } from './community';
import { Tooltip } from './Tooltip';

export const UserMenu: React.FC = () => {
    const { user, isAuthenticated, logout } = useCommunity();
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isAuthenticated) {
        return (
            <>
                <Tooltip content="Sign in to access community features and discussions" position="bottom">
                    <button
                        onClick={() => setShowAuthPrompt(true)}
                        className="btn flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-primary-500/20 
                            text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 
                            transition-all duration-300 hover:scale-105"
                        aria-label="Sign in"
                    >
                        <LogIn className="w-5 h-5" />
                        <span className="hidden sm:inline">Sign In</span>
                    </button>
                </Tooltip>
                <AuthPrompt
                    isOpen={showAuthPrompt}
                    onClose={() => setShowAuthPrompt(false)}
                />
            </>
        );
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="relative" ref={menuRef}>
            <Tooltip content="User account menu" position="bottom">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-primary-500/20 
                        text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 
                        transition-all duration-300 hover:scale-105"
                    aria-label="User menu"
                    aria-expanded={isOpen}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 
                    flex items-center justify-center text-white text-sm font-semibold">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            getInitials(user?.name || user?.email || 'U')
                        )}
                    </div>
                    <span className="hidden md:inline font-medium max-w-[120px] truncate">
                        {user?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </Tooltip>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden
                    bg-white dark:bg-dark-bg-300 
                    border border-gray-200 dark:border-gray-700
                    shadow-2xl shadow-black/20
                    animate-scale-in z-[70]">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700
                        bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 
                                flex items-center justify-center text-white font-semibold">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    getInitials(user?.name || user?.email || 'U')
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-light-text-primary dark:text-dark-text-primary truncate">
                                    {user?.name || 'User'}
                                </p>
                                <p className="text-xs text-light-text-muted dark:text-dark-text-muted truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {(user?.isAdmin || user?.role === 'admin') && (
                            <Link
                                to="/admin/chat"
                                className="flex items-center gap-3 px-4 py-2.5 text-sm
                                    text-light-text-secondary dark:text-dark-text-secondary
                                    hover:bg-primary-500/10 hover:text-primary-500
                                    transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Admin Chat</span>
                            </Link>
                        )}

                        <a
                            href="https://app.costkatana.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm
                                text-light-text-secondary dark:text-dark-text-secondary
                                hover:bg-primary-500/10 hover:text-primary-500
                                transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Go to Cost Katana App</span>
                        </a>

                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                                text-light-text-secondary dark:text-dark-text-secondary
                                hover:bg-danger-500/10 hover:text-danger-500
                                transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

