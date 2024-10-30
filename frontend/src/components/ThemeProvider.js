// components/ThemeProvider.js
import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const root = window.document.documentElement;
        const initialTheme = localStorage.getItem("theme") || "light";
        setTheme(initialTheme);
        root.classList.add(initialTheme);
    }, []);

    const toggleTheme = () => {
        const root = window.document.documentElement;
        const newTheme = theme === "dark" ? "light" : "dark";
        root.classList.remove(theme);
        root.classList.add(newTheme);
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
