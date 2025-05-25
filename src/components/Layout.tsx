import type { ReactNode } from "react";
import HeaderComponent from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main style={{ margin: '0 auto', padding: '80px' }}>
      {children}
      </main>
    </>
  );
};