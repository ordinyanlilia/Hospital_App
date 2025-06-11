import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "./CalendarPart.css";
import { useAppSelector } from "../../../../../../app/hooks";
import { selectAppointments } from "../../../../../../features/appointments/appointmentsSlice";
import { useTranslate } from "../../../../../../context/TranslationProvider";

dayjs.extend(utc);

const CalendarPart: React.FC = () => {
  const appointments = useAppSelector(selectAppointments);
  const { translate } = useTranslate();
  
  const statusColorMap: Record<string, BadgeProps["status"]> = {
  visited: "success",
  scheduled: "processing",
  canceled: "error",
  unknown: "default",
};

  const firstAppointmentDate = appointments.length
    ? dayjs.utc(appointments[0].startTime).local()
    : dayjs();

  const getListData = (value: Dayjs) => {
    return appointments
      .filter((apt) => {
        if (!apt?.startTime) return false;
        const aptDate = dayjs.utc(apt.startTime).local();
        return aptDate.isSame(value, "day");
      })
      .map((apt) => {
        const badgeStatus =
          statusColorMap[apt.status?.toLowerCase()] || "default";

        return {
          type: badgeStatus,
          content: `${dayjs.utc(apt.startTime).local().format("HH:mm")} - ${
            apt.patientName ?? translate("unknownPatient")
          }`,
          status: apt.status?.toLowerCase() ?? "unknown",
        };
      });
  };

  const dateCellRender = (value: Dayjs) => {
  const listData = getListData(value);

  const counts = {
    scheduled: 0,
    visited: 0,
    canceled: 0,
  };

  listData.forEach((item) => {
    if (item.status === "scheduled") counts.scheduled++;
    else if (item.status === "visited") counts.visited++;
    else if (item.status === "canceled") counts.canceled++;
  });

  return (
    <div className="custom-day-cell">
      <div className="appointment-count">
        {counts.scheduled > 0 && (
          <span className="count-badge scheduled">{counts.scheduled}</span>
        )}
        {counts.visited > 0 && (
          <span className="count-badge visited">{counts.visited}</span>
        )}
        {counts.canceled > 0 && (
          <span className="count-badge canceled">{counts.canceled}</span>
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
      <Calendar cellRender={cellRender} defaultValue={firstAppointmentDate} />
    </div>
  );
};

export default CalendarPart;
