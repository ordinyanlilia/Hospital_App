import { Typography, Button, Row, Col } from 'antd';
import heroImage from '../../assets/hero-image.jpg';
import { useNavigate } from 'react-router-dom';
import { BOOK_APPOINTMENT } from '../../routes/paths';


const HeroSection = () => {
    const navigate = useNavigate();
    const handleBookAppointments = () =>{
        navigate(BOOK_APPOINTMENT);
    }
    return (
        <Row justify="center" align="middle" style={{ minHeight: '80vh', padding: '2rem', background: '#f0f2f5' }}>
        <Col span={12}>
        <Typography.Title level={1}>Welcome to HealthCare</Typography.Title>
        <Typography.Paragraph>
            World-class care for everyone. Our expert team of doctors and modern facilities ensure the best healthcare experience.
        </Typography.Paragraph>
        <Button type="primary" size="large" onClick={handleBookAppointments}>Book Appointment</Button>
        </Col>
        <Col span={12}>
        <img src={heroImage} alt="Hospital" style={{ width: '100%' }} />
        </Col>
    </Row>
    )
};

export default HeroSection;
