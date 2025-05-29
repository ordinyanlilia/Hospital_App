import "./DoctorProfile.css";
import stethoscopeBlueIcon from "../../Icons/stethoscopeBlue.png";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../services/apiService";

const DoctorProfile: React.FC = () => {
  type Doctor = {
    name?: string;
    surname?: string;
    specialty?: string;
    photoUrl?: string;
    gender?: string;
    email?: string;
    doc_id?: string;
    id?: string;
    yearsOfExperience?: number;
    bio?: string;
    department?: string;
  };

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchData("doctors");
        setDoctors(data as Doctor[]);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    loadDoctors();
  }, []);

  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-content">
        <div className="doctor-profile-title">
          <img src={stethoscopeBlueIcon} alt="Stethoscope icon" />
          <span>Profile</span>
        </div>
        <div className="personal-info-container">
          <div className="personal-info-content">
            {doctors.map((doctor) => {
              if (doctor.id === "1") {
                return !isEditMode ? (
                  <div className="forms-content" key={doctor.id}>
                    <div className="form-container">
                      <p>Name</p>
                      <span>{doctor.name}</span>
                    </div>
                    <div className="form-container">
                      <p>Surname</p>
                      <span>{doctor.surname}</span>
                    </div>
                    <div className="form-container">
                      <p>Gender</p>
                      <span>{doctor.gender}</span>
                    </div>
                    <div className="form-container">
                      <p>Email</p>
                      <span>{doctor.email}</span>
                    </div>
                    <div className="form-container">
                      <p>Specialty</p>
                      <span>{doctor.specialty}</span>
                    </div>
                    <div className="form-container">
                      <p>Years Of Experience</p>
                      <span>{doctor.yearsOfExperience}</span>
                    </div>
                  </div>
                ) : (
                  <div className="edit-mode-forms-content" key={doctor.id}>
                    <div className="form-container">
                      <p>Name</p>
                      <div>
                        <input type="text" value={doctor.name} />
                      </div>
                    </div>
                    <div className="form-container">
                      <p>Surname</p>
                      <input type="text" value={doctor.surname} />
                    </div>
                    <div className="form-container">
                      <p>Gender</p>
                      <select name="" id="" value={doctor.gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="form-container">
                      <p>Email</p>
                      <input type="email" value={doctor.email} />
                    </div>
                    <div className="form-container">
                      <p>Specialty</p>
                      <select name="" id="" value={doctor.specialty}>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="endocrinology">Endocrinology</option>
                        <option value="gastroenterology">
                          Gastroenterology
                        </option>
                        <option value="neurology">Neurology</option>
                        <option value="radiology">Radiology</option>
                      </select>
                    </div>
                    <div className="form-container">
                      <p>Years Of Experience</p>
                      <select name="" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="profile-edit-btn">
            {!isEditMode ? (
              <button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
            ) : (
              <div className="save-cancel-btns">
                <button className="save-btn">Save</button>
                <button onClick={() => setIsEditMode(!isEditMode)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
