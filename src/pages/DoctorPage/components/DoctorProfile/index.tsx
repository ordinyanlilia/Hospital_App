import "./DoctorProfile.css";
import stethoscopeBlueIcon from "../../Icons/stethoscopeBlue.png"

const DoctorProfile: React.FC = () => {
    return (
        <div className="doctor-profile-container">
            <div className="doctor-profile-content">
                <div className="doctor-profile-title">
                    <img src={stethoscopeBlueIcon} alt="Stethoscope icon" />
                    <span>Profile</span>
                </div>
            </div>
        </div>
    )
} 

export default DoctorProfile;