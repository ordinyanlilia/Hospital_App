import { Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { CONTACT_US } from "../../routes/paths";
import contactusImage from "../../assets/contactus-image.jpg";
import "./ContactSection.css";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";

const ContactSection = () => {
  const navigate = useNavigate();
  const { translate } = useTranslate();

  const handleContactUs = () => {
    navigate(CONTACT_US);
  };
  const { darkMode } = useTheme();
  return (
    <div className={`contact-section ${darkMode ? "dark" : "light"}`}>
      <Row align="middle" gutter={32} className="contact-row">
        <Col xs={24} md={12}>
          <img
            src={contactusImage}
            alt="Contact us"
            className="contact-image"
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography.Title level={2} className="contact-title">
            {translate("contactUs")}
          </Typography.Title>
          <Typography.Paragraph className="contact-text">
            {translate("contactSectionText")}
          </Typography.Paragraph>
          <Button className="contactsection-button" onClick={handleContactUs}>
            {translate("showMore")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ContactSection;
