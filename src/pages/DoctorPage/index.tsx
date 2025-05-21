import LeftPanel from "./components/LeftPanel";
import "./DoctorPage.css";

const DoctorPage = () => {
  return (
    <div className="doctorPage-container">
      <div className="doctorPage-content">
        <LeftPanel />
        <div>Right side</div>
      </div>
    </div>
  );
};

export default DoctorPage;
