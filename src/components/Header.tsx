import { NavLink } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT,
  FIND_DOCTOR,
  CONTACT_US,
  PROFILE,
} from "../routes/paths";
import { Layout, Menu, Switch } from "antd";
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
import { Select } from "antd";
import { useTranslate } from "../context/TranslationProvider";

const { Header } = Layout;

const HeaderComponent = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { language, changeLanguage, translate } = useTranslate();

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
      label: <NavLink to={PROFILE}>{translate("profile")}</NavLink>,
    },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={menuItems}
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          flex: 1,
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
