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
    TimePicker,
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

import {useLocation, useNavigate} from "react-router-dom";
import {SmileOutlined} from "@ant-design/icons";
import {useCallback, useEffect, useState} from "react";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Title from "antd/es/typography/Title";
import {type Doctor, fetchDoctors, selectDoctors} from "../../features/doctors/doctorsSlice.tsx";
import {selectPatient} from "../../features/PatientSlice.ts";
import DoctorCard from "./DoctorCard.tsx";

interface FinishValue {
    reason: string;
    mode: Mode;
    notes?: string;
    doc_id?: string;
    date: dayjs.Dayjs;
    startTime: dayjs.Dayjs;
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

    useEffect(() => {
        dispatch(fetchDoctors());
    }, []);

    useEffect(() => {
        setFilteredDoctors(doctors);
        setSelectedDoctor(
            doctors.find((doc) => doc.id === selectedDoctorInitialId) || null
        );
    }, [doctors]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector(selectStatus);
    const error: string | null = useAppSelector(selectError);
    const [form] = Form.useForm();
    const selectedDate = Form.useWatch("date", form);
    const mode: Mode = Form.useWatch('mode', form);

    function range(start: number, end: number) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    const disabledTime = useCallback(() => {
        const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day');
        const duration = MODE_HOURS[mode];
        const now = dayjs().get('hour');
        return {
            disabledHours: () => {
                if(now >= 9 && now < 20){
                    return [...range(0, now), ...range(20, 24)]
                }

                return [...range(0, 9), ...range(20, 24)];
            },
            disabledMinutes: (selectedHour: number) => {
                let result: number[] = [];

                if (isToday) {
                    selectedDoctor?.appointments?.forEach((appointment) => {
                        const appointmentDate = dayjs(appointment.startTime);
                        if (appointmentDate.isSame(selectedDate, "day")) {
                            const startHour = appointmentDate.get('hour');
                            const startMin = appointmentDate.get('minute');
                            const endHour = dayjs(appointment.endTime).get('hour');
                            const endMin = dayjs(appointment.endTime).get('minute');

                            if (selectedHour === startHour && selectedHour === endHour) {
                                result = [...result,...range(Math.max(0, startMin - duration + 1), endMin)];
                            } else if (selectedHour === startHour) {
                                result = [...result,...range(Math.max(0, startMin - duration + 1), 60)];
                            } else if (selectedHour === endHour) {
                                result = [...result,...range(0, endMin)];
                            }
                        }
                    });
                }

                return result;
            },
        };
    }, [selectedDate, mode]);

    const onFinish = async (value: FinishValue) => {
        if (!selectedDoctor) {
            messageApi.open({
                type: "error",
                content: "Please select a doctor.",
            });
            return;
        }

        try {
            const startDate = dayjs(value.date);

            const startTime = dayjs(value.startTime)
                .set('year', startDate.year())
                .set('month', startDate.month())
                .set('date', startDate.date());

            const resultValue: Appointment = {
                reason: value.reason || "",
                mode: value.mode || "",
                patientId: user?.id || "",
                patientName: user?.name || "",
                status: "scheduled",
                doctorId: selectedDoctor?.id || "",
                doctorName: selectedDoctor?.name || "",
                startTime: startTime.toISOString() || '',
            };

            resultValue.endTime = startTime.add(MODE_HOURS[resultValue.mode], 'minute').toISOString();


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
                icon={<SmileOutlined/>}
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
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 14},
        },
    };

    const onChange: PaginationProps["onChange"] = (page) => {
        setCurrent(page);
    };

    return (
        <>
            {contextHolder}
            <Title level={3}>Make An Appointment</Title>
            <Row justify="center" align="middle" className="book-appointment">
                <Form
                    {...formItemLayout}
                    onFinish={onFinish}
                    variant={"underlined"}
                    form={form}
                    style={{maxWidth: 800}}
                    initialValues={{variant: "underlined"}}
                >
                    <Form.Item
                        label="Your Name"
                        name="name"
                        rules={[{required: true, message: "Please input!"}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Your Reason"
                        name="reason"
                        rules={[{required: true, message: "Please input!"}]}
                    >
                        <Input/>
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
                    <Space align={"center"} wrap style={{justifyContent: "center"}}>
                        {!!paginatedDoctors.length &&
                            paginatedDoctors?.map((doc, index) => (
                              <DoctorCard key={index} doctor={doc} selectedDoctorId={selectedDoctor?.id} onSetSelectedDoctor={setSelectedDoctor}/>
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
                            style={{marginTop: "20px"}}
                        />
                    )}
                    <Divider></Divider>
                    <Form.Item
                        label="Mode"
                        name="mode"
                        rules={[{required: true, message: "Please input!"}]}
                    >
                        <Select
                            showSearch
                            disabled={!selectedDoctor}
                            value={"in-person"}
                            placeholder="Select a mode"
                            optionFilterProp="label"
                            style={{width: 120}}
                            options={[
                                {
                                    label: "In-person",
                                    value: "in_person",
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
                                    value: "home_visit",
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Select Day"
                        name="date"
                        rules={[{required: true, message: "Please input!"}]}
                    >
                        <DatePicker
                            disabled={!mode}
                            disabledDate={(current) =>
                                current && current < dayjs().startOf("day")
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Select Time"
                        name="startTime"
                        rules={[{required: true, message: "Please input!"}]}
                    >
                        <TimePicker
                            disabledTime={disabledTime}
                            disabled={!selectedDate}
                            prefix={<SmileOutlined/>}
                            format={"HH:mm"}
                        />
                    </Form.Item>

                    <Form.Item label="Notes" name="notes">
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 6, span: 16}}>
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
