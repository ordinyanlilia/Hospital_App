import {RouterProvider} from "react-router-dom";
import {router} from "./routes/routes";
import OnikBot from "./components/OnikBot";
import AuthLoader from "./pages/Auth/AuthLoader";
import { TranslationProvider } from "./context/TranslationProvider";


const App = () => {
    return (
        <>
            <TranslationProvider>
                <AuthLoader>
                    <RouterProvider router={router}/>
                    <OnikBot/>
                </AuthLoader>
            </TranslationProvider>
        </>
    );
};

export default App;