import {RouterProvider} from "react-router-dom";
import {router} from "./routes/routes";
import OnikBot from "./components/OnikBot";
import AuthLoader from "./pages/Auth/AuthLoader";


const App = () => {
    return (
        <>
            <AuthLoader>
                <RouterProvider router={router}/>
                <OnikBot/>
            </AuthLoader>
        </>
    );
};

export default App;