import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "./CalendarPart.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../../Store/store";
import { fetchDoctorAppointments } from "../../../../../../features/DoctorPageSlice/doctorPageSlice";
import type { Doctor } from "../../../../../../features/SignInSignUpSlice/DoctorSlice";

dayjs.extend(utc);


const CalendarPart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { appointments, error } = useSelector(
    (state: RootState) => state.doctorPage
  );

  const userData = useSelector((state: RootState) => state.userSlice.data);
    const userRole = useSelector((state: RootState) => state.userSlice.role);
  
    const doctor =
      userData && userRole === "doctor" && "doc_id" in userData
        ? (userData as Doctor)
        : null;
  
    const DOCTOR_ID = doctor?.doc_id;
  
    useEffect(() => {
      if (typeof DOCTOR_ID === "string") {
        dispatch(fetchDoctorAppointments(DOCTOR_ID));
      }
    }, [dispatch, DOCTOR_ID]);
  
    if (!doctor) {
      return null;
    }
  

  const statusColorMap: Record<string, BadgeProps["status"]> = {
    visited: "success",
    scheduled: "processing",
    unknown: "default",
  };

  const firstAppointmentDate = appointments.length
    ? dayjs.utc(appointments[0].date).local()
    : dayjs();

  const getListData = (value: Dayjs) => {
    return appointments
      .filter((apt) => {
        if (!apt?.date) return false;
        const aptDate = dayjs.utc(apt.date).local();
        return aptDate.isSame(value, "day");
      })
      .map((apt) => {
        const badgeStatus =
          statusColorMap[apt.status?.toLowerCase()] || "default";

        return {
          type: badgeStatus,
          content: `${dayjs.utc(apt.date).local().format("HH:mm")} - ${
            apt.patientName ?? "Unknown"
          }`,
          status: apt.status?.toLowerCase() ?? "unknown",
        };
      });
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    const appointmentCount = listData.filter(
      (item) => item.status === "scheduled"
    ).length;

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
      {error && <div className="error-message">{error}</div>}
      <Calendar cellRender={cellRender} defaultValue={firstAppointmentDate} />
    </div>
  );
};

export default CalendarPart;
