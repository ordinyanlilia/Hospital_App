import { Card, Col, Row, Typography } from "antd";
import EmergencyImage from "../../assets/emergency-image.jpg";
import CardiologyImage from "../../assets/cardiology-image.jpg";
import OrthopedicsImage from "../../assets/orthopedic-image.jpg";
import "./ServiceSection.css";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";



const ServicesSection = () => {
  const { translate } = useTranslate();
  const { darkMode } = useTheme();
  const services = [
  {
    title: translate("emergencyTitle"),
    img: EmergencyImage,
    description: translate("emergencyDescription"),
    },
  {
    title:translate("cardiology"),
    img: CardiologyImage,
    description: translate("cardiologyDesc"),
  },
  {
    title: translate("orthopedics"),
    img: OrthopedicsImage,
    description: translate("orthopedicsDesc"),
  },
];
  return (
    <div className={`services-section ${darkMode ? "dark" : "light"}`}>
      <Typography.Title level={2} className="services-title">
        {translate("ourServices")}
      </Typography.Title>

      <Row gutter={[24, 24]} justify="center">
        {services.map((service, index) => (
          <Col key={index} xs={24} sm={24} md={8}>
            <div className="card-wrapper">
              <Card
                className="service-card"
                cover={
                  <img
                    alt={service.title}
                    src={service.img}
                    className="service-image"
                  />
                }
              >
                <Card.Meta
                  title={
                    <span className="service-card-title">{service.title}</span>
                  }
                  description={
                    <p className="service-card-description">
                      {service.description}
                    </p>
                  }
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesSection;
