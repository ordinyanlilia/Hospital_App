import { NavLink } from "react-router-dom";
import "./LeftPanel.css";
import appointmentIcon from "../../Icons/appointments.png";
import calendarIcon from "../../Icons/calendar.png";
import sthetoscopeIcon from "../../Icons/stethoscope.png";
import logoutIcon from "../../Icons/logout.png";
// import homeIcon from "../../Icons/home-icon.png";
import userIcon from "../../Icons/user.png";
import {
  DOCTOR_APPOINTMENTS,
  DOCTOR_CALENDAR,
  DOCTOR_PROFILE,
} from "../../../../routes/paths";

const LeftPanel: React.FC = () => {
  return (
    <div className="leftPanel-container">
      {/* <img src={homeIcon} alt="Home icon" className="home-icon" /> */}
      <div className="logo-part">
        <span>HealthCare</span>
      </div>
      <div className="leftPanel-content">
        <div className="doctor-info-container">
          <div className="doctor-info-container-top">
            <div className="doctor-info-image">
              <img
                src={userIcon}
                alt="doctor's picture"
              />
            </div>
            <div className="doctor-info-text">
              <span>Dr. Strange</span>
              <span>Dentist</span>
            </div>
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
              <NavLink className="nav-button-logout" to="/doctor">
                <img
                  src={logoutIcon}
                  alt="logout icon"
                  className="nav-icon-logout"
                />
                <span>Log out</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
