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
import { Tabs, Select } from "antd";
import {
  CalendarOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./TopPanel.css"; 
import { useTranslate } from "../../../../context/TranslationProvider";

const TopPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { translate, language, changeLanguage } = useTranslate();

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
          <HomeOutlined />{translate("home")}
        </NavLink>
      ),
    },
    {
      key: "appointments",
      label: (
        <NavLink to={DOCTOR_APPOINTMENTS}>
          <ScheduleOutlined /> {translate("appointments")}
        </NavLink>
      ),
    },
    {
      key: "calendar",
      label: (
        <NavLink to={DOCTOR_CALENDAR}>
          <CalendarOutlined /> {translate("calendar")}
        </NavLink>
      ),
    },
    {
      key: "profile",
      label: (
        <NavLink to={DOCTOR_PROFILE}>
          <ProfileOutlined /> {translate("profile")}
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Select
                defaultValue={language}
                onChange={changeLanguage}
                options={[
                  { value: "eng", label: "ENG 🇺🇸" },
                  { value: "arm", label: "ARM 🇦🇲" },
                  { value: "rus", label: "RUS 🇷🇺" },
                ]}
                size="small"
              />
              <div className="logout-section" onClick={handleClickLogout}>
                <LogoutOutlined style={{ marginRight: 4 }} />
                {translate("logOut")}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default TopPanel;
