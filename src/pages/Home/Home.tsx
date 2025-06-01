import { Layout } from 'antd';
import HeroSection from './HeroSection';
import ServicesSection from './ServiceSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import WelcomeBanner from './WelcomeBanner';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Content>
        <WelcomeBanner />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </Content>
    </Layout>
  );
};

export default Home;

