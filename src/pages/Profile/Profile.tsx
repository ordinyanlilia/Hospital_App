import "./Profile.css";
import {useState} from "react";
import {Alert, Button, Divider, Flex, Space} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";
import {FileAddOutlined, LoginOutlined} from "@ant-design/icons";
import EditUserInfo from "./components/EditUserInfo.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {auth} from "../../services/apiService.ts";
import {signOut} from "firebase/auth";
import {clearUser} from "../../features/UserSlice.ts";
import {selectAppointments} from "../../features/appointments/appointmentsSlice.ts";

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const appointments = useAppSelector(selectAppointments);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleLogOutClick = async () => {
        await signOut(auth);
        localStorage.removeItem('authToken');
        dispatch(clearUser());
        navigate('/login');
    };

    return (
        <>
            <Flex align={"center"} justify={"end"}>
                <Button onClick={handleLogOutClick} danger>
                    Log out
                    <LoginOutlined />
                </Button>
            </Flex>
            {!isEditing ? (
                <UserInfo onSetIsEditing={handleEdit}/>
            ) : (
                <EditUserInfo onSetIsEditing={handleEdit}/>
            )}
            <Divider>
                <Space wrap>
                    Your Appointments
                    <Button
                        color="default"
                        variant="outlined"
                        onClick={() => navigate(BOOK_APPOINTMENT)}
                    >
                        <FileAddOutlined/>
                        Book Appointment
                    </Button>
                </Space>
            </Divider>
            {!!appointments?.length && <AppointmentsTable/>}
            {!appointments?.length && (
                <Alert message="You Don't have appointments yet" type="info"/>
            )}
        </>
    );
};

export default Profile;
