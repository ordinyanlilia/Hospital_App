import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import {store} from "./app/store.ts";
import {ThemeProvider} from "./context/theme-context.tsx";
import { TranslationProvider } from "./context/TranslationProvider";



createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
                <TranslationProvider>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </TranslationProvider>
        </Provider>
    </StrictMode>
);