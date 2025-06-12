import { Card, Row, Col } from "antd";
import "./About.css";
import { motion } from "framer-motion";
import { useTheme } from "../../context/theme-context";
import { useTranslate } from "../../context/TranslationProvider";

const About = () => {
  const { darkMode } = useTheme();
  const { translate } = useTranslate();

  return (
    <>
      <div className={`about-container ${darkMode ? "dark" : "light"}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className={`about-card ${darkMode ? "dark" : "light"}`}>
            <div className="about-content">
              <Row gutter={[16, 16]} justify="start">
                <Col xs={24} md={12}>
                  <motion.img
                    src="https://res.cloudinary.com/healthcareintern/image/upload/v1748518555/doctors-about_nq3hwm.jpg"
                    alt="aboutDoctor"
                    className="about-image"
                    initial={{ scale: 2, x: 100, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <motion.p
                    className="about-text"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {translate("aboutDoctorsText")}
                  </motion.p>{" "}
                </Col>
              </Row>
            </div>
          </Card>
        </motion.div>
      </div>
      <div className={`container-2 ${darkMode ? "dark" : "light"}`}>
        <Row justify="center" align="middle">
          <Col xs={24} md={24} style={{ textAlign: "center" }}>
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {translate("ourValues")}
            </motion.h1>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {translate("valuesText")}
            </motion.p>
          </Col>
        </Row>
      </div>
      <motion.div
        className="card-row"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div whileHover={{ scale: 1.25 }}>
          <Card className="custom-small-card" bordered={false}>
            <img
              src="https://res.cloudinary.com/healthcareintern/image/upload/v1748517705/heart_n6hzm8.png"
              alt="heart"
              className="card-icon"
            />
            <p>{translate("value1")}</p>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.25 }}>
          <Card className="custom-small-card" bordered={false}>
            <img
              src="https://res.cloudinary.com/healthcareintern/image/upload/v1748517705/stethoscope_xkwhsh.png"
              alt="Dignity Icon"
              className="card-icon"
            />
            <p>{translate("value2")}</p>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.25 }}>
          <Card className="custom-small-card" bordered={false}>
            <img
              src="https://res.cloudinary.com/dvlaqznyd/image/upload/v1748517704/health_zqzgna.png"
              alt="Integrity Icon"
              className="card-icon"
            />
            <p>{translate("value3")}</p>
          </Card>
        </motion.div>
      </motion.div>
      <div className="about-container-2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="about-card-2">
            <div className="about-content-2">
              <Row gutter={[16, 16]} justify="start">
                <Col xs={24} md={12}>
                  <motion.div
                    className="text-block"
                   initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1 }}
                  >
                    <h1>Our Story</h1>
                    <p className="about-text-2">
                      {translate("ourStoryText")}                      
                    </p>
                  </motion.div>
                </Col>
                <Col xs={24} md={12}>
                  <motion.img
                    src="https://res.cloudinary.com/healthcareintern/image/upload/v1748518238/bulding_rhjkkk.jpg"
                    alt="aboutDoctor"
                    className="about-image-2"
                    initial={{ scale: 1, x: 30, opacity: 0 }}
                    whileInView={{ scale: 1, x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default About;
