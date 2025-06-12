import { Typography, Button, Row, Col } from "antd";
import heroImage from "../../assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import { BOOK_APPOINTMENT } from "../../routes/paths";
import "./HeroSection.css";
import { useTheme } from "../../context/theme-context";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleBookAppointments = () => {
    navigate(BOOK_APPOINTMENT);
  };
  const { darkMode } = useTheme();
  return (
    <Row
      className={`herosection-row ${darkMode ? "dark-mode" : "light-mode"}`}
      justify="center"
      align="middle"
      style={{
        minHeight: "80vh",
        padding: "2rem",
        background: darkMode ? "#101832" : "#f5f5f5",
      }}
    >
      <Col xs={24} md={12}>
        {/*<Typography.Title className='herosection-title' level={2}>*/}
        {/*Welcome to HealthCare*/}
        {/*</Typography.Title>*/}
        <Typography.Paragraph className="herosection-text">
          Experience world-class care for everyone. Our expert team of
          compassionate doctors, supported by state-of-the-art facilities, is
          dedicated to providing you with the best healthcare experience
          possible. To get started, simply click the button below to easily book
          your appointment and take the first step toward better health.
        </Typography.Paragraph>
        <Button className="herosection-button" onClick={handleBookAppointments}>
          Book Appointment
        </Button>
      </Col>

      <Col xs={24} md={12}>
        <img
          className="herosection-image"
          src={heroImage}
          alt="Hospital"
          style={{ width: "100%" }}
        />
      </Col>
    </Row>
  );
};

export default HeroSection;
