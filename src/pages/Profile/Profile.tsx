import './Profile.css'

import {useEffect, useState} from "react";
import {getData} from '../../services/apiService.ts'
import {Button, Divider, Space} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";
import {FileAddOutlined} from '@ant-design/icons'
import EditUserInfo from "./components/EditUserInfo.tsx";

const Profile = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // useEffect(() => {
    //     getData('2e3C5vE5WSVC6LJ9Zjc0', 'patients').then((response) => {
    //         setUser(response);
    //     })
    // }, []);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    return (
        <>
            {!isEditing ? <UserInfo user={user} onSetIsEditing={handleEdit}/> : <EditUserInfo user={user} onSetIsEditing={handleEdit}/>}
            <Divider>
                <Space>
                    Your Appointments
                    <Button color="default" variant="outlined" onClick={() => navigate(BOOK_APPOINTMENT)}>
                        <FileAddOutlined/>
                        Book Appointment
                    </Button>
                </Space>
            </Divider>
            <AppointmentsTable/>
        </>
    )
}

export default Profile;