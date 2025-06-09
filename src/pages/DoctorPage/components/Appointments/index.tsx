import "./Appointments.css";
import FilterBar from "./components/FilterBar";
import AppointmentsList from "./components/AppointmentsList";
import { useState } from "react";

const Appointments: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <div className="appointments-container">
      <div className="appointments-content">
        <FilterBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
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
