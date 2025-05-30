import './BookAppointment.css';

import {
    Button,
    Card,
    DatePicker,
    Divider,
    Form,
    Input,
    message,
    Result,
    Row,
    Select,
    Space,
    Spin,
    Tag,
    TimePicker
} from "antd";
import {
    addAppointment,
    type Appointment,
    resetStatus,
    selectError,
    selectStatus
} from '../../features/appointments/appointmentsSlice.ts';

import {useNavigate} from "react-router-dom";
import {SmileOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchData} from "../../services/apiService.ts";
import {Timestamp} from 'firebase/firestore';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Title from "antd/es/typography/Title";


interface Doctor {
    doc_id: string;
    id: string;
    name: string;
    surname: string;
    specialty: string;
    appointments: string[];
    yearsOfExperience: number;
}

const BookAppointment = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>(doctors);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

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

    const categories = [
        'All',
        'Neurology',
        'Psychiatry',
        'Plastic Surgery',
        'Radiology',
        'Pathology',
        'Emergency Medicine',
        'Dermatology',
        'Cardiology',
    ];

    const [selected, setSelectedCategory] = useState<string>('All');
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        fetchData<Doctor>('doctors').then((data: Doctor[]) => {
            setDoctors(data)
            setSelectedDoctors(data);
            setSelectedDoctor(null)
        })
    }, []);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector(selectStatus);
    const error: string | null = useAppSelector(selectError);
    const [form] = Form.useForm();

    const disabledTime = () => ({
        disabledHours: () => {
            return Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < 9 || hour > 17);
        },
    });

    const onFinish = async (value) => {
        if (!selectedDoctor) {
            messageApi.open({
                type: 'error',
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
                .toDate();

            delete value.DatePicker;
            delete value.TimePicker;

            const timestamp = Timestamp.fromDate(combinedDateTime);

            const resultValue: Appointment = {
                reason: value.reason,
                mode: value.mode,
                date: timestamp,
                patientId: '1',
                patientName: 'Mariam',
                status: 'scheduled',
                doctorId: selectedDoctor?.id,
                doctorName: selectedDoctor?.name,
            };

            if(value.notes){
               resultValue.notes = value.notes;
            }

            await dispatch(addAppointment(resultValue)).unwrap()

        } catch (error) {
            console.log(error);
        }
        form.resetFields();
        setSelectedDoctor(null);
        setSelectedCategory('All');
    };

    const handleClick = () => {
        navigate('/profile');
        dispatch(resetStatus());
    }

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);

        if (category === 'All') {
            setSelectedDoctors(doctors);
        } else {
            setSelectedDoctors(doctors.filter(doctor => doctor.specialty === category));

        }
    }

    if (status === 'succeeded') {
        return (
            <Result
                icon={<SmileOutlined/>}
                title="Great, we have done all the operations!"
                extra={<Button type="primary" onClick={handleClick}>Next</Button>}
            />
        )
    } else if (status === 'failed') {
        return (<Result
            status="error"
            title="Submission Failed"
            subTitle={error}
            extra={
                <Button type="primary" onClick={handleClick}>Next</Button>
            }
        />)
    } else if (status === 'loading') {
        return <Spin tip="Booking appointment..." fullscreen>
            <div style={{
                padding: 50,
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 4
            }}/>
        </Spin>;
    }

    return (
        <>
            {contextHolder}
            <Title level={3}>Make An Appointment</Title>
            <Row justify="center" align="middle" className='book-appointment'>
                <Form
                    {...formItemLayout}
                    onFinish={onFinish}
                    variant={'underlined'}
                    form={form}
                    style={{width: 600}}
                    initialValues={{variant: 'underlined'}}
                >
                    <Form.Item label="Your Name" name="name" rules={[{required: true, message: 'Please input!'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Your Reason" name="reason" rules={[{required: true, message: 'Please input!'}]}>
                        <Input/>
                    </Form.Item>

                    <Divider>Category</Divider>
                    <Space wrap>
                        {categories.map(category => (
                            <Tag.CheckableTag
                                key={category}
                                checked={category === selected}
                                onChange={() => handleCategorySelect(category)}
                                style={{borderRadius: '20px', padding: '8px 16px', cursor: 'pointer'}}
                            >
                                {category}
                            </Tag.CheckableTag>
                        ))}
                    </Space>
                    <Divider>Doctor</Divider>
                    <Space wrap>
                        {selectedDoctors.map((doc, index) => (
                            <Card
                                key={index}
                                hoverable
                                style={{
                                    width: 120,
                                    height: 100,
                                    borderColor: doc.id === selectedDoctor?.id ? '#1890ff' : '#707070',
                                    color: doc.id === selectedDoctor?.id ? '#1890ff' : '#707070',
                                    boxShadow: doc.id === selectedDoctor?.id ? '0 0 3px #1890ff' : '0 0 10px #e6f7ff',
                                }}
                                onClick={() => setSelectedDoctor(doc)}
                            >
                                <Card.Meta
                                    // avatar={<Avatar size={64} src={doc.image} />}
                                    title={doc.name}
                                    description={
                                        <>
                                            <div>{doc.specialty}</div>
                                        </>
                                    }
                                />
                            </Card>
                        ))}
                    </Space>
                    <Divider></Divider>
                    <Form.Item
                        label="Mode"
                        name="mode"
                        rules={[{required: true, message: 'Please input!'}]}
                    >
                        <Select
                            showSearch
                            // initialValue={'in-person'}
                            placeholder="Select a mode"
                            optionFilterProp="label"
                            style={{width: 120}}
                            options={[
                                {
                                    label: 'In-person',
                                    value: 'in-person',
                                },
                                {
                                    label: 'Online',
                                    value: 'online',
                                },
                                {
                                    label: 'Phone Call',
                                    value: 'phone',
                                },
                                {
                                    label: 'Home Visit',
                                    value: 'home-visit',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="DatePicker"
                        name="DatePicker"
                        rules={[{required: true, message: 'Please input!'}]}
                    >
                        <DatePicker disabledDate={(current) => current && current < dayjs().startOf('day')}/>
                    </Form.Item>
                    <Form.Item
                        label="TimePicker"
                        name="TimePicker"
                        rules={[{required: true, message: 'Please input!'}]}
                    >
                        <TimePicker disabledTime={disabledTime} prefix={<SmileOutlined/>} format={'HH:mm'}/>
                    </Form.Item>

                    <Form.Item
                        label="Notes"
                        name="notes"
                    >
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

    )
}

export default BookAppointment;