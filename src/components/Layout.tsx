import { type ReactNode } from "react";
import HeaderComponent from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main style={{padding: "80px"}}>
      {children}
      </main>
      <Footer />
    </>
  );
};