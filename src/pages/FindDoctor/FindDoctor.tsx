import { useEffect, useState } from "react";
import { Input, Select, Button, Row, Col, Pagination } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "./FindDoctor.css";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { DoctorCard } from "./DoctorCard";
import type { RootState } from "../../app/store";
import { fetchDoctors } from "../../features/doctors/doctorsSlices";

type Doctor = {
  id?: string;
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
  const dispatch = useAppDispatch();
  const doctors = useSelector((state: RootState) => state.doctors.doctors);
  const loading = useSelector((state: RootState) => state.doctors.isLoading);
  const [searchByName, setSearchByName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [noDoctorsFound, setNoDoctorsFound] = useState(false);

  const paginatedDoctors = (
    filteredDoctors.length > 0 ? filteredDoctors : doctors
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

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
    setCurrentPage(1);
    setNoDoctorsFound(filtered.length === 0);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      filterDoctors();
    }
  }, [doctors]);

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
          allowClear
          className="find-doctor-select"
          placeholder="Select Speciality"
          prefix={<SnippetsOutlined />}
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
            {
              value: "Plastic Surgery",
              label: "Plastic Surgery",
            },
            {
              value: "Dermatology",
              label: "Dermatology",
            },
          ]}
        />

        <Select
          allowClear
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
          loading={loading}
        >
          Search
        </Button>
      </div>
      <div className="container">
        {noDoctorsFound ? (
          <p>Oops! We couldn’t find any doctors matching your search.</p>
        ) : (
          <Row gutter={[16, 16]} justify="start">
            {paginatedDoctors.map((doctor) => (
              <Col key={doctor.doc_id} xs={24} sm={24} md={8} lg={8}>
                <DoctorCard doctor={doctor} />
              </Col>
            ))}
          </Row>
        )}
        {!noDoctorsFound && (
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={
                filteredDoctors.length > 0
                  ? filteredDoctors.length
                  : doctors.length
              }
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FindDoctor;
