import { Typography, Row, Col, Button } from "antd";
import hosputalImage from "../../assets/hospital-image.jpg";
import { useNavigate } from "react-router-dom";
import { ABOUT } from "../../routes/paths";
import { useTheme } from "../../context/theme-context";

const AboutSection = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const handleAbout = () => {
    navigate(ABOUT);
  };
  return (
    <div
      style={{
        padding: "4rem 2rem",
        background: darkMode ? "#141414" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <Row align="middle" gutter={32}>
        <Col span={12}>
          <img src={hosputalImage} alt="About us" style={{ width: "100%" }} />
        </Col>
        <Col span={12}>
          <Typography.Title level={2}>About Saifee Hospital</Typography.Title>
          <Typography.Paragraph>
            Saifee Hospital is committed to delivering high-quality and
            affordable healthcare to all. With advanced technology and a team of
            compassionate professionals, we ensure a healing experience.
          </Typography.Paragraph>
          <Button type="primary" size="large" onClick={handleAbout}>
            Show More
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AboutSection;
