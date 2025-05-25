import { useEffect, useState } from "react";
import { fetchData } from "../../services/apiService";
import { Input, Select, Button, Row, Col } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import "./FindDoctor.css";
// import lifeLineHeart from "../../assets/icons/lifeline-heart.png";
import { DoctorCard } from "./DoctorCard";
import { Footer } from "./Footer";

type Doctor = {
  name?: string;
  surname?: string;
  specialty?: string;
  photoUrl?: string;
  gender?: string;
  email?: string;
  doc_id?: string;
  yearsOfExperience?: number;
  bio?: string;
};

const FindDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchByName, setSearchByName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchData("doctors");
        setDoctors(data as Doctor[]);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  if (loading) return <p>Is Loading...</p>;

  const filterDoctors = () => {
    const filtered = doctors.filter((doctor) => {
      const fullName = `${doctor.name ?? ""} ${
        doctor.surname ?? ""
      }`.toLowerCase();
      const matchesName = fullName.includes(searchByName.toLowerCase());
      const matchesSpecialty = selectedSpecialty
        ? doctor.specialty?.toLowerCase() === selectedSpecialty.toLowerCase()
        : true;

      const matchesGender = selectedGender
        ? doctor.gender?.toLowerCase() === selectedGender.toLowerCase()
        : true;

      return matchesName && matchesSpecialty && matchesGender;
    });
    setFilteredDoctors(filtered);
  };
  return (
    <>
      <div className="find-doctor-container">
        <Input
          className="find-doctor-input"
          placeholder="Search By Name"
          prefix={<SearchOutlined />}
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />

        <Select
          showSearch
          className="find-doctor-select"
          placeholder="Select Speciality"
          value={selectedSpecialty}
          onChange={(value) => setSelectedSpecialty(value)}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "Neurology",
              label: "Neurology",
            },
            {
              value: "Psychiatry",
              label: "Psychiatry",
            },
            {
              value: "Radiology",
              label: "Radiology",
            },
            {
              value: "Pathology",
              label: "Pathology",
            },
            {
              value: "Emergency Medicine",
              label: "Emergency Medicine",
            },
            {
              value: "Cardiology",
              label: "Cardiology",
            },
          ]}
        />

        <Select
          showSearch
          className="find-doctor-select"
          prefix={<UserOutlined />}
          placeholder="Select Gender"
          value={selectedGender}
          onChange={(value) => setSelectedGender(value)}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "Male",
              label: "Male",
            },
            {
              value: "Female",
              label: "Female",
            },
          ]}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={filterDoctors}
        >
          Search
        </Button>
      </div>
      <div className="container">
        <Row gutter={[16, 16]} justify="start">
          {filteredDoctors.length > 0
            ? filteredDoctors.map((doctor) => (
                <Col key={doctor.doc_id} xs={24} sm={24} md={8} lg={8}>
                  <DoctorCard doctor={doctor} />
                </Col>
              ))
            : doctors.map((doctor) => (
                <Col key={doctor.doc_id} xs={24} sm={24} md={8} lg={8}>
                  <DoctorCard doctor={doctor} />
                </Col>
              ))}
        </Row>
      </div>
      <div className="footer">
        {" "}
        <Footer />
      </div>
    </>
  );
};

export default FindDoctor;
