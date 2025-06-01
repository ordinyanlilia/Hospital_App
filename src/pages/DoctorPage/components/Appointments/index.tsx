import "./Appointments.css";
import FilterBar from "./components/FilterBar";
import appointmentsBlueIcon from "../../Icons/appointmentBlue.png";
import AppointmentsList from "./components/AppointmentsList";

const Appointments: React.FC = () => {

  return (
    <div className="appointments-container">
      <div className="appointments-content">
        <div className="appointments-title">
          <img src={appointmentsBlueIcon} alt="Appointment icon" />
          <span>Appointments</span>
        </div>
        <FilterBar/>
        <AppointmentsList />
      </div>
    </div>
  );
};

export default Appointments;
