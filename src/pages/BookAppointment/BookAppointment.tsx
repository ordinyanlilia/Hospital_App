import './BookAppointment.css';

import {Button, Card, DatePicker, Divider, Form, Input, Result, Row, Select, Space, Spin, Tag, TimePicker} from "antd";
import {
    addAppointment,
    type Appointment,
    selectError,
    selectStatus
} from '../../features/appointments/appointmentsSlice.ts';

import {useNavigate} from "react-router-dom";
import {SmileOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {type Doctor, fetchData} from "../../services/apiService.ts";
import {Timestamp} from 'firebase/firestore';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";


const BookAppointment = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
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
        'Neurology',
        'Psychiatry',
        'Plastic Surgery',
        'Radiology',
        'Pathology',
        'Emergency Medicine',
        'Dermatology',
        'Cardiology',
    ];

    const [selected, setSelected] = useState<string>('Neurology');
    useEffect(() => {
        fetchData('doctors').then((data: Doctor[]) => {
            // const doctors = data.map(d => {
            //     return {
            //         label: d.name,
            //         value: d.id,
            //     }
            // })
            console.log(data)
            setDoctors(data)
        })
    }, []);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector(selectStatus);
    const error: string | null = useAppSelector(selectError);
    const [form] = Form.useForm();

    const onFinish = async (value) => {
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
                ...value,
                date: timestamp,
                userId: '1',
                status: 'scheduled',
            };

            await dispatch(addAppointment(resultValue)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    if (status === 'succeeded') {
        return (
            <Result
                icon={<SmileOutlined/>}
                title="Great, we have done all the operations!"
                extra={<Button type="primary" onClick={() => navigate('/profile')}>Next</Button>}
            />
        )
    } else if (status === 'failed') {
        return (<Result
            status="error"
            title="Submission Failed"
            subTitle={error}
            extra={
                <Button type="primary" onClick={() => navigate('/profile')}>Next</Button>
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
            <h3>Make An Appointment</h3>
            <Row justify="center" align="middle" className='book-appointment'>
                <Form
                    {...formItemLayout}
                    onFinish={onFinish}
                    variant={'underlined'}
                    form={form}
                    style={{width: 600}}
                    initialValues={{variant: 'underlined'}}
                >
                    <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input!'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Reason" name="reason" rules={[{required: true, message: 'Please input!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Doctor"
                        name="doctorId"
                        rules={[{required: true, message: 'Please input!'}]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a Doctor"
                            optionFilterProp="label"
                            style={{width: 120}}
                            options={doctors.map(doc => {
                                return {
                                    label: doc.name,
                                    value: doc.id,
                                }
                            })}
                        />
                    </Form.Item>

                    <Divider>Category</Divider>
                    <Space wrap>
                        {categories.map(category => (
                            <Tag.CheckableTag
                                key={category}
                                // color={category === selected ? 'blue' : 'default'}
                                checked={category === selected}
                                onChange={() => setSelected(category)}
                                style={{borderRadius: '20px', padding: '8px 16px', cursor: 'pointer'}}
                            >
                                {category}
                            </Tag.CheckableTag>
                        ))}
                    </Space>
                    <Divider>Doctors</Divider>
                    <Space wrap>
                        {doctors.map((doc, index) => (
                            <Card
                                key={index}
                                hoverable
                                style={{
                                    width: 120,
                                    height: 100,
                                    borderColor: '#1890ff',
                                    boxShadow: '0 0 10px #e6f7ff'
                                }}
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
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="TimePicker"
                        name="TimePicker">
                        <TimePicker prefix={<SmileOutlined/>} format={'HH:mm'}/>
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