import "./BookAppointment.css";

import {
  Button,
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
} from "antd";
import {
  addAppointment,
  type Appointment,
  type Mode,
  MODE_HOURS,
  resetStatus,
  selectError,
  selectStatus,
} from "../../features/appointments/appointmentsSlice.ts";

import { useLocation, useNavigate } from "react-router-dom";
import { SmileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Title from "antd/es/typography/Title";
import {
  type Doctor,
  fetchDoctors,
  selectDoctors,
} from "../../features/doctors/doctorsSlice.tsx";
import { selectPatient } from "../../features/PatientSlice.ts";
import DoctorCard from "./DoctorCard.tsx";
import { useTranslate } from "../../context/TranslationProvider.tsx";
import { useTheme } from "../../context/theme-context.tsx";
import { getData } from "../../services/apiService.ts";

interface FinishValue {
  reason: string;
  mode: Mode;
  notes?: string;
  doc_id?: string;
  date: dayjs.Dayjs;
  startTime: string;
}

const BookAppointment = () => {
  const { translate } = useTranslate();
  const categories = [
    translate("all"),
    translate("neurology"),
    translate("psychiatry"),
    translate("plastic"),
    translate("radiology"),
    translate("pathology"),
    translate("emergency"),
    translate("dermatology"),
    translate("cardiology"),
  ];
  const location = useLocation();
  const { darkMode } = useTheme();
  const selectedDoctorInitialId = location.pathname.split("/")[2];
  const doctors = useAppSelector(selectDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const [selected, setSelectedCategory] = useState<string>("All");
  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState(1);
  const inPageCount = 8;

  const paginatedDoctors = filteredDoctors.slice(
    (current - 1) * inPageCount,
    current * inPageCount
  );

  const user = useAppSelector(selectPatient);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectStatus);
  const error: string | null = useAppSelector(selectError);
  const [form] = Form.useForm();
  const selectedDate = Form.useWatch("date", form);
  const mode: Mode = Form.useWatch("mode", form);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchDoctors());
    window.scrollTo(0, 0);
    if (!user) {
      messageApi.open({
        type: "error",
        content: "You need to log in before booking an appointment.",
      });
      return;
    }
  }, []);

  useEffect(() => {
    setFilteredDoctors(doctors);

    const doctorIndex = doctors.findIndex(
      (doc) => doc.id === selectedDoctorInitialId
    );

    if (doctorIndex !== -1) {
      const page = Math.floor(doctorIndex / inPageCount) + 1;
      setCurrent(page);
      setSelectedDoctor(doctors[doctorIndex]);
    } else {
      setSelectedDoctor(null);
    }
  }, [doctors]);

  function getTimeInterval(start: number, end: number, interval: number = 15) {
    const arr: string[] = [];
    const startMin = start * 60;
    const endMin = end * 60;
    for (let minutes = startMin; minutes < endMin; minutes += interval) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      arr.push(`${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`);
    }
    return arr;
  }

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDoctor || !selectedDate) {
        setAvailableTimes([]);
        return;
      }

      const isToday = dayjs(selectedDate).isSame(dayjs(), "day");
      const workingTimeStart =
        isToday && dayjs().get("hour") >= 9 ? dayjs().get("hour") + 1 : 9;
      const workingTimeEnd = 17;

      if (workingTimeStart > workingTimeEnd) {
        setAvailableTimes([]);
        return;
      }

      let result = getTimeInterval(
        workingTimeStart,
        workingTimeEnd,
        MODE_HOURS[mode]
      );
      const doctorAppointments = selectedDoctor.appointments || [];

      const appointmentsData: Appointment[] = await Promise.all(
        doctorAppointments.map((appointment) =>
          getData<Appointment>(appointment.appointmentId, "appointments")
        )
      );

      for (const appointment of appointmentsData) {
        if (
          dayjs(appointment.startTime).isSame(selectedDate, "day") &&
          appointment.status !== "cancelled"
        ) {
          const bookedTimeStart = dayjs(appointment.startTime);
          const bookedTimeEnd = dayjs(appointment.endTime);
          const appointmentDate = bookedTimeStart.format("YYYY-MM-DD");

          result = result.filter((time) => {
            const currentTime = dayjs(`${appointmentDate}T${time}`);
            return (
              currentTime.isBefore(bookedTimeStart) ||
              currentTime.isAfter(bookedTimeEnd) ||
              currentTime.isSame(bookedTimeEnd)
            );
          });
        }
      }

      setAvailableTimes(
        result.map((item) => {
          const [hourStr, minuteStr] = item.split(":");
          const start = dayjs(selectedDate)
            .set("hour", +hourStr)
            .set("minute", +minuteStr);
          const end = start.add(MODE_HOURS[mode], "minute");

          return `${start.format("HH:mm")}-${end.format("HH:mm")}`;
        })
      );
    };

    fetchAvailableTimes();
  }, [selectedDate, mode, selectedDoctor]);

  const onFinish = async (value: FinishValue) => {
    if (!selectedDoctor) {
      messageApi.open({
        type: "error",
        content: translate("selectDoctorError"),
      });
      return;
    }
    if (!user) {
      messageApi.open({
        type: "error",
        content: "You need to log in before booking an appointment.",
      });
      return;
    }

    try {
      const startDate = dayjs(value.date);
      const start = value.startTime.split(":");

      const startTime = startDate
        .set("hour", +start[0])
        .set("minute", +start[1]);

      const resultValue: Appointment = {
        reason: value.reason || "",
        mode: value.mode || "",
        patientId: user?.doc_id || "",
        patientName: user?.name || "",
        status: "scheduled",
        doctorId: selectedDoctor?.id || "",
        doctorName: selectedDoctor?.name || "",
        startTime: startTime.toISOString() || "",
      };

      resultValue.endTime = startTime
        .add(MODE_HOURS[resultValue.mode], "minute")
        .toISOString();

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
    } finally {
      form.resetFields();
      setSelectedDoctor(null);
      setSelectedCategory("All");
    }
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
        title={translate("successTitle")}
        extra={
          <Button type="primary" onClick={handleProfileClick}>
            {translate("goToProfile")}
          </Button>
        }
      />
    );
  } else if (status === "failed") {
    return (
      <Result
        status="error"
        title={translate("submissionFailed")}
        subTitle={error}
        extra={
          <Button type="primary" onClick={handleProfileClick}>
            {translate("goToProfile")}
          </Button>
        }
      />
    );
  } else if (status === "loading") {
    return (
      <Spin tip={translate("bookingAppointment")} fullscreen>
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
          style={{ maxWidth: 800 }}
          initialValues={{ variant: "underlined" }}
        >
          <Form.Item
            label={translate("yourName")}
            name="name"
            rules={[{ required: true, message: translate("inputRequired") }]}
          >
            <Input style={{ background: darkMode ? "#101832" : "#f5f5f5" }} />
          </Form.Item>
          <Form.Item
            label={translate("yourReason")}
            name="reason"
            rules={[{ required: true, message: translate("inputRequired") }]}
          >
            <Input style={{ background: darkMode ? "#101832" : "#f5f5f5" }} />
          </Form.Item>

          <Divider>{translate("category")}</Divider>
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
          <Divider>{translate("doctors")}</Divider>
          <Space align={"center"} wrap style={{ justifyContent: "center" }}>
            {!!paginatedDoctors.length &&
              paginatedDoctors?.map((doc, index) => (
                <DoctorCard
                  key={index}
                  doctor={doc}
                  selectedDoctorId={selectedDoctor?.id}
                  onSetSelectedDoctor={setSelectedDoctor}
                />
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
            label={translate("mode")}
            name="mode"
            rules={[{ required: true, message: translate("inputRequired") }]}
          >
            <Select
              showSearch
              disabled={!selectedDoctor}
              value={"in-person"}
              placeholder={translate("selectMode")}
              optionFilterProp="label"
              style={{ width: 200 }}
              options={Object.entries(MODE_HOURS).map(([key, value]) => ({
                label: key.split("_").join(" ") + ` - ${value}min`,
                value: key,
              }))}
            />
          </Form.Item>

          <Form.Item
            label={translate("selectDay")}
            name="date"
            rules={[{ required: true, message: translate("inputRequired") }]}
          >
            <DatePicker
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
              disabled={!mode}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
          <Form.Item
            label={translate("selectTime")}
            name="startTime"
            rules={[{ required: true, message: translate("inputRequired") }]}
          >
            <Select
              showSearch
              placeholder={translate("selectTime")}
              optionFilterProp="label"
              style={{ width: 150 }}
              options={availableTimes.map((time) => ({
                label: time,
                value: time.split("-")[0],
              }))}
            />
          </Form.Item>

          <Form.Item label={translate("notes1")} name="notes">
            <Input.TextArea
              style={{ background: darkMode ? "#101832" : "#f5f5f5" }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {translate("submit")}
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default BookAppointment;
