import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { MFAVerification } from './MFAVerification';

interface AuthPromptProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export const AuthPrompt: React.FC<AuthPromptProps> = ({ isOpen, onClose, message }) => {
    const { login, register, isLoading } = useCommunity();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mfaData, setMfaData] = useState<{
        mfaToken: string;
        userId: string;
        availableMethods: string[];
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mode === 'login') {
            const result = await login(email, password);

            // Check if MFA is required
            if (result && typeof result === 'object' && 'requiresMFA' in result && result.requiresMFA) {
                setMfaData({
                    mfaToken: result.mfaToken,
                    userId: result.userId,
                    availableMethods: result.availableMethods,
                });
                return;
            }

            // Normal login success
            if (result === true) {
                onClose();
                setEmail('');
                setPassword('');
                setName('');
                setMfaData(null);
            } else {
                setError('Invalid email or password');
            }
        } else {
            if (!name.trim()) {
                setError('Name is required');
                return;
            }
            const success = await register(name, email, password);
            if (success) {
                onClose();
                setEmail('');
                setPassword('');
                setName('');
                setMfaData(null);
            } else {
                setError('Registration failed. Email may already be in use.');
            }
        }
    };

    const handleMFASuccess = () => {
        onClose();
        setEmail('');
        setPassword('');
        setName('');
        setMfaData(null);
    };

    const handleMFABack = () => {
        setMfaData(null);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-3xl overflow-hidden animate-scale-in
                    bg-white dark:bg-dark-bg-300 
                    border border-gray-200 dark:border-gray-700
                    shadow-2xl shadow-black/20"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative px-6 py-5 border-b border-gray-200 dark:border-gray-700
                    bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                            {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                            </h3>
                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                {message || 'Join the community to participate'}
                            </p>
                        </div>
                    </div>
                    <button
                        className="absolute top-4 right-4 p-2 rounded-xl 
                            text-light-text-muted dark:text-dark-text-muted
                            hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {mfaData ? (
                        <MFAVerification
                            mfaToken={mfaData.mfaToken}
                            userId={mfaData.userId}
                            availableMethods={mfaData.availableMethods}
                            email={email}
                            onBack={handleMFABack}
                            onSuccess={handleMFASuccess}
                        />
                    ) : (
                        <>
                            {error && (
                                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-danger-500/10 text-danger-600 dark:text-danger-400 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {mode === 'register' && (
                                    <div>
                                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                            bg-white dark:bg-dark-bg-200
                                            text-light-text-primary dark:text-dark-text-primary
                                            placeholder-light-text-muted dark:placeholder-dark-text-muted
                                            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                            transition-all duration-200"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                        bg-white dark:bg-dark-bg-200
                                        text-light-text-primary dark:text-dark-text-primary
                                        placeholder-light-text-muted dark:placeholder-dark-text-muted
                                        focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                        transition-all duration-200"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                        bg-white dark:bg-dark-bg-200
                                        text-light-text-primary dark:text-dark-text-primary
                                        placeholder-light-text-muted dark:placeholder-dark-text-muted
                                        focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                        transition-all duration-200"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl
                                font-semibold text-white
                                bg-gradient-to-r from-primary-500 to-primary-600
                                hover:from-primary-600 hover:to-primary-700
                                shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                                        </>
                                    ) : (
                                        <>
                                            {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMode(mode === 'login' ? 'register' : 'login');
                                            setError('');
                                        }}
                                        className="ml-1 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                                    >
                                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

