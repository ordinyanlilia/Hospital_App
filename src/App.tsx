// App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AuthLoader from "./pages/Auth/AuthLoader";

const App = () => {
  return (
    <AuthLoader>
      <RouterProvider router={router} />
      
    </AuthLoader>
  );
};

export default App;