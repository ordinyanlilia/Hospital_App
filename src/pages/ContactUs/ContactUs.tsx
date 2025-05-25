import './ContactUs.css';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us-container">
      <Title level={2} className="contact-title">Find Us Here</Title>
      
      <Row gutter={[16, 16]} justify="center" className="contact-cards">
        <Col xs={24} md={8}>
          <Card className="contact-card" bordered={false}>
            <PhoneOutlined className="contact-icon" />
            <Title level={5}>Phone</Title>
            <Text>(010) 583935</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="contact-card" bordered={false}>
            <MailOutlined className="contact-icon" />
            <Title level={5}>Email</Title>
            <Text>info@aawc.am</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="contact-card" bordered={false}>
            <EnvironmentOutlined className="contact-icon" />
            <Title level={5}>Location</Title>
            <Text>5 Heratsu Street, Yerevan 0025</Text>
          </Card>
        </Col>
      </Row>

      <div className="contact-map">
        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.870808361706!2d44.52534637604502!3d40.189688471476984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcdebf38f295%3A0xcda0897b2ca7158f!2sArmenian-American%20Wellness%20Center!5e0!3m2!1sru!2sam!4v1748152128582!5m2!1sru!2sam"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
