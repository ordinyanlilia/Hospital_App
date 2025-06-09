import { NavLink, useNavigate } from "react-router-dom";
import {
  DOCTOR_APPOINTMENTS,
  DOCTOR_CALENDAR,
  DOCTOR_PROFILE,
  HOME_PAGE,
  LOGIN,
} from "../../../../routes/paths";
import { useAppDispatch } from "../../../../app/hooks";
import { clearUser } from "../../../../features/UserSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../../services/apiService";
import { Tabs } from "antd";
import {
  CalendarOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./TopPanel.css"; 

const TopPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    dispatch(clearUser());
    navigate(LOGIN);
  };

  const tabItems = [
    {
      key: "home",
      label: (
        <NavLink to={HOME_PAGE}>
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      key: "appointments",
      label: (
        <NavLink to={DOCTOR_APPOINTMENTS}>
          <ScheduleOutlined /> Appointments
        </NavLink>
      ),
    },
    {
      key: "calendar",
      label: (
        <NavLink to={DOCTOR_CALENDAR}>
          <CalendarOutlined /> Calendar
        </NavLink>
      ),
    },
    {
      key: "profile",
      label: (
        <NavLink to={DOCTOR_PROFILE}>
          <ProfileOutlined /> Profile
        </NavLink>
      ),
    },
  ];

  return (
    <div className="topPanel-container">
      <Tabs
        defaultActiveKey="appointments"
        items={tabItems}
        tabBarExtraContent={{
          right: (
            <div className="logout-section" onClick={handleClickLogout}>
              <LogoutOutlined style={{ marginRight: 4 }} />
              Log out
            </div>
          ),
        }}
      />
    </div>
  );
};

export default TopPanel;
