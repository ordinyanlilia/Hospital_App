import { Layout } from "antd";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServiceSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import WelcomeBanner from "./WelcomeBanner";
import { useTheme } from "../../context/theme-context";
import "./Home.css";

const { Content } = Layout;

const Home = () => {
  const { darkMode } = useTheme();
  return (
    <Layout className={`home-layout ${darkMode ? "dark-mode" : ""}`}>
      <Content className="home-content">
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
