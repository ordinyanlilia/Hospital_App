import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { setUser } from "./features/UserSlice";

const App = () => {
  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     dispatch(setUser(parsedUser));
  //   }
  // }, [dispatch]);
  return <RouterProvider router={router} />;
};

export default App;