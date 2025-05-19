import { NavLink } from "react-router-dom";
import { HOME_PAGE, ABOUT, FIND_DOCTOR, CONTACT_US, PROFILE } from "../routes/paths";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  IdcardOutlined
} from "@ant-design/icons";
const { Header } = Layout;


const HeaderComponent = () => {
    return(
    <Header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      zIndex: 1000,
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "0 24px",
      height: "64px",
      display: "flex",
      justifyContent: "center",  
      alignItems: "center",  }}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}
      >
        <Menu.Item key={"home"} icon={<HomeOutlined />}>
            <NavLink to={HOME_PAGE}>Home Page</NavLink>
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
            <NavLink to={ABOUT}>About</NavLink>
        </Menu.Item>
        <Menu.Item key={"find-doctor"} icon={<IdcardOutlined/>}>
            <NavLink to={FIND_DOCTOR}>Find Doctor</NavLink>
        </Menu.Item>
        <Menu.Item key={"contact"} icon={<PhoneOutlined />}>
            <NavLink to={CONTACT_US}>Contact us</NavLink>
        </Menu.Item>
        <Menu.Item key={"profile"} icon={<UserOutlined />}>
          <NavLink to={PROFILE}>Your Profile</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
    )
}

export default HeaderComponent;