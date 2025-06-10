import "./DoctorProfile.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  selectUserData,
  selectUserRole,
  selectUserToken,
  setUser,
} from "../../../../features/UserSlice";
import { type Doctor } from "../../../../features/DoctorSlice";
import { updateData } from "../../../../services/apiService";
import ImgUploader from "../../../Profile/components/ImgUploader";

const DoctorProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState<Partial<Doctor> | null>(
    null
  );
  const user = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);
  const userToken = useAppSelector(selectUserToken);

  const doctor = userRole === "doctor" ? (user as Doctor) : null;

  useEffect(() => {
    if (isEditMode && doctor) {
      setEditedDoctor({ ...doctor });
    }
  }, [isEditMode, doctor]);

  if (!doctor || userRole !== "doctor") return <div>Loading...</div>;

  const handleInputChange = (field: keyof Doctor, value: string) => {
    setEditedDoctor((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleImageFileChange = (url: string) => {
    setEditedDoctor((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSave = async () => {
    if (!editedDoctor || !doctor || !doctor.doc_id) return;

    try {
      await updateData(doctor.doc_id, "doctors", editedDoctor);
      dispatch(
        setUser({
          data: { ...doctor, ...editedDoctor },
          role: "doctor",
          token: userToken!,
        })
      );

      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating doctor profile:", error);
    }
  };

  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-content">
        <div className="personal-info-container">
          <div className="personal-info-content">
            {!isEditMode ? (
              <div className="forms-content" key={doctor.doc_id}>
                <div className="form-container-image-email">
                  <div className="form-container-image">
                    <img src={doctor.imageUrl} alt="" />
                  </div>
                  <div className="form-container-email">
                    <span>{doctor.email}</span>
                  </div>
                </div>
                <div className="vertical-line"></div>
                <div className="form-container-info-part">
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
              </div>
            ) : (
              <div className="edit-mode-forms-content" key={doctor.doc_id}>
                <div className="form-container-image-email">
                  <div className="form-container-image-edit">
                    <ImgUploader
                      imageUrl={editedDoctor?.imageUrl || ""}
                      onSetFormData={handleImageFileChange}
                    />
                  </div>
                  <div className="form-container-email">
                    <span>{doctor.email}</span>
                  </div>
                </div>
                <div className="vertical-line"></div>
                <div className="form-container-info-part">
                  <div className="form-container">
                    <p>Name</p>
                    <input
                      type="text"
                      value={editedDoctor?.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-container">
                    <p>Surname</p>
                    <input
                      type="text"
                      value={editedDoctor?.surname || ""}
                      onChange={(e) =>
                        handleInputChange("surname", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-container">
                    <p>Gender</p>
                    <select
                      value={editedDoctor?.gender || ""}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-container">
                    <p>Specialty</p>
                    <select
                      value={editedDoctor?.specialty || ""}
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
                      value={editedDoctor?.yearsOfExperience || ""}
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
                      value={editedDoctor?.bio || ""}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      placeholder="Write a brief bio..."
                    />
                  </div>
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
