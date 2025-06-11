import { Button } from "antd";
import {
  MedicineBoxOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./DoctorCard.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";

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
  const { darkMode } = useTheme();
  const { translate, translateDynamic } = useTranslate();

  return (
    <div className={`doctor-card-horizontal ${darkMode ? "dark" : "light"}`}>
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
            <MedicineBoxOutlined /> {translateDynamic(doctor.specialty)}
          </p>
          <p>
            <CalendarOutlined /> {doctor.yearsOfExperience} {translate("years")}
          </p>
          <p>
            <UserOutlined /> {translateDynamic(doctor.gender)}
          </p>
        </div>

        <div className="doctor-card-buttons">
          <Button
            type="primary"
            onClick={() => navigate(`/doctor-info/${doctor.id}`)}
          >
            {translate("docProfile")}
          </Button>
          <Button
            key={doctor.id}
            onClick={() => navigate(`/book-appointment/${doctor.id}`)}
          >
            {translate("bookAppointment")}
          </Button>
        </div>
      </div>
    </div>
  );
};
