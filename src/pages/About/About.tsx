import aboutDoctors from "../../assets/doctors-about.jpg";
import { Card } from "antd";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <Card className="about-card">
        <div className="about-content">
          <img src={aboutDoctors} alt="aboutDoctor" className="about-image" />
          <p className="about-text">
            Our experienced doctors are always ready to help you. We provide
            high-quality medical services with care and professionalism.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default About;
