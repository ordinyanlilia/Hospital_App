import { Typography, Row, Col, Button, } from 'antd';
import hospitalImage from "../../assets/young-handsome-physician-medical-robe-with-stethoscope.jpg"
import { useNavigate } from 'react-router-dom';
import { ABOUT } from '../../routes/paths';
import "./AboutSection.css"

const { Title, Paragraph } = Typography;

const AboutSection = () => {
    const navigate = useNavigate();
    const handleAbout = () =>{
        navigate(ABOUT);
    }
    return (
    <div className="about-section">
      <Row align="middle" gutter={[32, 32]} justify="center" className="about-row">
        <Col xs={24} md={12}>
          <img src={hospitalImage} alt="About us" className="about-image" />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2} className="about-title">About HealthCare</Title>
          <Paragraph className="about-text">
            HealthCare is committed to providing easy access to quality medical services through 
            innovative technology. Our platform connects you with expert doctors and personalized care, 
            making healthcare simple and reliable. We put your health first, every step of the way.
          </Paragraph>
          <Button  className="aboutsection-button"  onClick={handleAbout}>
            Show More
          </Button>
        </Col>
      </Row>
    </div>
    )
};

export default AboutSection;
