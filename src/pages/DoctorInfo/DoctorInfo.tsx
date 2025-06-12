import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/apiService";
import { Card, Row, Col, Typography, Button, Calendar } from "antd";
import { DoctorCard } from "../FindDoctor/DoctorCard";
import "./DoctorInfo.css";
import dayjs, { Dayjs } from "dayjs";
import type { Appointment } from "../../features/appointments/appointmentsSlice.ts";
import { useTranslate } from "../../context/TranslationProvider.tsx";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      const allAppointments = await fetchData<Appointment>("appointments");
      const filtered = allAppointments.filter((doc) => doc.doc_id === id);
      setAppointments(filtered);
      console.log("Appointments:", filtered);
    };
    loadAppointments();
  }, [id]);

  useEffect(() => {
  const loadDoctors = async () => {
    setLoading(true);
    const doctors: Doctor[] = await fetchData("doctors");
    const selected = doctors.find((doc) => doc.id === id);
    const others = doctors.filter((doc) => doc.id !== id);
    const randomThree = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    setDoctor(selected || null);
    setOtherDoctors(randomThree);
    setLoading(false);
  };
  loadDoctors();
}, [id]);

const getDateStatus = (date: Dayjs) => {
  const sameDayAppointments = appointments.filter((ap) => {
    const apDate = dayjs(ap.startTime);
    return apDate.isSame(date, "day");
  });

  if (sameDayAppointments.length === 0) return "free";
  if (sameDayAppointments.length >= 10) return "full";
  return "partial";
};



  const cellRender = (date: Dayjs) => {
    const status = getDateStatus(date);

    let color = "";
    let text = "";

    switch (status) {
      case "free":
        color = "white";
        text = translate("free");
        break;
      case "partial":
        color = "#cceeff";
        text = translate("partially");
        break;
      case "full":
        color = "#1890ff";
        text = translate("fully");
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

  if (loading) {
  return <Title level={2}>{translate("loading")}...</Title>;
}

if (!doctor) {
  return <Title level={3}>{translate("doctorNotFound")}</Title>;
}


  return (
    <div className="doctor-info-container">
      <Row gutter={[32, 32]} >
        <Col span={24}>
          <Card className="doctor-info-main-card">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} sm={8} md={6} lg={5}>
                <img
                  src={
                    doctor.photoUrl ||
                    "https://res.cloudinary.com/healthcareintern/image/upload/v1748634566/59e12228-35cd-4554-956a-7dec683aa497_fbfgrc.png"
                  }
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
                  <strong>{translate("specialty")}:</strong> {doctor.specialty}
                </Paragraph>
                <Paragraph>
                  <strong>{translate("experience")}:</strong>{" "}
                  {doctor.yearsOfExperience} {translate("years")}
                </Paragraph>
                <Paragraph>
                  <strong>{translate("gender")}:</strong> {doctor.gender}
                </Paragraph>
                <Paragraph>
                  <strong>{translate("mail")}:</strong> {doctor.email}
                </Paragraph>
                <Paragraph>
                  <strong>{translate("bio")}:</strong> {doctor.bio}
                </Paragraph>
                <Paragraph>
                  <strong>{translate("workingHours")}:</strong>
                  <br />
                  {translate("workingTime1")}
                  <br />
                  {translate("workingTime2")}
                </Paragraph>
                <Button
                  type="primary"
                  onClick={() => navigate(`/book-appointment/${id}`)}
                >
                  {translate("bookAppointment")}
                </Button>
              </Col>
              <Col xs={24} sm={24} md={6} lg={7}>
                <Title level={5}>{translate("avCalendar")}</Title>
                <Calendar fullscreen={false} cellRender={cellRender}/>
                <div style={{ marginTop: "16px" }}>
                  <Title level={5}>{translate("avStatus")}</Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                        }}
                      />
                      <span>{translate("free")}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#cceeff",
                        }}
                      />
                      <span>{translate("partially")}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#1890ff",
                        }}
                      />
                      <span>{translate("fully")}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Title level={4} className="recommended-title">
        {translate("recDoctors")}
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
