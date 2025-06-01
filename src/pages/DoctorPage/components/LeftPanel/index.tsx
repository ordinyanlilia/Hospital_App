import { NavLink } from "react-router-dom";
import "./LeftPanel.css";
import appointmentIcon from "../../Icons/appointments.png";
import calendarIcon from "../../Icons/calendar.png";
import sthetoscopeIcon from "../../Icons/stethoscope.png";
import logoutIcon from "../../Icons/logout.png";
import homeIcon from "../../Icons/home-icon.png";
import { DOCTOR_APPOINTMENTS, DOCTOR_CALENDAR, DOCTOR_PROFILE } from "../../../../routes/paths";

const LeftPanel: React.FC = () => {
  return (
    <div className="leftPanel-container">
      <img src={homeIcon} alt="Home icon" className="home-icon" />
      <div className="leftPanel-content">
        <div className="doctor-info-container">
          <div className="doctor-info-image">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*"
              alt="doctor's picture"
            />
          </div>
          <div className="doctor-info-text">
            <span>Dr. Strange</span>
            <span>Dentist</span>
          </div>
          <nav className="sidebar">
            <div className="sidebar-top">
              <NavLink to={DOCTOR_APPOINTMENTS} className="nav-button">
                <img src={appointmentIcon} alt="appointment icon" className="nav-icon-appointment"/>
                Appointments
              </NavLink>
              <NavLink  to={DOCTOR_CALENDAR} className="nav-button">
                <img src={calendarIcon} alt="calendar icon" className="nav-icon-calendar"/>
                Calendar
              </NavLink>
              <NavLink to={DOCTOR_PROFILE} className="nav-button">
                <img src={sthetoscopeIcon} alt="sthetoscope icon" className="nav-icon-sthetoscope"/>
                Profile
              </NavLink>
            </div>

            <div className="sidebar-bottom">
              <NavLink className="nav-button-logout" to="/doctor">
              <img src={logoutIcon} alt="logout icon" className="nav-icon-logout"/>
                Log out
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
