import { NavLink, useLocation } from "react-router-dom";
import { HOME_PAGE, ABOUT, FIND_DOCTOR, CONTACT_US, PROFILE, LOGIN, DOCTOR_PAGE } from "../routes/paths";
import { Layout, Menu } from "antd";
import "./Header.css";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../app/hooks";
import { selectUserData, selectUserRole } from "../features/UserSlice";
const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const userData = useAppSelector(selectUserData);
  const userRole = useAppSelector(selectUserRole);
  const isLoggedIn = Boolean(userData);

  let profileLink: string;
  if (isLoggedIn) {
    if (userRole === "doctor") {
      profileLink = DOCTOR_PAGE;
    } else {
      profileLink = PROFILE;
    }
  } else {
    profileLink = LOGIN;
  }

const getSelectedKey = () => {
  const path = location.pathname.toLowerCase();

  if (path === HOME_PAGE.toLowerCase() || path === "/") return "home";
  if (path.startsWith(ABOUT.toLowerCase())) return "about";
  if (path.startsWith(FIND_DOCTOR.toLowerCase())) return "find-doctor";
  if (path.startsWith(CONTACT_US.toLowerCase())) return "contact";
  if (path.startsWith(PROFILE.toLowerCase())) return "profile";
  if (path.startsWith(LOGIN.toLowerCase())) return "profile";

  return "";
};


  return (
    <Header className="header-content">
      <div className="menu-wrapper" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            flexGrow: 1,
            maxWidth: 960,  
            justifyContent: "center", 
          }}
        >
          <Menu.Item key={"home"} icon={<HomeOutlined />}>
            <NavLink to={HOME_PAGE}>Home Page</NavLink>
          </Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />}>
            <NavLink to={ABOUT}>About</NavLink>
          </Menu.Item>
          <Menu.Item key={"find-doctor"} icon={<IdcardOutlined />}>
            <NavLink to={FIND_DOCTOR}>Find Doctor</NavLink>
          </Menu.Item>
          <Menu.Item key={"contact"} icon={<PhoneOutlined />}>
            <NavLink to={CONTACT_US}>Contact us</NavLink>
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <NavLink to={profileLink}>
              {isLoggedIn ? "Your Profile" : "Login"}
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderComponent;
