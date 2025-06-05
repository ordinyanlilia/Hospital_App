import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../services/apiService";
import { Card, Row, Col, Typography, Button, Calendar } from "antd";
import defaultDoctorImage from "../../assets/Doctors/user.png";
import { DoctorCard } from "../FindDoctor/DoctorCard";
import "./DoctorInfo.css";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";


const { Title, Paragraph } = Typography;

export interface Doctor {
  name?: string;
  surname?: string;
  specialty?: string;
  photoUrl?: string;
  gender?: string;
  email?: string;
  doc_id?: string;
  yearsOfExperience?: number;
  bio?: string;
  id?: string;
}

const DoctorInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [otherDoctors, setOtherDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const loadAppointments = async () => {
        const allAppointments = await fetchData("appointments");
        const filtered = allAppointments.filter((a) => a.doc_id === id);
        setAppointments(filtered);
        console.log(filtered);
    };
    loadAppointments();
  }, [id]);

  useEffect(() => {
    const loadDoctors = async () => {
        const doctors: Doctor[] = await fetchData("doctors");
        const selected = doctors.find((doc) => doc.id === id);
        const others = doctors.filter((doc) => doc.id !== id);

        const randomThree = others.sort(() => 0.5 - Math.random()).slice(0, 3);

        setDoctor(selected || null);
        setOtherDoctors(randomThree);
    };

    loadDoctors();
  }, [id]);


const getDateStatus = (date: Dayjs) => {
  const dayAppointments = appointments.filter((ap) =>
    dayjs(ap.date).isSame(date, "day")
  );
  console.log("Checking date:", date.format("YYYY-MM-DD"));
  console.log("Appointments on this day:", dayAppointments);

  if (dayAppointments.length === 0) return "free";
  if (dayAppointments.length >= 10) return "full";
  return "partial";
};


  const cellRender = (date: Dayjs) => {
    const status = getDateStatus(date);

    let color = "";
    let text = "";

    switch (status) {
      case "free":
        color = "white";
        text = "Free";
        break;
      case "partial":
        color = "#cceeff";
        text = "Partially booked";
        break;
      case "full":
        color = "#1890ff";
        text = "Fully booked";
        break;
    }

    return (
      <div
        style={{
          backgroundColor: color,
          padding: "2px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <small>{text}</small>
      </div>
    );
  };



  if (!doctor) return <Title level={3}>Doctor not found</Title>;

  return (
    <div className="doctor-info-container">
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Card className="doctor-info-main-card">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} sm={8} md={6} lg={5}>
                <img
                  src={doctor.photoUrl || defaultDoctorImage}
                  alt="Doctor"
                  className="doctor-profile-image"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #fff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Col>
              <Col xs={24} sm={16} md={12} lg={12}>
                <img
                  src="https://res.cloudinary.com/healthcareintern/image/upload/v1748777274/hospitalimage_ziik5y.avif"
                  alt="Hospital"
                  className="hospital-banner"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />

                <Title level={3}>
                  Dr. {doctor.name} {doctor.surname}
                </Title>
                <Paragraph>
                  <strong>Specialty:</strong> {doctor.specialty}
                </Paragraph>
                <Paragraph>
                  <strong>Experience:</strong> {doctor.yearsOfExperience} years
                </Paragraph>
                <Paragraph>
                  <strong>Gender:</strong> {doctor.gender}
                </Paragraph>
                <Paragraph>
                  <strong>Email:</strong> {doctor.email}
                </Paragraph>
                <Paragraph>
                  <strong>Bio:</strong> {doctor.bio}
                </Paragraph>
                <Paragraph>
                  <strong>Working Hours:</strong>
                  <br />
                  Mon–Fri: 09:00 – 17:00 <br />
                  Sat: 10:00 – 14:00
                </Paragraph>
                <Button type="primary" onClick={() => navigate(`/book-appointment/${id}`)}>
                    Book Appointment
                </Button>

              </Col>

              <Col xs={24} sm={24} md={6} lg={7}>
                <Title level={5}>Availability Calendar</Title>
                <Calendar fullscreen={false} cellRender={cellRender} />

                <div style={{ marginTop: "16px" }}>
                  <Title level={5}>Availability status</Title>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "16px", height: "16px", backgroundColor: "white", border: "1px solid #ccc" }} />
                      <span>Free</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "16px", height: "16px", backgroundColor: "#cceeff" }} />
                      <span>Partially booked</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "16px", height: "16px", backgroundColor: "#1890ff" }} />
                      <span>Fully booked</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Title level={4} className="recommended-title">
        Other Recommended Doctors
      </Title>
      <Row gutter={[24, 24]} className="recommended-doctors">
        {otherDoctors.map((doc) => (
          <Col span={24} sm={12} md={8} key={doc.id}>
            <DoctorCard doctor={doc} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DoctorInfo;