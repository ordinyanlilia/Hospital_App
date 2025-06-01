import { type ReactNode } from "react";
import HeaderComponent from "./Header";
import { useTheme } from "../context/theme-context";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={
        darkMode
          ? "layout-container dark-theme"
          : "layout-container light-theme"
      }
    >
      <HeaderComponent />
      <main style={{ padding: "24px" }}>{children}</main>
    </div>
  );
};
