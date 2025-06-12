import "./Profile.css";

import { useState } from "react";
import { Alert, Button, Divider, Flex, Space } from "antd";
import AppointmentsTable from "./components/AppointmentsTable.tsx";
import UserInfo from "./components/UserInfo.tsx";
import { useNavigate } from "react-router-dom";
import { BOOK_APPOINTMENT } from "../../routes/paths.ts";
import { FileAddOutlined, LoginOutlined } from "@ant-design/icons";
import EditUserInfo from "./components/EditUserInfo.tsx";
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


  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleLogOutClick = () => {
    dispatch(clearUser());
    dispatch(setPatient(null));
    navigate("/login");
    localStorage.removeItem("authToken");
  };

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
};

export default Profile;
