import { ConfigProvider, theme as antdTheme } from "antd";
import { createContext, useContext, useState, useEffect } from "react";
import { type ReactNode } from "react";
import { type ThemeConfig } from "antd";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", newValue.toString());
      return newValue;
    });
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const themeConfig: ThemeConfig = {
    algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorBgBase: darkMode ? "#141414" : "#ffffff",
      colorTextBase: darkMode ? "#ffffff" : "#000000",
    },
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
