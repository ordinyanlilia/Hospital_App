import "./Profile.css";
import {useState} from "react";
import {Alert, Button, Divider, Flex, Space} from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";
import {BOOK_APPOINTMENT} from "../../routes/paths.ts";
import {FileAddOutlined, LoginOutlined} from "@ant-design/icons";
import EditUserInfo from "./components/EditUserInfo.tsx";
<<<<<<< feature/language-setup
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { setPatient } from "../../features/PatientSlice.ts";
import { clearUser } from "../../features/UserSlice.ts";
import { selectAppointments } from "../../features/appointments/appointmentsSlice.ts";
import { useTranslate } from "../../context/TranslationProvider.tsx";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const { translate } = useTranslate();

=======
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
>>>>>>> main

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleLogOutClick = async () => {
        await signOut(auth);
        localStorage.removeItem('authToken');
        dispatch(clearUser());
        navigate('/login');
    };

<<<<<<< feature/language-setup
  return (
    <>
      <Flex align={"center"} justify={"end"}>
        <span>{translate("logOut")}</span>
        <LoginOutlined style={{ color: "red" }} onClick={handleLogOutClick} />
      </Flex>
      {!isEditing ? (
        <UserInfo onSetIsEditing={handleEdit} />
      ) : (
        <EditUserInfo onSetIsEditing={handleEdit} />
      )}
      <Divider>
        <Space>
          {translate("yourApp")}
          <Button
            color="default"
            variant="outlined"
            onClick={() => navigate(BOOK_APPOINTMENT)}
          >
            <FileAddOutlined />
            {translate("bookAppointment")}
          </Button>
        </Space>
      </Divider>
      {!!appointments?.length && <AppointmentsTable />}
      {!appointments?.length && (
        <Alert message="You Don't have appointments yet" type="info" />
      )}
    </>
  );
=======
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
>>>>>>> main
};

export default Profile;
