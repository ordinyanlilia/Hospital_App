import { NavLink, useNavigate } from "react-router-dom";
import "./LeftPanel.css";
import appointmentIcon from "../../Icons/appointments.png";
import calendarIcon from "../../Icons/calendar.png";
import sthetoscopeIcon from "../../Icons/stethoscope.png";
import logoutIcon from "../../Icons/logout.png";
import homeIcon from "../../Icons/home-button.png";
// import userIcon from "../../Icons/user.png";
import {
  DOCTOR_APPOINTMENTS,
  DOCTOR_CALENDAR,
  DOCTOR_PROFILE,
  HOME_PAGE,
} from "../../../../routes/paths";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import type { Doctor } from "../../../../features/DoctorSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { clearUser } from "../../../../features/UserSlice";

const LeftPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userSlice.data);
  const userRole = useSelector((state: RootState) => state.userSlice.role);

  const doctor =
    userData && userRole === "doctor" && "id" in userData
      ? (userData as Doctor)
      : null;

  if (!doctor) {
    return null;
  }

  const handleClickLogout = () => {
    dispatch(clearUser());
    navigate("/login");
    localStorage.removeItem("authToken");
  };

  return (
    <div className="leftPanel-container">
      <NavLink to={HOME_PAGE}>
        <img src={homeIcon} alt="Home icon" className="home-icon" />
      </NavLink>
      <div className="leftPanel-content">
        <div className="doctor-info-container">
          <div className="doctor-info-container-top">
            <div className="doctor-info-image">
              <img
                src="https://res.cloudinary.com/healthcareintern/image/upload/v1748773724/15.jpg"
                alt="doctor's picture"
              />
            </div>
            {/* <div className="doctor-info-text">
              <span>{doctor1.name}</span>
              <span>{doctor1.specialty}</span>
            </div> */}
          </div>

          <nav className="sidebar">
            <div className="sidebar-top">
              <NavLink to={DOCTOR_APPOINTMENTS} className="nav-button">
                <img
                  src={appointmentIcon}
                  alt="appointment icon"
                  className="nav-icon-appointment"
                />
                <span>Appointments</span>
              </NavLink>
              <NavLink to={DOCTOR_CALENDAR} className="nav-button">
                <img
                  src={calendarIcon}
                  alt="calendar icon"
                  className="nav-icon-calendar"
                />
                <span>Calendar</span>
              </NavLink>
              <NavLink to={DOCTOR_PROFILE} className="nav-button">
                <img
                  src={sthetoscopeIcon}
                  alt="sthetoscope icon"
                  className="nav-icon-sthetoscope"
                />
                <span>Profile</span>
              </NavLink>
            </div>

            <div className="sidebar-bottom">
              <div
                className="nav-button-logout"
                onClick={() => handleClickLogout()}
              >
                <img
                  src={logoutIcon}
                  alt="logout icon"
                  className="nav-icon-logout"
                />
                <span>Log out</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
