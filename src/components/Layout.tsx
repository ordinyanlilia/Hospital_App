import { type ReactNode } from "react";
import HeaderComponent from "./Header";
import { useTheme } from "../context/theme-context";
import OnikBot from "./OnikBot";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showChatbot?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showChatbot = false }) => {
  const { darkMode } = useTheme();
  console.log("Chatbot visible:", showChatbot);

  return (
    <div
      className={
        darkMode
          ? "layout-container dark-theme"
          : "layout-container light-theme"
      }
    >
      <HeaderComponent />
      <main style={{ padding: "80px" }}>
        {children}
      </main>
      {showChatbot && <OnikBot />}
      <Footer />
    </div>
  );
};
