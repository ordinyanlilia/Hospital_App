import { Card, Typography, Carousel } from 'antd';
import React from 'react';

import Slide4 from '../../assets/young-handsome-physician-medical-robe-with-stethoscope.jpg';
// import Slide2 from '../../assets/hospital1-image.jpg';
// import Slide3 from '../../assets/hospital2-image.jpg';
import Slide1 from '../../assets/hospital3-image.jpg';
import Slide5 from '../../assets/care-job-scene-with-patient-being-cared.jpg';

const WelcomeBanner: React.FC = () => {
  return (
    <div style={{ padding: '3rem 2rem', background: '#f5f5f5' }}>
      {/* Welcome Message */}
      <Card
        bordered={false}
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography.Title level={2}>Welcome to Healthcare</Typography.Title>
        <Typography.Paragraph style={{ fontSize: '16px' }}>
          We are committed to delivering compassionate and world-class medical care.
          Explore our services, meet our expert team, and discover how we put your health first.
        </Typography.Paragraph>
      </Card>

      {/* Carousel Under the Card */}
      <div style={{ marginTop: '2rem' }}>
        <Carousel autoplay dots>
          {[Slide1, Slide4, Slide5].map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomeBanner;
