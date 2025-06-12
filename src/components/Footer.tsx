import "./Footer.css";
import { Row, Col } from "antd";
import { useTranslate } from "../context/TranslationProvider";

export const Footer = () => {
  const { translate } = useTranslate();

  return (
    <>
      <div className="footer-container">
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
                <p className="footer-heading">{translate("lookingFor")}</p>
                <p className="footer-subtext">{translate("dontHesitate")}</p>
              </div>{" "}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};