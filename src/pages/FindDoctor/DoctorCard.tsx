import { Button } from "antd";
import {
  MedicineBoxOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import defaultDoctorImage from "../../assets/Doctors/user.png";
import "./DoctorCard.css";
// new
import { useNavigate } from "react-router-dom";


type Doctor = {
  name?: string;
  surname?: string;
  specialty?: string;
  photoUrl?: string;
  gender?: string;
  email?: string;
  doc_id?: string;
  yearsOfExperience?: number;
  id?: string;
};

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="doctor-card-horizontal">
      <img
        src={doctor.photoUrl || defaultDoctorImage}
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
        </div>
        <div className="doctor-card-buttons">
          <Button type="primary" onClick={() => navigate(`/doctor-info/${doctor.id}`)}>Doctor Profile</Button>
          <Button>Book Appointment</Button>
        </div>
      </div>
    </div>
  );
};