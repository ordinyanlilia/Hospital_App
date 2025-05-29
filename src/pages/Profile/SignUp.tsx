import type { FormProps } from 'antd';
import { Button, Row, Form, Input, Select, DatePicker, Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE, PROFILE } from '../../routes/paths';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useState, useEffect } from 'react';
import { fetchData } from '../../services/apiServices';
import { addPatient, selectPatientStatus } from '../../features/PatientSlice';
import { addDoctor, selectDoctorStatus } from '../../features/DoctorSlice';
import { type Patient } from '../../features/PatientSlice';
import { type Doctor } from '../../features/DoctorSlice';


const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patientStatus = useAppSelector(selectPatientStatus);
  const doctorStatus = useAppSelector(selectDoctorStatus);
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null);

  useEffect(() => {
    if (patientStatus === 'succeeded' || doctorStatus === 'succeeded') {
      navigate(HOME_PAGE);
    }
  }, [patientStatus, doctorStatus, navigate]);

  const onFinish: FormProps['onFinish'] = async values => {
    try {
      if (selectedRole === 'patient') {
        if (!values.dob || !values.dob.isValid()) throw new Error('Date of birth is invalid or missing');
        const allPatients: Patient[] = await fetchData('patients');
        const exists = allPatients.find(p => p.email === values.email);
        if (exists) return navigate(PROFILE);

        const newPatient: Patient = {
          id: Date.now(),
          name: values.name,
          surname: values.surname,
          dob: values.dob.format('DD/MM/YYYY'),
          gender: values.gender,
          email: values.email,
          phoneNumber: values.phoneNumber,
          bloodType: 'unknown',
          password: values.password,
          allergies: [],
          currentMedications: [],
          medicalHistory: [],
          appointments: [],
        };
        await dispatch(addPatient(newPatient)).unwrap();
      }

      if (selectedRole === 'doctor') {
        const allDoctors = await fetchData('doctors');
        const exists = allDoctors.find(d => d.name === values.name && d.surname === values.surname);
        if (exists) return navigate(PROFILE);

        const newDoctor: Doctor = {
          id: Date.now().toString(),
          name: values.name,
          surname: values.surname,
          yearsOfExperience: parseInt(values.yearsOfExperience),
          gender: values.gender,
          specialty: values.specialty,
          email: values.email,
          password: values.password,
        };
        await dispatch(addDoctor(newDoctor)).unwrap();
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <Row justify="center" align="top" style={{ padding: '2rem' }}>
      {!selectedRole && (
        <Space direction="horizontal">
          <Card
            title="Sign up as Patient"
            hoverable
            onClick={() => setSelectedRole('patient')}
            style={{ width: 300, cursor: 'pointer' }}
          >
            Register to manage your health records and appointments.
          </Card>
          <Card
            title="Sign up as Doctor"
            hoverable
            onClick={() => setSelectedRole('doctor')}
            style={{ width: 300, cursor: 'pointer' }}
          >
            Join to manage patients and appointments.
          </Card>
        </Space>
      )}

      {selectedRole && (
        <Form
          name="signup"
          onFinish={onFinish}
          form={form}
          layout="vertical"
          style={{ width: 500 }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please write your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: 'Please write your surname!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Gender is required' }]}
          >
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          {selectedRole === 'patient' && (
            <>
              <Form.Item
                label="Birth Date"
                name="dob"
                rules={[{ required: true, message: 'Birth date is required' }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]{7,15}$/,
                    message: 'Enter a valid phone number',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          {selectedRole === 'doctor' && (
            <>
              <Form.Item
                label="Years of Experience"
                name="yearsOfExperience"
                rules={[{ required: true, message: 'Enter years of experience' }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Specialty"
                name="specialty"
                rules={[{ required: true, message: 'Enter your speciality' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email'}]}
              >
                <Input />
              </Form.Item>
            </>
            
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => setSelectedRole(null)}>Back</Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Row>
  );
};

export default Signup;

