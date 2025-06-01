import './Profile.css'

import { useState} from "react";
import {Button, Divider, Space} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";
import {FileAddOutlined} from '@ant-design/icons'
import EditUserInfo from "./components/EditUserInfo.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectPatient} from "../../features/PatientSlice.ts";

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const user = useAppSelector(selectPatient);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    return (
        <>
            {!isEditing ? <UserInfo onSetIsEditing={handleEdit}/> : <EditUserInfo onSetIsEditing={handleEdit}/>}
            <Divider>
                <Space>
                    Your Appointments
                    <Button color="default" variant="outlined" onClick={() => navigate(BOOK_APPOINTMENT)}>
                        <FileAddOutlined/>
                        Book Appointment
                    </Button>
                </Space>
            </Divider>
            {!!user?.appointments?.length && <AppointmentsTable/>}
            {!user?.appointments?.length && <p>You have no Appointments</p>}
        </>
    )
}

export default Profile;