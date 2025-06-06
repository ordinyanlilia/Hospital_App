import {Avatar, Card} from "antd";
import {UserOutlined} from "@ant-design/icons";
import type {Doctor} from "../../features/doctors/doctorsSlice.tsx";

type DoctorCardProps = {
    doctor: Doctor;
    selectedDoctorId: string | undefined;
    onSetSelectedDoctor: (doctor: Doctor) => void;
}
const DoctorCard = ({doctor, selectedDoctorId, onSetSelectedDoctor}: DoctorCardProps) => {
    return (<Card
        hoverable
        style={{
            borderColor:
                doctor.id === selectedDoctorId ? "#1890ff" : "#707070",
            color:
                doctor.id === selectedDoctorId ? "#1890ff" : "#707070",
            boxShadow:
                doctor.id === selectedDoctorId
                    ? "0 0 3px #1890ff"
                    : "0 0 10px #e6f7ff",
        }}
        onClick={() => onSetSelectedDoctor(doctor)}
    >
        <Card.Meta
            avatar={
                <Avatar
                    size={{md: 50, lg: 64, xl: 70, xxl: 90}}
                    src={doctor?.photoUrl}
                    style={{backgroundColor: "rgba(96,150,186,0.75)"}}
                    icon={
                        !doctor?.photoUrl && (
                            <UserOutlined
                                style={{fontSize: "30px", color: "#fffefe"}}
                            />
                        )
                    }
                />
            }
            title={doctor.name}
            className={"doctor-info-card"}
            description={
                <>
                    <div>{doctor.specialty}</div>
                </>
            }
        />
    </Card>)
}

export default DoctorCard;