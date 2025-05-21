import "./LeftPanel.css";

const LeftPanel: React.FC = () => {
  return (
    <div className="leftPanel-container">
      <div className="leftPanel-content">
        <div className="doctor-info-container">
            <div className="doctor-info-image">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg" alt="doctor's picture" />
            </div>
            <div className="doctor-info-text">
                <span>Dr. Strange</span>
                <span>Dentist</span>
            </div>
       </div>

       

      </div>
    </div>
  );
};

export default LeftPanel;
