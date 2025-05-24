import {Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect, Row, message} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {addAppointment, selectStatus} from '../../features/appointments/appointmentsSlice.ts';
import {Timestamp} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const BookAppointment = () => {

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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectStatus);
    console.log(isLoading, 'isLoading ::: status');

    const onFinish = async (value) => {
        console.log(value);
        try {
            const resultAction = await dispatch(addAppointment(value)).unwrap();
            console.log(resultAction, 'result');
            if (resultAction) {
                message.success('Sign in successful!');
                navigate('/dashboard'); // Redirect to dashboard or another page
            }
        } catch (error) {
            message.error(error || 'Sign in failed!');
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                // form={form}
                variant={'underlined'}
                style={{width: 600}}
                initialValues={{variant: 'underlined'}}
            >
                <Form.Item label="Input" name="Input" rules={[{required: true, message: 'Please input!'}]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="InputNumber"
                    name="InputNumber"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <InputNumber style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    label="TextArea"
                    name="TextArea"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item
                    label="Mentions"
                    name="Mentions"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <Mentions/>
                </Form.Item>

                {/*<Form.Item*/}
                {/*    label="Select"*/}
                {/*    name="Select"*/}
                {/*    rules={[{required: true, message: 'Please input!'}]}*/}
                {/*>*/}
                {/*    <Select/>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label="Cascader"*/}
                {/*    name="Cascader"*/}
                {/*    rules={[{required: true, message: 'Please input!'}]}*/}
                {/*>*/}
                {/*    <Cascader/>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                {/*    label="TreeSelect"*/}
                {/*    name="TreeSelect"*/}
                {/*    rules={[{required: true, message: 'Please input!'}]}*/}
                {/*>*/}
                {/*    <TreeSelect/>*/}
                {/*</Form.Item>*/}

                <Form.Item
                    label="DatePicker"
                    name="DatePicker"
                    rules={[{required: true, message: 'Please input!'}]}
                >
                    <DatePicker/>
                </Form.Item>

                {/*<Form.Item*/}
                {/*    label="RangePicker"*/}
                {/*    name="RangePicker"*/}
                {/*    rules={[{ required: true, message: 'Please input!' }]}*/}
                {/*>*/}
                {/*    <RangePicker />*/}
                {/*</Form.Item>*/}

                <Form.Item wrapperCol={{offset: 6, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    )
}

export default BookAppointment;