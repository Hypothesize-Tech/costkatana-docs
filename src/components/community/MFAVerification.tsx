import React, { useState, useEffect } from 'react';
import { Shield, Mail, Smartphone, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';

interface MFAVerificationProps {
    mfaToken: string;
    userId: string;
    availableMethods: string[];
    email?: string;
    onBack: () => void;
    onSuccess: () => void;
}

export const MFAVerification: React.FC<MFAVerificationProps> = ({
    mfaToken,
    userId,
    availableMethods,
    email,
    onBack,
    onSuccess,
}) => {
    const { verifyMFA, isLoading } = useCommunity();
    const [method, setMethod] = useState<string>(availableMethods[0] || 'email');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Set code sent to true when email method is selected (backend sends code automatically)
    useEffect(() => {
        if (method === 'email' && !codeSent && availableMethods.includes('email')) {
            setCodeSent(true);
            setCountdown(60); // 60 second countdown before allowing resend
        }
    }, [method, codeSent, availableMethods]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const sendEmailCode = async () => {
        try {
            // Note: The backend automatically sends email code when MFA is required during login
            // This function is for resending codes (would need API endpoint)
            setCodeSent(true);
            setCountdown(60); // 60 second countdown
        } catch (err) {
            setError('Failed to send verification code');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!code.trim()) {
            setError('Please enter the verification code');
            return;
        }

        const success = await verifyMFA(mfaToken, method, code);
        if (success) {
            onSuccess();
        } else {
            setError('Invalid verification code. Please try again.');
            setCode('');
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;
        setError('');
        setCode('');
        setCodeSent(false);
        if (method === 'email') {
            await sendEmailCode();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 mb-4">
                    <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Two-Factor Authentication
                </h3>
                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                    {method === 'email'
                        ? `Enter the verification code sent to ${email || 'your email'}`
                        : 'Enter the code from your authenticator app'}
                </p>
            </div>

            {/* Method Selection */}
            {availableMethods.length > 1 && (
                <div className="flex gap-2 p-1 rounded-xl bg-gray-100 dark:bg-dark-bg-200">
                    {availableMethods.includes('email') && (
                        <button
                            type="button"
                            onClick={() => {
                                setMethod('email');
                                setCode('');
                                setError('');
                                setCodeSent(false);
                            }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${method === 'email'
                                ? 'bg-white dark:bg-dark-bg-300 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary'
                                }`}
                        >
                            <Mail className="w-4 h-4" />
                            Email
                        </button>
                    )}
                    {availableMethods.includes('totp') && (
                        <button
                            type="button"
                            onClick={() => {
                                setMethod('totp');
                                setCode('');
                                setError('');
                            }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${method === 'totp'
                                ? 'bg-white dark:bg-dark-bg-300 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary'
                                }`}
                        >
                            <Smartphone className="w-4 h-4" />
                            Authenticator
                        </button>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-danger-500/10 text-danger-600 dark:text-danger-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}

            {/* Success Message for Email */}
            {codeSent && method === 'email' && !error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-success-500/10 text-success-600 dark:text-success-400 text-sm">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Verification code sent! Check your email.
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Verification Code
                    </label>
                    <input
                        type="text"
                        value={code}
                        onChange={e => {
                            setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                            bg-white dark:bg-dark-bg-200
                            text-light-text-primary dark:text-dark-text-primary text-center text-2xl font-mono tracking-widest
                            placeholder-light-text-muted dark:placeholder-dark-text-muted
                            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                            transition-all duration-200"
                        placeholder="000000"
                        maxLength={6}
                        required
                        autoFocus
                    />
                    <p className="mt-2 text-xs text-light-text-muted dark:text-dark-text-muted text-center">
                        {method === 'email'
                            ? 'Enter the 6-digit code from your email'
                            : 'Enter the 6-digit code from your authenticator app'}
                    </p>
                </div>

                {/* Resend Code (Email only) */}
                {method === 'email' && (
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={countdown > 0 || isLoading}
                            className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !code.trim() || code.length < 6}
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
                            Verifying...
                        </>
                    ) : (
                        <>
                            <Shield className="w-5 h-5" />
                            Verify
                        </>
                    )}
                </button>
            </form>

            {/* Back Button */}
            <button
                type="button"
                onClick={onBack}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                    font-medium text-light-text-secondary dark:text-dark-text-secondary
                    hover:bg-gray-100 dark:hover:bg-dark-bg-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to login
            </button>
        </div>
    );
};

