import { Card, Typography, Carousel } from "antd";
import React from "react";

import Slide4 from "../../assets/young-handsome-physician-medical-robe-with-stethoscope.jpg";
// import Slide2 from '../../assets/hospital1-image.jpg';
// import Slide3 from '../../assets/hospital2-image.jpg';
import Slide1 from "../../assets/hospital3-image.jpg";
import Slide5 from "../../assets/care-job-scene-with-patient-being-cared.jpg";
import { useTheme } from "../../context/theme-context";

const WelcomeBanner: React.FC = () => {
  const { darkMode } = useTheme();
  return (
    <div
      style={{
        padding: "3rem 2rem",
        background: darkMode ? "#141414" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* Welcome Message */}
      <Card
        bordered={false}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title
          level={2}
          style={{ color: darkMode ? "#ffffff" : "#1a2450" }}
        >
          Welcome to Healthcare
        </Typography.Title>
        <Typography.Paragraph
          style={{ fontSize: "16px", color: darkMode ? "#ccc" : "#333" }}
        >
          We are committed to delivering compassionate and world-class medical
          care. Explore our services, meet our expert team, and discover how we
          put your health first.
        </Typography.Paragraph>
      </Card>

      {/* Carousel Under the Card */}
      <div style={{ marginTop: "2rem" }}>
        <Carousel autoplay dots>
          {[Slide1, Slide4, Slide5].map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomeBanner;
