import "./Footer.css";
import { Button, Row, Col } from "antd";
import { useTheme } from "../context/theme-context";

export const Footer = () => {
  const { darkMode } = useTheme();
  return (
    <>
      <div className={`footer-container ${darkMode ? "dark" : "light"}`}>
        <div className="footer-content">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <div className="footer-image-wrapper">
                <img
                  src="https://res.cloudinary.com/healthcareintern/image/upload/v1748518280/footerImage_vljhn7.png"
                  alt="Doctors"
                  className="footer-image"
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="footer-text">
                <p className="footer-heading">
                  Looking for professional & trusted medical healthcare?
                </p>
                <p className="footer-subtext">DON'T HASTITATE TO CONTACT US.</p>
                <Button className="footer-button">MAKE APPOINTMENT</Button>
              </div>{" "}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
