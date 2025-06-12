import { Typography, Button, Row, Col } from "antd";
import heroImage from "../../assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import { BOOK_APPOINTMENT } from "../../routes/paths";
import "./HeroSection.css";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";

const HeroSection = () => {
  const navigate = useNavigate();
  const { translate } = useTranslate();

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
          {translate("heroDescription")}
        </Typography.Paragraph>
        <Button className="herosection-button" onClick={handleBookAppointments}>
          {translate("bookAppointment")}
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
