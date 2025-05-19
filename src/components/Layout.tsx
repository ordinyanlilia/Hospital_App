import { ReactNode } from "react";
import HeaderComponent from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
      {children}
      </main>
    </>
  );
};