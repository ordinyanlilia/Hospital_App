import { useEffect, useState } from "react";
import { Input, Select, Button, Row, Col, Pagination, Spin } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "./FindDoctor.css";
import { DoctorCard } from "./DoctorCard";
import {
  type Doctor,
  selectLoading,
  selectDoctors,
} from "../../features/doctors/doctorsSlice.tsx";
import { fetchDoctors } from "../../features/doctors/doctorsSlice.tsx";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import { useTranslate } from "../../context/TranslationProvider.tsx";
import { transliterate as tr } from 'transliteration';

const FindDoctor = () => {
  const dispatch = useAppDispatch();
  const doctors = useAppSelector(selectDoctors);
  const loading = useAppSelector(selectLoading);
  const [searchByName, setSearchByName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [noDoctorsFound, setNoDoctorsFound] = useState(false);
  const { translate } = useTranslate();

  const paginatedDoctors = (
    filteredDoctors.length > 0 ? filteredDoctors : doctors
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);
  const normalize = (str: string) => tr(str.toLowerCase().trim().replace(/\s+/g, ""));

  const filterDoctors = () => {
    const filtered = doctors.filter((doctor) => {
      const fullName = `${doctor.name ?? ""} ${doctor.surname ?? ""}`.toLowerCase();

      const matchesName = normalize(fullName).includes(normalize(searchByName));
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

  if (loading) {
    return <Spin />;
  }
  return (
    <>
      <div className="find-doctor-container">
        <Input
          className="find-doctor-input"
          placeholder= {translate("search_placeholder")}
          prefix={<SearchOutlined />}
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />

        <Select
          showSearch
          allowClear
          className="find-doctor-select"
          placeholder={translate("specialty_placeholder")}
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
              label: translate("neurology"),
            },
            {
              value: "Psychiatry",
              label: translate("psychiatry"),
            },
            {
              value: "Radiology",
              label: translate("radiology"),
            },
            {
              value: "Pathology",
              label: translate("pathology"),
            },
            {
              value: "Emergency Medicine",
              label: translate("emergency"),
            },
            {
              value: "Cardiology",
              label: translate("cardiology"),
            },
            {
              value: "Plastic Surgery",
              label: translate("plastic"),
            },
            {
              value: "Dermatology",
              label: translate("dermatology"),
            },
          ]}
        />

        <Select
          allowClear
          showSearch
          className="find-doctor-select"
          prefix={<UserOutlined />}
          placeholder={translate("gender_placeholder")}
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
              label: translate("male"),
            },
            {
              value: "Female",
              label: translate("female"),
            },
          ]}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={filterDoctors}
        >
          {translate("search")}
        </Button>
      </div>
      <div className="container">
        {noDoctorsFound ? (
          <p>{translate("noDoctor")}</p>
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
