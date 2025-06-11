import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CONTACT_US } from '../../routes/paths';
import contactusImage from "../../assets/contactus-image.jpg"
import "./ContactSection.css";

const ContactSection = () => {
  const navigate = useNavigate();
  const handleContactUs = () =>{
    navigate(CONTACT_US);
  }

  return (
    <div className='contact-section'>
   <Row align="middle" gutter={32} className="contact-row">
  <Col xs={24} md={12}>
    <img src={contactusImage} alt="Contact us" className="contact-image" />
  </Col>
  <Col xs={24} md={12}>
    <Typography.Title level={2} className="contact-title">
      Contact Us
    </Typography.Title>
    <Typography.Paragraph className="contact-text">
      Our contact details are available in the Contact Us section. 
      Click "Show More" to learn how to get in touch with us. We appreciate every 
      call and message from our users.
    </Typography.Paragraph>
    <Button className="contactsection-button" onClick={handleContactUs}>
      Show More
    </Button>
  </Col>
</Row>
</div>
  )
};

export default ContactSection;
