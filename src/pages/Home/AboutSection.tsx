import { Typography, Row, Col, Button } from "antd";
import hospitalImage from "../../assets/young-handsome-physician-medical-robe-with-stethoscope.jpg";
import { useNavigate } from "react-router-dom";
import { ABOUT } from "../../routes/paths";
import "./AboutSection.css";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";
const { Title, Paragraph } = Typography;

const AboutSection = () => {
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const handleAbout = () => {
    navigate(ABOUT);
  };
  const { darkMode } = useTheme();

  return (
    <div className={`about-section ${darkMode ? "dark" : "light"}`}>
      <Row
        align="middle"
        gutter={[32, 32]}
        justify="center"
        className="about-row"
      >
        <Col xs={24} md={12}>
          <img src={hospitalImage} alt="About us" className="about-image" />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2} className="about-title">
            {translate("aboutHealthcare")}
          </Title>
          <Paragraph className="about-text">
            {translate("aboutHealthInfo")}
          </Paragraph>
          <Button className="aboutsection-button" onClick={handleAbout}>
            {translate("showMore")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AboutSection;
