import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import { store } from "./store/store";
import { ThemeProvider } from "./context/theme-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        {" "}
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
