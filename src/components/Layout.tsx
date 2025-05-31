import { type ReactNode } from "react";
import HeaderComponent from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <HeaderComponent />
      <main style={{ padding: "24px" }}>{children}</main>
    </div>
  );
};
