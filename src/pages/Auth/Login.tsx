import "./Login.css";
import React, { useState } from "react";
import { Button, Input, Form, Row } from 'antd'
import { useNavigate } from "react-router-dom";
import { SIGNUP, PROFILE, DOCTOR_PAGE } from "../../routes/paths.ts";
import { fetchData } from "../../services/apiServices.ts";
import  { type Patient } from "../../features/PatientSlice.ts";
import { type Doctor } from "../../features/DoctorSlice.ts";
import { setUser } from "../../features/UserSlice.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { auth } from "../../services/apiServices.ts";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();

    localStorage.setItem("authToken", token);

    const [allPatients, allDoctors] = await Promise.all([
      fetchData("patients") as Promise<Patient[]>,
      fetchData("doctors") as Promise<Doctor[]>
    ]);

    const matchedPatient = allPatients.find(p => p.id === firebaseUser.uid);
    const matchedDoctor = allDoctors.find(d => d.id === firebaseUser.uid);

    if (matchedDoctor) {
      dispatch(setUser({ data: matchedDoctor, role: "doctor", token }));
      navigate(DOCTOR_PAGE);
    } else if (matchedPatient) {
      dispatch(setUser({ data: matchedPatient, role: "patient", token }));
      navigate(PROFILE);
    } else {
      setError("User found in Firebase but not in database.");
    }
  } catch (err) {
    setError("Login failed. Please check your credentials.");
    console.error("Login error:", err);
  }
};

  return (
    <div className="login-container">
      <Row justify="center" align="top" style={{ padding: '2rem' }}>
       <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      form={form}
      className="login-form"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input size="middle" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true }]}
      >
        <Input.Password size="middle" />
      </Form.Item>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log In
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => navigate(SIGNUP)} block>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
    </Row>
    </div>
  );
};

export default Login;
