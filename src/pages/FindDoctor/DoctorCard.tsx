import { Button } from "antd";
import {
  MedicineBoxOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./DoctorCard.css";
import BookAppointment from "../BookAppointment/BookAppointment";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Doctor = {
  id?: string;
  name?: string;
  surname?: string;
  specialty?: string;
  photoUrl?: string;
  gender?: string;
  email?: string;
  doc_id?: string;
  yearsOfExperience?: number;
  bio?: string;
};

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="doctor-card-horizontal">
      <img
        src={
          doctor.photoUrl ||
          "https://res.cloudinary.com/healthcareintern/image/upload/v1748634566/59e12228-35cd-4554-956a-7dec683aa497_fbfgrc.png"
        }
        alt={doctor.name}
        className="doctor-card-avatar"
      />

      <div className="doctor-card-content">
        <div className="doctor-card-info">
          <h3>
            {doctor.name} {doctor.surname}
          </h3>
          <p>
            <MedicineBoxOutlined /> {doctor.specialty}
          </p>
          <p>
            <CalendarOutlined /> {doctor.yearsOfExperience} years
          </p>
          <p>
            <UserOutlined /> {doctor.gender}
          </p>
          {/* <p className="bio">{doctor.bio}</p> */}
        </div>

        <div className="doctor-card-buttons">
          <Button type="primary">Doctor Profile</Button>
          <Button
            key={doctor.id}
            onClick={() => navigate(`/book-appointment/${doctor.id}`)}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};
