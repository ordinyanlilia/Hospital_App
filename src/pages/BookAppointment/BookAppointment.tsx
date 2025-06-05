import "./BookAppointment.css";

import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Pagination,
  type PaginationProps,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  TimePicker,
} from "antd";
import {
  addAppointment,
  type Appointment,
  resetStatus,
  selectError,
  selectStatus,
} from "../../features/appointments/appointmentsSlice.ts";

import { useLocation, useNavigate } from "react-router-dom";
import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Title from "antd/es/typography/Title";
import type { Doctor } from "../../features/doctors/doctorsSlice.tsx";
import { fetchData } from "../../services/apiService.ts";
import { selectPatient } from "../../features/PatientSlice.ts";
import { useTheme } from "../../context/theme-context.tsx";
import { color } from "framer-motion";
interface FinishValue {
  DatePicker?: dayjs.Dayjs | null;
  TimePicker?: dayjs.Dayjs | null;
  reason: string;
  mode: string;
  notes?: string;
  doc_id?: string;
  date: string;
  time?: string;
}

const BookAppointment = () => {
  const categories = [
    "All",
    "Neurology",
    "Psychiatry",
    "Plastic Surgery",
    "Radiology",
    "Pathology",
    "Emergency Medicine",
    "Dermatology",
    "Cardiology",
  ];
  const location = useLocation();

  const selectedDoctorInitialId = location.pathname.split("/")[2];
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selected, setSelectedCategory] = useState<string>("All");
  const [messageApi, contextHolder] = message.useMessage();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [current, setCurrent] = useState(1);
  const inPageCount = 8;
  const paginatedDoctors = filteredDoctors.slice(
    (current - 1) * inPageCount,
    current * inPageCount
  );
  const user = useAppSelector(selectPatient);
  const { darkMode } = useTheme();
  useEffect(() => {
    fetchData<Doctor>("doctors").then((data: Doctor[]) => {
      setDoctors(data);
      setFilteredDoctors(data);
      setSelectedDoctor(
        data.find((doc) => doc.id === selectedDoctorInitialId) || null
      );
    });
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectStatus);
  const error: string | null = useAppSelector(selectError);
  const [form] = Form.useForm();

  const disabledTime = () => ({
    disabledHours: () => {
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < 9 || hour > 17
      );
    },
  });

  const onFinish = async (value: FinishValue) => {
    if (!selectedDoctor) {
      messageApi.open({
        type: "error",
        content: "Please select a doctor.",
      });
      return;
    }

    try {
      const date = dayjs(value.date);
      const time = dayjs(value.time);

      const combinedDateTime = date
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second())
        .toDate()
        .toISOString();

      delete value.DatePicker;
      delete value.TimePicker;

      const resultValue: Appointment = {
        reason: value.reason || "",
        mode: value.mode || "",
        date: combinedDateTime,
        patientId: user?.id || "",
        patientName: user?.name || "",
        status: "scheduled",
        doctorId: selectedDoctor?.id || "",
        doctorName: selectedDoctor?.name || "",
      };

      if (value.notes) {
        resultValue.notes = value.notes;
      }

      await dispatch(
        addAppointment({
          appointment: resultValue,
          doctor_doc_id: selectedDoctor?.doc_id ?? "",
          user_doc_id: user?.doc_id ?? "",
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
    form.resetFields();
    setSelectedDoctor(null);
    setSelectedCategory("All");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    dispatch(resetStatus());
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrent(1);

    if (category === "All") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors?.filter(
        (doctor) => doctor.specialty === category
      );
      setFilteredDoctors(filtered);
    }
  };

  if (status === "succeeded") {
    return (
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        extra={
          <Button type="primary" onClick={handleProfileClick}>
            Go to Profile
          </Button>
        }
      />
    );
  } else if (status === "failed") {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle={error}
        extra={
          <Button type="primary" onClick={handleProfileClick}>
            Go to Profile
          </Button>
        }
      />
    );
  } else if (status === "loading") {
    return (
      <Spin tip="Booking appointment..." fullscreen>
        <div
          style={{
            padding: 50,
            background: "#55afb7",
            borderRadius: 4,
          }}
        />
      </Spin>
    );
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  return (
    <>
      {contextHolder}
      <Title level={3}>Make An Appointment</Title>
      <Row
        justify="center"
        align="middle"
        className="book-appointment"
        style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
      >
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          variant={"underlined"}
          form={form}
          style={{
            maxWidth: 800,
            background: darkMode ? "#101832" : "#f5f5f5",
          }}
          initialValues={{ variant: "underlined" }}
        >
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input style={{ background: darkMode ? "#101832" : "#f5f5f5" }} />
          </Form.Item>
          <Form.Item
            label="Your Reason"
            name="reason"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input style={{ background: darkMode ? "#101832" : "#f5f5f5" }} />
          </Form.Item>

          <Divider>Category</Divider>
          <Space wrap>
            {categories.map((category) => (
              <Tag.CheckableTag
                key={category}
                checked={category === selected}
                onChange={() => handleCategorySelect(category)}
                style={{
                  borderRadius: "20px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                {category}
              </Tag.CheckableTag>
            ))}
          </Space>
          <Divider>Doctors</Divider>
          <Space align={"center"} wrap style={{ justifyContent: "center" }}>
            {!!paginatedDoctors.length &&
              paginatedDoctors?.map((doc, index) => (
                <Card
                  key={index}
                  hoverable
                  style={{
                    borderColor:
                      doc.id === selectedDoctor?.id ? "#1890ff" : "#707070",
                    color:
                      doc.id === selectedDoctor?.id ? "#1890ff" : "#707070",
                    boxShadow:
                      doc.id === selectedDoctor?.id
                        ? "0 0 3px #1890ff"
                        : "0 0 10px #e6f7ff",
                  }}
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <Card.Meta
                    avatar={
                      <Avatar
                        size={{ md: 50, lg: 64, xl: 70, xxl: 90 }}
                        src={doc?.photoUrl}
                        style={{ backgroundColor: "rgba(96,150,186,0.75)" }}
                        icon={
                          !doc?.photoUrl && (
                            <UserOutlined
                              style={{ fontSize: "30px", color: "#fffefe" }}
                            />
                          )
                        }
                      />
                    }
                    title={doc.name}
                    className={"doc-info-card"}
                    description={
                      <>
                        <div>{doc.specialty}</div>
                      </>
                    }
                  />
                </Card>
              ))}
            {!paginatedDoctors.length && <Spin></Spin>}
          </Space>
          {filteredDoctors?.length > inPageCount && (
            <Pagination
              align={"center"}
              current={current}
              total={filteredDoctors?.length}
              pageSize={inPageCount}
              onChange={onChange}
              style={{ marginTop: "20px" }}
            />
          )}
          <Divider></Divider>
          <Form.Item
            label="Mode"
            name="mode"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              showSearch
              value={"in-person"}
              placeholder="Select a mode"
              optionFilterProp="label"
              style={{
                width: 120,
                background: darkMode ? "#101832" : "#f5f5f5",
              }}
              options={[
                {
                  label: "In-person",
                  value: "in-person",
                },
                {
                  label: "Online",
                  value: "online",
                },
                {
                  label: "Phone Call",
                  value: "phone",
                },
                {
                  label: "Home Visit",
                  value: "home-visit",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="DatePicker"
            name="DatePicker"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
            />
          </Form.Item>
          <Form.Item
            label="TimePicker"
            name="TimePicker"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <TimePicker
              disabledTime={disabledTime}
              prefix={<SmileOutlined />}
              format={"HH:mm"}
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
            />
          </Form.Item>

          <Form.Item
            label="Notes"
            name="notes"
            style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
          >
            <Input.TextArea
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default BookAppointment;
