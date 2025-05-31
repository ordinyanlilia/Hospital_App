import "./Footer.css";
import { Button } from "antd";

export const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-image-wrapper">
            <img
              src="https://res.cloudinary.com/healthcareintern/image/upload/v1748518280/footerImage_vljhn7.png"
              alt="Doctors"
              className="footer-image"
            />
          </div>
          <div className="footer-text">
            <p className="footer-heading">
              Looking for professional & trusted medical healthcare?
            </p>
            <p className="footer-subtext">DON'T HASTITATE TO CONTACT US.</p>
            <Button className="footer-button">MAKE APPOINTMENT</Button>
          </div>
        </div>
      </div>
    </>
  );
};
