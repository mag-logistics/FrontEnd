import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext({
    isDay: false,
    toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
    const [isDay, setIsDay] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDart = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return savedTheme ? savedTheme === 'day' : !prefersDart;
    });

    useEffect(() => {
        if (isDay) {
            document.body.classList.add('day');
            document.body.classList.remove('night');
        } else {
            document.body.classList.add('night');
            document.body.classList.remove('day');
        }
    }, [isDay]);

    const toggleTheme = () => {
        setIsDay(prevState => !prevState);
    }

    return (
        <ThemeContext.Provider value={{isDay, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext);