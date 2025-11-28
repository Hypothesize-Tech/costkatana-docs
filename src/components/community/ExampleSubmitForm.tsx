import React, { useState } from 'react';
import { X, Code, Send, Loader2, Tag } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';

interface ExampleSubmitFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES = [
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'integration', label: 'Integration' },
    { value: 'optimization', label: 'Optimization' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'gateway', label: 'Gateway' },
    { value: 'workflows', label: 'Workflows' },
    { value: 'other', label: 'Other' },
];

const LANGUAGES = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'other', label: 'Other' },
];

export const ExampleSubmitForm: React.FC<ExampleSubmitFormProps> = ({ onClose, onSuccess }) => {
    const { createExample } = useCommunity();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('typescript');
    const [category, setCategory] = useState('integration');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleAddTag = () => {
        const tag = tagInput.trim().toLowerCase();
        if (tag && !tags.includes(tag) && tags.length < 5) {
            setTags([...tags, tag]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !description.trim() || !code.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        const result = await createExample({
            title: title.trim(),
            description: description.trim(),
            code: code.trim(),
            language,
            category,
            tags,
        });

        setIsSubmitting(false);

        if (result) {
            onSuccess();
        } else {
            setError('Failed to submit example. Please try again.');
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl animate-scale-in
                    bg-white dark:bg-dark-bg-300 
                    border border-gray-200 dark:border-gray-700
                    shadow-2xl shadow-black/20"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 px-6 py-5 border-b border-gray-200 dark:border-gray-700
                    bg-white dark:bg-dark-bg-300
                    bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                            <Code className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                                Submit Example
                            </h3>
                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                Share your code with the community
                            </p>
                        </div>
                    </div>
                    <button
                        className="absolute top-4 right-4 p-2 rounded-xl 
                            text-light-text-muted dark:text-dark-text-muted
                            hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 rounded-xl bg-danger-500/10 text-danger-600 dark:text-danger-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Title <span className="text-danger-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                bg-white dark:bg-dark-bg-200
                                text-light-text-primary dark:text-dark-text-primary
                                placeholder-light-text-muted
                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                            placeholder="e.g., Optimizing API calls with Cost Katana"
                            maxLength={200}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Description <span className="text-danger-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                bg-white dark:bg-dark-bg-200
                                text-light-text-primary dark:text-dark-text-primary
                                placeholder-light-text-muted
                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                resize-none"
                            placeholder="Explain what this example does and when to use it..."
                            rows={3}
                            maxLength={2000}
                            required
                        />
                    </div>

                    {/* Language & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                Language
                            </label>
                            <select
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                    bg-white dark:bg-dark-bg-200
                                    text-light-text-primary dark:text-dark-text-primary
                                    focus:outline-none focus:border-primary-500"
                            >
                                {LANGUAGES.map(lang => (
                                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                    bg-white dark:bg-dark-bg-200
                                    text-light-text-primary dark:text-dark-text-primary
                                    focus:outline-none focus:border-primary-500"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Code <span className="text-danger-500">*</span>
                        </label>
                        <textarea
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                bg-gray-900 dark:bg-black
                                text-gray-100 font-mono text-sm
                                placeholder-gray-500
                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                resize-none"
                            placeholder="// Paste your code here..."
                            rows={10}
                            maxLength={50000}
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Tags <span className="text-light-text-muted font-normal">(up to 5)</span>
                        </label>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="relative flex-1">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text-muted" />
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTag();
                                        }
                                    }}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                        bg-white dark:bg-dark-bg-200
                                        text-light-text-primary dark:text-dark-text-primary
                                        placeholder-light-text-muted
                                        focus:outline-none focus:border-primary-500"
                                    placeholder="Add a tag..."
                                    disabled={tags.length >= 5}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddTag}
                                disabled={tags.length >= 5 || !tagInput.trim()}
                                className="px-4 py-2 rounded-xl font-medium
                                    text-primary-600 bg-primary-500/10 hover:bg-primary-500/20
                                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 px-3 py-1 rounded-lg
                                            bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-danger-500"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl
                            font-semibold text-white
                            bg-gradient-to-r from-primary-500 to-primary-600
                            hover:from-primary-600 hover:to-primary-700
                            shadow-lg shadow-primary-500/25
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Submit Example
                            </>
                        )}
                    </button>

                    <p className="text-xs text-center text-light-text-muted dark:text-dark-text-muted">
                        Your example will be reviewed before being published
                    </p>
                </form>
            </div>
        </div>
    );
};

