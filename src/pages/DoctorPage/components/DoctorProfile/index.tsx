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
import { useTranslate } from "../../../../context/TranslationProvider";
import ImgUploader from "../../../Profile/components/ImgUploader";

const DoctorProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState<Partial<Doctor> | null>(null);

  const user = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);
  const userToken = useAppSelector(selectUserToken);

  // Only allow editing if userRole is "doctor"
  const doctor = userRole === "doctor" ? (user as Doctor) : null;

  useEffect(() => {
    if (isEditMode && doctor) {
      setEditedDoctor({ ...doctor });
    }
  }, [isEditMode, doctor]);

  if (!doctor || userRole !== "doctor") {
    return <div>{translate("loading")}</div>;
  }

  const handleInputChange = (field: keyof Doctor, value: string) => {
    setEditedDoctor((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleImageFileChange = (url: string) => {
    setEditedDoctor((prev) => (prev ? { ...prev, photoUrl: url } : prev));
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
                    <img src={doctor.photoUrl} alt="Doctor" />
                  </div>
                  <div className="form-container-email">
                    <span>{doctor.email}</span>
                  </div>
                </div>

                <div className="vertical-line"></div>

                <div className="form-container-info-part">
                  <div className="form-container">
                    <p>{translate("name1")}</p>
                    <span>{doctor.name}</span>
                  </div>
                  <div className="form-container">
                    <p>{translate("surname")}</p>
                    <span>{doctor.surname}</span>
                  </div>
                  <div className="form-container">
                    <p>{translate("gender")}</p>
                    <span>{doctor.gender}</span>
                  </div>
                  <div className="form-container">
                    <p>{translate("mail")}</p>
                    <span>{doctor.email}</span>
                  </div>
                  <div className="form-container">
                    <p>{translate("specialty")}</p>
                    <span>{doctor.specialty}</span>
                  </div>
                  <div className="form-container">
                    <p>{translate("yearsExperience")}</p>
                    <span>{doctor.yearsOfExperience}</span>
                  </div>
                  <div className="form-container">
                    <p>{translate("bio")}</p>
                    <span>{doctor.bio}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="edit-mode-forms-content" key={doctor.doc_id}>
                <div className="form-container-image-email">
                  <div className="form-container-image-edit">
                    <ImgUploader
                      imageUrl={editedDoctor?.photoUrl || ""}
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
                    <p>{translate("name1")}</p>
                    <input
                      type="text"
                      value={editedDoctor?.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="form-container">
                    <p>{translate("surname")}</p>
                    <input
                      type="text"
                      value={editedDoctor?.surname || ""}
                      onChange={(e) =>
                        handleInputChange("surname", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-container">
                    <p>{translate("gender")}</p>
                    <select
                      value={editedDoctor?.gender || ""}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option value="Male">{translate("male")}</option>
                      <option value="Female">{translate("female")}</option>
                    </select>
                  </div>
                  <div className="form-container">
                    <p>{translate("specialty")}</p>
                    <select
                      value={editedDoctor?.specialty || ""}
                      onChange={(e) =>
                        handleInputChange("specialty", e.target.value)
                      }
                    >
                      <option value="Cardiology">{translate("cardiology")}</option>
                      <option value="Dermatology">{translate("dermatology")}</option>
                      <option value="Endocrinology">{translate("endocrinology")}</option>
                      <option value="Gastroenterology">{translate("gastroenterology")}</option>
                      <option value="Neurology">{translate("neurology")}</option>
                      <option value="Radiology">{translate("radiology")}</option>
                    </select>
                  </div>
                  <div className="form-container">
                    <p>{translate("yearsExperience")}</p>
                    <select
                      value={editedDoctor?.yearsOfExperience?.toString() || ""}
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
                    <p>{translate("bio")}</p>
                    <textarea
                      value={editedDoctor?.bio || ""}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      placeholder={translate("writeBio")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="profile-edit-btn">
            {!isEditMode ? (
              <button onClick={() => setIsEditMode(true)}>
                {translate("edit")}
              </button>
            ) : (
              <div className="save-cancel-btns">
                <button className="save-btn" onClick={handleSave}>
                  {translate("save")}
                </button>
                <button onClick={() => setIsEditMode(false)}>
                  {translate("cancel")}
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
