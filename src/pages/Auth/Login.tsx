import "./Login.css";
import React, { useState, useEffect } from "react";
import { Button, Input, Form, Row } from 'antd'
import { useNavigate } from "react-router-dom";
import { SIGNUP, PROFILE, DOCTOR_PAGE } from "../../routes/paths";
import { fetchData } from "../../services/apiService";
import  { setPatient, type Patient } from "../../features/PatientSlice";
import { type Doctor } from "../../features/DoctorSlice";
import { setUser } from "../../features/UserSlice";
import { useAppDispatch } from "../../app/hooks";
import { auth } from "../../services/apiService";
import { signInWithEmailAndPassword } from "firebase/auth";
import loginImage from "../../assets/login-image.jpg";


const Login: React.FC = () => {
  
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
  try {
    console.log(values);
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    const firebaseUser = userCredential.user;

    if (!firebaseUser.emailVerified) {
      setError("Please verify your email before logging in.");
      return;
    }

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
    } 
    else if (matchedPatient) {
      dispatch(setUser({ data: matchedPatient, role: "patient", token }));
      dispatch(setPatient(matchedPatient));
      navigate(PROFILE);
    } 
    else {
      setError("User found in Firebase but not in database.");
    }
  } catch (err) {
    setError("Login failed. Please check your credentials.");
    console.error("Login error:", err);
  }
};

  return (
    <div className="login-root">
    <div className="login-wrapper">
      <div className="login-visual">
        <img src={loginImage} alt="Digital illustration" className="login-image" />
        <h2>One click to go all digital.</h2>
      </div>
      <div className="login-container">
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
      </div>
    </div>
  </div>

  );
};

export default Login;
