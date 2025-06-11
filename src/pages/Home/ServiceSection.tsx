import { Card, Col, Row, Typography } from 'antd';
import EmergencyImage from '../../assets/emergency-image.jpg';
import CardiologyImage from '../../assets/cardiology-image.jpg';
import OrthopedicsImage from '../../assets/orthopedic-image.jpg';
import "./ServiceSection.css";

const services = [
    {
        title: 'Emergency',
        img: EmergencyImage,
        description: 'Our Emergency specialists provide rapid, expert care for urgent medical conditions, available 24/7 to save lives.'
    },
    {
        title: 'Cardiology',
        img: CardiologyImage,
        description: 'Our Cardiology experts offer advanced heart care, focusing on diagnosis, treatment, and prevention of cardiovascular diseases.'
    },
    {
        title: 'Orthopedics',
        img: OrthopedicsImage,
        description: 'Our Orthopedics team delivers personalized treatment for bone, joint, and muscle disorders to restore your mobility and comfort.'
    },
];

const ServicesSection = () => {
    return (
        <div className="services-section">
            <Typography.Title level={2} className="services-title">
                Our Services
            </Typography.Title>

            <Row gutter={[24, 24]} justify="center">
                {services.map((service, index) => (
                    <Col key={index} xs={24} sm={24} md={8}>
                        <div className="card-wrapper">
                            <Card
                                className="service-card"
                                cover={<img alt={service.title} src={service.img} className="service-image" />}
                            >
                                <Card.Meta
                                    title={<span className="service-card-title">{service.title}</span>}
                                    description={<p className="service-card-description">{service.description}</p>}
                                />
                            </Card>
                        </div>
                    </Col>

                ))}
            </Row>
        </div>
    );
};

export default ServicesSection;
