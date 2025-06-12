import { NavLink } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT,
  FIND_DOCTOR,
  CONTACT_US,
  PROFILE,
  DOCTOR_PAGE,
  LOGIN,
} from "../routes/paths";
import { Layout, Menu, Switch, Select } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  IdcardOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { useTheme } from "../context/theme-context";
import "./Header.css";
import { useTranslate } from "../context/TranslationProvider";
import { useAppSelector } from "../app/hooks";
import {
  selectUserData,
  selectUserRole,
  selectUserStatus,
} from "../features/UserSlice";

const { Header } = Layout;

const HeaderComponent = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { language, changeLanguage, translate } = useTranslate();
  const userData = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);
  const userStatus = useAppSelector(selectUserStatus);
  const isLoggedIn = Boolean(userData && userStatus);
  let profileLink: string = LOGIN;
  if (isLoggedIn) {
    if (userRole === "doctor") {
      profileLink = DOCTOR_PAGE;
    } else {
      profileLink = PROFILE;
    }
  } else {
    profileLink = LOGIN;
  }

  // const getSelectedKey = () => {
  //   const path = location.pathname.toLowerCase();

  //   if (path === HOME_PAGE.toLowerCase() || path === "/") return "home";
  //   if (path.startsWith(ABOUT.toLowerCase())) return "about";
  //   if (path.startsWith(FIND_DOCTOR.toLowerCase())) return "find-doctor";
  //   if (path.startsWith(CONTACT_US.toLowerCase())) return "contact";
  //   if (path.startsWith(PROFILE.toLowerCase())) return "profile";
  //   if (path.startsWith(LOGIN.toLowerCase())) return "profile";

  //   return "";
  // };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <NavLink to={HOME_PAGE}>{translate("home")}</NavLink>,
    },
    {
      key: "about",
      icon: <InfoCircleOutlined />,
      label: <NavLink to={ABOUT}>{translate("about")}</NavLink>,
    },
    {
      key: "find-doctor",
      icon: <IdcardOutlined />,
      label: <NavLink to={FIND_DOCTOR}>{translate("findDoctor")}</NavLink>,
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: <NavLink to={CONTACT_US}>{translate("contactUs")}</NavLink>,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: (
        <NavLink to={profileLink}>
          {isLoggedIn ? translate("profile") : translate("login") }
        </NavLink>
      ),
    },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: darkMode ? "#101832" : "#f5f5f5",
        // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          style={{
            backgroundColor: darkMode ? "#101832" : "#f5f5f5",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            // display: "flex",
            flexGrow: "1",
            justifyContent: "center",
            fontWeight: "bold",
            flex: 1,
            minWidth: 0,
          }}
        />
        <div className="theme-switch">
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
          />
        </div>
      </div>
      <div className="language-selector">
        <Select
          defaultValue={language}
          // style={{ width: 100 }}
          onChange={changeLanguage}
          options={[
            { value: "eng", label: "ENG 🇺🇸" },
            { value: "arm", label: "ARM 🇦🇲" },
            { value: "rus", label: "RUS 🇷🇺" },
          ]}
        />
      </div>
    </Header>
  );
};

export default HeaderComponent;
