import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserData } from "../../features/UserSlice";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const userData = useAppSelector(selectUserData);

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return children;
  return <>{children}</>;
};

export default PrivateRoute;