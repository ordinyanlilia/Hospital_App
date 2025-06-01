import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "./AppointmentsList.css";
import scheduledIcon from "../../../../Icons/scheduled.png";
import visitedIcon from "../../../../Icons/visited.png";
import upcomingIcon from "../../../../Icons/upcoming.png";
import type { AppDispatch, RootState } from "../../../../../../Store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../../../../../features/DoctorPageSlice/doctorPageSlice";
import type { Doctor } from "../../../../../../features/SignInSignUpSlice/DoctorSlice";

dayjs.extend(utc);

const AppointmentsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { filteredAppointments, loading, error } = useSelector(
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

  return (
    <div className="appointments-list-container">
      <div className="appointments-list-content">
        {loading ? (
          <div className="message-container">
            <div className="loading-message">Loading appointments...</div>
          </div>
        ) : error ? (
          <div className="message-container">
            <div className="error-message">{error}</div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="message-container">
            <div className="no-results-message">No appointments found.</div>
          </div>
        ) : (
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
              {filteredAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment?.patientName}</td>
                  <td>
                    {dayjs
                      .utc(appointment.date)
                      .local()
                      .format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.notes}</td>
                  <td>
                    <div className="appointment-status">
                      <img
                        src={
                          appointment.status === "scheduled"
                            ? scheduledIcon
                            : appointment.status === "visited"
                            ? visitedIcon
                            : upcomingIcon
                        }
                        alt="status icon"
                      />
                      {appointment.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
