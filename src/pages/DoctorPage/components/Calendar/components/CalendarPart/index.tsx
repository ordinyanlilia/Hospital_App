import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../services/apiService";
import dayjs from "dayjs";
import type { Timestamp } from "firebase/firestore";
import "./CalendarPart.css";

const CalendarPart: React.FC = () => {
  type Appointment = {
    doc_id?: string;
    patientId: string;
    date: Timestamp;
    reason: string;
    patientName: string;
  };

  type Patient = {
    doc_id: string;
    name: string;
    id: string;
    appointments?: string[];
  };

  const [appointments, setAppointment] = useState<Appointment[]>([]);

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

  const getListData = (value: Dayjs) => {
    return appointments
      .filter((apt) => dayjs(apt.date.toDate()).isSame(value, "day"))
      .map((apt) => ({
        type: "success" as BadgeProps["status"],
        content: `${dayjs(apt.date.toDate()).format("HH:mm")} - ${
          apt.patientName
        }`,
      }));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    const appointmentCount = listData.length;

    return (
      <div className="custom-day-cell">
        <div className="appointment-count">
          {appointmentCount > 0 && (
            <span className="count-badge">{appointmentCount}</span>
          )}
        </div>
        <ul className="events">
          {listData.map((item, idx) => (
            <li key={idx}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return (
    <div className="calendar-wrapper">
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default CalendarPart;
