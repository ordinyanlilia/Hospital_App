import { Layout } from 'antd';
import HeroSection from './HeroSection';
import ServicesSection from './ServiceSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import WelcomeBanner from './WelcomeBanner';
import { Footer } from 'antd/es/layout/layout';

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
        <Footer />
      </Content>
    </Layout>
  );
};

export default Home;
