import { Outlet } from "react-router-dom";
import "./DoctorPage.css";
import { useAppSelector } from "../../app/hooks";
import { selectUserData, selectUserRole } from "../../features/UserSlice";
import TopPanel from "./components/TopPanel";
import { useTranslate } from "../../context/TranslationProvider";
import OnikBot from "../../components/OnikBot";

interface CahtProp {
  showChatbot?: boolean;
}

const DoctorPage: React.FC<CahtProp> = ({ showChatbot = false }) => {
  const user = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);

  if (!user || userRole !== "doctor") {
    const { translate } = useTranslate();

    return (
      <div className="access-denied-container">
        <h2>{translate("accessDenied")}</h2>
        <p>{translate("deniedMessage")}</p>
      </div> 
    );
  }

  return (
    <>
      {showChatbot && <OnikBot />}
      <div className="doctorPage-container">
        <div className="doctorPage-content">
          <TopPanel />
          <div className="doctorPage-main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorPage;
