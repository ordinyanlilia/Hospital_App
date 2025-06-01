import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import OnikBot from "./components/OnikBot";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <OnikBot />
    </>
  );
};

export default App;