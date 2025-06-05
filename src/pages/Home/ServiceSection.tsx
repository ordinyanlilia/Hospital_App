import { Card, Typography, Carousel } from "antd";
import EmergencyImage from "../../assets/emergency-image.jpg";
import CardiologyImage from "../../assets/cardiology-image.jpg";
import OrthopedicsImage from "../../assets/orthopedic-image.jpg";
import { useTheme } from "../../context/theme-context";

const services = [
  { title: "Emergency", img: EmergencyImage },
  { title: "Cardiology", img: CardiologyImage },
  { title: "Orthopedics", img: OrthopedicsImage },
];

const ServicesSection = () => {
  const { darkMode } = useTheme();
  return (
    <div
      style={{
        padding: "4rem 2rem",
        background: darkMode ? "#101832" : "#f5f5f5",
      }}
    >
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Our Services
      </Typography.Title>

      <Carousel autoplay dots>
        {services.map((service) => (
          <div key={service.title} style={{ padding: "0 2rem" }}>
            <Card
              cover={
                <img
                  alt={service.title}
                  src={service.img}
                  style={{ height: 300, objectFit: "cover" }}
                />
              }
              style={{ maxWidth: 400, margin: "0 auto" }}
            >
              <Card.Meta title={service.title} />
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ServicesSection;

// import { Card, Typography, Carousel } from 'antd';
// import EmergencyImage from '../../assets/emergency-image.jpg';
// import CardiologyImage from '../../assets/cardiology-image.jpg';
// import OrthopedicsImage from '../../assets/orthopedic-image.jpg';
// // import NeurologyImage from '../../assets/neurology-image.jpg';
// // import PediatricsImage from '../../assets/pediatrics-image.jpg';

// const services = [
//   { title: 'Emergency', img: EmergencyImage },
//   { title: 'Cardiology', img: CardiologyImage },
//   { title: 'Orthopedics', img: OrthopedicsImage },
// //   { title: 'Neurology', img: NeurologyImage },
// //   { title: 'Pediatrics', img: PediatricsImage },
// ];

// // Utility function to chunk array into groups of N
// function chunkArray<T>(arr: T[], size: number): T[][] {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// }

// const chunkedServices = chunkArray(services, 2);

// const ServicesSection = () => (
//   <div style={{ padding: '4rem 2rem', background: '#fff' }}>
//     <Typography.Title level={2} style={{ textAlign: 'center' }}>
//       Our Services
//     </Typography.Title>

//     <Carousel autoplay dots>
//       {chunkedServices.map((servicePair, index) => (
//         <div key={index}>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
//             {servicePair.map(service => (
//               <Card
//                 key={service.title}
//                 hoverable
//                 cover={
//                   <img
//                     alt={service.title}
//                     src={service.img}
//                     style={{ height: 300, objectFit: 'cover' }}
//                   />
//                 }
//                 style={{
//                   width: 350,
//                   transition: 'transform 0.3s ease',
//                   cursor: 'pointer',
//                 }}
//                 bodyStyle={{ textAlign: 'center' }}
//                 onMouseEnter={e => {
//                   (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
//                 }}
//                 onMouseLeave={e => {
//                   (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
//                 }}
//               >
//                 <Card.Meta title={service.title} />
//               </Card>
//             ))}
//           </div>
//         </div>
//       ))}
//     </Carousel>
//   </div>
// );

// export default ServicesSection;
