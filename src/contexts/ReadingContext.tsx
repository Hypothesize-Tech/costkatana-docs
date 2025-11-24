import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReadingSettings {
    isReadingMode: boolean;
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    fontFamily: 'default' | 'serif' | 'mono';
    lineSpacing: 'tight' | 'normal' | 'relaxed';
    showReadingProgress: boolean;
    showReadingTime: boolean;
}

interface ReadingContextType {
    settings: ReadingSettings;
    toggleReadingMode: () => void;
    setFontSize: (size: ReadingSettings['fontSize']) => void;
    setFontFamily: (family: ReadingSettings['fontFamily']) => void;
    setLineSpacing: (spacing: ReadingSettings['lineSpacing']) => void;
    toggleReadingProgress: () => void;
    toggleReadingTime: () => void;
    getReadingPosition: (pagePath: string) => number;
    saveReadingPosition: (pagePath: string, position: number) => void;
    estimateReadingTime: (text: string) => number;
}

const defaultSettings: ReadingSettings = {
    isReadingMode: false,
    fontSize: 'medium',
    fontFamily: 'default',
    lineSpacing: 'normal',
    showReadingProgress: true,
    showReadingTime: true,
};

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const useReading = () => {
    const context = useContext(ReadingContext);
    if (!context) {
        throw new Error('useReading must be used within a ReadingProvider');
    }
    return context;
};

interface ReadingProviderProps {
    children: React.ReactNode;
}

export const ReadingProvider: React.FC<ReadingProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<ReadingSettings>(() => {
        // Load from localStorage
        const saved = localStorage.getItem('reading-settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    });

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('reading-settings', JSON.stringify(settings));
    }, [settings]);

    const toggleReadingMode = () => {
        setSettings(prev => ({ ...prev, isReadingMode: !prev.isReadingMode }));
    };

    const setFontSize = (fontSize: ReadingSettings['fontSize']) => {
        setSettings(prev => ({ ...prev, fontSize }));
    };

    const setFontFamily = (fontFamily: ReadingSettings['fontFamily']) => {
        setSettings(prev => ({ ...prev, fontFamily }));
    };

    const setLineSpacing = (lineSpacing: ReadingSettings['lineSpacing']) => {
        setSettings(prev => ({ ...prev, lineSpacing }));
    };

    const toggleReadingProgress = () => {
        setSettings(prev => ({ ...prev, showReadingProgress: !prev.showReadingProgress }));
    };

    const toggleReadingTime = () => {
        setSettings(prev => ({ ...prev, showReadingTime: !prev.showReadingTime }));
    };

    const getReadingPosition = (pagePath: string): number => {
        const saved = localStorage.getItem(`reading-position-${pagePath}`);
        return saved ? parseInt(saved, 10) : 0;
    };

    const saveReadingPosition = (pagePath: string, position: number) => {
        localStorage.setItem(`reading-position-${pagePath}`, position.toString());
    };

    const estimateReadingTime = (text: string): number => {
        // Average reading speed: 200-250 words per minute
        const wordsPerMinute = 220;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        // Minimum reading time of 1 minute
        return Math.max(1, readingTime);
    };

    const value: ReadingContextType = {
        settings,
        toggleReadingMode,
        setFontSize,
        setFontFamily,
        setLineSpacing,
        toggleReadingProgress,
        toggleReadingTime,
        getReadingPosition,
        saveReadingPosition,
        estimateReadingTime,
    };

    return (
        <ReadingContext.Provider value={value}>
            {children}
        </ReadingContext.Provider>
    );
};
