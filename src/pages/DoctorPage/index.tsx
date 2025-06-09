import { Outlet } from "react-router-dom";
import "./DoctorPage.css";
import { useAppSelector } from "../../app/hooks";
import { selectUserData, selectUserRole } from "../../features/UserSlice";
import TopPanel from "./components/TopPanel";

const DoctorPage = () => {
  const user = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);

  if (!user || userRole !== "doctor") {
    return (
      <div className="access-denied-container">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="doctorPage-container">
      <div className="doctorPage-content">
        <TopPanel />
        <div className="doctorPage-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
