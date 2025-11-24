import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TOCContextType {
    content: string;
    setContent: (content: string) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export const TOCProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<string>('');

    return (
        <TOCContext.Provider value={{ content, setContent }}>
            {children}
        </TOCContext.Provider>
    );
};

export const useTOC = () => {
    const context = useContext(TOCContext);
    if (!context) {
        throw new Error('useTOC must be used within a TOCProvider');
    }
    return context;
};

