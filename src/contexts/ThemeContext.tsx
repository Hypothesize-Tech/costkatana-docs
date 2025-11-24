/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    highContrast: boolean;
    toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Get theme from localStorage or system preference
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) return savedTheme;

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    });

    const [highContrast, setHighContrast] = useState<boolean>(() => {
        // Get high contrast preference from localStorage
        const saved = localStorage.getItem("highContrast");
        if (saved !== null) return saved === "true";

        // Check system preference
        return window.matchMedia("(prefers-contrast: high)").matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        if (highContrast) {
            root.classList.add("high-contrast");
        } else {
            root.classList.remove("high-contrast");
        }
        localStorage.setItem("highContrast", String(highContrast));
    }, [highContrast]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const toggleHighContrast = () => {
        setHighContrast((prev) => !prev);
    };

    const value = {
        theme,
        toggleTheme,
        setTheme,
        highContrast,
        toggleHighContrast,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

