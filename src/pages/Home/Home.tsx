import { Layout } from 'antd';
import HeroSection from './HeroSection';
import ServicesSection from './ServiceSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import WelcomeBanner from './WelcomeBanner';
import { Footer } from '../../components/Footer';
import './Home.css'; // Import your CSS here

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="home-layout">
      <Content className="home-content">
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
