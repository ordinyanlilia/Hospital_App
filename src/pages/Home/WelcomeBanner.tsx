import { Card, Typography, Carousel, Row, Col } from "antd";
import React from "react";
import "./WelcomeBanner.css";
import Slide4 from "../../assets/smilinggirl-image.jpg";
import Slide1 from "../../assets/happy-surgeon-senior-woman-handshaking-while-greeting-lobby-clinic-focus-is-woman.jpg";
import Slide5 from "../../assets/care-job-scene-with-patient-being-cared.jpg";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";

const WelcomeBanner: React.FC = () => {
  const { darkMode } = useTheme();
  const { translate } = useTranslate();
  return (
    <div className={`welcome-banner ${darkMode ? "dark" : "light"}`}>
      <Row justify="center">
        <Col xs={24} md={20} lg={16} xl={14}>
          <Typography.Title className="welcomebanner-title" level={2}>
            {translate("welcomeTitle")}
          </Typography.Title>
          <Card className="welcomebanner-card" bordered={false}>
            <Typography.Paragraph className="welcomebanner-text">
              {translate("welcomeDescription")}
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Row justify="center" className="welcomebanner-carousel">
        <Col xs={24} md={22} lg={20} xl={18}>
          <Carousel autoplay dots>
            {[Slide1, Slide4, Slide5].map((img, index) => (
              <div key={index} className="welcomebanner-slide">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="welcomebanner-image"
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeBanner;
