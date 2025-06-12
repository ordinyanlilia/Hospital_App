import { useLocation } from "react-router-dom";
import OnikBot from "./OnikBot";

const HIDDEN_ROUTES = [
  "/doctor",
  "/doctorpage", 
  "/login",
  "/signup",
  "/admin"
];

const OnikBotWrapper = () => {
  const location = useLocation();

  // Check if current route should hide the bot
  const shouldHide = HIDDEN_ROUTES.some(path => 
    location.pathname.startsWith(path)
  );

  if (shouldHide) return null;

  return <OnikBot />;
};

export default OnikBotWrapper;