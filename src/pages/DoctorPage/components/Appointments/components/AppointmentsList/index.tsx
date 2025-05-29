import { useEffect, useState } from "react";
import "./AppointmentsList.css";
import { fetchData } from "../../../../../../services/apiService";
import type { Timestamp } from "firebase/firestore";
import scheduledIcon from "../../../../Icons/scheduled.png";
import visitedIcon from "../../../../Icons/visited.png";
import upcomingIcon from "../../../../Icons/upcoming.png";

type FilterBarProps = {
  searchValue: string;
  statusFilter: string;
};

const AppointmentsList: React.FC<FilterBarProps> = ({
  searchValue,
  statusFilter,
}) => {
  type Appointment = {
    doc_id?: string;
    id: string;
    patientId: string;
    doctorId: string;
    date: Timestamp;
    reason: string;
    notes: string;
    status: string;
    patientName?: string;
  };

  type Patient = {
    doc_id: string;
    name: string;
    id: string;
    appointments?: string[];
  };

  const [appointments, setAppointment] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);

  useEffect(() => {
    const getPatients = async (): Promise<Patient[]> => {
      try {
        const patients = await fetchData("patients");
        return patients as Patient[];
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    const getAppointments = async () => {
      try {
        const data = (await fetchData("appointments")) as Appointment[];
        const patientsData = await getPatients();

        const finalAppointments = data.map((appointment): Appointment => {
          const patient = appointment.doc_id
            ? patientsData.find((p) =>
                p.appointments?.includes(appointment.doc_id!)
              )
            : undefined;

          return {
            ...appointment,
            patientName: patient ? patient.name : "unknown",
          };
        });

        setAppointment(finalAppointments as Appointment[]);
      } catch (error) {
        console.log("Error fetching appointments", error);
      }
    };

    getAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const matchesName = appointment.patientName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesName && matchesStatus;
    });

    setFilteredAppointments(filtered);
  }, [searchValue, statusFilter, appointments]);
  

  return (
    <div className="appointments-list-container">
      <div className="appointments-list-content">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>DATE AND TIME</th>
              <th>REASON</th>
              <th>NOTES</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => appointment.doctorId === '1' ? (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>
                  {appointment.date.toDate().toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{appointment.reason}</td>
                <td>{appointment.notes}</td>
                <td>
                  {appointment.status === "scheduled" ? (
                    <div className="appointment-status">
                      <img src={scheduledIcon} alt="Calendar icon" />{" "}
                      {appointment.status}
                    </div>
                  ) : appointment.status === "visited" ? (
                    <div className="appointment-status">
                      <img src={visitedIcon} alt="Confirmed icon" />{" "}
                      {appointment.status}
                    </div>
                  ) : (
                    <div className="appointment-status">
                      <img src={upcomingIcon} alt="Watch icon" />{" "}
                      {appointment.status}
                    </div>
                  )}
                </td>
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsList;
