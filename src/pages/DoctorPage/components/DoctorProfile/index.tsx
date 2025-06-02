import "./DoctorProfile.css";
import stethoscopeBlueIcon from "../../Icons/stethoscopeBlue.png";
import { useEffect, useState } from "react";
// import type { AppDispatch, RootState } from "../../../../Store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorById, type DoctorA } from "../../../../features/DoctorPageSlice/doctorPageSlice";
import { updateData } from "../../../../services/apiService";
import type { Doctor } from "../../../../features/DoctorSlice";
import type { AppDispatch, RootState } from "../../../../app/store";
// import { type Doctor } from "../../../../../src/features/SignInSignUpSlice/DoctorSlice";


const DoctorProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctor } = useSelector((state: RootState) => state.doctorPage);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editDoctor, setEditDoctor] = useState<Partial<DoctorA> | null>(null);

  const userData = useSelector((state: RootState) => state.userSlice.data);
    const userRole = useSelector((state: RootState) => state.userSlice.role);
  
    const doctor1 =
      userData && userRole === "doctor" && "id" in userData
        ? (userData as Doctor)
        : null;
  
    const DOCTOR_ID = doctor1?.id;
  
    useEffect(() => {
      if (DOCTOR_ID) {
        dispatch(fetchDoctorById(DOCTOR_ID));
      }
    }, [dispatch, DOCTOR_ID]);

  
  useEffect(() => {
    if (isEditMode && doctor) {
      setEditDoctor({ ...doctor });
    }
  }, [isEditMode, doctor]); 
  
  if (!doctor1) {
      return null;
    }

  if (!doctor) {
    return (
      <div className="doctor-profile-container">No doctor data available.</div>
    );
  }

  const handleInputChange = (field: keyof DoctorA, value: string) => {
    setEditDoctor((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (editDoctor && doctor.id) {
      await updateData<Partial<DoctorA>>(doctor.id, "doctors", editDoctor);
      dispatch(fetchDoctorById(doctor.id));
      setIsEditMode(false);
    }
  };

  console.log("edited",doctor);
  

  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-content">
        <div className="doctor-profile-title">
          <img src={stethoscopeBlueIcon} alt="Stethoscope icon" />
          <span>Profile</span>
        </div>

        <div className="personal-info-container">
          <div className="personal-info-content">
            {!isEditMode ? (
              <div className="forms-content" key={doctor.doc_id}>
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
                <div className="form-container">
                  <p>Bio</p>
                  <span>{doctor.bio}</span>
                </div>
              </div>
            ) : (
              <div className="edit-mode-forms-content" key={doctor.doc_id}>
                <div className="form-container">
                  <p>Name</p>
                  <input
                    type="text"
                    value={editDoctor?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="form-container">
                  <p>Surname</p>
                  <input
                    type="text"
                    value={editDoctor?.surname || ""}
                    onChange={(e) =>
                      handleInputChange("surname", e.target.value)
                    }
                  />
                </div>
                <div className="form-container">
                  <p>Gender</p>
                  <select
                    value={editDoctor?.gender || ""}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-container">
                  <p>Email</p>
                  <span>{doctor.email}</span>
                </div>
                <div className="form-container">
                  <p>Specialty</p>
                  <select
                    value={editDoctor?.specialty || ""}
                    onChange={(e) =>
                      handleInputChange("specialty", e.target.value)
                    }
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Radiology">Radiology</option>
                  </select>
                </div>
                <div className="form-container">
                  <p>Years Of Experience</p>
                  <select
                    value={editDoctor?.yearsOfExperience || ""}
                    onChange={(e) =>
                      handleInputChange("yearsOfExperience", e.target.value)
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-container">
                  <p>Bio</p>
                  <textarea
                    value={editDoctor?.bio || ""}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4} // default visible lines, can adjust as needed
                    placeholder="Write a brief bio..."
                  />
                </div>
              </div>
            )}
          </div>

          <div className="profile-edit-btn">
            {!isEditMode ? (
              <button onClick={() => setIsEditMode(true)}>Edit</button>
            ) : (
              <div className="save-cancel-btns">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button onClick={() => setIsEditMode(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
