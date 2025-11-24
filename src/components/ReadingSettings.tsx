import React from 'react';
import { X, Type, AlignLeft, Eye, Clock } from 'lucide-react';
import { useReading } from '../contexts/ReadingContext';

interface ReadingSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReadingSettings: React.FC<ReadingSettingsProps> = ({ isOpen, onClose }) => {
    const {
        settings,
        setFontSize,
        setFontFamily,
        setLineSpacing,
        toggleReadingProgress,
        toggleReadingTime
    } = useReading();

    if (!isOpen) return null;

    const fontSizeOptions = [
        { value: 'small' as const, label: 'Small', class: 'text-sm' },
        { value: 'medium' as const, label: 'Medium', class: 'text-base' },
        { value: 'large' as const, label: 'Large', class: 'text-lg' },
        { value: 'xlarge' as const, label: 'Extra Large', class: 'text-xl' },
    ];

    const fontFamilyOptions = [
        { value: 'default' as const, label: 'Default', class: 'font-body' },
        { value: 'serif' as const, label: 'Serif', class: 'font-serif' },
        { value: 'mono' as const, label: 'Monospace', class: 'font-mono' },
    ];

    const lineSpacingOptions = [
        { value: 'tight' as const, label: 'Tight', class: 'leading-tight' },
        { value: 'normal' as const, label: 'Normal', class: 'leading-normal' },
        { value: 'relaxed' as const, label: 'Relaxed', class: 'leading-relaxed' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md glass rounded-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Type className="w-6 h-6 text-primary-500" />
                        <h2 className="text-xl font-display font-semibold gradient-text">
                            Reading Settings
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-primary-500/20 transition-colors duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Font Size */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
                        <Type className="w-4 h-4" />
                        Font Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {fontSizeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFontSize(option.value)}
                                className={`p-3 rounded-xl border transition-all duration-200 ${
                                    settings.fontSize === option.value
                                        ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                        : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                }`}
                            >
                                <span className={`${option.class} font-medium`}>
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Font Family */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
                        <Type className="w-4 h-4" />
                        Font Family
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {fontFamilyOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFontFamily(option.value)}
                                className={`p-3 rounded-xl border transition-all duration-200 ${
                                    settings.fontFamily === option.value
                                        ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                        : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                }`}
                            >
                                <span className={`${option.class} font-medium`}>
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Line Spacing */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-3">
                        <AlignLeft className="w-4 h-4" />
                        Line Spacing
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {lineSpacingOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setLineSpacing(option.value)}
                                className={`p-3 rounded-xl border transition-all duration-200 ${
                                    settings.lineSpacing === option.value
                                        ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                        : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                }`}
                            >
                                <span className={`${option.class} font-medium`}>
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Display Options */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        <Eye className="w-4 h-4" />
                        Display Options
                    </label>

                    <div className="space-y-2">
                        <label className="flex items-center justify-between p-3 rounded-xl glass hover:bg-primary-500/10 transition-colors duration-200 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">Show reading progress</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.showReadingProgress}
                                onChange={toggleReadingProgress}
                                className="w-4 h-4 text-primary-500 bg-transparent border-primary-200 dark:border-primary-700 rounded focus:ring-primary-500 focus:ring-2"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 rounded-xl glass hover:bg-primary-500/10 transition-colors duration-200 cursor-pointer">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Show reading time</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.showReadingTime}
                                onChange={toggleReadingTime}
                                className="w-4 h-4 text-primary-500 bg-transparent border-primary-200 dark:border-primary-700 rounded focus:ring-primary-500 focus:ring-2"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingSettings;
