import "./Appointments.css";
import FilterBar from "./components/FilterBar";
import appointmentsBlueIcon from "../../Icons/appointmentBlue.png";
import AppointmentsList from "./components/AppointmentsList";
import { useState } from "react";

const Appointments: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setStatusFilter(value);
  };

  return (
    <div className="appointments-container">
      <div className="appointments-content">
        <div className="appointments-title">
          <img src={appointmentsBlueIcon} alt="Appointment icon" />
          <span>Appointments</span>
        </div>
        <FilterBar
          setSearchValue={setSearchValue}
          setStatusFilter={setStatusFilter}
          onSearch={handleSearch}
        />
        <AppointmentsList
          searchValue={searchValue}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
};

export default Appointments;
