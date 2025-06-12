import { Card, Row, Col } from "antd";
import "./About.css";
import { motion } from "framer-motion";
import { useTheme } from "../../context/theme-context";

const About = () => {
  const { darkMode } = useTheme();
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
                    Our experienced doctors are always ready to help you. We
                    provide high-quality medical services with care and
                    professionalism.
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
              Our Values
            </motion.h1>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Patient-centered care with compassion and professionalism
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
            <p>Predominance of visitor</p>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.25 }}>
          <Card className="custom-small-card" bordered={false}>
            <img
              src="https://res.cloudinary.com/healthcareintern/image/upload/v1748517705/stethoscope_xkwhsh.png"
              alt="Dignity Icon"
              className="card-icon"
            />
            <p>Staff dignity</p>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.25 }}>
          <Card className="custom-small-card" bordered={false}>
            <img
              src="https://res.cloudinary.com/dvlaqznyd/image/upload/v1748517704/health_zqzgna.png"
              alt="Integrity Icon"
              className="card-icon"
            />
            <p>Integrity of staff</p>
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
                      For 19 years now, we have been providing people with the
                      medical services they need, combining professionalism and
                      modern technology. What makes us different?
                      Professionalism and experience: our doctors are constantly
                      improving their qualifications, following the latest
                      trends in medicine.
                    </p>
                  </motion.div>
                </Col>
                <Col xs={24} md={12}>
                  <motion.img
                    src="https://res.cloudinary.com/healthcareintern/image/upload/v1748518238/bulding_rhjkkk.jpg"
                    alt="aboutDoctor"
                    className="about-image-2"
                    initial={{ scale: 1.5, x: 100, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
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
