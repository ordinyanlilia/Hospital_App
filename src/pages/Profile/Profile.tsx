import './Profile.css'

import {useState} from "react";
import {Alert, Button, Divider, Flex, Space} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";
import {FileAddOutlined, LoginOutlined} from '@ant-design/icons'
import EditUserInfo from "./components/EditUserInfo.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectPatient, setPatient} from "../../features/PatientSlice.ts";
import {clearUser} from "../../features/UserSlice.ts";

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectPatient);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleLogOutClick = () => {
        dispatch(clearUser());
        dispatch(setPatient(null));
        navigate("/login");
        localStorage.removeItem("authToken");
    }

    return (
        <>
            <Flex align={'center'} justify={'end'}>
                <span>Log out </span>
                <LoginOutlined style={{color: 'red'}} onClick={handleLogOutClick}/>
            </Flex>
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
            {!user?.appointments?.length && <Alert message="You Don't have appointments yet" type="info"/>}
        </>
    )
}

export default Profile;