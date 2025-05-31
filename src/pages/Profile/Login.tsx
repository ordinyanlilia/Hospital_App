import React, { useState } from "react";
import { Button, Input, Form, } from 'antd'
import { useNavigate } from "react-router-dom";
import { SIGNUP, PROFILE } from "../../routes/paths";
import { fetchData } from "../../services/apiServices";
import  { type Patient } from "../../features/PatientSlice";
import { type Doctor } from "../../features/DoctorSlice";
import { setUser } from "../../features/UserSlice";
import { useAppDispatch } from "../../app/hooks";
import { type UserState } from "../../features/UserSlice";
import { auth } from "../../services/apiServices";
import { signInWithEmailAndPassword } from "firebase/auth";

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      // const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      // const token = await userCredential.user.getIdToken();
      // localStorage.setItem("authToken", token);
      const allPatients: Patient[] = await fetchData('patients');
      const matchedPatients = allPatients.find(
        patient => patient.email === values.email && patient.password === values.password);

      const allDoctors = await fetchData("doctors");
      const matchedDoctors = allDoctors.find(doctor => doctor.email === values.email 
        && doctor.password === values.password)


      if (matchedDoctors) {
        dispatch(setUser({data: matchedDoctors, role: "doctor"}))
        // localStorage.setItem("user", JSON.stringify({data: matchedDoctors, role: "doctor"})); 
        navigate(PROFILE);
      } else {
        setError('Invalid email or password');
      }
      if(matchedPatients){
        dispatch(setUser({data: matchedPatients, role: "patient"}))
        // localStorage.setItem("user", JSON.stringify({data: matchedPatients, role: "patient"}));
        console.log(`Hello ${matchedPatients.name} ${matchedPatients.surname}`);
        navigate(PROFILE);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <Form name="login" onFinish={onFinish}     
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
        >
        <Form.Item name="email" label="Email" 
        rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]} >
          <Input.Password/>
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => navigate(SIGNUP)}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
