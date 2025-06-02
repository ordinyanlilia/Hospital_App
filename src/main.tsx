import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import {store} from "./app/store.ts";
import {ThemeProvider} from "./context/theme-context.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
        </Provider>
    </StrictMode>
);


