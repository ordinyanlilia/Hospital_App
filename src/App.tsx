import {RouterProvider} from "react-router-dom";
import {router} from "./routes/routes";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

const App = () => {
    return <Provider store={store}><RouterProvider router={router}/></Provider>;
};

export default App;