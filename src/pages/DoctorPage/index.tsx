import { Outlet } from "react-router-dom";
import LeftPanel from "./components/LeftPanel";
import "./DoctorPage.css";

const DoctorPage = () => {
  return (
    <div className="doctorPage-container">
      <div className="doctorPage-content">
        <LeftPanel />
        <div className="doctorPage-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
